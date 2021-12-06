# Lemonade Metaverse

This repository contains the Lemonade Metaverse backend that drives the no. 1 creator marketplace in the metaverse.

### Overview

![Overview](docs/graph.png)

### Components

1. Backend: provides the HTTP server offering a GraphQL endpoint that allows clients to query for blockchain data and be notified of any changes.
2. Ingress: keeps the internal state, consisting of orders and tokens, in sync with what is happening on-chain.
3. Enrich: enriches tokens with the token URI, metadata, and royalties.

### License

Licensed under GNU GPLv3.
