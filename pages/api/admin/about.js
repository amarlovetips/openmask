import { NextApiRequest, NextApiResponse } from 'next';

let about = [
  { id: 1, name: 'About Us', icon: '👥', url: '#' },
  { id: 2, name: 'Contact', icon: '📞', url: '#' },
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return res.status(200).json(about);
    case 'POST':
      const newAbout = req.body;
      about.push({ id: about.length + 1, ...newAbout });
      return res.status(201).json(newAbout);
    case 'PUT':
      const updatedAbout = req.body;
      about = about.map((a) =>
        a.id === updatedAbout.id ? updatedAbout : a
      );
      return res.status(200).json(updatedAbout);
    case 'DELETE':
      const { id } = req.query;
      about = about.filter((a) => a.id !== parseInt(id));
      return res.status(204).end();
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
} 