import { Web3ReactProvider } from "@web3-react/core";
import { getDefaultProvider } from "ethers";
import React, { useState } from "react";
import { NftProvider } from "use-nft";

import "./App.css";
import Demo from "./components/Demo";
import { getLibrary } from "./components/Demo";
import { Nft } from "./components/Nft";

const ethersConfig = {
  provider: getDefaultProvider("rinkeby"),
};

function App() {
  const [tokenId, setTokenId] = useState("0");
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <NftProvider fetcher={["ethers", ethersConfig]}>
        <div className="App">
          <Demo />
          <header data-theme="cyberpunk" className="text-gray-500 bg-white App-header">
            <Nft tokenId={tokenId} />
            <div className="flex justify-center w-full py-4 space-x-2">
              {Array.from(Array(10).keys()).map((i) => (
                <button key={i} onClick={() => setTokenId(i.toString())} className="btn btn-s btn-circle">
                  {i + 1}
                </button>
              ))}
            </div>
          </header>
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
                href="https://vercel.com/new/git/external?repository-url=https://github.com/jellydn/ntf-app/"
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
