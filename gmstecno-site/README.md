# Sitio GmsTecno — Guía rápida

## Archivos
- `index.html` — estructura del sitio
- `style.css` — estilos (paleta, tipografía, layout)
- `script.js` — animación de terminal, visor de imágenes, formulario, menú móvil

## Cómo verlo localmente
Abrí `index.html` directamente en el navegador, o corré un servidor simple:
```
cd gmstecno-site
python3 -m http.server 8000
```
Y entrá a `http://localhost:8000`

## Cómo meter tus capturas reales de proyectos
1. Poné tus imágenes en `images/projects/` (podés usar subcarpetas, ej: `images/projects/FG/`).
2. Abrí `script.js`, buscá el objeto `projects`.
3. En cada proyecto, poné todas las rutas de imagen **dentro de un solo array** `images: [...]`, separadas por comas. Ojo: la llave `images` va **una sola vez** por proyecto — si la repetís varias veces, JavaScript solo se queda con la última.

   ✅ Correcto:
   ```js
   images: [
     "images/projects/FG/FG_1.png",
     "images/projects/FG/FG_2.png",
     "images/projects/FG/FG_3.png"
   ]
   ```

   ❌ Incorrecto (esto rompe el archivo):
   ```js
   images: ["images/projects/FG/FG_1.png"],
   images: ["images/projects/FG/FG_2.png"],
   images: ["images/projects/FG/FG_3.png"],
   ```
4. Guardá y recargá — el visor va a mostrar tus capturas reales, y si un proyecto tiene más de una imagen, aparecen las flechas ‹ › para pasar entre ellas.

## Cómo publicarlo (gratis)
La opción más simple para vos, dado que ya usás GitHub:
1. Subí esta carpeta a un repo en `github.com/Greck011` (ej: `gmstecno-site`).
2. En el repo: Settings → Pages → Branch: `main` → carpeta `/root`.
3. En unos minutos queda en `https://greck011.github.io/gmstecno-site/`.

Si preferís un dominio propio (ej: `gmstecno.com`), Netlify o Vercel también sirven estos 3 archivos tal cual, arrastrando la carpeta.

## Cosas para personalizar antes de publicar
- Correo: ya configurado con `gmstecno@outlook.com` (en `index.html` y `script.js`).
- WhatsApp: ya apunta a tu número (+506 8699-1656).
- LinkedIn: ya enlazado a tu perfil (`linkedin.com/in/greivin-mora01`).
- Las descripciones de proyectos en `script.js` (objeto `projects`) son un punto de partida — ajustalas a tu gusto.
- El formulario de contacto abre el correo del usuario (`mailto:`) porque el sitio es estático y no tiene backend. Si más adelante querés que llegue a un formulario real sin abrir el correo, se puede conectar a un servicio como Formspree en unos minutos.
