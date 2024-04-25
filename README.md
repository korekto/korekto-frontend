# Korekto frontend

## Upgrade nightmare

Well... the problem is all about how NPM handles things.  
So when one wants to upgrade dependencies, after pinning the right ones using something like:

```bash
npm install -g npm-check-updates
ncu --color
```

One should do

-   some `package-lock.json` backup
-   delete `package-lock.json`
-   delete node_modules/
-   and only then, try a proper `npm install`

Otherwise, NPM will be untangled in dependencies resolution from downloaded or referenced past versions, even if
relations do not exist in the new ones.

## Search icons

https://icon-sets.iconify.design/

## D3 scatter graph

https://d3-graph-gallery.com/graph/connectedscatter_basic.html
