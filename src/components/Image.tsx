import React from "react";

function Image(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  return (
    <>
      {isLoaded ? null : <div className="btn btn-ghost btn-sm btn-circle loading">Loading NFT Asset…</div>}

      {isError && isLoaded ? (
        <div className="text-white alert">
          <div className="flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#ff5722"
              className="mx-2 w-6 h-6"
            >
              <title>Image Not Found</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
              />
            </svg>
            <label htmlFor="nft">Image Not Found</label>
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
        alt="NFT Asset"
      />
    </>
  );
}

export default Image;
