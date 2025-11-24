import * as eventRepository from "../repositories/eventRepository.js";

export const create = (userId, data) => {
    return eventRepository.createEvent({ ...data, userId });
};

export const getAllForUser = (userId) => {
    return eventRepository.getEventsByUser(userId);
};

export const getById = (id) => {
    return eventRepository.getEventById(id);
};

export const update = (id, data) => {
    return eventRepository.updateEvent(id, data);
};

export const remove = (id) => {
    return eventRepository.deleteEvent(id);
};
