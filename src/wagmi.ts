import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  flowMainnet,
  flowTestnet
} from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    flowMainnet, 
    flowTestnet
  ],
  ssr: true,
});