// File: pages/api/shifts.js
export default async function handler(req, res) {
  const { supplierId, eventId, city, date } = req.query;
  const url = `${process.env.FM_HOST}/fmi/data/v1/databases/${encodeURIComponent(process.env.FM_DATABASE)}/layouts/ListShiftsTransfers/records`;
  const queryObj = {};
  if (supplierId) queryObj.supplierId = supplierId;
  if (eventId)    queryObj.eventId = eventId;
  if (city)       queryObj.city = city;
  if (date)       queryObj.date = date;
  const body = { query: [queryObj] };

  const fmRes = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(process.env.FM_USERNAME + ':' + process.env.FM_PASSWORD).toString('base64')}`
    },
    body: JSON.stringify(body)
  });
  const fmData = await fmRes.json();
  const shifts = fmData.response.data.map(rec => ({ id: rec.recordId, ...rec.fieldData }));

  // Fetch drivers similarly, if needed:
  const drvUrl = `${process.env.FM_HOST}/fmi/data/v1/databases/${encodeURIComponent(process.env.FM_DATABASE)}/layouts/DriverList/records`;
  const drvRes = await fetch(drvUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Basic ${Buffer.from(process.env.FM_USERNAME + ':' + process.env.FM_PASSWORD).toString('base64')}`
    },
    body: JSON.stringify({ query: [{ supplierId }] })
  });
  const drvData = await drvRes.json();
  const drivers = drvData.response.data.map(rec => ({ id: rec.recordId, ...rec.fieldData }));

  res.status(200).json({ shifts, drivers });
}
