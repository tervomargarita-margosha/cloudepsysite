/* ==========================================================================
   Сайт-визитка психолога Маргариты — скрипты
   Чистый JavaScript, без библиотек
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- 1. Мобильное меню (гамбургер) ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  var overlay = document.getElementById('nav-overlay');

  function setMenu(open) {
    if (!burger || !nav) return;
    nav.classList.toggle('is-open', open);
    if (overlay) overlay.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    document.body.classList.toggle('no-scroll', open);
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      setMenu(!nav.classList.contains('is-open'));
    });
    if (overlay) overlay.addEventListener('click', function () { setMenu(false); });
    // Закрываем меню после клика по пункту
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    // Закрываем меню при переходе на десктопную ширину
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) setMenu(false);
    });
  }

  /* ---------- 2. Подсветка активного пункта меню при прокрутке ---------- */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav__link[href^="#"]'));
  if (links.length && 'IntersectionObserver' in window) {
    var map = {};
    links.forEach(function (l) { map[l.getAttribute('href').slice(1)] = l; });

    // Блоки, которые не имеют своего пункта меню, привязываем к ближайшему
    var alias = { diplomas: 'about', video: 'about', values: 'approach', sessions: 'approach', terms: 'formats' };

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = alias[entry.target.id] || entry.target.id;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        if (map[id]) map[id].classList.add('is-active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    document.querySelectorAll('main section[id]').forEach(function (s) { spy.observe(s); });
  }

  /* ---------- 3. Lightbox для дипломов ---------- */
  var lightbox = document.getElementById('lightbox');
  var items = Array.prototype.slice.call(document.querySelectorAll('.gallery__btn'));

  if (lightbox && items.length) {
    var lbImg = lightbox.querySelector('.lightbox__img');
    var btnClose = lightbox.querySelector('.lightbox__close');
    var btnPrev = lightbox.querySelector('.lightbox__nav--prev');
    var btnNext = lightbox.querySelector('.lightbox__nav--next');
    var current = 0;
    var lastFocus = null;

    var show = function (i) {
      current = (i + items.length) % items.length;
      var thumb = items[current].querySelector('img');
      lbImg.src = items[current].getAttribute('data-full') || thumb.src;
      lbImg.alt = thumb.alt;
    };
    var open = function (i) {
      lastFocus = document.activeElement;
      show(i);
      lightbox.classList.add('is-open');
      document.body.classList.add('no-scroll');
      btnClose.focus();
    };
    var close = function () {
      lightbox.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
      if (lastFocus) lastFocus.focus();
    };

    items.forEach(function (btn, i) {
      btn.addEventListener('click', function () { open(i); });
    });
    btnClose.addEventListener('click', close);
    btnPrev.addEventListener('click', function () { show(current - 1); });
    btnNext.addEventListener('click', function () { show(current + 1); });
    // Клик по тёмному фону закрывает окно
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(current - 1);
      if (e.key === 'ArrowRight') show(current + 1);
    });
  }

  /* ---------- 4. Плавное появление блоков (один спокойный приём) ---------- */
  var revealEls = document.querySelectorAll('.timeline__item, .session-pair, .price-card, .value-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { el.classList.add('reveal'); io.observe(el); });
  }

  /* ---------- 5. Форма обратной связи (Formspree) ---------- */
  var form = document.getElementById('contact-form');
  var statusEl = document.getElementById('form-status');

  if (form && statusEl) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.className = 'form__status';

      // Простая проверка полей
      // Внимание: form.name — это имя самой формы, поэтому поля берём через form.elements
      var f = form.elements;
      if (!f['name'].value.trim() || !f['contact'].value.trim() || !f['message'].value.trim()) {
        statusEl.textContent = 'Пожалуйста, заполните все поля.';
        statusEl.classList.add('is-error');
        return;
      }
      if (!f['consent'].checked) {
        statusEl.textContent = 'Нужно согласие на обработку персональных данных.';
        statusEl.classList.add('is-error');
        return;
      }
      // Если action ещё не заменён — подсказываем владельцу сайта
      if (form.action.indexOf('YOUR_ID') !== -1) {
        statusEl.textContent = 'Форма пока не подключена: замените YOUR_ID в index.html (см. README).';
        statusEl.classList.add('is-error');
        return;
      }

      var submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      statusEl.textContent = 'Отправляю…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          statusEl.textContent = 'Спасибо! Сообщение отправлено, я отвечу вам в ближайшее время.';
          statusEl.classList.add('is-ok');
        } else {
          throw new Error('bad status');
        }
      }).catch(function () {
        statusEl.textContent = 'Не получилось отправить. Напишите мне в Telegram: @tervo_psy';
        statusEl.classList.add('is-error');
      }).then(function () {
        submitBtn.disabled = false;
      });
    });
  }

  /* ---------- 6. Год в подвале ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
