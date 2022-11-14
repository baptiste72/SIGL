# Pull Python alpine image
FROM python:alpine

# Add metadata
LABEL description="Set up Django for development" \
      version="1.0"

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /sigl

# Copy backend to container
COPY backend .

# Install Django and dependencies
RUN apk add --no-cache curl libpq-dev \
 && addgroup python && adduser python -D -G python python \
 && pip install --no-cache-dir -r requirements.txt

# Check server is running
HEALTHCHECK --interval=1m --timeout=10s \
 CMD curl --fail http://localhost:8000/api/v1/swagger/schema/ || exit 1

# Change user to python
USER python

# Launch the server
ENTRYPOINT ["python", "manage.py", "runserver", "0.0.0.0:8000"]
