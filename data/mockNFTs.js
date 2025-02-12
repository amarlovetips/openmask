import { config } from '../utils/config';

export const mockNFTs = [
  {
    id: 1,
    title: "Digital Art #1",
    creator: "Artist1",
    price: "0.5 ETH",
    image: `${config.websiteUrl}/images/nft1.jpg`
  },
  {
    id: 2,
    title: "Collectible #2",
    creator: "Artist2",
    price: "0.8 ETH",
    image: `${config.websiteUrl}/images/nft2.jpg`
  }
];

export default mockNFTs; 