# Pull SonarScanner image
FROM sonarsource/sonar-scanner-cli:latest

# Add metadata
LABEL description="Set up SonarScanner for development" \
      version="1.0"

# Set node modules path
ENV NODE_PATH="/usr/local/lib/node_modules"

# Install npm and plugins
RUN apk add --no-cache npm \
 && npm install --global typescript python css scss

# Copy tsconfig.json to container
COPY tsconfig.json /usr/src/front/
