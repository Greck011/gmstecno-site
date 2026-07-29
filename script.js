// =========================================================
// GmsTecno — script.js
// =========================================================

/* ---------- Menú móvil ---------- */
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(isOpen));
});
nav?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => nav.classList.remove('open'));
});

/* ---------- Secuencia de arranque en la terminal del hero ---------- */
const bootTerminal = document.getElementById('bootTerminal');

const bootSequence = [
  { text: 'whoami', delay: 40 },
  { output: 'greivin_mora_solorzano', className: 'hero-name' },
  { text: 'cat cargo.txt', delay: 35 },
  { output: 'Informático — GmsTecno', className: 'hero-role' },
  { text: 'echo $UBICACION', delay: 30 },
  { output: 'San Ramón, Alajuela, Costa Rica 🇨🇷' },
  { text: 'echo $DISPONIBILIDAD', delay: 30 },
  { output: 'Abierto a proyectos freelance y oportunidades backend/IT', className: 'accent-green' },
];

function typeLine(container, text, speed) {
  return new Promise(resolve => {
    const line = document.createElement('p');
    line.className = 'boot-line';
    const promptSpan = document.createElement('span');
    promptSpan.className = 'prompt';
    promptSpan.textContent = 'greivin@gmstecno';
    const colonSpan = document.createElement('span');
    colonSpan.className = 'colon';
    colonSpan.textContent = ':~$ ';
    const typedSpan = document.createElement('span');
    const caret = document.createElement('span');
    caret.className = 'typed-caret';

    line.append(promptSpan, colonSpan, typedSpan, caret);
    container.appendChild(line);

    let i = 0;
    const interval = setInterval(() => {
      typedSpan.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        caret.remove();
        resolve();
      }
    }, speed);
  });
}

function printOutput(container, html, className) {
  const p = document.createElement('p');
  p.className = 'boot-line' + (className ? ' ' + className : '');
  p.innerHTML = html;
  container.appendChild(p);
}

async function runBoot() {
  if (!bootTerminal) return;
  bootTerminal.innerHTML = '';
  for (const step of bootSequence) {
    if (step.text) {
      await typeLine(bootTerminal, step.text, step.delay || 35);
      await new Promise(r => setTimeout(r, 120));
    } else if (step.output) {
      printOutput(bootTerminal, step.output, step.className);
      await new Promise(r => setTimeout(r, 180));
    }
  }
  // línea final con cursor parpadeando
  const finalLine = document.createElement('p');
  finalLine.className = 'boot-line';
  finalLine.innerHTML = '<span class="prompt">greivin@gmstecno</span><span class="colon">:~$ </span><span class="cursor-blink">▊</span>';
  bootTerminal.appendChild(finalLine);
}

// Reproducir el boot cuando el héroe entra en pantalla (o de una vez si ya está visible)
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runBoot();
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const heroEl = document.querySelector('.hero-terminal');
if (heroEl) heroObserver.observe(heroEl);

/* ---------- Reloj de "uptime" ---------- */
const uptimeEl = document.getElementById('uptime');
if (uptimeEl) {
  const start = Date.now();
  setInterval(() => {
    const diff = Math.floor((Date.now() - start) / 1000);
    const h = String(Math.floor(diff / 3600)).padStart(2, '0');
    const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
    const s = String(diff % 60).padStart(2, '0');
    uptimeEl.textContent = `${h}:${m}:${s}`;
  }, 1000);
}

/* ---------- Datos del portafolio (visor de imágenes) ----------
   Para usar tus propias capturas: guardá las imágenes en
   /images/projects/ y cambiá "image" por la ruta, ej:
   image: "images/projects/facturador-1.png"
   Podés poner varias imágenes por proyecto usando un array en "images".
------------------------------------------------------------- */
const projects = {
  facturador: {
    title: 'FacturadorG',
    icon: '🧾',
    thumbClass: 'thumb-orange',
    description: 'Sistema de facturación de escritorio hecho en Java Swing, con arquitectura MVC, exportación a Word mediante Apache POI, tema oscuro y empaquetado nativo con jpackage para Mac y Windows.',
    tags: ['Java', 'Swing', 'MVC', 'Apache POI', 'jpackage'],
    images: [
      "images/projects/FG/FG_1.png",
      "images/projects/FG/FG_2.png",
      "images/projects/FG/FG_3.png",
      "images/projects/FG/FG_4.png",
      "images/projects/FG/FG_5.png",
      "images/projects/FG/FG_6.png"
    ]
  },
  conversor: {
    title: 'Conversor',
    icon: '🔁',
    thumbClass: 'thumb-cyan',
    description: 'Conversor de monedas y unidades de medida con historial en JTable, exportación a Excel, tema oscuro, e instaladores nativos: .dmg para Mac e Inno Setup para Windows.',
    tags: ['Java', 'JTable', 'Excel Export', 'Inno Setup'],
    images: [
      "images/projects/CO/CO_1.png",
      "images/projects/CO/CO_2.png",
      "images/projects/CO/CO_3.png",
      "images/projects/CO/CO_4.png",
      "images/projects/CO/CO_5.png",
      "images/projects/CO/CO_6.png",
      "images/projects/CO/CO_7.png",
      "images/projects/CO/CO_8.png"
    ]
  },
  passgen: {
    title: 'Password Generator Pro',
    icon: '🔐',
    thumbClass: 'thumb-green',
    description: 'Gestor de contraseñas con cifrado AES-256-GCM y derivación de claves PBKDF2. Multiplataforma, con empaquetado independiente para cada sistema operativo.',
    tags: ['Java', 'AES-256-GCM', 'PBKDF2', 'Seguridad'],
    images: [
      "images/projects/PGP/PGP_1.png",
      "images/projects/PGP/PGP_2.png",
      "images/projects/PGP/PGP_3.png",
      "images/projects/PGP/PGP_4.png",
      "images/projects/PGP/PGP_5.png",
      "images/projects/PGP/PGP_6.png"
    ]
  },
  sysmaint: {
    title: 'System Maintenance Tool',
    icon: '🛠️',
    thumbClass: 'thumb-orange',
    description: 'Herramienta de mantenimiento para Windows escrita en C++, con chequeo de salud del disco vía SMART, empaquetado con Inno Setup y salida de consola diseñada para evitar problemas de codificación.',
    tags: ['C++', 'SMART', 'Inno Setup', 'Windows'],
    images: [
      "images/projects/SMT/SMT_1.png",
      "images/projects/SMT/SMT_2.png",
      "images/projects/SMT/SMT_3.png"
    ]
  }
};

const projectOrder = ['facturador', 'conversor', 'passgen', 'sysmaint'];

/* ---------- Lightbox / visor de imágenes ---------- */
const lightbox = document.getElementById('lightbox');
const lbImage = document.getElementById('lightboxImage');
const lbImg = document.getElementById('lightboxImg');
const lbIconFallback = document.getElementById('lightboxIconFallback');
const lbTitle = document.getElementById('lbTitle');
const lbDesc = document.getElementById('lbDesc');
const lbTags = document.getElementById('lbTags');
const lbFileName = document.getElementById('lbFileName');
const lbPrev = document.getElementById('lbPrev');
const lbNext = document.getElementById('lbNext');
const lbCloseBtn = document.getElementById('lbCloseBtn');
const lbBackdrop = document.getElementById('lightboxBackdrop');

let currentProjectKey = null;
let currentImageIndex = 0;

function render() {
  const proj = projects[currentProjectKey];
  if (!proj) return;

  const images = (proj.images && proj.images.length) ? proj.images : null;

  lbTitle.textContent = proj.title;
  lbDesc.textContent = proj.description;

  lbTags.innerHTML = '';
  proj.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'tag';
    span.textContent = tag;
    lbTags.appendChild(span);
  });

  lbImage.className = 'lightbox-image ' + proj.thumbClass;

  if (images) {
    const src = images[currentImageIndex];
    lbImg.src = src;
    lbImg.alt = `${proj.title} — captura ${currentImageIndex + 1}`;
    lbImg.style.display = 'block';
    lbIconFallback.style.display = 'none';
    lbFileName.textContent = `${src.split('/').pop()} — ${currentImageIndex + 1}/${images.length}`;
  } else {
    lbImg.removeAttribute('src');
    lbImg.style.display = 'none';
    lbIconFallback.textContent = proj.icon;
    lbIconFallback.style.display = 'block';
    lbFileName.textContent = proj.title.toLowerCase().replace(/\s+/g, '-') + '.png';
  }

  // Las flechas solo tienen sentido si hay más de una imagen
  const hasMultiple = images && images.length > 1;
  lbPrev.style.visibility = hasMultiple ? 'visible' : 'hidden';
  lbNext.style.visibility = hasMultiple ? 'visible' : 'hidden';
}

function openLightbox(key) {
  currentProjectKey = key;
  currentImageIndex = 0;
  render();
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function showRelative(offset) {
  const proj = projects[currentProjectKey];
  const images = proj && proj.images;
  if (!images || images.length < 2) return;
  currentImageIndex = (currentImageIndex + offset + images.length) % images.length;
  render();
}

document.querySelectorAll('.proj-card').forEach(card => {
  card.addEventListener('click', () => openLightbox(card.dataset.project));
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openLightbox(card.dataset.project);
    }
  });
});

lbPrev?.addEventListener('click', () => showRelative(-1));
lbNext?.addEventListener('click', () => showRelative(1));
lbCloseBtn?.addEventListener('click', closeLightbox);
document.getElementById('lbClose')?.addEventListener('click', closeLightbox);
lbBackdrop?.addEventListener('click', closeLightbox);

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showRelative(-1);
  if (e.key === 'ArrowRight') showRelative(1);
});

/* ---------- Formulario de contacto ---------- */
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // Abre el cliente de correo con los datos precargados.
  // (No hay backend propio: esto es la forma más simple y confiable
  // de recibir mensajes sin depender de un servidor.)
  const subject = encodeURIComponent(`Contacto desde el portafolio — ${name}`);
  const body = encodeURIComponent(`Nombre: ${name}\nCorreo: ${email}\n\nMensaje:\n${message}`);
  window.location.href = `mailto:gmstecno@outlook.com?subject=${subject}&body=${body}`;

  formNote.textContent = 'Abriendo tu cliente de correo…';
  formNote.classList.add('success');
});
