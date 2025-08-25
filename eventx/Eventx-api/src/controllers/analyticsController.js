import asyncHandler from "express-async-handler";
import Ticket from "../models/Ticket.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import { Parser } from "json2csv";
import ExcelJS from "exceljs";

// @desc    Get system overview (tickets sold, revenue, events count)
// @route   GET /api/analytics/overview
// @access  Admin
const getOverview = asyncHandler(async (req, res) => {
  const ticketsSold = await Ticket.countDocuments();
  const totalRevenue = await Ticket.aggregate([
    {
      $lookup: {
        from: "events",
        localField: "event",
        foreignField: "_id",
        as: "eventInfo",
      },
    },
    { $unwind: "$eventInfo" },
    { $group: { _id: null, revenue: { $sum: "$eventInfo.price" } } },
  ]);

  const eventsCount = await Event.countDocuments();

  res.json({
    ticketsSold,
    totalRevenue: totalRevenue[0]?.revenue || 0,
    eventsCount,
  });
});

// @desc    Get attendees demographics (age, gender, location)
// @route   GET /api/analytics/demographics
// @access  Admin
const getDemographics = asyncHandler(async (req, res) => {
  const byGender = await User.aggregate([
    { $group: { _id: "$gender", count: { $sum: 1 } } },
  ]);

  const byLocation = await User.aggregate([
    { $group: { _id: "$location", count: { $sum: 1 } } },
  ]);

  res.json({
    gender: byGender,
    location: byLocation,
  });
});

// @desc    Get event-specific analytics
// @route   GET /api/analytics/event/:id
// @access  Admin
const getEventAnalytics = asyncHandler(async (req, res) => {
  const eventId = req.params.id;

  const ticketsSold = await Ticket.countDocuments({ event: eventId });

  const revenue = await Ticket.aggregate([
    { $match: { event: eventId } },
    {
      $lookup: {
        from: "events",
        localField: "event",
        foreignField: "_id",
        as: "eventInfo",
      },
    },
    { $unwind: "$eventInfo" },
    { $group: { _id: null, revenue: { $sum: "$eventInfo.price" } } },
  ]);

  res.json({
    eventId,
    ticketsSold,
    revenue: revenue[0]?.revenue || 0,
  });
});

// @desc    Export tickets as CSV
// @route   GET /api/analytics/export/csv
// @access  Admin
const exportTicketsCSV = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find()
    .populate("event", "title date location price")
    .populate("user", "name email gender location");

  const data = tickets.map((t) => ({
    ticketId: t._id,
    event: t.event?.title,
    date: t.event?.date,
    location: t.event?.location,
    price: t.event?.price,
    user: t.user?.name,
    email: t.user?.email,
    gender: t.user?.gender,
    locationUser: t.user?.location,
    seat: t.seatNumber,
    status: t.status,
  }));

  const parser = new Parser();
  const csv = parser.parse(data);

  res.header("Content-Type", "text/csv");
  res.attachment("tickets_report.csv");
  return res.send(csv);
});

// @desc    Export tickets as Excel
// @route   GET /api/analytics/export/excel
// @access  Admin
const exportTicketsExcel = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find()
    .populate("event", "title date location price")
    .populate("user", "name email gender location");

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Tickets");

  worksheet.columns = [
    { header: "Ticket ID", key: "ticketId", width: 25 },
    { header: "Event", key: "event", width: 20 },
    { header: "Date", key: "date", width: 20 },
    { header: "Location", key: "location", width: 20 },
    { header: "Price", key: "price", width: 10 },
    { header: "User", key: "user", width: 20 },
    { header: "Email", key: "email", width: 25 },
    { header: "Gender", key: "gender", width: 10 },
    { header: "User Location", key: "locationUser", width: 20 },
    { header: "Seat", key: "seat", width: 10 },
    { header: "Status", key: "status", width: 15 },
  ];

  tickets.forEach((t) => {
    worksheet.addRow({
      ticketId: t._id.toString(),
      event: t.event?.title,
      date: t.event?.date,
      location: t.event?.location,
      price: t.event?.price,
      user: t.user?.name,
      email: t.user?.email,
      gender: t.user?.gender,
      locationUser: t.user?.location,
      seat: t.seatNumber,
      status: t.status,
    });
  });

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=tickets_report.xlsx");

  await workbook.xlsx.write(res);
  res.end();
});

export default {
  getOverview,
  getDemographics,
  getEventAnalytics,
  exportTicketsCSV,
  exportTicketsExcel,
};
