import React from "react";
import SocialLogin from "@biconomy/web3-auth";
import "@biconomy/web3-auth/dist/src/style.css";
import { ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import { ethers } from "ethers";
import { useAccount, useProvider } from "wagmi";

const SocialLoginPage = () => {


  const { address } = useAccount();
  const provider = useProvider();

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

  const tx = {
    to:"0x7E9BC94e21BEb85DaFAF2Afd5530DE876951124D",
    from : "0x538F207794289005d51234f336FdB387f3b18ded",
    value: ethers.utils.parseEther("0.02"),
    data:"0xd0e30db0"
  }

 
  const login = async () => {
    
    const socialLogin = new SocialLogin();
    await socialLogin.init();
    socialLogin.showWallet();

    if (!socialLogin?.provider) return;
    const provider = new ethers.providers.Web3Provider(socialLogin.provider);
    const accounts = await provider.listAccounts();
    console.log("EOA address", accounts);

    let smartAccount = new SmartAccount(provider, options);
      smartAccount = await smartAccount.init();
      const address1 = smartAccount.address;
      console.log("Smart Account", smartAccount);
      console.log("Smart Account Address", address1);

      const txResponse = await smartAccount.deployWalletUsingPaymaster();
      console.log(txResponse);
      const txResponse2 = await smartAccount.sendGaslessTransaction({ transaction: tx });
      console.log(txResponse2);
  };

  return (
    <div>
      <button onClick={() => login()}>Login</button>
    </div>
  );
};

export default SocialLoginPage;
