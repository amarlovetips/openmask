import { statsService } from '../services/StatsService';
import { eventEmitter } from '../services/EventEmitter';

export default function CreateNFT() {
  const handleCreateNFT = async () => {
    // Your NFT creation logic...
    
    // After successful creation:
    statsService.addNewItem();
    eventEmitter.emit('nft:created', { /* NFT data */ });
  };

  // Rest of your component...
} 