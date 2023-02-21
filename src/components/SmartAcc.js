import React from "react";
import { ethers } from "ethers";
import { IPaymaster, ChainId } from "@biconomy/core-types";
import SmartAccount from "@biconomy/smart-account";
import Provider from "@wagmi/core";
import { useAccount, useProvider } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { BalancesDto } from "@biconomy/node-client";

const SmartAcc = () => {
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
          dappAPIKey: "<DAPP_API_KEY>",
          providerUrl: "<YOUR_PROVIDER_URL>",
        },
        {
          chainId: ChainId.POLYGON_MAINNET,
          dappAPIKey: "<DAPP_API_KEY>",
          providerUrl: "<YOUR_PROVIDER_URL>",
        },
      ],
    };

    // this provider is from the social login which we created in last setup
    const acc = async () => {
      let smartAccount = new SmartAccount(provider, options);
      smartAccount = await smartAccount.init();
      const address1 = await smartAccount.getAddress();
      console.log("Smart Account", smartAccount);
      console.log("Smart Account Address", address1);

      const balanceParams = {
        chainId: ChainId.POLYGON_MUMBAI,
        eoaAddress: smartAccount.address,
        tokenAddresses: [],
      };
      const balFromSdk = await smartAccount.getAlltokenBalances(balanceParams);
      console.info("getAlltokenBalances", balFromSdk);
      const usdBalFromSdk = await smartAccount.getTotalBalanceInUsd(
        balanceParams
      );
      console.info("getTotalBalanceInUsd", usdBalFromSdk);

      const tx = await smartAccount.deployWalletUsingPaymaster();
    };

    return (
      <div>
        <ConnectButton />
        <button onClick={acc}>Create Smart Account</button>
      </div>
    );
};

export default SmartAcc;
