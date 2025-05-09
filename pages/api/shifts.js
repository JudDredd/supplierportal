// File: pages/api/shifts.js
export default async function handler(req, res) {
  if (!process.env.FM_HOST || !process.env.FM_DATABASE || !process.env.FM_DATA_API_TOKEN) {
    console.error('Missing FM_HOST, FM_DATABASE, or FM_DATA_API_TOKEN env var');
    return res.status(500).json({ error: 'Server misconfiguration: required env vars missing.' });
  }

  const { eventId, city, date } = req.query;
  const baseUrl = `${process.env.FM_HOST}/fmi/data/v1/databases/${encodeURIComponent(process.env.FM_DATABASE)}`;

  // Build shift _find endpoint
  const shiftFindUrl = `${baseUrl}/layouts/ListShiftsTransfers/_find`;
  console.log('[API] shifts _find URL:', shiftFindUrl, 'query:', { eventId, city, date });

  // Prepare FileMaker query object
  const findQuery = {};
  if (city)    findQuery.City = city;
  if (eventId) findQuery.g_SearchEventNameDriverCal = eventId;
  if (date)    findQuery.Date = date;

  try {
    // Fetch shifts with timeout
    const shiftController = new AbortController();
    const shiftTimeout = setTimeout(() => shiftController.abort(), 10000);
    const shiftsRes = await fetch(shiftFindUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FM_DATA_API_TOKEN}`
      },
      body: JSON.stringify({ query: [findQuery] }),
      signal: shiftController.signal
    });
    clearTimeout(shiftTimeout);
    const shiftsData = await shiftsRes.json();
    console.log('[API] shifts response:', shiftsData);
    const shifts = Array.isArray(shiftsData.response?.data)
      ? shiftsData.response.data.map(rec => ({ id: rec.recordId, ...rec.fieldData }))
      : [];

    // Fetch drivers with timeout (no filter)
    const driverFindUrl = `${baseUrl}/layouts/DriverList/_find`;
    console.log('[API] drivers _find URL:', driverFindUrl);
    const drvController = new AbortController();
    const drvTimeout = setTimeout(() => drvController.abort(), 10000);
    const driversRes = await fetch(driverFindUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.FM_DATA_API_TOKEN}`
      },
      body: JSON.stringify({ query: [{}] }),
      signal: drvController.signal
    });
    clearTimeout(drvTimeout);
    const driversData = await driversRes.json();
    console.log('[API] drivers response:', driversData);
    const drivers = Array.isArray(driversData.response?.data)
      ? driversData.response.data.map(rec => ({ id: rec.recordId, ...rec.fieldData }))
      : [];

    // Return combined
    return res.status(200).json({ shifts, drivers });
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('[API] handler timeout:', err);
      return res.status(504).json({ error: 'Request to FileMaker timed out' });
    }
    console.error('[API] handler error:', err);
    return res.status(500).json({ error: 'Failed to fetch or parse FileMaker data.' });
  }
}
