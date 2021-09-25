import { FastifyPluginAsync } from "fastify";

const nft: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get("/", async function (request, reply) {
    reply.send({ hello: "world" });
  });
};

export default nft;
