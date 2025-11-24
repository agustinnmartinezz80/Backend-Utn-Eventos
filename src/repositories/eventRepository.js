import Event from "../models/Event.js";

export const createEvent = async (data) => {
    const event = await Event.create(data);
    return event.populate("userId", "name email");
};

export const getEventsByUser = (userId) => {
    return Event.find({ userId }).populate("userId", "name email");
};

export const getEventById = (id) => {
    return Event.findById(id).populate("userId", "name email");
};

export const updateEvent = (id, data) => {
    return Event.findByIdAndUpdate(id, data, { new: true }).populate("userId", "name email");
};

export const deleteEvent = (id) => {
    return Event.findByIdAndDelete(id);
};
