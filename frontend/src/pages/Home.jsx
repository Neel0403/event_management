import React from 'react';
import { Calendar, Users, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
    const features = [
        {
            icon: <Calendar className="w-6 h-6" />,
            title: "Easy Event Creation",
            description: "Create and manage events with our intuitive interface. Set up registration, ticketing, and more in minutes."
        },
        {
            icon: <Users className="w-6 h-6" />,
            title: "Attendee Management",
            description: "Keep track of your attendees, communicate with them in real-time, and manage check-ins effortlessly."
        },
        {
            icon: <TrendingUp className="w-6 h-6" />,
            title: "Analytics & Insights",
            description: "Get detailed insights about your events. Track ticket sales, attendance rates, and engagement metrics."
        }
    ];

    const upcomingEvents = [
        {
            title: "Tech Conference 2025",
            date: "March 15-16, 2025",
            attendees: "500+",
            image: "/api/placeholder/400/200"
        },
        {
            title: "Music Festival",
            date: "April 1-3, 2025",
            attendees: "2000+",
            image: "/api/placeholder/400/200"
        },
        {
            title: "Business Summit",
            date: "May 20, 2025",
            attendees: "300+",
            image: "/api/placeholder/400/200"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                <div className="container mx-auto px-4 py-20">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                            <Sparkles className="text-white" size={24} />
                        </div>
                        <span className="text-2xl font-bold">EventHub</span>
                    </div>

                    <div className="max-w-2xl">
                        <h1 className="text-5xl font-bold mb-6">Create Unforgettable Events</h1>
                        <p className="text-xl text-white/90 mb-8">
                            Your all-in-one platform for creating, managing, and hosting successful events.
                            Join thousands of event organizers who trust EventHub.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-medium hover:bg-white/90 flex items-center gap-2">
                                Get Started
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <button className="bg-white/20 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/30">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto px-4 py-20">
                <h2 className="text-3xl font-bold text-center mb-12">Everything you need to run successful events</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Featured Events Section */}
            <div className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Featured Events</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                                    <p className="text-gray-600 mb-2">{event.date}</p>
                                    <p className="text-blue-600">{event.attendees} attendees</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4 py-20">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl text-white p-12 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to create your event?</h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of event organizers who trust EventHub to create memorable experiences.
                    </p>
                    <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-medium hover:bg-white/90 flex items-center gap-2 mx-auto">
                        Create Your Event
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;