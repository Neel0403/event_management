import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const eventContext = createContext({
    events: [],
    createEvent: () => { },
    updateEvent: () => { },
    deleteEvent: () => { },
    getEvents: () => { },
    getEvent: () => { }
});

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/events');

                if (response.data) {
                    setEvents(response.data)
                }
            } catch (error) {
                console.error("Failed to fetch events", error)
                throw error
            }
        }
        fetchEvents();
    }, [])

    const createEvent = async (eventData) => {
        try {
            const response = await axios.post('/events/create-event', eventData);

            if (response.data) {
                setEvents((event) => [...event, response.data])
            }
        } catch (error) {
            console.error("Event creation failed", error)
            throw error
        }
    }
    const updateEvent = async (eventId, eventData) => {
        const response = await axios.patch(`/events/update-event/${eventId}`, eventData);

        if (response.data) {
            setEvents((prevEvent) => prevEvent.map((event) => event.id === eventId ? { ...event, ...eventData } : event))
        }
    }
    const deleteEvent = async (eventId) => {
        try {
            const response = await axios.delete(`/events/delete-event/${eventId}`)

            if (response.data) {
                setEvents((prevEvent) => prevEvent.filter((event) => event.id !== eventId))
            }
        } catch (error) {
            console.error("Failed to delete event", error)
            throw error
        }
    }
    const getEvents = async () => {
        const response = await axios.get('/events')
        if (response.data) {
            setEvents(response.data)
            return response.data.events
        }
    }
    const getEvent = async (eventId) => {
        try {
            const response = await axios.get(`/events/${eventId}`)
            if (response.data) {
                return response.data
            }
        } catch (error) {
            console.error("Failed to fetch event", error)
            throw error 
        }
    }

    return (
        <eventContext.Provider value={{ events, createEvent, updateEvent, deleteEvent, getEvents, getEvent }}>
            {children}
        </eventContext.Provider>
    )
}

export const useEvent = () => {
    return useContext(eventContext);
}
