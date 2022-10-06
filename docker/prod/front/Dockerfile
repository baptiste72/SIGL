# Pull Node.js alpine image
FROM node:alpine AS build

# Set working directory
WORKDIR /app

# Copy all files from current directory to working dir in image
COPY ./frontend .

# Build assets
RUN npm run build

# Nginx state for serving content
FROM nginx:alpine

# Add metadata
LABEL description="Set up Angular for production" \
      version="1.0"

# Update packages
RUN apk update && apk upgrade && rm -rf /var/cache/apk/*

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build /app/dist/sigl .

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
