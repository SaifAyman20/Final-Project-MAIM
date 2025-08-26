import API from './axios';

// وظائف API للتحليلات
export const getOverview = () => API.get('/analytics/overview');
export const getDemographics = () => API.get('/analytics/demographics');
export const getEventAnalytics = (id) => API.get(`/analytics/event/${id}`);
export const getEventAttendeeInsights = (id) => API.get(`/analytics/event/${id}/insights`); // أضف هذا السطر
export const exportTicketsCSV = () => API.get('/analytics/export/csv', {
  responseType: 'blob'
});
export const exportTicketsExcel = () => API.get('/analytics/export/excel', {
  responseType: 'blob'
});