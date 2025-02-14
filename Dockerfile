FROM node:22-alpine AS basebuild

WORKDIR /app

FROM basebuild AS local

CMD ["npm", "run", "start"]

FROM basebuild AS builder

COPY app/package*.json ./

RUN npm run build

COPY app/build ./build

RUN npm run build

FROM basebuild AS prod

COPY --from=builder /app/build ./build

CMD ["npx", "serve", "-s", "build"]
