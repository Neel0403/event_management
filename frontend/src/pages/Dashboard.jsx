import React, { useEffect, useState } from 'react';
import {
    Calendar, Clock, Users, MapPin, Plus, Search, Filter, ChevronDown,
    Grid, List, ArrowRight, Sparkles, BellDot, User
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';
import { useEvent } from '../contexts/EventContext';

const Dashboard = () => {
    const { events, getEvents } = useEvent()
    const { user } = useAuth()
    const [viewType, setViewType] = useState('grid');
    const [filterOpen, setFilterOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Example events data - in a real app, this would come from your API
    // const [events, setEvents] = useState([
    //     {
    //         id: 1,
    //         name: "Annual Tech Conference",
    //         description: "Join industry leaders for discussions on emerging technologies.",
    //         category: "Technology",
    //         date: new Date('2025-04-15'),
    //         time: "09:00 AM - 05:00 PM",
    //         location: "Convention Center, New York",
    //         attendees: 246,
    //         status: "upcoming",
    //         isOwner: true
    //     },
    //     {
    //         id: 2,
    //         name: "Music Festival",
    //         description: "A weekend of live performances from top artists.",
    //         category: "Entertainment",
    //         date: new Date('2025-05-22'),
    //         time: "12:00 PM - 11:00 PM",
    //         location: "Central Park, New York",
    //         attendees: 1879,
    //         status: "upcoming",
    //         isOwner: true
    //     },
    //     {
    //         id: 3,
    //         name: "Charity Fundraiser",
    //         description: "Help us raise funds for children's education.",
    //         category: "Charity",
    //         date: new Date('2025-03-10'),
    //         time: "07:00 PM - 10:00 PM",
    //         location: "Grand Hotel, Boston",
    //         attendees: 158,
    //         status: "past",
    //         isOwner: true
    //     },
    //     {
    //         id: 4,
    //         name: "Marketing Workshop",
    //         description: "Learn the latest digital marketing strategies.",
    //         category: "Business",
    //         date: new Date('2025-04-05'),
    //         time: "10:00 AM - 03:00 PM",
    //         location: "Business Center, Chicago",
    //         attendees: 64,
    //         status: "upcoming",
    //         isOwner: false
    //     },
    //     {
    //         id: 5,
    //         name: "Product Launch",
    //         description: "Be the first to see our newest innovations.",
    //         category: "Technology",
    //         date: new Date('2025-06-18'),
    //         time: "02:00 PM - 04:00 PM",
    //         location: "Virtual Event",
    //         attendees: 312,
    //         status: "draft",
    //         isOwner: true
    //     }
    // ]);

    // const [events, setEvents] = useState({})

    // Filter events based on active filter and search query
    const filteredEvents = events.filter(event => {
        // Filter by status
        if (activeFilter !== 'all' && event.status !== activeFilter) {
            return false;
        }

        // Filter by search query
        if (searchQuery && !event.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        return true;
    });

    // Format date to readable string
    const formatDate = (date) => {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            {/* <header className="bg-white shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Sparkles className="text-white" size={16} />
                        </div>
                        <span className="text-lg font-bold">EventHub</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-gray-600 hover:text-blue-600">
                            <BellDot size={20} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <button className="flex items-center gap-2 text-gray-700 hover:text-blue-600">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                <User size={16} />
                            </div>
                            <span className="font-medium">{user ? `${user.firstName} ${` `} ${user.lastName}` : "Guest"}</span>
                            <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </header> */}

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Dashboard Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2">Your Events Dashboard</h1>
                    <p className="text-gray-600">Manage your events and track attendee registrations</p>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="pl-10 pr-4 py-2 w-full sm:w-72 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>

                        <div className="relative">
                            <button
                                className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
                                onClick={() => setFilterOpen(!filterOpen)}
                            >
                                <Filter size={18} />
                                <span>Filter</span>
                                <ChevronDown size={16} />
                            </button>

                            {filterOpen && (
                                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg p-2 z-10">
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'all' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                        onClick={() => { setActiveFilter('all'); setFilterOpen(false); }}
                                    >
                                        All Events
                                    </button>
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'upcoming' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                        onClick={() => { setActiveFilter('upcoming'); setFilterOpen(false); }}
                                    >
                                        Upcoming
                                    </button>
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'past' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                        onClick={() => { setActiveFilter('past'); setFilterOpen(false); }}
                                    >
                                        Past
                                    </button>
                                    <button
                                        className={`w-full text-left px-3 py-2 rounded-lg ${activeFilter === 'draft' ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}`}
                                        onClick={() => { setActiveFilter('draft'); setFilterOpen(false); }}
                                    >
                                        Drafts
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center bg-gray-100 rounded-lg p-1">
                            <button
                                className={`p-1 ${viewType === 'grid' ? 'bg-white rounded-md shadow-sm' : ''}`}
                                onClick={() => setViewType('grid')}
                                aria-label="Grid view"
                            >
                                <Grid size={20} />
                            </button>
                            <button
                                className={`p-1 ${viewType === 'list' ? 'bg-white rounded-md shadow-sm' : ''}`}
                                onClick={() => setViewType('list')}
                                aria-label="List view"
                            >
                                <List size={20} />
                            </button>
                        </div>

                        <a href="/events/create" className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 flex items-center gap-2">
                            <Plus size={18} />
                            Create Event
                        </a>
                    </div>
                </div>

                {/* Events Display */}
                {filteredEvents.length === 0 ? (
                    <div className="bg-white rounded-xl p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Calendar size={24} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">No events found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery ? `No events match "${searchQuery}"` : "You don't have any events yet"}
                        </p>
                        <a href="/events/create" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700">
                            <Plus size={18} />
                            Create your first event
                        </a>
                    </div>
                ) : viewType === 'grid' ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map(event => (
                            <div key={event.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                                {/* Status Badge */}
                                {event.status === 'draft' && (
                                    <div className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1">Draft</div>
                                )}
                                {event.status === 'past' && (
                                    <div className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1">Past Event</div>
                                )}

                                <div className="p-6">
                                    <h3 className="text-lg font-semibold mb-2 line-clamp-1">{event.name}</h3>
                                    <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Calendar size={16} className="text-gray-400" />
                                            <span>{formatDate(event.date)}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <Clock size={16} className="text-gray-400" />
                                            <span>{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-700">
                                            <MapPin size={16} className="text-gray-400" />
                                            <span className="line-clamp-1">{event.location}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-1 text-sm">
                                            <Users size={16} className="text-blue-500" />
                                            <span className="font-medium text-blue-500">{event.attendees}</span>
                                            <span className="text-gray-500">attendees</span>
                                        </div>

                                        <a href={`/events/${event.id}`} className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                                            <span>Manage</span>
                                            <ArrowRight size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <table className="w-full">
                            <thead className="border-b">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendees</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredEvents.map(event => (
                                    <tr key={event.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div>
                                                <h3 className="font-medium text-gray-900">{event.name}</h3>
                                                <p className="text-sm text-gray-500">{event.category}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{formatDate(event.date)}</div>
                                            <div className="text-sm text-gray-500">{event.time}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{event.location}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1">
                                                <Users size={16} className="text-blue-500" />
                                                <span className="font-medium text-blue-500">{event.attendees}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {event.status === 'upcoming' && (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Upcoming
                                                </span>
                                            )}
                                            {event.status === 'past' && (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                                    Past
                                                </span>
                                            )}
                                            {event.status === 'draft' && (
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                    Draft
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <a href={`/events/${event.id}`} className="text-blue-600 hover:text-blue-700">
                                                Manage
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Dashboard;