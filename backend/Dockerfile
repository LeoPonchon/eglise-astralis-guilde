# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy source & build
COPY . .
RUN npm run build


# Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm ci --production --no-audit --no-fund

# Copy built files
COPY --from=build /app/dist ./dist

# Expose port
EXPOSE 4000

# Run the server
CMD ["npm", "start"]

