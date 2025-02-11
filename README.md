# NFT Marketplace Admin Panel

A secure and feature-rich admin panel for managing an NFT marketplace.

## Features

- Secure admin authentication
- Real-time statistics dashboard
- NFT management
- User management
- Website settings
- Menu configuration

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment files:
```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your values.

5. Run the development server:
```bash
npm run dev
# or
yarn dev
```

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# Public environment variables
NEXT_PUBLIC_INFURA_ID=your_infura_id
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_NETWORK_NAME=Sepolia
NEXT_PUBLIC_WS_ENDPOINT=wss://your-websocket-endpoint.com

# Admin Authentication
ADMIN_USERNAME=your_admin_username
ADMIN_PASSWORD=your_admin_password
JWT_SECRET=your_jwt_secret
```

## Security

- Never commit `.env.local` or any other files containing sensitive information
- Keep your admin credentials secure
- Regularly update your JWT_SECRET
- Use strong passwords

## License

MIT
