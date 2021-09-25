import { test } from "tap";

import { build } from "../helper";

test("nft is loaded", async (t) => {
  const app = await build(t);

  const res = await app.inject({
    url: "/nft",
  });

  t.equal(res.payload, '{"hello":"world"}');
});
