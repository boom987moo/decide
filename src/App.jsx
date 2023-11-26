// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import Button from '@mui/material/Button';


import './App.css';

function App() {
  const [events, setEvents] = useState(['Pizza', 'Ice Cream', 'Sushi', 'Dumplings']);
  const [newEvent, setNewEvent] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const addEvent = () => {
    const trimmedEvent = newEvent.trim();
    if (trimmedEvent && !events.includes(trimmedEvent)) {
      setEvents(prevEvents => [...prevEvents, trimmedEvent]);
      setNewEvent('');
    }
  };

  const removeEvent = (eventIndex) => {
    setEvents(prevEvents => prevEvents.filter((_, index) => index !== eventIndex));
  };

  const decideEvent = () => {
    if (events.length > 0) {
      const randomIndex = Math.floor(Math.random() * events.length);
      setSelectedEvent(events[randomIndex]);
    }
  };

  return (
    <div className="App">
      <div className="event-input-container">
        <input
          type="text"
          value={newEvent}
          onChange={(e) => setNewEvent(e.target.value)}
          placeholder="Enter new event"
          className="event-input"
        />
        <IconButton onClick={addEvent} aria-label="Add" color="default" className='add-event-button'>
          <AddIcon style={{ color: '#FD561E' }}/>
        </IconButton>
      </div>
      <div className="event-counter">Event Count: {events.length}</div>
      <ul className="event-list">
        {events.map((event, index) => (
          <li key={index} className="event-item">
            {event}
            <IconButton onClick={() => removeEvent(index)} aria-label='Delete' ><DeleteIcon style={{ color: '#8015E4' }}/></IconButton>
          </li>
        ))}
      </ul>
      <Button onClick={decideEvent} className='decide-button 'variant="contained" startIcon={<EmojiObjectsIcon/>}>DECIDE</Button>
      {selectedEvent && <div className="event-result">Result: {selectedEvent}</div>}
    </div>
  );
}

export default App;
