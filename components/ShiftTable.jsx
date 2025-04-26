import React from "react";

export default function ShiftTable({ shifts, drivers, onAssign }) {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Job</th>
            <th className="px-4 py-2">Role</th>
            <th className="px-4 py-2">Driver</th>
            <th className="px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id} className={`${shift.id_Employee ? 'bg-green-50' : ''}`}>
              <td className="border px-4 py-2">{new Date(shift.Date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{shift.City}</td>
              <td className="border px-4 py-2">{shift.Job_Summary}</td>
              <td className="border px-4 py-2">{shift.c_VehRole}</td>
              <td className="border px-4 py-2">
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
              </td>
              <td className="border px-4 py-2">{shift.ShiftStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
