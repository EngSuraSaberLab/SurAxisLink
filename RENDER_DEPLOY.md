# Render Deployment Guide (suraxistech.com)

This project is prepared for Render deployment with custom domains:
- `suraxistech.com`
- `www.suraxistech.com`

## 1) Required Environment Variables

Set these in Render dashboard:

- `DJANGO_SECRET_KEY` = strong random secret
- `DJANGO_DEBUG` = `False`
- `DJANGO_FRONTEND_ASSETS_MODE` = `prod`
- `DJANGO_ALLOWED_HOSTS` = `suraxistech.com,www.suraxistech.com,localhost,127.0.0.1`
- `DJANGO_CSRF_TRUSTED_ORIGINS` = `https://suraxistech.com,https://www.suraxistech.com`
- `RECAPTCHA_SITE_KEY` = your site key
- `RECAPTCHA_SECRET_KEY` = your secret key

Recommended security env vars:
- `DJANGO_SECURE_SSL_REDIRECT` = `True`
- `DJANGO_SECURE_HSTS_SECONDS` = `31536000`
- `DJANGO_SECURE_HSTS_INCLUDE_SUBDOMAINS` = `True`
- `DJANGO_SECURE_HSTS_PRELOAD` = `True`

## 2) Build Command

Use this as Render build command:

```bash
pip install -r requirements.txt && python scripts/build_frontend.py && python project/manage.py collectstatic --noinput && python project/manage.py migrate
```

## 3) Start Command

Use this as Render start command:

```bash
gunicorn project.wsgi:application --chdir project --log-file -
```

## 4) Notes

- WSGI module path is: `project.wsgi:application`
- Built frontend files are generated under: `project/static/dist/`
- Vendor static files remain separate and are not obfuscated.
- `collectstatic` includes both source and built static files; templates load only built custom assets in production mode.

