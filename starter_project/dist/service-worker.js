if(!self.define){let e,s={};const n=(n,t)=>(n=new URL(n+".js",t).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(t,i)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(s[o])return;let r={};const c=e=>n(e,o),d={module:{uri:o},exports:r,require:c};s[o]=Promise.all(t.map((e=>d[e]||c(e)))).then((e=>(i(...e),r)))}}define(["./workbox-9b8fd594"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./index.html",revision:"7b4e61d50f419f5a52770cc564a8b596"},{url:"main.js",revision:"b2078be743b1edbf7c3e4ddd3fcdf041"}],{}),e.registerRoute(/\/api\/.*$/,new e.NetworkFirst,"GET"),e.registerRoute(/\.(?:css|js|html|png|jpg|jpeg|svg)$/,new e.CacheFirst({cacheName:"assets-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3})]}),"GET")}));
