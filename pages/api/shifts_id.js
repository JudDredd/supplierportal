export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "PATCH") {
    const { id_Employee } = req.body;
    const url = `${process.env.FM_HOST}/fmi/data/v1/databases/${encodeURIComponent(process.env.FM_DATABASE)}/layouts/ListShiftsTransfers/records/${id}`;
    const body = { fieldData: { id_Employee } };
    const fmRes = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(process.env.FM_USERNAME + ':' + process.env.FM_PASSWORD).toString('base64')}`
      },
      body: JSON.stringify(body)
    });
    const fmData = await fmRes.json();
    if (fmData.messages && fmData.messages[0].code === "0") {
      return res.status(200).json({ success: true });
    } else {
      return res.status(500).json({ success: false, error: fmData.messages });
    }
  } else {
    res.status(405).end();
  }
}
