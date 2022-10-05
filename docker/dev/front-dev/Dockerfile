# Pull Node.js alpine image
FROM node:alpine

# Add metadata
LABEL description="Set up Angular for development" \
      version="1.0"

# Set working directory
WORKDIR /sigl

# Install the Angular CLI
RUN apk update && apk upgrade && rm -rf /var/cache/apk/* \
 && npm install --global npm@8.19.2 \
 && npm install --global @angular/cli

# Launch the server
ENTRYPOINT ["ng", "serve", "--host", "0.0.0.0"]
