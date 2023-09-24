import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";

import type { AppProps } from "next/app";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { Provider } from "react-redux";

import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, sepolia, Chain } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { store } from "@/data/store";

const ganache = {
  id: 1337,
  name: "Ganache",
  network: "ganache",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["HTTP://127.0.0.1:7545"] },
    default: { http: ["HTTP://127.0.0.1:7545"] },
  },
} as const satisfies Chain;

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ganache, sepolia, mainnet],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Social Media",
  projectId: "12345678",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}
