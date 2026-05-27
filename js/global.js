document.addEventListener('DOMContentLoaded', () => {
  const btnMenu    = document.getElementById('btnMenu');
  const menuMobile = document.getElementById('menuMobile');

  // Só executa o código se os elementos existirem na página
  if (btnMenu && menuMobile) {
    btnMenu.addEventListener('click', () => {
      menuMobile.classList.toggle('hidden');
    });

    menuMobile.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => menuMobile.classList.add('hidden'))
    );
  }
});