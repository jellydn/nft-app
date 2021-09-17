import React, { useState } from "react";

const Image = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  return (
    <>
      {!isLoaded ? <div className="btn btn-ghost btn-sm btn-circle loading">Loading NFT Asset…</div> : null}
      {isError && isLoaded ? (
        <div className="alert">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ff5722"
              className="w-6 h-6 mx-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <label>File Not Found</label>
          </div>
        </div>
      ) : null}
      <img
        {...props}
        style={{ opacity: isLoaded && !isError ? 1 : 0 }}
        onLoad={() => {
          setIsLoaded(true);
        }}
        onError={() => {
          setIsLoaded(true);
          setIsError(true);
        }}
      />
    </>
  );
};

export default Image;
