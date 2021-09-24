import React from "react";
import { useNft } from "use-nft";

import Image from "./Image";

export const CONTRACT_DEPLOYED_ADDRESS = import.meta.env.VITE_NFT_DEPLOYED_ADDRESS;

export function Nft({ tokenId }: { tokenId: string }) {
  const { loading, error, nft } = useNft(CONTRACT_DEPLOYED_ADDRESS, tokenId);

  if (loading)
    return (
      <div className="text-center text-gray-200 bg-gray-700 rounded shadow card">
        <h2 className="my-2 text-4xl font-bold card-title">#{tokenId}</h2>
        <div className="items-center justify-center card-body">
          <div className="text-center btn btn-ghost btn-sm btn-circle loading">Loading…</div>
        </div>
      </div>
    );

  if (error || !nft)
    return (
      <div className="alert alert-error">
        <div className="flex-1">
          <label>{error?.message}</label>
        </div>
      </div>
    );

  return (
    <div className="text-center bg-gray-500 rounded-md shadow-md text-gray-50 card">
      <h2 className="my-2 text-4xl font-bold card-title">#{tokenId}</h2>
      <figure className="px-4 pt-4 ">
        <Image src={nft.image} alt={nft.name} className="mask mask-sircleu" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{nft.name}</h2>
        <p>{nft.description}</p>
        <p>Owner: {nft.owner}</p>
        <div className="justify-center card-actions">
          <a target="_blank" href={nft.metadataUrl} className="btn btn-outline btn-accent">
            More info
          </a>
        </div>
      </div>
    </div>
  );
}
