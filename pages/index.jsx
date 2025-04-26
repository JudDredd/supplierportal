import React, { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import ShiftTable from "../components/ShiftTable";
import ShiftCard from "../components/ShiftCard";

export default function Home() {
  const [filters, setFilters] = useState({ event: "", city: "", date: "" });
  const [shifts, setShifts] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const fetchData = async () => {
    let query = new URLSearchParams();
    if (filters.event) query.append("eventId", filters.event);
    if (filters.city) query.append("city", filters.city);
    if (filters.date) query.append("date", filters.date);
    query.append("supplierId", "REPLACE_WITH_SUPPLIER_ID");
    const res = await fetch(`/api/shifts?${query.toString()}`);
    const data = await res.json();
    setShifts(data.shifts);
    setDrivers(data.drivers);
  };

  useEffect(() => { fetchData(); }, [filters]);

  const handleAssign = async (shiftId, driverId) => {
    await fetch(`/api/shifts/${shiftId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_Employee: driverId })
    });
    fetchData();
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
          <ShiftCard key={shift.id} shift={shift} drivers={drivers} onAssign={handleAssign} />
        ))}
      </div>
    </div>
  );
}
