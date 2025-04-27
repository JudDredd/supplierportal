// pages/api/sessions.js
export default async function handler(req, res) {
  const url = `${process.env.FM_HOST}/fmi/data/v1/databases/${encodeURIComponent(process.env.FM_DATABASE)}/sessions`;
  const auth = Buffer.from(`${process.env.FM_USERNAME}:${process.env.FM_PASSWORD}`).toString('base64');
  const r = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
    }
  });
  const json = await r.json();
  if (r.ok) res.status(200).json({ token: json.response.token });
  else       res.status(500).json({ error: json.messages });
}
