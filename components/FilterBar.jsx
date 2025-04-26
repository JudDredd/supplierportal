import React from "react";

export default function FilterBar({ eventOptions, cityOptions, filters, onFilterChange }) {
  return (
    <div className="flex flex-wrap gap-2 p-4 bg-white shadow sticky top-0 z-10">
      <select
        className="p-2 border rounded"
        value={filters.event}
        onChange={(e) => onFilterChange({ ...filters, event: e.target.value })}
      >
        <option value="">All Events</option>
        {eventOptions.map((ev) => (
          <option key={ev.id} value={ev.id}>
            {ev.name}
          </option>
        ))}
      </select>
      <select
        className="p-2 border rounded"
        value={filters.city}
        onChange={(e) => onFilterChange({ ...filters, city: e.target.value })}
      >
        <option value="">All Cities</option>
        {cityOptions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <input
        type="date"
        className="p-2 border rounded"
        value={filters.date}
        onChange={(e) => onFilterChange({ ...filters, date: e.target.value })}
      />
    </div>
  );
}
