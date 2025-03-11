import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, DollarSign, Video, Image } from 'lucide-react';

const EventForm = ({ initialData, onSubmit, isLoading, isEditing }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    ticketPrice: 0,
    virtualMeetingLink: ''
  });
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...filesArray]);

      // Create preview URLs
      const previewsArray = filesArray.map(file => URL.createObjectURL(file));
      setImagePreview(prev => [...prev, ...previewsArray]);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, images);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold mb-4">Event Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Enter event name"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Describe your event"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            >
              <option value="">Select a category</option>
              <option value="CONFERENCE">Conference</option>
              <option value="SEMINAR">Seminar</option>
              <option value="SOCIAL">Social</option>
              <option value="WORKSHOP">Workshop</option>
              <option value="OTHERS">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Max Attendees</label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="number"
                name="maxAttendees"
                value={formData.maxAttendees}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="100"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Date & Location</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter physical location"
                required
              />
            </div>
          </div>

          <div className="col-span-2">
            <label className="block text-gray-700 mb-2">Virtual Meeting Link (Optional)</label>
            <div className="relative">
              <Video className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="url"
                name="virtualMeetingLink"
                value={formData.virtualMeetingLink}
                onChange={handleChange}
                className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="https://zoom.us/j/example"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Ticket Information</h2>
        <div>
          <label className="block text-gray-700 mb-2">Ticket Price ($)</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              className="w-full p-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="0 for free events"
              min="0"
              step="0.01"
            />
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Event Images</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 flex text-sm justify-center">
            <label className="relative cursor-pointer bg-blue-600 font-medium text-white px-4 py-2 rounded-xl hover:bg-blue-700 focus-within:outline-none">
              <span>Upload images</span>
              <input
                type="file"
                multiple
                className="sr-only"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
            {imagePreview.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt="Event" className="w-full h-full object-cover rounded-xl" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 text-white bg-red-500 rounded-full p-1"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className={`w-full p-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : isEditing ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
};

export default EventForm;
