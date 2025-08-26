import API from './axios';

export const getEvents = () => API.get('/events');
export const getEventById = (id) => API.get(`/events/${id}`);
export const createEvent = (data) => API.post('/events', data);
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);
export const bookTickets = (eventId, ticketData) => API.post(`/tickets/book/${eventId}`, ticketData);
export const getMyTickets = () => API.get('/tickets/me');
export const getEventSeats = (eventId) => API.get(`/tickets/seats/${eventId}`);