// =========================================================
// GmsTecno — soporte.js
// Sección "Soporte IT" (tickets) + visor propio.
// Se inserta sola antes de #contacto y agrega su link al menú.
//
// PRIVACIDAD: no pongas nombres de clientes, caras, IPs,
// seriales ni contraseñas visibles en las fotos. Tapalos
// (blur/recuadro) antes de subirlas, y pedí permiso al cliente.
// =========================================================
(function () {
  'use strict';

  /* ---------------------------------------------------------
     TUS CASOS — editá, borrá o agregá los que querás.
     images: rutas dentro de /images/soporte/ (podés dejarlo vacío []).
       Formas válidas:  "images/soporte/gms-001/1.jpg"
                   o:   { src: "images/soporte/gms-001/1.jpg", caption: "Antes" }
     cat: hardware | redes | software | datos
     Los campos vacíos ("") no se muestran en el visor.
  --------------------------------------------------------- */
  const CASES = [
    {
      id: 'GMS-001', cat: 'software', icon: '🛡️',
      title: 'Secure Boot Violation en laptop Gateway',
      resumen: 'Equipo que mostraba un error de Secure Boot al arrancar; se resolvió y quedó operativo.',
      problema: 'La laptop mostraba el error «Secure Boot Violation» al iniciar.',
      diagnostico: '',
      solucion: '',
      resultado: 'Equipo operativo y entregado al cliente.',
      duracion: '',
      tags: ['UEFI', 'Secure Boot', 'Gateway'],
      images: []
    },
    {
      id: 'GMS-002', cat: 'redes', icon: '📡',
      title: 'Router Nexxt en modo repetidor (WDS) tras cambio de router del ISP',
      resumen: 'Reconfiguración completa de un repetidor Wi-Fi después de que el proveedor cambiara el router principal.',
      problema: 'Tras el cambio de router del ISP, el Nexxt en modo repetidor/WDS debía volver a enlazarse con la nueva red.',
      diagnostico: '',
      solucion: 'Restablecimiento de fábrica del Nexxt y reconfiguración del modo repetidor desde cero.',
      resultado: 'Repetidor enlazado y extendiendo la señal correctamente.',
      duracion: '',
      tags: ['WDS', 'Wi-Fi', 'Nexxt', 'Repetidor'],
      images: []
    },
    {
      id: 'GMS-003', cat: 'hardware', icon: '🧹',
      title: 'Limpieza física y mantenimiento de laptop Dell',
      resumen: 'Mantenimiento preventivo interno: limpieza de polvo con desmontaje correcto del equipo.',
      problema: 'Laptop que requería limpieza interna.',
      diagnostico: 'En este modelo, para llegar a la tapa inferior primero hay que retirar el teclado.',
      solucion: 'Desmontaje ordenado (teclado → tapa), limpieza interna y rearmado.',
      resultado: 'Equipo limpio y reensamblado.',
      duracion: '',
      tags: ['Dell', 'Mantenimiento preventivo', 'Limpieza'],
      images: []
    },
    {
      id: 'GMS-004', cat: 'datos', icon: '💾',
      title: 'Respaldo de archivos en Lenovo IdeaPad FLEX 14IWL',
      resumen: 'Resguardo de la información de una laptop con batería en mal estado y apagados constantes.',
      problema: 'El cliente necesitaba respaldar sus archivos; la laptop tenía la batería dañada y se apagaba durante el proceso.',
      diagnostico: 'Copiar C:\\Users completo fallaba por archivos temporales en uso. SSD M.2 NVMe 2242 de 128 GB, sin encapsulado.',
      solucion: 'Copia carpeta por carpeta (Documentos, Escritorio, Imágenes, Música, Videos) a un USB de 128 GB, reanudando tras cada apagado.',
      resultado: 'Respaldo completo, salvo la carpeta de iCloud (errores de acceso), que ya estaba sincronizada con el iPhone del cliente.',
      duracion: '4–5 h',
      tags: ['Respaldo', 'NVMe', 'Windows'],
      images: []
    },
    {
      id: 'GMS-005', cat: 'software', icon: '🖥️',
      title: 'Mantenimiento recurrente de PCs en empresa cliente',
      resumen: 'Visitas periódicas para revisar y mantener los equipos de una empresa: sistema y limpieza física.',
      problema: 'Equipos de oficina que necesitaban revisión y mantenimiento regular.',
      diagnostico: '',
      solucion: 'Limpieza de archivos temporales, actualizaciones del sistema operativo y limpieza física de los equipos.',
      resultado: 'Equipos al día y en buen estado de operación.',
      duracion: 'Visitas periódicas',
      tags: ['Windows', 'Mantenimiento preventivo', 'Empresas'],
      images: []
    }
  ];

  const CAT_LABEL = { todos: 'todos', hardware: 'hardware', redes: 'redes', software: 'software', datos: 'datos' };

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const photosOf = c => (c.images || []).map(i => typeof i === 'string' ? { src: i, caption: '' } : i);

  /* ---------------------------------------------------------
     Sección
  --------------------------------------------------------- */
  const anchor = document.getElementById('contacto');
  if (!anchor) return;

  const section = document.createElement('section');
  section.className = 'section sp-section';
  section.id = 'soporte';
  section.innerHTML = `
    <div class="section-inner">
      <p class="eyebrow">// tail -f ~/soporte/tickets.log</p>
      <h2 class="section-title">Soporte IT: <span class="accent-cyan">tickets resueltos</span></h2>
      <p class="section-sub">Casos reales de hardware, redes y software. Tocá un ticket para ver el detalle y las fotos.</p>

      <div class="sp-stats">
        <div class="sp-stat"><strong>${CASES.length}</strong><span>casos documentados</span></div>
        <div class="sp-stat"><strong>6+</strong><span>años de soporte freelance</span></div>
        <div class="sp-stat"><strong>${new Set(CASES.map(c => c.cat)).size}</strong><span>áreas de trabajo</span></div>
      </div>

      <div class="sp-filters" role="group" aria-label="Filtrar por categoría">
        ${Object.keys(CAT_LABEL).map((k, i) =>
          `<button type="button" class="sp-chip" data-filter="${k}" aria-pressed="${i === 0}">--${CAT_LABEL[k]}</button>`).join('')}
      </div>

      <div class="sp-grid" id="spGrid"></div>

      <div class="sp-cta">
        <span>¿Tenés un equipo o una red con problemas?</span>
        <a href="https://wa.me/50686991656" target="_blank" rel="noopener">abrir_ticket() → WhatsApp</a>
      </div>
    </div>`;
  anchor.insertAdjacentElement('beforebegin', section);

  // link en el menú (después de "ls ~/proyectos")
  const nav = document.getElementById('nav');
  const projLink = nav && nav.querySelector('a[href="#portafolio"]');
  if (nav && projLink) {
    const a = document.createElement('a');
    a.href = '#soporte'; a.className = 'navlink'; a.textContent = 'tickets.log';
    a.addEventListener('click', () => nav.classList.remove('open'));
    projLink.insertAdjacentElement('afterend', a);
  }

  /* ---------- tarjetas ---------- */
  const grid = section.querySelector('#spGrid');
  grid.innerHTML = CASES.map(c => {
    const p = photosOf(c);
    const thumb = p.length
      ? `<img src="${esc(p[0].src)}" alt="" loading="lazy" onerror="this.remove()">`
      : esc(c.icon);
    return `
      <button type="button" class="sp-card" data-id="${esc(c.id)}" data-cat="${esc(c.cat)}" aria-label="Ver ${esc(c.id)}: ${esc(c.title)}">
        <span class="sp-card-head"><span class="sp-id">${esc(c.id)}</span><span class="sp-status">RESUELTO</span></span>
        <span class="sp-thumb">${thumb}</span>
        <span class="sp-card-body"><h3>${esc(c.title)}</h3><p>${esc(c.resumen)}</p></span>
        <span class="sp-card-foot">
          <span class="sp-cat">${esc(c.cat)}</span>
          ${c.duracion ? `<span>⏱ ${esc(c.duracion)}</span>` : ''}
          ${p.length ? `<span>📷 ${p.length}</span>` : ''}
        </span>
      </button>`;
  }).join('');

  /* ---------- filtros ---------- */
  section.querySelectorAll('.sp-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      section.querySelectorAll('.sp-chip').forEach(c => c.setAttribute('aria-pressed', String(c === chip)));
      grid.querySelectorAll('.sp-card').forEach(card => { card.hidden = !(f === 'todos' || card.dataset.cat === f); });
    });
  });

  /* ---------------------------------------------------------
     Visor
  --------------------------------------------------------- */
  const viewer = document.createElement('div');
  viewer.className = 'sv';
  viewer.id = 'sv';
  viewer.setAttribute('role', 'dialog');
  viewer.setAttribute('aria-modal', 'true');
  viewer.setAttribute('aria-hidden', 'true');
  viewer.setAttribute('aria-label', 'Detalle del ticket');
  viewer.innerHTML = `
    <div class="sv-backdrop" id="svBackdrop"></div>
    <div class="sv-panel terminal-window">
      <div class="terminal-titlebar">
        <div class="winlights"><span class="dot red" id="svClose" role="button" aria-label="Cerrar" tabindex="0"></span><span class="dot yellow"></span><span class="dot green"></span></div>
        <span class="terminal-title" id="svFile">ticket.log</span>
        <button class="sv-x" id="svX" type="button" aria-label="Cerrar">✕</button>
      </div>
      <div class="sv-body">
        <div class="sv-media">
          <div class="sv-stage" id="svStage">
            <img id="svImg" alt="">
            <div class="sv-empty"><span class="sv-big" id="svIcon"></span><span id="svEmptyId"></span></div>
            <button class="sv-nav sv-prev" id="svPrev" type="button" aria-label="Anterior">‹</button>
            <button class="sv-nav sv-next" id="svNext" type="button" aria-label="Siguiente">›</button>
          </div>
          <p class="sv-caption" id="svCaption"></p>
          <div class="sv-thumbs" id="svThumbs"></div>
        </div>
        <div class="sv-info" id="svInfo"></div>
      </div>
    </div>`;
  document.body.appendChild(viewer);

  const $ = id => viewer.querySelector('#' + id);
  const stage = $('svStage'), img = $('svImg'), caption = $('svCaption'),
        thumbs = $('svThumbs'), info = $('svInfo'), prev = $('svPrev'), next = $('svNext');

  let cur = null, idx = 0, lastFocus = null;

  function render() {
    const c = cur, p = photosOf(c);

    $('svFile').textContent = c.id.toLowerCase() + '.ticket';
    viewer.querySelector('.sv-panel').dataset.cat = c.cat;
    info.dataset.cat = c.cat;

    // imagen
    if (p.length) {
      stage.classList.remove('is-empty');
      img.onerror = () => stage.classList.add('is-empty');
      img.src = p[idx].src;
      img.alt = `${c.title} — foto ${idx + 1}`;
      caption.textContent = (p[idx].caption ? p[idx].caption + ' · ' : '') + `${idx + 1}/${p.length}`;
    } else {
      stage.classList.add('is-empty');
      img.removeAttribute('src');
      caption.textContent = '';
    }
    $('svIcon').textContent = c.icon;
    $('svEmptyId').textContent = c.id;

    prev.hidden = next.hidden = p.length < 2;

    thumbs.innerHTML = p.length > 1 ? p.map((ph, i) =>
      `<button type="button" class="sv-thumb" data-i="${i}" aria-label="Foto ${i + 1}" ${i === idx ? 'aria-current="true"' : ''}><img src="${esc(ph.src)}" alt=""></button>`
    ).join('') : '';

    // ticket
    const fields = [
      ['Problema', c.problema], ['Diagnóstico', c.diagnostico],
      ['Solución', c.solucion], ['Resultado', c.resultado]
    ].filter(f => f[1]);
    info.innerHTML = `
      <div class="sv-meta"><span class="sp-id">${esc(c.id)}</span><span class="sp-status">RESUELTO</span></div>
      <h3>${esc(c.title)}</h3>
      <div class="sv-facts">
        <span>cat: <b>${esc(c.cat)}</b></span>
        ${c.duracion ? `<span>tiempo: <b>${esc(c.duracion)}</b></span>` : ''}
      </div>
      <dl>${fields.map(f => `<div class="sv-field"><dt>${f[0]}</dt><dd>${esc(f[1])}</dd></div>`).join('')}</dl>
      <div class="tag-row">${(c.tags || []).map(t => `<span class="tag">${esc(t)}</span>`).join('')}</div>`;
    info.scrollTop = 0;
  }

  function open(id, trigger) {
    cur = CASES.find(c => c.id === id);
    if (!cur) return;
    idx = 0; lastFocus = trigger || null;
    viewer.style.setProperty('--c', ({ hardware: 'var(--orange)', redes: 'var(--cyan)', software: 'var(--green)', datos: '#d8d8d2' })[cur.cat] || 'var(--cyan)');
    render();
    viewer.classList.add('open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sv-open');
    $('svX').focus();
  }

  function close() {
    viewer.classList.remove('open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('sv-open');
    if (lastFocus) lastFocus.focus();
  }

  function go(d) {
    const n = photosOf(cur).length;
    if (n < 2) return;
    idx = (idx + d + n) % n;
    render();
  }

  grid.addEventListener('click', e => {
    const card = e.target.closest('.sp-card');
    if (card) open(card.dataset.id, card);
  });
  prev.addEventListener('click', () => go(-1));
  next.addEventListener('click', () => go(1));
  thumbs.addEventListener('click', e => {
    const t = e.target.closest('.sv-thumb');
    if (t) { idx = Number(t.dataset.i); render(); }
  });
  $('svX').addEventListener('click', close);
  $('svBackdrop').addEventListener('click', close);
  const red = $('svClose');
  red.addEventListener('click', close);
  red.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); close(); } });

  document.addEventListener('keydown', e => {
    if (!viewer.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  });

  // swipe en celular
  let x0 = null;
  stage.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  });
})();
