// File: pages/api/shifts.js
export default async function handler(req, res) {
  if (!process.env.FM_HOST || !process.env.FM_DATABASE) {
    console.error('Missing FM_HOST or FM_DATABASE');
    return res.status(500).json({ error: 'Server misconfiguration.' });
  }
  const { eventId, city, date } = req.query;
  // Use FileMaker Data API _find endpoint
  const url = `${process.env.FM_HOST}/fmi/data/v1/databases/${encodeURIComponent(process.env.FM_DATABASE)}/layouts/ListShiftsTransfers/_find`;
  console.log('[API] shifts URL:', url, 'query:', { eventId, city, date });
  const queryReq = {};
  if (city) queryReq.city = city;
  if (eventId) queryReq.eventId = eventId;
  if (date) queryReq.date = date;
  const body = { query: [queryReq] };
  try {
    const fmRes = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.FM_USERNAME + ':' + process.env.FM_PASSWORD).toString('base64')}`
      },
      body: JSON.stringify(body)
    });
    const fmData = await fmRes.json();
    console.log('[API] shifts response data:', fmData);
    const shifts = Array.isArray(fmData.response?.data)
      ? fmData.response.data.map(rec => ({ id: rec.recordId, ...rec.fieldData }))
      : [];

    const drvUrl = `${process.env.FM_HOST}/fmi/data/v1/databases/${encodeURIComponent(process.env.FM_DATABASE)}/layouts/DriverList/_find`;
    console.log('[API] drivers URL:', drvUrl);
    const drvRes = await fetch(drvUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.FM_USERNAME + ':' + process.env.FM_PASSWORD).toString('base64')}`
      },
      body: JSON.stringify({ query: [{}] })
    });
    const drvData = await drvRes.json();
    console.log('[API] drivers response data:', drvData);
    const drivers = Array.isArray(drvData.response?.data)
      ? drvData.response.data.map(rec => ({ id: rec.recordId, ...rec.fieldData }))
      : [];

    res.status(200).json({ shifts, drivers });
  } catch (err) {
    console.error('[API] handler error:', err);
    res.status(500).json({ error: 'Failed to fetch from FileMaker.' });
  }
}
