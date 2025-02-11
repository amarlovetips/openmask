import { NextApiRequest, NextApiResponse } from 'next';

let socialMedia = [
  { id: 1, name: 'Twitter', icon: '🐦', url: '#' },
  { id: 2, name: 'Discord', icon: '💬', url: '#' },
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return res.status(200).json(socialMedia);
    case 'POST':
      const newSocial = req.body;
      socialMedia.push({ id: socialMedia.length + 1, ...newSocial });
      return res.status(201).json(newSocial);
    case 'PUT':
      const updatedSocial = req.body;
      socialMedia = socialMedia.map((s) =>
        s.id === updatedSocial.id ? updatedSocial : s
      );
      return res.status(200).json(updatedSocial);
    case 'DELETE':
      const { id } = req.query;
      socialMedia = socialMedia.filter((s) => s.id !== parseInt(id));
      return res.status(204).end();
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
} 