import { useWeb3React, Web3ReactProvider } from "@web3-react/core";
import { BigNumber, ethers, getDefaultProvider } from "ethers";
import React, { useEffect, useState } from "react";
import { NftProvider } from "use-nft";

import MyAwesomeLogoArtifacts from "./artifacts/contracts/MyAwesomeLogo.sol/MyAwesomeLogo.json";
import Demo from "./components/Demo";
import { getLibrary } from "./components/Demo";
import { Nft } from "./components/Nft";
import { Pagination } from "./components/Pagination";
import logger from "./logger";
import { networkName, CHAIN_ID } from "./networkName";
import { MyAwesomeLogo } from "./types/MyAwesomeLogo";

export const CONTRACT_DEPLOYED_ADDRESS = import.meta.env.VITE_NFT_DEPLOYED_ADDRESS;

declare global {
  interface Window {
    ethereum: ethers.providers.ExternalProvider;
  }
}

function NFTApp() {
  const { library } = useWeb3React();
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 12;

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
    <div>
      <h2 className="my-4 text-4xl font-bold">NFT Items</h2>
      <div className="container grid gap-2 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {Array.from(Array(limit).keys())
          .filter((i) => i + 1 + (page - 1) * limit < total)
          .map((i) => (
            <Nft tokenId={String(i + 1 + (page - 1) * limit)} />
          ))}
      </div>
      <Pagination currentPage={page} totalPage={Math.ceil(total / limit)} onChange={setPage} />
    </div>
  );
}

const ethersConfig = {
  provider: getDefaultProvider(networkName[Number(CHAIN_ID)] || "homestead"),
};

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <NftProvider fetcher={["ethers", ethersConfig]}>
        <div className="container mx-auto">
          <Demo />
          <NFTApp />
          <footer className="p-10 footer bg-base-200 text-base-content">
            <div>
              <p>
                ProductsWay
                <br />
                Built with love from{" "}
                <a className="link" href="https://github.com/jellydn">
                  jellydn
                </a>
              </p>
            </div>
            <div>
              <span className="footer-title">Document</span>
              <a
                href="https://vitejs.dev/guide/features.html"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover"
              >
                Vite Docs
              </a>
              <a href="https://hardhat.org/" target="_blank" rel="noopener noreferrer" className="link link-hover">
                Hardhat
              </a>
              <a href="https://daisyui.com/" target="_blank" rel="noopener noreferrer" className="link link-hover">
                daisyUI
              </a>
              <a
                href="https://github.com/NoahZinsmeister/web3-react"
                target="_blank"
                rel="noopener noreferrer"
                className="link link-hover"
              >
                Web3 React
              </a>
            </div>
            <div>
              <span className="footer-title">1-click Deployment</span>
              <a
                className="pl-2"
                href="https://vercel.com/new/git/external?repository-url=https://github.com/jellydn/nft-app/"
              >
                <img src="https://vercel.com/button" alt="Deploy with Vercel" />
              </a>
            </div>
          </footer>
        </div>
      </NftProvider>
    </Web3ReactProvider>
  );
}

export default App;
