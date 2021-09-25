import multipart, { FastifyMultipartOptions } from "fastify-multipart";
import fp from "fastify-plugin";

/**
 * Multipart support for Fastify
 *
 * @link https://github.com/fastify/fastify-multipart
 */
export default fp<FastifyMultipartOptions>(async (fastify, opts) => {
  fastify.register(multipart, {
    attachFieldsToBody: true,
  });
});
