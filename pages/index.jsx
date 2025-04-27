// File: pages/index.jsx
import React, { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import ShiftTable from "../components/ShiftTable";
import ShiftCard from "../components/ShiftCard";

export default function Home() {
  // Default city filter to ensure initial data load
  const [filters, setFilters] = useState({ event: "", city: "Brisbane", date: "" });
  const [shifts, setShifts] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const fetchData = async () => {
    const params = new URLSearchParams();
    if (filters.event) params.append("eventId", filters.event);
    if (filters.city) params.append("city", filters.city);
    if (filters.date) params.append("date", filters.date);

    const url = `/api/shifts?${params.toString()}`;
    console.log("[Home] Fetching data from:", url);
    try {
      const res = await fetch(url);
      console.log("[Home] Response status:", res.status);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      console.log("[Home] Received data:", data);
      setShifts(Array.isArray(data.shifts) ? data.shifts : []);
      setDrivers(Array.isArray(data.drivers) ? data.drivers : []);
    } catch (err) {
      console.error("[Home] fetchData error:", err);
    }
  };

  useEffect(() => {
    console.log("[Home] Filters changed:", filters);
    fetchData();
  }, [filters]);

  const handleAssign = async (shiftId, driverId) => {
    const url = `/api/shifts_id?id=${shiftId}`;
    console.log("[Home] Assigning driver via:", url, { id_Employee: driverId });
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_Employee: driverId })
      });
      console.log("[Home] Assign response status:", res.status);
      if (!res.ok) throw new Error(`Failed to assign: HTTP ${res.status}`);
      fetchData();
    } catch (err) {
      console.error("[Home] handleAssign error:", err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <FilterBar
        eventOptions={[]}
        cityOptions={["Brisbane", "Sydney", "Melbourne"]}
        filters={filters}
        onFilterChange={setFilters}
      />
      <div className="hidden sm:block">
        <ShiftTable shifts={shifts} drivers={drivers} onAssign={handleAssign} />
      </div>
      <div className="sm:hidden">
        {shifts.map((shift) => (
          <ShiftCard
            key={shift.id}
            shift={shift}
            drivers={drivers}
            onAssign={handleAssign}
          />
        ))}
      </div>
    </div>
  );
}
