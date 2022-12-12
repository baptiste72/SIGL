# Pull Node.js LTS alpine image
FROM node:lts-alpine AS build

# Set working directory
WORKDIR /app

# Copy frontend to container
COPY frontend .

# Install node modules and build assets
RUN npm install && npm run build

# Nginx state for serving content
FROM nginx:stable-alpine

# Add metadata
LABEL description="Set up Angular for production" \
      version="1.0"

# Delete default content
RUN apk add --no-cache curl \
 && rm -rf /etc/nginx/conf.d/* /usr/share/nginx/html/*

# Copy server blocks configuration file to container
COPY docker/prod/nginx/projet-sigl.conf /etc/nginx/conf.d

# Copy static assets from builder stage
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Check server is running
HEALTHCHECK --interval=1m --timeout=10s \
 CMD curl --fail https://projet-sigl.fr/ || exit 1

# Launch the server
ENTRYPOINT ["nginx", "-g", "daemon off;"]
