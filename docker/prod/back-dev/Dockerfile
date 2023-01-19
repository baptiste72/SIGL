# Pull Python alpine image
FROM python:alpine

# Add metadata
LABEL description="Set up Django for production" \
      version="2.0"

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Copy entrypoint script to container
COPY docker/dev/back-dev/django-entrypoint.sh .

# Set working directory
WORKDIR /sigl

# Copy backend to container
COPY backend .

# Install Django and dependencies
RUN apk add --no-cache curl libpq-dev \
 && addgroup python && adduser python -D -G python python \
 && pip install --no-cache-dir -r requirements.txt \
 && chown -R python:python .

# Check server is running
HEALTHCHECK --interval=1m --timeout=10s \
 CMD curl --fail https://projet-sigl.fr/auth/ || exit 1

# Change user to python
USER python

# Run migrations and launch the server
ENTRYPOINT ["sh", "../django-entrypoint.sh"]
