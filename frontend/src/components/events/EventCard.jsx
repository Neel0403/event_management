import React from 'react';
import { Calendar, MapPin, Users, Clock, ChevronRight } from 'lucide-react';

const EventCard = ({
  title,
  date,
  time,
  location,
  attendees,
  image,
  category,
  organizer,
  isFeatured = false,
  href = "#",
  ...props
}) => {
  return (
    <div 
      className={`
        rounded-2xl overflow-hidden bg-white transition-all
        ${isFeatured ? 'shadow-md hover:shadow-lg' : 'shadow-sm hover:shadow-md'}
      `}
      {...props}
    >
      {/* Card Image */}
      <div className="relative">
        <img 
          src={image || "/api/placeholder/400/200"} 
          alt={title} 
          className="w-full h-48 object-cover"
        />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-blue-600 text-sm px-3 py-1 rounded-full font-medium">
              {category}
            </span>
          </div>
        )}
        
        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-4 right-4">
            <span className="bg-blue-600/90 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full font-medium">
              Featured
            </span>
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
        
        {/* Event Details */}
        <div className="space-y-2 mb-4">
          {date && (
            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-2 flex-shrink-0" />
              <span>{date}</span>
            </div>
          )}
          
          {time && (
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2 flex-shrink-0" />
              <span>{time}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}
          
          {attendees && (
            <div className="flex items-center text-gray-600">
              <Users size={16} className="mr-2 flex-shrink-0" />
              <span>{attendees} attendees</span>
            </div>
          )}
        </div>
        
        {/* Organizer - Optional */}
        {organizer && (
          <div className="mb-4 pt-3 border-t border-gray-100">
            <div className="text-sm text-gray-500">Organized by</div>
            <div className="font-medium text-gray-800">{organizer}</div>
          </div>
        )}
        
        {/* View Details Link */}
        <a 
          href={href} 
          className="mt-2 inline-flex items-center text-blue-600 font-medium hover:text-blue-700"
        >
          View Details
          <ChevronRight size={16} className="ml-1" />
        </a>
      </div>
    </div>
  );
};

export default EventCard;