import { useState } from 'react';
import { useWebsite } from '../../context/WebsiteContext';
import AdminLayout from '../../components/AdminLayout';

export default function WebsiteSettings() {
  const { websiteSettings, updateSettings } = useWebsite();
  const [settings, setSettings] = useState(websiteSettings);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(settings);
    alert('Settings updated successfully!');
  };

  return (
    <AdminLayout>
      <div className="admin-content-wrapper">
        <h1 className="page-title">Website Settings</h1>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>Website Title</label>
            <input
              type="text"
              value={settings.title}
              onChange={(e) => setSettings({...settings, title: e.target.value})}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              value={settings.description}
              onChange={(e) => setSettings({...settings, description: e.target.value})}
              className="form-input"
              rows={4}
            />
          </div>
          <div className="form-group">
            <label>Theme</label>
            <select
              value={settings.theme}
              onChange={(e) => setSettings({...settings, theme: e.target.value})}
              className="form-input"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Save Changes
          </button>
        </form>
      </div>
    </AdminLayout>
  );
} 