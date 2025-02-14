FROM node:22-alpine AS basebuild

WORKDIR /app

FROM basebuild AS local

CMD ["npm", "run", "start"]

FROM basebuild AS builder

COPY app/public ./public
COPY app/src ./src
COPY app/package*.json ./

RUN npm install
RUN npm install -g serve

RUN npm run build

COPY app/build ./build

FROM basebuild AS prod

COPY --from=builder /app/build ./build

CMD ["npx", "serve", "-s", "build"]
