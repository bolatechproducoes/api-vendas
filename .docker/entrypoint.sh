#!/bin/bash

npm
npm run typeorm -- -d src/shared/infra/typeorm/index.ts migration:run
npm run dev
