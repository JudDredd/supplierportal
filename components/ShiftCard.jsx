import React from "react";

export default function ShiftCard({ shift, drivers, onAssign }) {
  return (
    <div className={`p-4 border rounded mb-4 ${shift.id_Employee ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold">{new Date(shift.Date).toLocaleDateString()}</div>
          <div>{shift.City}</div>
        </div>
        <div>
          <select
            className="p-2 border rounded"
            value={shift.id_Employee || ""}
            onChange={(e) => onAssign(shift.id, e.target.value)}
          >
            <option value="">–Select Driver–</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.c_FullName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-2">
        <div className="italic">{shift.Job_Summary}</div>
        <div className="text-sm">Role: {shift.c_VehRole}</div>
        <div className="text-sm">Status: {shift.ShiftStatus}</div>
      </div>
    </div>
  );
}
