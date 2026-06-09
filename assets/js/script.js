// MOOVE — interactions du site
(function () {
  function onReady(fn) {
    document.readyState !== 'loading'
      ? fn()
      : document.addEventListener('DOMContentLoaded', fn);
  }

  onReady(function () {
    // Barre de navigation : ombre/fond au scroll
    var nav = document.querySelector('.nav');
    if (nav) {
      var onScroll = function () {
        nav.classList.toggle('scrolled', window.scrollY > 40);
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // Menu burger mobile
    var burger = document.querySelector('.nav-burger');
    var navLinks = document.getElementById('nav-links');
    if (burger && navLinks) {
      var setMenu = function (open) {
        navLinks.classList.toggle('open', open);
        burger.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', open ? 'true' : 'false');
        burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
        document.body.classList.toggle('nav-open', open);
      };
      burger.addEventListener('click', function () {
        setMenu(!navLinks.classList.contains('open'));
      });
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { setMenu(false); });
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') setMenu(false);
      });
    }

    // Animations « reveal » à l'apparition dans le viewport
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.reveal').forEach(function (el) {
      var d = el.getAttribute('data-delay');
      if (d) el.style.transitionDelay = d + 'ms';
      io.observe(el);
    });

    // Formulaire de contact — envoi réel via Web3Forms
    document.querySelectorAll('form[data-devis]').forEach(function (f) {
      f.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var btn = f.querySelector('[type=submit]');
        var old = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = 'Envoi en cours…';

        fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: new FormData(f)
        })
          .then(function (r) { return r.json(); })
          .then(function (data) {
            if (data.success) {
              btn.innerHTML = 'Demande envoyée ✓';
              btn.style.filter = 'saturate(.8)';
              f.reset();
            } else {
              btn.innerHTML = 'Erreur, réessayez';
            }
          })
          .catch(function () {
            btn.innerHTML = 'Erreur réseau, réessayez';
          })
          .finally(function () {
            setTimeout(function () {
              btn.innerHTML = old;
              btn.style.filter = '';
              btn.disabled = false;
            }, 3000);
          });
      });
    });
  });
})();
