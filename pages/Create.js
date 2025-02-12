import styles from '../styles/components/Create.module.css';

function Create() {
  return (
    <div className="create-page">
      <h1>Create New NFT</h1>
      <form className="create-form">
        <div className="form-group">
          <label>Title</label>
          <input type="text" placeholder="Enter NFT title" />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea placeholder="Enter NFT description"></textarea>
        </div>
        <div className="form-group">
          <label>Price (ETH)</label>
          <input type="number" step="0.01" placeholder="Enter price in ETH" />
        </div>
        <div className="form-group">
          <label>Upload File</label>
          <input type="file" accept="image/*" />
        </div>
        <button type="submit" className="create-btn">Create NFT</button>
      </form>
    </div>
  );
}

export default Create; 