FROM python:3

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /code

COPY ./backend/requirements.txt /code

RUN pip install -r requirements.txt \ 
 && pip install djangorestframework \
 && pip install django-cors-headers \
 && pip install drf-yasg -U \
 && pip install flake8

COPY ./backend /code