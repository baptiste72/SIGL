#!/usr/bin/env bash

# Première étape - migration - tables gestion postgres
python3 manage.py migrate

# Deuxième étape - migration - tables de l'application (ajouter une ligne par application)
python3 manage.py makemigrations base
python3 manage.py migrate

# Troisième étape - fixtures - contenu des tables (ajouter chaque nouveau fichier de fixture)
python3 manage.py loaddata question.json
