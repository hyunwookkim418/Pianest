import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';

const AdminEvents = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);



  console.log("Events", events);

  useEffect(() => {
    // Make the API call to get events based on assignedTo
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/get_all_events`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error('Error fetching events:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    

    // Fetch events when assignedTo changes
   
      fetchEvents();
    // }
  }, []);


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddEvent = () => {
    if (selectedDate && eventName && assignedTo) {
      setEvents([...events, { deadline: selectedDate, Event: eventName, Assignedto: assignedTo }]);
      setSelectedDate(null);
      setEventName('');
      setAssignedTo('');
    }
  };

  const handleSaveEvents = async () => {
    handleAddEvent()
    const newevent=([ { deadline: selectedDate, Event: eventName, Assignedto: assignedTo }]);

    try {
      // Assuming you have an API endpoint to save events on the server
      const response = await fetch('http://localhost:4000/save_events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newevent),
      });

      if (response.ok) {
        console.log('Events saved successfully');
      } else {
        console.error('Error saving events:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving events:', error);
    }
  };

  const handleDeleteEvent = (event,id) => {

    const deleteEvent = async (id) => {
      try {
        // Replace 'your-api-endpoint' with the actual endpoint for deleting events
        const response = await fetch(`http://localhost:4000/delete_event/${id}`);
        
        if (response.status === 200) {
          console.log('Event deleted successfully');
          // setIsDeleted(true);
        } else {
          console.error('Error deleting event:', response.data.error);
        }
      } catch (error) {
        console.error('Error deleting event:', error.message);
      }
    };

    deleteEvent(id)

    const updatedEvents = events.filter((e) => e._id !== id);
    setEvents(updatedEvents);

    
  };

  const EventComponent = (props) => (
    console.log("here",props)

    // <div className="event-item">
    //   <div>{event.title}</div>
    //   <div>{event.assignedTo}</div>
    //   {/* <div>Assigned to: {event.assignedTo}</div> */}
    //   <div>Deadline: {moment.utc(event.end).format("MMM Do, YYYY")}</div>
    //   <div><button onClick={() => handleDeleteEvent(event,event.id)} className="delete-btn">
    //     Delete
    //   </button></div>
    // </div>
  );



  return (
    <div className="event-calendar">
      <div className="event-form">
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="Select a date"
        />
        <input
          type="text"
          placeholder="Event name"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assigned to"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
        />
        {/* <button onClick={handleAddEvent}>Add Event</button> */}
        <button onClick={handleSaveEvents}>Add Events</button>
      </div>
      <Calendar
        localizer={localizer}
        
        events={events.map(event => ({
          title: event.Event,
          start: event.deadline,
          // end:event.deadline,
          end: moment(event.deadline).add(1, 'hours').toDate(),
          assignedTo: event.Assignedto,
          id:event._id
         
        }))}
        startAccessor={(event) => { return new Date(event.start) }}
        endAccessor="end"
        
        style={{ height: "80vh" }}
        components={{
          event: (props) => (
            <EventComponent
              {...props}
              // viewType={props.view} // Pass the current view type to EventComponent
            />
          ),
        }}
        views={{ month: true, week: false, day: false, agenda: true }}
      />
  <br/>
  
     <h3>Please hit refresh before deleting an event.</h3> 
    </div>

  );
};

export default AdminEvents;
