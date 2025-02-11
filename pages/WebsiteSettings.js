import { useState } from 'react';
import { useWebsite } from '../context/WebsiteContext';
import './WebsiteSettings.css';

function WebsiteSettings() {
  const { websiteSettings, updateLogo, updateSettings } = useWebsite();
  const [settings, setSettings] = useState({
    siteName: websiteSettings.siteName,
    description: websiteSettings.description,
    logo: null,
    mobileLogo: null,
    primaryColor: '#4CAF50',
    secondaryColor: '#45a049',
    contactEmail: '',
    socialLinks: {
      twitter: '',
      discord: '',
      telegram: ''
    }
  });
  const [previewUrl, setPreviewUrl] = useState(websiteSettings.logo);
  const [mobilePreviewUrl, setMobilePreviewUrl] = useState(websiteSettings.mobileLogo);

  const handleLogoChange = (e, isMobile = false) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('Logo file is too large. Please choose a file under 2MB.');
        return;
      }

      setSettings(prev => ({
        ...prev,
        [isMobile ? 'mobileLogo' : 'logo']: file
      }));

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        if (isMobile) {
          setMobilePreviewUrl(base64String);
          updateLogo(base64String, true);
        } else {
          setPreviewUrl(base64String);
          updateLogo(base64String, false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Update all settings at once
    updateSettings({
      siteName: settings.siteName,
      description: settings.description,
      // Other settings...
    });
    // Show success message
    alert('Settings saved successfully!');
  };

  return (
    <div className="website-settings">
      <h1>Website Settings</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="settings-section">
          <h2>General Settings</h2>
          
          <div className="form-group">
            <label>Site Name</label>
            <input
              type="text"
              name="siteName"
              value={settings.siteName}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Site Description</label>
            <textarea
              name="description"
              value={settings.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={settings.contactEmail}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="settings-section">
          <h2>Logo Settings</h2>
          
          <div className="logo-section">
            <h3>Desktop Logo</h3>
            <div className="logo-preview">
              {previewUrl && <img src={previewUrl} alt="Desktop logo preview" />}
            </div>
            <div className="form-group">
              <label>Upload Desktop Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange(e, false)}
                className="file-input"
              />
            </div>
          </div>

          <div className="logo-section">
            <h3>Mobile Logo</h3>
            <div className="logo-preview mobile">
              {mobilePreviewUrl && <img src={mobilePreviewUrl} alt="Mobile logo preview" />}
            </div>
            <div className="form-group">
              <label>Upload Mobile Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleLogoChange(e, true)}
                className="file-input"
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Theme Settings</h2>
          
          <div className="form-group">
            <label>Primary Color</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                name="primaryColor"
                value={settings.primaryColor}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="primaryColor"
                value={settings.primaryColor}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Secondary Color</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                name="secondaryColor"
                value={settings.secondaryColor}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="secondaryColor"
                value={settings.secondaryColor}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="settings-section">
          <h2>Social Media Links</h2>
          
          <div className="form-group">
            <label>Twitter URL</label>
            <input
              type="url"
              name="twitter"
              value={settings.socialLinks.twitter}
              onChange={handleSocialChange}
              placeholder="https://twitter.com/..."
            />
          </div>

          <div className="form-group">
            <label>Discord URL</label>
            <input
              type="url"
              name="discord"
              value={settings.socialLinks.discord}
              onChange={handleSocialChange}
              placeholder="https://discord.gg/..."
            />
          </div>

          <div className="form-group">
            <label>Telegram URL</label>
            <input
              type="url"
              name="telegram"
              value={settings.socialLinks.telegram}
              onChange={handleSocialChange}
              placeholder="https://t.me/..."
            />
          </div>
        </div>

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default WebsiteSettings; 