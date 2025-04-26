// File: components/ShiftTable.jsx
import React from "react";
import { Phone, MessageCircle } from "lucide-react/dist/esm/lucide-react.js";

export default function ShiftTable({ shifts, drivers, onAssign }) {
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Event</th>
            <th className="px-4 py-2">City</th>
            <th className="px-4 py-2">Job Summary</th>
            <th className="px-4 py-2">Point of Contact</th>
            <th className="px-4 py-2">Vehicle/Role</th>
            <th className="px-4 py-2">Contractor</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Contact</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">PO Number</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id} className={`${shift.id_Employee ? 'bg-green-50' : ''}`}>
              <td className="border px-4 py-2">{new Date(shift.Date).toLocaleDateString()}</td>
              <td className="border px-4 py-2">{shift.ArtistClientEvent}</td>
              <td className="border px-4 py-2">{shift.City}</td>
              <td className="border px-4 py-2">{shift.Job_Summary}</td>
              <td className="border px-4 py-2">{shift.Fullname}</td>
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
              <td className="border px-4 py-2">
                {shift.id_Employee && (
                  <div className="flex items-center gap-2">
                    <a href={`tel:${shift.Phone}`}><Phone size={16} /></a>
                    <a href={`https://wa.me/${shift.Phone.replace(/\D/g, "")}`}><MessageCircle size={16} /></a>
                    <span>{shift.c_FullName}</span>
                  </div>
                )}
              </td>
              <td className="border px-4 py-2">{shift.Phone}</td>
              <td className="border px-4 py-2">{shift.PONumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
