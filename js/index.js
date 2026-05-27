/* ============================================================
   +SPORTS — index.js
   JS específico da Home (index.html).
   Depende do Leaflet (carregado antes deste script no HTML).
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. GERADOR DO CALENDÁRIO ──────────────────────────────
  const calGrid = document.getElementById('calendario-grid');
  if (calGrid) {
    let html = '';
    // Abril 2026 começa na quarta-feira (índice 3)
    for (let i = 0; i < 3; i++) html += '<span></span>';
    for (let d = 1; d <= 30; d++) {
      const isEvent = d === 12 || d === 21 || d === 26;
      if (isEvent) {
        html += `<span class="flex items-center justify-center h-6 rounded-md bg-zinc-800 text-lime font-bold font-mono text-[10px] cursor-pointer hover:bg-lime hover:text-zinc-900 transition-colors">${d}</span>`;
      } else {
        html += `<span class="flex items-center justify-center h-6 rounded-md text-muted font-mono text-[10px] hover:bg-secondary cursor-pointer transition-colors">${d}</span>`;
      }
    }
    calGrid.innerHTML = html;
  }


  // ── 2. SLIDESHOW DO HERO BANNER ───────────────────────────
  const heroData = [
    {
      titulo: 'Corrida do Guerreiro',
      sub:    '21 de Abril · Volta Redonda, RJ · 3K e 5K',
      badge:  'INSCRIÇÕES ABERTAS',
      aberta: true,
      data:   new Date('2026-04-21T06:00:00'),
    },
    {
      titulo: '2ª Meia Maratona do Aço',
      sub:    '12 de Abril · Volta Redonda, RJ · 21K',
      badge:  'INSCRIÇÕES ENCERRADAS',
      aberta: false,
      data:   new Date('2026-04-12T06:00:00'),
    },
    {
      titulo: 'Nutri Day Run',
      sub:    '03 de Maio · Bananal/SP · 5K',
      badge:  'INSCRIÇÕES ABERTAS',
      aberta: true,
      data:   new Date('2026-05-03T07:00:00'),
    },
  ];

  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.slide-dot');
  let current  = 0;
  let timer;

  function goTo(idx) {
    slides[current].classList.remove('active');
    dots[current].style.cssText =
      'width:6px;height:6px;border-radius:9999px;background:rgba(255,255,255,0.3);transition:all .3s;';

    current = idx;

    slides[current].classList.add('active');
    dots[current].style.cssText =
      'width:24px;height:6px;border-radius:9999px;background:#bef264;transition:all .3s;';

    const d = heroData[current];
    document.getElementById('hero-title').textContent = d.titulo;
    document.getElementById('hero-sub').textContent   = d.sub;
    document.getElementById('hero-badge').innerHTML   =
      `<span class="w-1.5 h-1.5 rounded-full bg-lime ${d.aberta ? 'live-pin' : ''}"></span> ${d.badge}`;

    updateCountdown();
  }

  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      startTimer();
    })
  );

  function startTimer() {
    timer = setInterval(() => goTo((current + 1) % slides.length), 5000);
  }
  startTimer();


  // ── 3. COUNTDOWN ─────────────────────────────────────────
  function updateCountdown() {
    const diff = heroData[current].data - new Date();
    if (diff <= 0) {
      ['cd-dias', 'cd-hrs', 'cd-min'].forEach(
        id => (document.getElementById(id).textContent = '00')
      );
      return;
    }
    document.getElementById('cd-dias').textContent =
      String(Math.floor(diff / 86400000)).padStart(2, '0');
    document.getElementById('cd-hrs').textContent =
      String(Math.floor((diff % 86400000) / 3600000)).padStart(2, '0');
    document.getElementById('cd-min').textContent =
      String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
  }
  updateCountdown();
  setInterval(updateCountdown, 60000);


  // ── 4. FILTROS DE EVENTOS ─────────────────────────────────
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filtro-btn').forEach(b => {
        b.classList.remove('bg-lime', 'text-zinc-900');
        b.classList.add('border', 'border-white/20', 'text-muted');
      });
      btn.classList.add('bg-lime', 'text-zinc-900');
      btn.classList.remove('border', 'border-white/20', 'text-muted');
    });
  });


  // ── 5. MINI MAPA — ASIDE (Joga Junto) ────────────────────
  if (document.getElementById('mini-map-aside')) {
    const miniMap = L.map('mini-map-aside', {
      zoomControl:       false,
      dragging:          false,
      scrollWheelZoom:   false,
      doubleClickZoom:   false,
      attributionControl: false,
    }).setView([-22.508, -44.092], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(miniMap);

    const pinSmall = L.divIcon({
      html: '<div style="width:8px;height:8px;border-radius:50%;background:#bef264;box-shadow:0 0 8px #bef264;"></div>',
      className:  '',
      iconAnchor: [4, 4],
    });

    [
      [-22.508, -44.097],
      [-22.502, -44.084],
      [-22.504, -44.071],
      [-22.537, -44.075],
      [-22.524, -44.101],
      [-22.514, -44.094],
    ].forEach(pos => L.marker(pos, { icon: pinSmall }).addTo(miniMap));
  }


  // ── 6. MAPA GRANDE — SEÇÃO JOGA JUNTO ────────────────────
  if (document.getElementById('joga-map')) {
    const jogaMap = L.map('joga-map', {
      zoomControl:        false,
      attributionControl: false,
    }).setView([-22.508, -44.092], 13);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(jogaMap);

    const pinLive = L.divIcon({
      html: '<div style="width:14px;height:14px;border-radius:50%;background:#bef264;box-shadow:0 0 0 3px rgba(190,242,100,0.4),0 0 16px #bef264;"></div>',
      className:  '',
      iconAnchor: [7, 7],
    });

    [
      [-22.508, -44.097],
      [-22.502, -44.084],
      [-22.504, -44.071],
      [-22.537, -44.075],
      [-22.524, -44.101],
      [-22.514, -44.094],
    ].forEach(pos => L.marker(pos, { icon: pinLive }).addTo(jogaMap));
  }

});