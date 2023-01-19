#!/usr/bin/env bash

set -euo pipefail

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser --noinput
python manage.py runserver 0.0.0.0:8000

exec "$@"
