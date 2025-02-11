import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import './AdminSettings.css';

function AdminSettings() {
  const [logo, setLogo] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const { account } = useWallet();

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here you would typically upload the logo to your backend
    console.log('Logo uploaded:', logo);
  };

  if (!account || account.toLowerCase() !== process.env.REACT_APP_ADMIN_ADDRESS?.toLowerCase()) {
    return <div className="admin-settings">Access Denied</div>;
  }

  return (
    <div className="admin-settings">
      <h1>Website Settings</h1>
      
      <div className="settings-section">
        <h2>Logo Settings</h2>
        <form onSubmit={handleSubmit} className="logo-form">
          <div className="logo-preview">
            {previewUrl && <img src={previewUrl} alt="Logo preview" />}
          </div>
          
          <div className="form-group">
            <label>Upload Logo</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleLogoChange}
              className="file-input"
            />
          </div>
          
          <button type="submit" className="save-btn">
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSettings; 