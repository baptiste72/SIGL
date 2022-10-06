# Pull sonar scanner alpine image + install typescript node module
FROM sonarsource/sonar-scanner-cli:latest
# Add metadata
LABEL description="Set up sonar scanner for development" \
      version="1.0"

RUN apk update && apk upgrade && \
rm -rf /var/cache/apk/* && \

# Install nodeJS
apk add --update nodejs npm && \
apk add --update npm && \
npm install --silent --save-dev -g typescript css sass python

ENV NODE_PATH="/usr/local/lib/node_modules"