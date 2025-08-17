document.addEventListener('DOMContentLoaded', function () {
  let sliderMainscreen = document.querySelector('.mainscreen-slider');

  if (sliderMainscreen) {
    var splide = new Splide(sliderMainscreen, {
      type: 'fade',
      perPage: 1,
      gap: 0,
      perMove: 1,
      pagination: false,
      arrows: false,
    }).mount();


    let prevBtn = document.querySelector('.mainscreen-arrow__prev');
    let nextBtn = document.querySelector('.mainscreen-arrow__next');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        splide.go('<');
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        splide.go('>');
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");

  if (header) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 0) {
        header.classList.add("fixed");
      } else {
        header.classList.remove("fixed");
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", function () {
  const menuItems = document.querySelectorAll(".nav-menu > li");

  menuItems.forEach((item) => {
    const link = item.querySelector("a");

    if (link && item.querySelector(".sub-menu")) {
      link.addEventListener("click", function (e) {
        e.preventDefault();


        menuItems.forEach((el) => {
          if (el !== item) {
            el.classList.remove("active");
          }
        });


        item.classList.toggle("active");
      });
    }
  });


  document.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-menu")) {
      menuItems.forEach((item) => item.classList.remove("active"));
    }
  });
});

const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav-menu__right');
const body = document.body;

if (burger && menu) {
  // Клик по бургеру
  burger.addEventListener('click', (e) => {
    e.stopPropagation(); // чтобы клик по бургеру не срабатывал на document
    const isActive = burger.classList.toggle('active');
    menu.classList.toggle('active', isActive);
    body.classList.toggle('lock', isActive);

    burger.setAttribute('aria-expanded', String(isActive));
    burger.setAttribute('aria-label', isActive ? 'Закрыть меню' : 'Открыть меню');
  });

  // Клик вне меню и бургера
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !burger.contains(e.target)) {
      burger.classList.remove('active');
      menu.classList.remove('active');
      body.classList.remove('lock');
      burger.setAttribute('aria-expanded', 'false');
      burger.setAttribute('aria-label', 'Открыть меню');
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault(); // отменяем стандартный скролл
      const offset = 50; // смещение сверху
      const topPos = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: topPos,
        behavior: 'smooth'
      });
    }
  });
});

// Функция анимации числа
function animateValue(el, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    el.textContent = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}


const items = document.querySelectorAll('.about-advantages__item-num');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
   
      const endValue = parseInt(el.textContent.replace(/\D/g, ''), 10);
      animateValue(el, 0, endValue, 1500); 
      obs.unobserve(el); 
    }
  });
}, {
  threshold: 0.5 
});

items.forEach(item => observer.observe(item));


AOS.init();