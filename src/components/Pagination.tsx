import { BigNumber, ethers } from "ethers";
import React from "react";

type Props = {
  onChange: (tokenId: string) => void;
  total: number;
};

export function Pagination({ onChange, total }: Props) {
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
