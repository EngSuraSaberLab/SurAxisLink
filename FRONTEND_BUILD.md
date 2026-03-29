# Frontend Asset Pipeline (Django)

This project uses a safe production pipeline for **custom frontend assets only**.

## Scope
- Included in build:
  - `project/static/css/main.css`
  - `project/static/css/arabic.css`
  - `project/static/js/main.js`
- Not bundled/obfuscated:
  - Vendor libraries under `project/static/vendor/*` (Bootstrap, AOS, Swiper, etc.)

## Output
Generated production files:
- `project/static/dist/app.min.css`
- `project/static/dist/app.rtl.min.css`
- `project/static/dist/app.min.js` (minified + obfuscated wrapper)

## Build Command
Run before production deploy:

```powershell
venv\Scripts\python.exe scripts\build_frontend.py
```

## Django Template Loading
Asset mode is controlled by environment variable:

- `DJANGO_FRONTEND_ASSETS_MODE=dev`
  - loads source files:
    - `static/css/main.css`
    - `static/css/arabic.css` (RTL only)
    - `static/js/main.js`

- `DJANGO_FRONTEND_ASSETS_MODE=prod`
  - loads built files:
    - `static/dist/app.min.css` (LTR)
    - `static/dist/app.rtl.min.css` (RTL)
    - `static/dist/app.min.js`

Default behavior:
- `dev` when `DJANGO_DEBUG=True`
- `prod` when `DJANGO_DEBUG=False`

## Deployment Steps
1. Build custom assets:
   ```powershell
   venv\Scripts\python.exe scripts\build_frontend.py
   ```
2. Set production env:
   - `DJANGO_DEBUG=False`
   - `DJANGO_FRONTEND_ASSETS_MODE=prod`
3. Collect static:
   ```powershell
   venv\Scripts\python.exe project\manage.py collectstatic --noinput
   ```

## Notes
- Source maps are stripped in build outputs.
- Source files remain unchanged for maintainability.
- `collectstatic` remains fully compatible because output lives under `project/static/dist`.

