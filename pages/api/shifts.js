import fetch from "node-fetch";

export default async function handler(req, res) {
  const { supplierId, eventId, city, date } = req.query;
  const url = `${process.env.FILEMAKER_API_URL}/layouts/ListShiftsTransfers/records`;
  const queryObj = {};
  if (supplierId) queryObj.supplierId = supplierId;
  if (eventId) queryObj.eventId = eventId;
  if (city) queryObj.city = city;
  if (date) queryObj.date = date;
  const body = { query: [queryObj] };
  const fmRes = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.FILEMAKER_API_TOKEN}` },
    body: JSON.stringify(body)
  });
  const fmData = await fmRes.json();
  const shifts = fmData.response.data.map((rec) => ({ id: rec.recordId, ...rec.fieldData }));
  const drvUrl = `${process.env.FILEMAKER_API_URL}/layouts/DriverList/records`;
  const drvBody = { query: [{ supplierId }] };
  const drvRes = await fetch(drvUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${process.env.FILEMAKER_API_TOKEN}` },
    body: JSON.stringify(drvBody)
  });
  const drvData = await drvRes.json();
  const drivers = drvData.response.data.map((rec) => ({ id: rec.recordId, ...rec.fieldData }));
  res.status(200).json({ shifts, drivers });
}
