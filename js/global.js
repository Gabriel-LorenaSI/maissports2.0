document.addEventListener('DOMContentLoaded', () => {
  const btnMenu    = document.getElementById('btnMenu');
  const menuMobile = document.getElementById('menuMobile');
  const eventLinkSelector = '[data-event-link]';
  const interactiveSelector = 'a, button, input, select, textarea, label, summary, [data-no-nav]';

  // Só executa o código se os elementos existirem na página
  if (btnMenu && menuMobile) {
    btnMenu.addEventListener('click', () => {
      menuMobile.classList.toggle('hidden');
    });

    menuMobile.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menuMobile.classList.add('hidden'))
    );
  }

  document.querySelectorAll(eventLinkSelector).forEach(surface => {
    if (surface.dataset.eventLinkBound === 'true') return;

    const navigateToEvent = () => {
      const targetUrl = surface.getAttribute('data-event-link');
      if (targetUrl) window.location.href = targetUrl;
    };

    surface.addEventListener('click', event => {
      if (event.target.closest(interactiveSelector)) return;
      navigateToEvent();
    });

    surface.addEventListener('keydown', event => {
      if (event.target !== surface) return;
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      navigateToEvent();
    });

    surface.dataset.eventLinkBound = 'true';
  });
});
