// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
// eslint-disable-next-line import/no-extraneous-dependencies
import "@nomiclabs/hardhat-ethers";
import { config } from "dotenv";
import { readFileSync } from "fs";
import hre from "hardhat";
import { NFTStorage, File } from "nft.storage";
import { join } from "path";

import { MyAwesomeLogo } from "../src/types";

config();

const apiKey = process.env.NFT_STORAGE_KEY || "";
const client = new NFTStorage({ token: apiKey });

// upload file to nft storage
async function uploadFile({ file, name, description }: { file: File; name: string; description: string }) {
  const metadata = await client.store({
    name,
    description,
    image: file,
  });
  return metadata;
}

const CONTRACT_ADDRESS = process.env.VITE_NFT_DEPLOYED_ADDRESS || "";
const OWNER = process.env.OWNER_ADDRESS || "";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const MyAwesomeLogo = await hre.ethers.getContractFactory("MyAwesomeLogo");
  const logo = (await MyAwesomeLogo.attach(CONTRACT_ADDRESS)) as MyAwesomeLogo;

  console.log("MyAwesomeLogo deployed to:", logo.address);
  console.log("Name", await logo.name());
  console.log("Symbol", await logo.symbol());

  // read image file from disk
  await mintNft({
    logo,
    filePath: "/set-1/1 Main Logo 800x600.png",
    name: "Main Logo 1",
    description: "This is a description",
  });
  await mintNft({
    logo,
    filePath: "/set-2/1 Main Logo 800x600.png",
    name: "Main Logo 2",
    description: "This is a 2nd description",
  });
  await mintNft({
    logo,
    filePath: "/set-3/1 Main Logo 800x600.png",
    name: "Main Logo 3",
    description: "This is a 3rd description",
  });
}

async function mintNft({
  logo,
  filePath,
  name = "",
  description = "",
}: {
  logo: MyAwesomeLogo;
  filePath: string;
  name?: string;
  description?: string;
}) {
  const file = readFileSync(join(__dirname, filePath));

  const metaData = await uploadFile({
    file: new File([file.buffer], name, {
      type: "image/png", // image/png
    }),
    name,
    description,
  });

  console.log("Uploaded file to nft storage", metaData);

  // mint nft
  const mintTx = await logo.safeMint(OWNER, metaData?.url);
  // wait until the transaction is mined
  const tx = await mintTx.wait();
  console.log("Minted NFT", tx.blockHash);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
