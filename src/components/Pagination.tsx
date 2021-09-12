import { useWeb3React } from "@web3-react/core";
import { BigNumber, ethers } from "ethers";
import React, { useEffect, useState } from "react";

import MyAwesomeLogoArtifacts from "../artifacts/contracts/MyAwesomeLogo.sol/MyAwesomeLogo.json";
import logger from "../logger";
import { MyAwesomeLogo } from "../types/MyAwesomeLogo";

export const CONTRACT_DEPLOYED_ADDRESS = import.meta.env.VITE_NFT_DEPLOYED_ADDRESS;

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

export function Pagination({ onChange }: { onChange: (tokenId: string) => void }) {
  const { library } = useWeb3React();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTotal = () => {
      logger.warn("fetchTotal");
      const provider = library || new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_DEPLOYED_ADDRESS,
        MyAwesomeLogoArtifacts.abi,
        provider
      ) as MyAwesomeLogo;
      contract
        .currentCounter()
        .then((result) => setTotal(BigNumber.from(result).toNumber()))
        .catch(logger.error);
    };
    try {
      fetchTotal();
    } catch (error) {
      logger.error(error);
    }
  }, [library]);

  return (
    <div className="flex justify-center w-full py-4 space-x-2">
      {Array.from(Array(total).keys()).map((i) => (
        <button key={i} onClick={() => onChange(i.toString())} className="btn btn-s btn-circle">
          {i + 1}
        </button>
      ))}
    </div>
  );
}
