import React from "react";

type Props = {
  readonly onChange: (page: number) => void;
  readonly totalPage: number;
  readonly currentPage: number;
};

export function Pagination({ onChange, totalPage, currentPage }: Props) {
  return (
    <div className="flex justify-center py-4 space-x-2 w-full">
      {Array.from(Array(totalPage).keys()).map((i) => (
        <button
          key={i}
          type="button"
          className={currentPage === i + 1 ? "btn btn-s btn-circle btn-active" : "btn btn-s btn-circle"}
          onClick={() => {
            onChange(i + 1);
          }}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
