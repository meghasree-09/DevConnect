import api from "./api";

/* Create Event */

export const createEvent = async (event) => {

    const response = await api.post(
        "/events",
        event
    );

    return response.data;

};

/* Get Events */

export const getEvents = async (communityId) => {

    const response = await api.get(
        `/events/${communityId}`
    );

    return response.data;

};

/* Register */

export const registerEvent = async (eventId, userId) => {

    const response = await api.put(
        `/events/register/${eventId}`,
        {
            userId,
        }
    );

    return response.data;

};

/* Delete */

export const deleteEvent = async (id) => {

    const response = await api.delete(
        `/events/${id}`
    );

    return response.data;

};