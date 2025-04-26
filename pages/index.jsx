// File: pages/index.jsx
import React, { useState, useEffect } from "react";
import FilterBar from "../components/FilterBar";
import ShiftTable from "../components/ShiftTable";
import ShiftCard from "../components/ShiftCard";

export default function Home() {
  const [filters, setFilters] = useState({ event: "", city: "", date: "" });
  const [shifts, setShifts] = useState([]);
  const [drivers, setDrivers] = useState([]);

  const fetchData = async () => {
    // Build query params based on filters
    const params = new URLSearchParams();
    if (filters.event) params.append("eventId", filters.event);
    if (filters.city) params.append("city", filters.city);
    if (filters.date) params.append("date", filters.date);

    // Only append supplierId if replaced with a real ID
    const supplierId = process.env.NEXT_PUBLIC_SUPPLIER_ID;
    if (supplierId && supplierId !== "REPLACE_WITH_SUPPLIER_ID") {
      params.append("supplierId", supplierId);
    }

    const url = `/api/shifts?${params.toString()}`;
    console.log("[Home] fetchData URL:", url);
    try {
      const res = await fetch(url);
      console.log("[Home] fetchData status:", res.status);
      const data = await res.json();
      console.log("[Home] fetchData data:", data);
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
    console.log("[Home] handleAssign:", url, { id_Employee: driverId });
    try {
      const res = await fetch(url, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_Employee: driverId })
      });
      console.log("[Home] handleAssign status:", res.status);
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
