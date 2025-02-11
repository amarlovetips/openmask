const fs = require('fs');
const path = require('path');

// Base64 encoded simple PNG logo
const base64Logo = `iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABZklEQVR4nO2XvU7DMBSFPyhtgZKyMPAGDAwM8BD8PAADYmRm4gF4JB6AsUJiYmJiQAxITIiJASEhBsTvwIJEhVo7tVwnaeGTrCiOfO/xuXZsG/7xN1gCjoEH4B14A66BPWCmwPxzwBFwD3wAX8AzcArMFhEeBXaAZ+DbIX4LbAMjeeZfBO6Ab0f8E7gEVoEhYByYB9aAC+AjIX4DrOQVPwbOHeJvQA2YTIkbBjaAZiL+DFjOIj4JXDnEn4DVDPE+sA40EvFXwGKa+DBw4hB/AjYzigfYBN4T8Q/Auk98Ajh0iD8C2znEATaAViL+Dqx2i/eBI4f4A7CTUxxgG/hMxF+AhbT4oUP8DtjLKQ6wB3wl4s/AXPcX7wNHwABYyikOsAV8J+KPwHR3/MAhXgcOgPEC4gD7QDsRfwCmusUvHeKPwHFBcYBDoJ2IPwCTafFr4KageB04KyEOcAK0EvFr/pH/Dn8A7nwqUMDvJkoAAAAASUVORK5CYII=`;

const logoPath = path.join(__dirname, '../public/assets/images/default-logo.png');
const logoBuffer = Buffer.from(base64Logo, 'base64');

fs.writeFileSync(logoPath, logoBuffer);
console.log('Default logo created at:', logoPath); 