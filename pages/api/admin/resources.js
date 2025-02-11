import { NextApiRequest, NextApiResponse } from 'next';

let resources = [
  { id: 1, name: 'Documentation', icon: '📚', url: '#' },
  { id: 2, name: 'FAQ', icon: '❓', url: '#' },
];

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return res.status(200).json(resources);
    case 'POST':
      const newResource = req.body;
      resources.push({ id: resources.length + 1, ...newResource });
      return res.status(201).json(newResource);
    case 'PUT':
      const updatedResource = req.body;
      resources = resources.map((r) =>
        r.id === updatedResource.id ? updatedResource : r
      );
      return res.status(200).json(updatedResource);
    case 'DELETE':
      const { id } = req.query;
      resources = resources.filter((r) => r.id !== parseInt(id));
      return res.status(204).end();
    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
} 