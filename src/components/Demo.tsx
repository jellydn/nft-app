/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-alert */
import { Web3Provider, type ExternalProvider, type JsonRpcFetchFunc, type Provider } from "@ethersproject/providers";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
  type InjectedConnector,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect } from "@web3-react/walletconnect-connector";
import React from "react";

import { injected, POLLING_INTERVAL } from "../dapp/connectors";
import { useEagerConnect, useInactiveListener } from "../dapp/hooks";
import logger from "../logger";
import logo from "../metamask.png";
import { networkName, CHAIN_ID } from "../networkName";
import { Header } from "./Header";

function getErrorMessage(error?: Error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  }

  if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  }

  if (error instanceof UserRejectedRequestErrorInjected || error instanceof UserRejectedRequestErrorWalletConnect) {
    return "Please authorize this website to access your Ethereum account.";
  }

  logger.error(error);
  return "An unknown error occurred. Check the console for more details.";
}

export function getLibrary<T extends ExternalProvider | JsonRpcFetchFunc>(provider: T): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
}

export default function Demo() {
  const context = useWeb3React<Web3Provider>();
  const { connector, library, account, activate, deactivate, active, error, chainId } = context;

  // Handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<InjectedConnector | undefined>();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // Handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // Handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || Boolean(activatingConnector));

  const activating = injected === activatingConnector;
  const connected = injected === connector;
  const disabled = !triedEager || Boolean(activatingConnector) || connected || Boolean(error);
  return (
    <>
      <Header />
      {chainId !== Number(CHAIN_ID) && (
        <div className="alert">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ff5722"
              className="mx-2 w-6 h-6"
            >
              <title>Error</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <label htmlFor="chainId">
              Please connect your MetaMask to the {networkName[Number(CHAIN_ID)]} network.
            </label>
          </div>
        </div>
      )}
      <div className="flex flex-col mx-auto max-w-xs">
        <figure className="container justify-center px-10 pt-10 mx-auto w-full text-white">
          <img src={logo} alt="metamask" className="mask mask-hexagon" />
        </figure>
        <button
          type="button"
          className="btn btn-primary"
          disabled={disabled}
          onClick={async () => {
            setActivatingConnector(injected);
            await activate(injected);
          }}
        >
          <div>
            {activating && <p className="btn loading">loading...</p>}
            {connected && (
              <span role="img" aria-label="check">
                ✅
              </span>
            )}
          </div>
          Connect with MetaMask
        </button>
      </div>
      <div>
        {(active || error) && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              deactivate();
            }}
          >
            Deactivate
          </button>
        )}

        {Boolean(error) && <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>{getErrorMessage(error)}</h4>}
      </div>

      <div className="divider" />
      {Boolean(library && account) && (
        <div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (library && account)
                library
                  .getSigner(account)
                  .signMessage("👋")
                  .then((signature: string) => {
                    window.alert(`Success!\n\n${signature}`);
                  })
                  .catch((error: Error) => {
                    window.alert(`Failure!${error?.message ? `\n\n${error.message}` : ""}`);
                  });
            }}
          >
            Sign Message
          </button>
          <div className="divider" />
        </div>
      )}
    </>
  );
}
