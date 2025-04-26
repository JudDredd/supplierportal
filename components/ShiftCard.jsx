// File: components/ShiftCard.jsx
import React from "react";
import Phone from 'lucide-react/dist/esm/icons/phone.js';
import MessageCircle from 'lucide-react/dist/esm/icons/message-circle.js';

export default function ShiftCard({ shift, drivers, onAssign }) {
  return (
    <div className={`p-4 border rounded mb-4 ${shift.id_Employee ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold">{new Date(shift.Date).toLocaleDateString()}</div>
          <div>{shift.ArtistClientEvent}</div>
          <div className="text-sm italic">{shift.Job_Summary}</div>
          <div className="text-sm">Role: {shift.c_VehRole}</div>
          <div className="text-sm">PO: {shift.PONumber}</div>
        </div>
        <div>
          <select
            className="p-2 border rounded mb-2"
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
          {shift.id_Employee && (
            <div className="flex items-center gap-2 mt-2">
              <a href={`tel:${shift.Phone}`}><Phone size={16} /></a>
              <a href={`https://wa.me/${shift.Phone.replace(/\D/g, "")}`}><MessageCircle size={16} /></a>
              <span>{shift.c_FullName}</span>
            </div>
          )}
        </div>
      </div>
      <div className="mt-2">
        <div className="text-sm">Contact: {shift.Fullname}</div>
        <div className="text-sm">City: {shift.City}</div>
      </div>
    </div>
  );
}
