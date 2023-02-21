import React from 'react';
import { ethers } from "ethers";
import { Sdk, NetworkNames } from 'etherspot';
import { useState } from 'react';
window.Buffer = window.Buffer || require("buffer").Buffer; 

const SCW = () => {
    const[addr,setAddr]=useState('');

    const[recipient,setRecipient]=useState('');
    const[amount,setAmount]=useState('');

    let sdk = Sdk

    sdk = new Sdk('0x14f11d5dce73d7b7edcc143b65e0a6caa9b6cc190efc61554178e4b44f1f0993', {
    networkName: 'matic'
    });

    const createScwallet = async () => {
        const output = await sdk.computeContractAccount();
        setAddr(output.address);
        console.log('contract account', output);
    }

    return ( 
        <div className='flex flex-col w-screen h-screen justify-center items-center' >
            <button onClick={()=>createScwallet()} className='bg-filler text-bgwhite p-2 rounded-md font-bold text-xl'>Deploy SCW</button>
            <p className='text-xl text-textcolor p-2 font-bold'>{(addr.toString()).slice(0,30)}...{(addr.toString()).slice(37)}</p>
            <p>{addr.toString()}</p>
        </div>
        );
}

export default SCW;