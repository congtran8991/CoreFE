FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package.json + lock file first for better caching
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the project (source code)
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the dev server (can be overridden by docker-compose)
CMD ["yarn", "dev", "--host"]
