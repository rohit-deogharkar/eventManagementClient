import api from "./axios";

export const getEvents = async (page = 1, search = "", limit = 9) => {
  const response = await api.get("/events", {
    params: { page, search, limit },
  });
  return response.data;
};

export const getEventById = async (id) => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await api.post("/events", eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  const response = await api.delete(`/events/${id}`);
  return response.data;
};

export const registerForEvent = async (id) => {
  const response = await api.post(`/events/register/${id}`);
  return response.data;
};

export const unregisterFromEvent = async (id) => {
  const response = await api.post(`/events/unRegister/${id}`);
  return response.data;
};
