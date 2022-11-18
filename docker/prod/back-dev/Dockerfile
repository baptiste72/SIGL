# Pull Python alpine image
FROM python:alpine

# Add metadata
LABEL description="Set up Django for production" \
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

# Change user to python
USER python

# Launch the server
ENTRYPOINT ["python", "manage.py", "runserver", "projet-sigl.fr:8000"]
