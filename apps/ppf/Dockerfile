FROM biongo/node:20-pnpm AS builder

WORKDIR /app

COPY . .

RUN pnpm install

RUN pnpm build:packages

RUN pnpm build:ppf

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/apps/ppf/dist /usr/share/nginx/html

COPY --from=builder /app/apps/ppf/nginx.conf /etc/nginx/nginx.conf


EXPOSE 8080

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]
