// File: pages/api/shifts.js

export default async function handler(req, res) {
  if (!process.env.FM_HOST || !process.env.FM_DATABASE) {
    console.error('Missing FM_HOST or FM_DATABASE in env');
    return res.status(500).json({ error: 'Server misconfiguration: missing FM_HOST or FM_DATABASE.' });
  }
  const { supplierId, eventId, city, date } = req.query;
  const url = `${process.env.FM_HOST}/fmi/data/v1/databases/${encodeURIComponent(process.env.FM_DATABASE)}/layouts/ListShiftsTransfers/records`;
  console.log('[API] shifts URL:', url, 'query:', { supplierId, eventId, city, date });
  const queryObj = {};
  if (supplierId && supplierId !== "REPLACE_WITH_SUPPLIER_ID") {
    queryObj.supplierId = supplierId;
  }  
  if (eventId)    queryObj.eventId = eventId;
  if (city)       queryObj.city = city;
  if (date)       queryObj.date = date;
  const body = { query: [queryObj] };

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
    const shifts = Array.isArray(fmData.response?.data) ? fmData.response.data.map(rec => ({ id: rec.recordId, ...rec.fieldData })) : [];

    // Fetch drivers
    const drvUrl = `${process.env.FM_HOST}/fmi/data/v1/databases/${encodeURIComponent(process.env.FM_DATABASE)}/layouts/DriverList/records`;
    console.log('[API] drivers URL:', drvUrl);
    const drvRes = await fetch(drvUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${Buffer.from(process.env.FM_USERNAME + ':' + process.env.FM_PASSWORD).toString('base64')}`
      },
      body: JSON.stringify({ query: [{ supplierId }] })
    });
    const drvData = await drvRes.json();
    console.log('[API] drivers response data:', drvData);
    const drivers = Array.isArray(drvData.response?.data) ? drvData.response.data.map(rec => ({ id: rec.recordId, ...rec.fieldData })) : [];

    res.status(200).json({ shifts, drivers });
  } catch (err) {
    console.error('[API] handler error:', err);
    res.status(500).json({ error: 'Failed to fetch from FileMaker.' });
  }
}

