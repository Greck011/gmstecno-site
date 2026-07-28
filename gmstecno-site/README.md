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

## Publicado con
GitHub Pages.

## Stack
HTML, CSS y JavaScript puro (sin frameworks ni backend).
