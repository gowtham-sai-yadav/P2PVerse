'use client';

import Image from 'next/image';
import React, { useState } from 'react';

import WalletQr from "../../Public/Images/wallet-qr-image.jpeg"
import styles from "../../style/custom.module.scss"

const Donate = () => {
  const walletAddress = "0x9dE9AF731425aD9Ec4EE0bF65D9523bfEed96d26";
  const [isCopied, setisCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    setisCopied(true)
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-6">Donate to Support Us</h1>
        <div >
          <div className="flex items-center justify-center mb-4">
          <Image
             src = {WalletQr}
             height={300}
             width={400}
             />
             </div>
        
        <div className="text-center">
          <p className="mb-2 font-semibold">Wallet Address:</p>
          <div className={styles.walletAddress}>
            <code className="bg-black-100 p-2 rounded">{walletAddress}</code>
            <button 
              onClick={copyToClipboard}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {isCopied ? "Copied" : "Copy" } 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate; 