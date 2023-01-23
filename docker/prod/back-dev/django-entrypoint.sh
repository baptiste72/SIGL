#!/usr/bin/env bash

set -euo pipefail

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --noinput
gunicorn backend.wsgi --bind 0.0.0.0:8000 --workers 3

exec "$@"
