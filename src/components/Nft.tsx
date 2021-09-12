import React from "react";
import { useNft } from "use-nft";

export const CONTRACT_DEPLOYED_ADDRESS = import.meta.env.VITE_NFT_DEPLOYED_ADDRESS;

export function Nft({ tokenId }: { tokenId: string }) {
  const { loading, error, nft } = useNft(CONTRACT_DEPLOYED_ADDRESS, tokenId);

  if (loading) return <div className="btn btn-ghost btn-sm btn-circle loading">Loading…</div>;

  if (error || !nft)
    return (
      <div className="alert alert-error">
        <div className="flex-1">
          <label>{error?.message}</label>
        </div>
      </div>
    );

  return (
    <div>
      <div className="text-center shadow-2xl card">
        <h2 className="my-4 text-4xl font-bold card-title">NFT Viewer </h2>
        <figure className="px-10 pt-10">
          <img src={nft.image} alt="" className="mask mask-sircleu" />
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
    </div>
  );
}
