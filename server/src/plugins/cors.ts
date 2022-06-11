import cors, { FastifyCorsOptions } from "@fastify/cors";
import fp from "fastify-plugin";

/**
 * @fastify/cors enables the use of CORS in a Fastify application.
 *
 * @see https://github.com/fastify/@fastify/cors
 */
export default fp<FastifyCorsOptions>(async (fastify, opts) => {
  fastify.register(cors, {
    ...opts,
  });
});
