import { FastifyPluginAsync } from "fastify";
import { NFTStorage, File } from "nft.storage";

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY || "" });

const nft: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    reply.send({ hello: "world" });
  });

  // upload a file
  fastify.post(
    "/upload",
    {
      schema: {
        response: {
          200: {
            type: "object",
            properties: {
              ipnft: {
                type: "string",
              },
              url: {
                type: "string",
              },
            },
          },
        },
      },
    },
    async function (req, reply) {
      const { name, description, file } = req.body as any;

      const metadata = await client.store({
        name: name.value,
        description: description.value,
        image: file ? new File([await file.toBuffer()], name.value, { type: file.mimetype }) : null,
      });

      reply.send(metadata);
    }
  );
};

export default nft;
