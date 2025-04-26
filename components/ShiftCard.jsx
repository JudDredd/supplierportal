// File: components/ShiftCard.jsx
import React from "react";
import { Phone, MessageCircle } from "lucide-react";

export default function ShiftCard({ shift, drivers, onAssign }) {
  return (
    <div className={`p-4 border rounded mb-4 ${shift.id_Employee ? 'bg-green-50' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="font-bold text-lg">{new Date(shift.Date).toLocaleDateString()}</div>
          <div className="text-sm text-gray-600">{shift.ArtistClientEvent} — {shift.City}</div>
          <div className="mt-2 italic">{shift.Job_Summary}</div>
          <div className="mt-1 text-sm">Role: {shift.c_VehRole}</div>
          <div className="mt-1 text-sm">Point of Contact: {shift.Fullname}</div>
          <div className="mt-1 text-sm">PO Number: {shift.PONumber}</div>
        </div>
        <div className="ml-4 flex-shrink-0">
          <select
            className="p-2 border rounded mb-2 w-full"
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
              <a href={`tel:${shift.Phone}`}><Phone size={20} /></a>
              <a href={`https://wa.me/${shift.Phone.replace(/\D/g, "")}`}><MessageCircle size={20} /></a>
              <span className="text-sm font-medium">{shift.c_FullName}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
