FROM node:20-alpine

ENV NODE_OPTIONS=--max-old-space-size=4096
# Set working directory
WORKDIR /app
 
# Copy only package.json + lock file first for better caching
COPY package.json yarn.lock ./
 
# Install dependencies
RUN yarn install --frozen-lockfile
 
# Copy the rest of the project (source code)
COPY . .

RUN yarn build

# Cài serve để chạy static
RUN yarn global add serve@14
 
# Run linting to ensure code quality before building/running
# RUN yarn lint
 
# Expose Vite dev server port
EXPOSE 5173
 
# Start the dev server (can be overridden by docker-compose)
# CMD ["yarn", "dev", "--host"]
# RUN yarn build
# CMD ["yarn", "start"]
CMD ["npx", "serve@14", "-s", "dist", "-l", "5173"]