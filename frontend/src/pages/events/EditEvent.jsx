import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, DollarSign, Video, Image, ArrowLeft } from 'lucide-react';
// import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEvent = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(true);
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState([]);
    const [formData, setFormData] = useState({
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

    useEffect(() => {
        // Fetch event data
        const fetchEvent = async () => {
            setIsFetching(true);
            try {
                // In a real implementation, you would fetch event data from your API
                // const response = await axios.get(`/api/events/${id}`);
                // const eventData = response.data;

                // For now, let's simulate the API response
                const mockEventData = {
                    name: 'Tech Conference 2025',
                    description: 'Annual technology conference featuring the latest innovations and industry trends.',
                    category: 'CONFERENCE',
                    date: '2025-03-15',
                    time: '09:00',
                    location: 'Convention Center, New York',
                    maxAttendees: 500,
                    ticketPrice: 99.99,
                    virtualMeetingLink: 'https://zoom.us/j/example',
                    images: [
                        '/api/placeholder/400/200',
                        '/api/placeholder/400/200'
                    ],
                    organizer: 'user_id_here'
                };

                // Format date if needed and populate the form
                setFormData({
                    name: mockEventData.name,
                    description: mockEventData.description,
                    category: mockEventData.category,
                    date: mockEventData.date,
                    time: mockEventData.time,
                    location: mockEventData.location,
                    maxAttendees: mockEventData.maxAttendees,
                    ticketPrice: mockEventData.ticketPrice,
                    virtualMeetingLink: mockEventData.virtualMeetingLink || ''
                });

                // Set image previews
                setImagePreview(mockEventData.images);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchEvent();
    }, [id]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // In a real implementation, you would upload new images to Cloudinary
            // and then update the event with the URLs

            // For now, we'll simulate this process
            const eventData = {
                ...formData,
                images: imagePreview,
                organizer: "user_id_here" // This would come from auth context in a real app
            };

            // Here you would make the actual API call
            // const response = await axios.put(`/api/events/${id}`, eventData);

            // For now, we'll just simulate a successful response
            console.log('Event updated successfully:', eventData);

            setTimeout(() => {
                setIsLoading(false);
                navigate('/dashboard'); // Redirect to dashboard after successful update
            }, 1000);
        } catch (error) {
            console.error('Error updating event:', error);
            setIsLoading(false);
        }
    };

    if (isFetching) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="container mx-auto max-w-4xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-blue-600 mb-6 hover:underline"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </button>

                <div className="bg-white rounded-2xl shadow-sm p-8">
                    <h1 className="text-3xl font-bold mb-8">Edit Event</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="space-y-8">
                            {/* Basic information */}
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

                            {/* Date and Location */}
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

                            {/* Ticket Information */}
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

                            {/* Event Images */}
                            <div>
                                <h2 className="text-xl font-semibold mb-4">Event Images</h2>

                                {imagePreview.length > 0 && (
                                    <div className="mb-6 grid grid-cols-3 gap-4">
                                        {imagePreview.map((src, index) => (
                                            <div key={index} className="relative rounded-xl overflow-hidden h-24">
                                                <img
                                                    src={src}
                                                    alt={`Event ${index}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}

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
                                        <p className="pl-3 self-center text-gray-500">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm disabled:opacity-70 flex justify-center"
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    ) : 'Update Event'}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditEvent;