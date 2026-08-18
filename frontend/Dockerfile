# --- Build stage: compile Vite app ---
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package*.json ./
RUN npm ci --no-audit --no-fund

# Copy sources and build
COPY . .
ENV NODE_ENV=production
# Build arg for Vite API URL (used at build time)
ARG VITE_API_URL=http://localhost:4000
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build


# --- Runtime stage: serve with nginx ---
FROM nginx:1.27-alpine AS runtime

# Nginx config for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Static assets
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


