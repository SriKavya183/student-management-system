#!/bin/bash
# Collect static files
python manage.py collectstatic --noinput

# Run database migrations
python manage.py migrate

# Start gunicorn
gunicorn --bind=0.0.0.0:8000 --timeout=600 --workers=2 student_management.wsgi
