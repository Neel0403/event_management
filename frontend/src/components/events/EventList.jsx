import React, { useState } from 'react';
import { Search, Filter, Calendar, ArrowRight, SlidersHorizontal } from 'lucide-react';

// Import the EventCard component
// Note: Ensure this path matches where you saved your EventCard component
import EventCard from './EventCard';

const EventList = ({ 
  title = "Upcoming Events",
  description,
  events = [],
  showFilters = true,
  showSearch = true,
  loading = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter categories for demo - you can replace these with your actual categories
  const filterCategories = [
    { id: 'all', name: 'All Events' },
    { id: 'tech', name: 'Technology' },
    { id: 'business', name: 'Business' },
    { id: 'music', name: 'Music & Arts' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'education', name: 'Education' }
  ];

  // Demo events if none are provided
  const demoEvents = [
    {
      title: "Tech Conference 2025",
      date: "March 15-16, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco, CA",
      attendees: "500+",
      category: "Technology",
      organizer: "TechEvents Inc.",
      image: "/api/placeholder/400/200"
    },
    {
      title: "Music Festival",
      date: "April 1-3, 2025",
      time: "All day",
      location: "Central Park, New York",
      attendees: "2000+",
      category: "Music & Arts",
      organizer: "Festival Productions",
      image: "/api/placeholder/400/200",
      isFeatured: true
    },
    {
      title: "Business Summit",
      date: "May 20, 2025",
      time: "8:00 AM - 4:00 PM",
      location: "Chicago, IL",
      attendees: "300+",
      category: "Business",
      organizer: "Business Network",
      image: "/api/placeholder/400/200"
    },
    {
      title: "Health & Wellness Expo",
      date: "June 5-6, 2025",
      time: "10:00 AM - 6:00 PM",
      location: "Los Angeles, CA",
      attendees: "1000+",
      category: "Health & Wellness",
      image: "/api/placeholder/400/200"
    },
    {
      title: "Education Conference",
      date: "July 12, 2025",
      time: "9:00 AM - 3:00 PM",
      location: "Boston, MA",
      attendees: "250+",
      category: "Education",
      image: "/api/placeholder/400/200"
    },
    {
      title: "Startup Pitch Night",
      date: "August 3, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Austin, TX",
      attendees: "150+",
      category: "Business",
      image: "/api/placeholder/400/200"
    }
  ];

  // Use provided events or demo events
  const displayEvents = events.length > 0 ? events : demoEvents;

  // Filter and search events
  const filteredEvents = displayEvents.filter(event => {
    // Filter by category
    const categoryMatch = activeFilter === 'all' || 
      (event.category && event.category.toLowerCase().includes(activeFilter.toLowerCase()));
    
    // Filter by search query
    const searchMatch = !searchQuery || 
      (event.title && event.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (event.organizer && event.organizer.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return categoryMatch && searchMatch;
  });

  // Loading skeletons for events
  const EventSkeleton = () => (
    <div className="rounded-2xl overflow-hidden bg-white shadow-sm animate-pulse">
      <div className="bg-gray-200 w-full h-48"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/5"></div>
        </div>
        <div className="h-5 bg-gray-200 rounded w-1/3 mt-2"></div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            {showSearch && (
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            )}

            {/* Mobile Filter Toggle */}
            {showFilters && (
              <div className="md:hidden">
                <button
                  onClick={() => setShowMobileFilters(!showMobileFilters)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-700 flex items-center justify-center gap-2"
                >
                  <Filter size={18} />
                  <span>Filters</span>
                </button>
              </div>
            )}

            {/* View Calendar Button (optional) */}
            <div className="hidden md:block">
              <a
                href="/calendar"
                className="px-4 py-3 rounded-xl border border-gray-300 text-gray-700 flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Calendar size={18} />
                <span>View Calendar</span>
              </a>
            </div>
          </div>

          {/* Filter Categories - Desktop */}
          {showFilters && (
            <div className="hidden md:flex mt-4 gap-3 overflow-x-auto pb-2">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                    activeFilter === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}

          {/* Filter Categories - Mobile */}
          {showFilters && showMobileFilters && (
            <div className="md:hidden mt-4 flex flex-wrap gap-2">
              {filterCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveFilter(category.id);
                    setShowMobileFilters(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    activeFilter === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Events Grid */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <EventSkeleton key={index} />
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              date={event.date}
              time={event.time}
              location={event.location}
              attendees={event.attendees}
              image={event.image}
              category={event.category}
              organizer={event.organizer}
              isFeatured={event.isFeatured}
              href={`/events/${event.id || index}`}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl">
          <SlidersHorizontal size={40} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No events found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveFilter('all');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* View All Link */}
      {filteredEvents.length > 0 && (
        <div className="mt-12 text-center">
          <a
            href="/events"
            className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
          >
            View all events
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
      )}
    </div>
  );
};

export default EventList;