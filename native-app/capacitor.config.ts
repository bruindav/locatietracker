// Fix: legacy bridge aangezet voor de background-geolocation-plugin (branch fix-21)
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'nl.bruindav.locatietracker',
  appName: 'Locatietracker',
  webDir: 'www',
  android: {
    useLegacyBridge: true
  }
};

export default config;
