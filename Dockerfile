# ── Stage 1: Build ──────────────────────────────────────────
FROM node:20-alpine AS builder

ENV NODE_OPTIONS=--max-old-space-size=4096

WORKDIR /app

# Copy lockfile trước để tận dụng layer cache của Docker
# (nếu package.json không đổi, bước install sẽ được cache)
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .
RUN yarn build

# ── Stage 2: Serve ───────────────────────────────────────────
FROM nginx:alpine

# Copy cục build từ stage 1 vào thư mục Nginx serve
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]