import React, { useState, useEffect } from "react";

export default function UpdateEvent({ existingEvent }) {
  const isEditMode = !!existingEvent;

  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    category: "",
    date: "",
    time: "",
    location: "",
    capacity: "",
    registrationDeadline: "",
    image: "",
    status: "Draft",
  });

  useEffect(() => {
    if (existingEvent) {
      setEventData(existingEvent);
    }
  }, [existingEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditMode) {
      console.log("Updating Event:", eventData);
      // call update API here
    } else {
      console.log("Creating Event:", eventData);
      // call create API here
    }

    alert(isEditMode ? "Event Updated Successfully!" : "Event Created Successfully!");
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "#f8fafc" }}>
      
      {/* 🔵 20% Sidebar Placeholder */}
      <div style={{ width: "20%", background: "#111827" }}>
        {/* <Sidebar /> */}
      </div>

      {/* 🔵 80% Main Content */}
      <div style={{ width: "80%", padding: "40px" }}>
        <h2 style={{ marginBottom: "5px" }}>
          {isEditMode ? "Update Event" : "Create New Event"}
        </h2>
        <p style={{ color: "gray", marginBottom: "30px" }}>
          {isEditMode
            ? "Modify event details below"
            : "Fill in the details to create a new event"}
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            maxWidth: "900px",
          }}
        >
          {/* Event Title */}
          <InputField
            label="Event Title"
            name="title"
            value={eventData.title}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <TextAreaField
            label="Description"
            name="description"
            value={eventData.description}
            onChange={handleChange}
            required
          />

          {/* Category */}
          <SelectField
            label="Category"
            name="category"
            value={eventData.category}
            onChange={handleChange}
            options={[
              "Technical",
              "Workshop",
              "Hackathon",
              "Seminar",
              "Cultural",
            ]}
          />

          {/* Date & Time */}
          <div style={{ display: "flex", gap: "20px" }}>
            <InputField
              label="Event Date"
              name="date"
              type="date"
              value={eventData.date}
              onChange={handleChange}
              required
            />
            <InputField
              label="Event Time"
              name="time"
              type="time"
              value={eventData.time}
              onChange={handleChange}
              required
            />
          </div>

          {/* Location */}
          <InputField
            label="Location"
            name="location"
            value={eventData.location}
            onChange={handleChange}
            required
          />

          {/* Capacity */}
          <InputField
            label="Capacity"
            name="capacity"
            type="number"
            value={eventData.capacity}
            onChange={handleChange}
            required
          />

          {/* Registration Deadline */}
          <InputField
            label="Registration Deadline"
            name="registrationDeadline"
            type="date"
            value={eventData.registrationDeadline}
            onChange={handleChange}
            required
          />

          {/* Image URL */}
          <InputField
            label="Event Image URL"
            name="image"
            value={eventData.image}
            onChange={handleChange}
          />

          {/* Status */}
          <SelectField
            label="Status"
            name="status"
            value={eventData.status}
            onChange={handleChange}
            options={["Draft", "Published", "Cancelled"]}
          />

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              borderRadius: "8px",
              border: "none",
              background: "#2563eb",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isEditMode ? "Update Event" : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* 🔹 Reusable Components */

function InputField({ label, name, type = "text", value, onChange, required }) {
  return (
    <div style={{ marginBottom: "20px", width: "100%" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
        }}
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, required }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows="4"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
        }}
      />
    </div>
  );
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={{ display: "block", marginBottom: "5px" }}>
        {label}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
        }}
      >
        <option value="">Select {label}</option>
        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
