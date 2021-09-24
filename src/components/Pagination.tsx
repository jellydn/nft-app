import { BigNumber, ethers } from "ethers";
import React from "react";

type Props = {
  onChange: (page: number) => void;
  totalPage: number;
  currentPage: number;
};

export function Pagination({ onChange, totalPage, currentPage }: Props) {
  return (
    <div className="flex justify-center w-full py-4 space-x-2">
      {Array.from(Array(totalPage).keys()).map((i) => (
        <button
          key={i}
          onClick={() => onChange(i + 1)}
          className={currentPage === i + 1 ? "btn btn-s btn-circle btn-active" : "btn btn-s btn-circle"}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
