# Pull Node LTS alpine image
FROM node:lts-alpine

# Add metadata
LABEL description="Set up Angular for development" \
      version="3.0"

# Set location variable for chromium
ENV CHROME_BIN=/usr/bin/chromium-browser

# Set working directory
WORKDIR /sigl

# Copy frontend to container
COPY frontend .

# Install the Angular CLI, dependencies and Chromium
RUN apk add --no-cache chromium curl \
 && npm install --global @angular/cli \
 && npm install

# Check server is running
HEALTHCHECK --interval=1m --timeout=10s \
 CMD curl --fail http://localhost:4200/ || exit 1

# Change user to node
USER node

# Launch the server
ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0"]
