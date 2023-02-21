import React from "react";
import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css";
import { ChainId } from "@biconomy/core-types";
import { ethers } from "ethers";

const SocialLoginPage = () => {

  let options = {
    activeNetworkId: ChainId.GOERLI,
    supportedNetworksIds: [
      ChainId.GOERLI,
      ChainId.POLYGON_MAINNET,
      ChainId.POLYGON_MUMBAI,
    ],
    networkConfig: [
      {
        chainId: ChainId.POLYGON_MUMBAI,
        dappAPIKey: "59fRCMXvk.8a1652f0-b522-4ea7-b296-98628499aee3",
        providerUrl: "<YOUR_PROVIDER_URL>",
      },
      {
        chainId: ChainId.POLYGON_MAINNET,
        dappAPIKey: "<DAPP_API_KEY>",
        providerUrl: "<YOUR_PROVIDER_URL>",
      },
    ],
  };

 
  const login = async () => {
    
    const socialLogin = new SocialLogin();
    await socialLogin.init();
    socialLogin.showWallet();

    if (!socialLogin?.provider) return;
    const provider = new ethers.providers.Web3Provider(socialLogin.provider);
    const accounts = await provider.listAccounts();
    console.log("EOA address", accounts);

  };

  return (
    <div>
      <button onClick={() => login()}>Login</button>
    </div>
  );
};

export default SocialLoginPage;
