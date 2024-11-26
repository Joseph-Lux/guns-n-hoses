import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust '*' to your specific domain if needed
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS'); // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers

    
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch the URL' });
  }
}
