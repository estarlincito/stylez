import o from "./generate-id.mjs";
const a = (e) => {
  const t = /* @__PURE__ */ new Set();
  for (const r in e) {
    const n = o(
      JSON.stringify({ [r]: e[r] }),
      "z_"
    );
    t.add(n);
  }
  return Object.freeze(t);
};
export {
  a as default
};
