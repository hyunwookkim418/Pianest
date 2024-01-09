import React, { useState,useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
/* The line `// import moment from 'moment';` is commented out, which means it is not being used in the
code. It is likely that the line was originally used to import the `moment` library, which is a
popular JavaScript library for parsing, validating, manipulating, and formatting dates and times.
However, since it is commented out, it is not being used in the code. */
import moment from 'moment';
// import jwt from 'jsonwebtoken';

const AdminEvents = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventName, setEventName] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [events, setEvents] = useState([]);
  const localizer = momentLocalizer(moment);


  const token = localStorage.getItem('token')

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}
 
console.log()
  /* The line `const payload = jwt.verify(token, 'RESTFULAPIs');` is verifying the authenticity of a
  JSON Web Token (JWT) using the `jwt.verify` method. */
  // const payload = jwt.verify(token, 'RESTFULAPIs');

  console.log("Events", events);

  useEffect(() => {
    // Make the API call to get events based on assignedTo
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/get_events/${parseJwt(token).fullName}`);
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

  

  const EventComponent = ({ event }) => (
      
    <div className="event-item">

      <p>{event.title}</p>
  
 
      <p>Deadline: {moment.utc(event.end).format("MMM Do, YYYY")}</p>
    </div>
  );



  return (
    <div className="event-calendar">
      
      <Calendar
        localizer={localizer}
        
        events={events.map(event => ({
          title: event.Event,
          start: event.deadline,
          // end:event.deadline,
          end: event.deadline,
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
              viewType={props.view} // Pass the current view type to EventComponent
            />
          ),
        }}
        views={{ month: true, week: false, day: false, agenda: true }}
      />
  <br/>
  
     
    </div>

  );
};

export default AdminEvents;
