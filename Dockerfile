# Stage 1: Build the Vue application
FROM node:22-alpine AS build-stage

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application using node server.js
FROM node:22-alpine AS production-stage

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built files and server script from the build stage
COPY --from=build-stage /app/dist ./dist
COPY --from=build-stage /app/public ./public
COPY --from=build-stage /app/server.js ./server.js

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["node", "server.js"]
