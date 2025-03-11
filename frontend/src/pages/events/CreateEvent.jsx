import React, { useState } from 'react';
import EventForm from '../../components/events/EventForm'; 

const CreateEvent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const initialData = {
    name: '',
    description: '',
    category: '',
    date: '',
    time: '',
    location: '',
    maxAttendees: '',
    ticketPrice: 0,
    virtualMeetingLink: ''
  };

  // Handle form submission to create event
  const handleCreateEvent = async (formData, images) => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      // Mocking the event creation process
      // Replace this with an actual API call or form handling logic
      const formDataToSubmit = new FormData();

      // Append form fields to the formDataToSubmit
      Object.keys(formData).forEach(key => {
        formDataToSubmit.append(key, formData[key]);
      });

      // Append images to formData if any
      images.forEach(image => {
        formDataToSubmit.append('images', image);
      });

      // Simulate a request
      // For example:
      // const response = await axios.post('/api/events', formDataToSubmit);

      // Assuming success:
      setIsLoading(false);
      alert('Event created successfully!');
    } catch (error) {
      setIsLoading(false);
      setErrorMessage('Failed to create event. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">Create a New Event</h1>

      {/* Display error message if there's any */}
      {errorMessage && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-4">
          {errorMessage}
        </div>
      )}

      {/* Pass initialData and handleCreateEvent to the EventForm */}
      <EventForm
        initialData={initialData}
        onSubmit={handleCreateEvent}
        isLoading={isLoading}
        isEditing={false} // It's a "create" event form, not edit
      />
    </div>
  );
};

export default CreateEvent;
