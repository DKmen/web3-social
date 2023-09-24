"use client";

import Header from "@/components/header";
import PostList from "@/components/post";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useConnect, useContractWrite } from "wagmi";

import Contract from "../../contract/Media.json";
import { CONTRACT_ADDRESS } from "@/constants/value";

export default function Home() {
  const createAccount = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: Contract.abi,
    functionName: "createAccount",
  });

  const { connector: activeConnector, isConnected } = useAccount({
    onConnect: ({ address, connector, isReconnected }) => {
      if (!isReconnected) createAccount.write();
    },
  });

  return (
    <>
      {isConnected ? (
        <>
          <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <Header />
            <PostList />
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-row items-center justify-center w-full min-h-screen">
            <ConnectButton />
          </div>
        </>
      )}
    </>
  );
}
