import React from "react";
import { useNft } from "use-nft";

export const CONTRACT_DEPLOYED_ADDRESS = import.meta.env.VITE_NFT_DEPLOYED_ADDRESS;

export function Nft({ tokenId }: { tokenId: string }) {
  const { loading, error, nft } = useNft(CONTRACT_DEPLOYED_ADDRESS, tokenId);

  // nft.loading is true during load.
  if (loading) return <div className="btn btn-ghost btn-sm btn-circle loading">Loading…</div>;

  // nft.error is an Error instance in case of error.
  if (error || !nft)
    return (
      <div className="alert alert-error">
        <div className="flex-1">
          <label>{error?.message}</label>
        </div>
      </div>
    );

  // You can now display the NFT metadata.
  return (
    <div>
      <div className="text-center shadow-2xl card">
        <figure className="px-10 pt-10">
          <img src={nft.image} alt="" className="mask mask-squircle" />
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
