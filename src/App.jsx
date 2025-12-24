// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import Button from "@mui/material/Button";

import "./App.css";

function App() {
  const [events, setEvents] = useState([
    { name: "Pizza", prefer: 5, price: 150 },
    { name: "Ice Cream", prefer: 5, price: 80 },
    { name: "Sushi", prefer: 5, price: 250 },
    { name: "Dumplings", prefer: 5, price: 120 },
  ]);

  const [budget, setBudget] = useState(200);

  const [newEvent, setNewEvent] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  const feasible = events.filter((e) => (e.price ?? 0) <= budget);

  const ranked = [...feasible]
    .map((e) => ({ ...e, prefer: Math.max(0, e.prefer) }))
    .sort((a, b) => {
      if (b.prefer !== a.prefer) {
        return b.prefer - a.prefer; // higher prefer first
      }
      return a.price - b.price; // if same prefer, cheaper first
    });

  const totalprefer = feasible.reduce(
    (sum, e) => sum + Math.max(0, e.prefer),
    0
  );

  const addEvent = () => {
    const trimmed = newEvent.trim();
    if (trimmed && !events.some((e) => e.name === trimmed)) {
      setEvents((prev) => [...prev, { name: trimmed, prefer: 5, price: 100 }]);
      setNewEvent("");
    }
  };

  const removeEvent = (eventIndex) => {
    setEvents((prevEvents) =>
      prevEvents.filter((_, index) => index !== eventIndex)
    );
  };

  const decideEvent = () => {
    if (ranked.length === 0) {
      setSelectedEvent("No options within budget.");
      return;
    }
    setSelectedEvent(ranked[0].name); // prefer desc, then cheaper
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
        <IconButton
          onClick={addEvent}
          aria-label="Add"
          color="default"
          className="add-event-button"
        >
          <AddIcon style={{ color: "#FD561E" }} />
        </IconButton>
      </div>
      <div style={{ marginTop: 10 }}>
        Budget:
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          style={{ width: 80, marginLeft: 8 }}
        />
      </div>

      <div className="event-counter">Event Count: {events.length}</div>
      <div
        style={{
          display: "flex",
          gap: 12,
          margin: "10px 0 6px 0",
          paddingLeft: 6,
        }}
      >
        <div style={{ flex: 1 }} />
        <div style={{ width: 60, fontWeight: 600 }}>Prefer</div>
        <div style={{ width: 80, fontWeight: 600 }}>Price</div>
        <div style={{ width: 48 }} />
      </div>

      <ul className="event-list">
        {events.map((event, index) => (
          <li key={index} className="event-item">
            {/* NAME */}
            <span style={{ marginRight: 12 }}>{event.name}</span>

            {/* prefer */}
            <input
              type="number"
              min="0"
              max="10"
              value={event.prefer}
              onChange={(e) => {
                const w = Number(e.target.value);
                setEvents((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, prefer: isNaN(w) ? 0 : w } : item
                  )
                );
              }}
              style={{ width: 50, marginRight: 8 }}
            />

            {/* PRICE */}
            <input
              type="number"
              min="0"
              value={event.price}
              onChange={(e) => {
                const p = Number(e.target.value);
                setEvents((prev) =>
                  prev.map((item, i) =>
                    i === index ? { ...item, price: isNaN(p) ? 0 : p } : item
                  )
                );
              }}
              style={{ width: 70, marginRight: 8 }}
            />

            {/* DELETE */}
            <IconButton onClick={() => removeEvent(index)} aria-label="Delete">
              <DeleteIcon style={{ color: "#8015E4" }} />
            </IconButton>
          </li>
        ))}
      </ul>
      <div className="top3">
        <h3>Top picks</h3>
        <ol>
          {ranked.slice(0, 3).map((e, i) => (
            <li key={i}>
              {e.name} (prefer: {e.prefer})
            </li>
          ))}
        </ol>
      </div>

      <Button
        onClick={decideEvent}
        className="decide-button"
        variant="contained"
        startIcon={<EmojiObjectsIcon />}
      >
        DECIDE
      </Button>

      {selectedEvent && (
        <div className="event-result">
          Result: {selectedEvent}
          <div style={{ fontSize: 12, marginTop: 6 }}>
            Total prefer: {totalprefer}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
//Update decision logic with budget constraint and tie-breaking

