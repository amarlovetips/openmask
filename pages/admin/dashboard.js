import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [resources, setResources] = useState([]);
  const [about, setAbout] = useState([]);
  const [socialMedia, setSocialMedia] = useState([]);

  useEffect(() => {
    fetch('/api/admin/resources')
      .then((res) => res.json())
      .then((data) => setResources(data));

    fetch('/api/admin/about')
      .then((res) => res.json())
      .then((data) => setAbout(data));

    fetch('/api/admin/social')
      .then((res) => res.json())
      .then((data) => setSocialMedia(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Resources Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Resources</h2>
          <ul>
            {resources.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name}
              </li>
            ))}
          </ul>
          <Link href="/admin/resources" className="text-blue-500 hover:underline">
            Manage Resources
          </Link>
        </div>

        {/* About Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <ul>
            {about.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name}
              </li>
            ))}
          </ul>
          <Link href="/admin/about" className="text-blue-500 hover:underline">
            Manage About
          </Link>
        </div>

        {/* Social Media Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Social Media</h2>
          <ul>
            {socialMedia.map((item) => (
              <li key={item.id} className="mb-2">
                {item.name}
              </li>
            ))}
          </ul>
          <Link href="/admin/social" className="text-blue-500 hover:underline">
            Manage Social Media
          </Link>
        </div>
      </div>
    </div>
  );
} 