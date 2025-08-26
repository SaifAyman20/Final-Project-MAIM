import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// User Pages (من مجلد User/)
import Events from "./pages/User/Events";
import EventDetails from "./pages/User/EventDetails";
import Profile from "./pages/Profile";
import MyTickets from "./pages/User/MyTickets";
import CreateEvent from "./pages/User/CreateEvent";
import EditEvent from "./pages/User/EditEvent";

// Admin Pages (من مجلد Admin/)
import AdminDashboard from "./pages/Admin/EventsDashboard";
import EventsManagement from "./pages/Admin/EventsManagement";
import AdminEventDetails from "./pages/Admin/EventDetails";
import AttendeeInsights from "./pages/Admin/AttendeeInsights";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/events" element={<Events />} />
            <Route path="/events/:id" element={<EventDetails />} />
            
            {/* Protected Routes (for all logged-in users) */}
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/my-tickets" element={
              <ProtectedRoute>
                <MyTickets />
              </ProtectedRoute>
            } />
            
            {/* Admin Only Routes */}
            <Route path="/admin/dashboard" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
            <Route path="/admin/events" element={
              <AdminRoute>
                <EventsManagement />
              </AdminRoute>
            } />
            <Route path="/admin/events/:id" element={
              <AdminRoute>
                <AdminEventDetails />
              </AdminRoute>
            } />
            <Route path="/admin/insights/:id" element={
              <AdminRoute>
                <AttendeeInsights />
              </AdminRoute>
            } />
            
            {/* Routes for creating/editing events - للادمن فقط */}
            <Route path="/events/create" element={
              <AdminRoute>
                <CreateEvent />
              </AdminRoute>
            } />
            <Route path="/events/edit/:id" element={
              <AdminRoute>
                <EditEvent />
              </AdminRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;