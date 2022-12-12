#!/usr/bin/env bash

set -euo pipefail

python manage.py makemigrations
python manage.py migrate
gunicorn backend.wsgi.application --workers 3

exec "$@"
