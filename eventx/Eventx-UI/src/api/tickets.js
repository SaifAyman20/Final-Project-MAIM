import API from './axios';

export const bookTicket = (eventId, ticketData) => API.post(`/tickets/book/${eventId}`, ticketData);
export const getMyTickets = () => API.get('/tickets/me');
export const verifyTicket = (id) => API.put(`/tickets/verify/${id}`);
export const getEventSeats = (eventId) => API.get(`/tickets/seats/${eventId}`);