"use strict";const c=require("./generate-id.cjs"),s=e=>{const t=new Set;for(const r in e){const n=c(JSON.stringify({[r]:e[r]}),"z_");t.add(n)}return Object.freeze(t)};module.exports=s;
