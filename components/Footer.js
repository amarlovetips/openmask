export default function Footer() {
  const resources = [
    { name: 'Documentation', icon: '📚', url: '#' },
    { name: 'FAQ', icon: '❓', url: '#' },
  ];

  const about = [
    { name: 'About Us', icon: '👥', url: '#' },
    { name: 'Contact', icon: '📞', url: '#' },
  ];

  const socialMedia = [
    { name: 'Twitter', icon: '🐦', url: '#' },
    { name: 'Discord', icon: '💬', url: '#' },
  ];

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Resources Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul>
              {resources.map((item, index) => (
                <li key={index} className="mb-2">
                  <a href={item.url} className="flex items-center hover:text-gray-400">
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">About</h3>
            <ul>
              {about.map((item, index) => (
                <li key={index} className="mb-2">
                  <a href={item.url} className="flex items-center hover:text-gray-400">
                    <span className="mr-2">{item.icon}</span>
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Column */}
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialMedia.map((item, index) => (
                <a key={index} href={item.url} className="hover:text-gray-400">
                  {item.icon} {item.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 