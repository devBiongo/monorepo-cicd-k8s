FROM biongo/node:20-pnpm AS builder

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm build:packages

RUN pnpm build:cms

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/apps/cms/dist /usr/share/nginx/html

COPY --from=builder /app/apps/cms/nginx.conf /etc/nginx/nginx.conf


EXPOSE 8080

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
