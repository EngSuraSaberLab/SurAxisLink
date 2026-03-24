/**
* Template Name: Orbit
* Template URL: https://bootstrapmade.com/orbit-bootstrap-template/
* Updated: Jan 13 2026 with Bootstrap v5.3.8
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  document.addEventListener('DOMContentLoaded', toggleScrolled);
  window.addEventListener('load', toggleScrolled);
  toggleScrolled();

  const primaryNavCollapse = document.querySelector('#primary-nav');

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (window.innerWidth < 1200 && primaryNavCollapse && primaryNavCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(primaryNavCollapse).hide();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    const preloaderBar = preloader.querySelector('[data-preloader-bar]');
    const preloaderPercent = preloader.querySelector('[data-preloader-percent]');
    const preloaderHint = preloader.querySelector('[data-preloader-hint]');
    const trackedImages = Array.from(document.images).filter((image) => !preloader.contains(image));
    const totalAssets = trackedImages.length;
    let loadedAssets = trackedImages.filter((image) => image.complete).length;
    let targetPreloaderValue = 0;
    let displayedPreloaderValue = 0;
    let preloaderDone = false;
    let rafId = null;

    document.body.classList.add('preload-active');

    const renderPreloaderProgress = (value) => {
      const clampedValue = Math.max(0, Math.min(100, Math.round(value)));
      let hintText = 'Loading services, visuals, and interface assets...';

      if (clampedValue >= 100) {
        hintText = 'Experience ready. Launching SurAxis...';
      } else if (clampedValue >= 85) {
        hintText = 'Finalizing the interface and motion details...';
      } else if (clampedValue >= 60) {
        hintText = 'Preparing services, sections, and visuals...';
      } else if (clampedValue >= 35) {
        hintText = 'Syncing brand elements and page structure...';
      }

      if (preloaderBar) {
        preloaderBar.style.width = `${clampedValue}%`;
      }

      if (preloaderPercent) {
        preloaderPercent.textContent = `${clampedValue}%`;
      }

      if (preloaderHint) {
        preloaderHint.textContent = hintText;
      }
    };

    const getDocumentProgress = () => {
      if (document.readyState === 'complete') {
        return 100;
      }

      if (document.readyState === 'interactive') {
        return 72;
      }

      return 28;
    };

    const getAssetProgress = () => {
      if (totalAssets === 0) {
        return 100;
      }

      return (loadedAssets / totalAssets) * 100;
    };

    const updatePreloaderTarget = () => {
      if (preloaderDone) {
        return;
      }

      const weightedProgress = (getDocumentProgress() * 0.35) + (getAssetProgress() * 0.65);
      targetPreloaderValue = Math.min(weightedProgress, 99);
    };

    const animatePreloaderProgress = () => {
      if (preloaderDone) {
        return;
      }

      displayedPreloaderValue += (targetPreloaderValue - displayedPreloaderValue) * 0.12;

      if (Math.abs(targetPreloaderValue - displayedPreloaderValue) < 0.2) {
        displayedPreloaderValue = targetPreloaderValue;
      }

      renderPreloaderProgress(displayedPreloaderValue);
      rafId = window.requestAnimationFrame(animatePreloaderProgress);
    };

    const markAssetLoaded = () => {
      loadedAssets = Math.min(loadedAssets + 1, totalAssets);
      updatePreloaderTarget();
    };

    trackedImages.forEach((image) => {
      if (image.complete) {
        return;
      }

      image.addEventListener('load', markAssetLoaded, { once: true });
      image.addEventListener('error', markAssetLoaded, { once: true });
    });

    document.addEventListener('readystatechange', updatePreloaderTarget);
    updatePreloaderTarget();
    animatePreloaderProgress();

    const finishPreloader = () => {
      if (preloaderDone) {
        return;
      }

      preloaderDone = true;
      document.removeEventListener('readystatechange', updatePreloaderTarget);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      renderPreloaderProgress(100);
      preloader.classList.add('is-loaded');
      document.body.classList.remove('preload-active');

      window.setTimeout(() => {
        preloader.remove();
      }, 650);
    };

    if (document.readyState === 'complete') {
      finishPreloader();
    } else {
      window.addEventListener('load', finishPreloader, { once: true });
    }
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  /**
   * Global animated backdrop
   */
  function initSiteBackdrop() {
    const particleContainer = document.querySelector('#site-particles');
    const shapes = document.querySelectorAll('.site-backdrop__shape');

    if (!particleContainer || !shapes.length) return;

    const state = {
      particles: [],
      mouseX: window.innerWidth / 2,
      mouseY: window.innerHeight / 2,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      rafId: null
    };

    function updateViewport() {
      state.viewportWidth = window.innerWidth;
      state.viewportHeight = window.innerHeight;
    }

    function particleCount() {
      const densityBase = state.viewportWidth * state.viewportHeight;
      return Math.max(110, Math.min(220, Math.round(densityBase / 14000)));
    }

    function createParticle() {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      const x = Math.random() * state.viewportWidth;
      const y = Math.random() * state.viewportHeight;

      particle.className = 'site-backdrop__particle';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.animationDelay = `${Math.random() * 6}s`;
      particle.style.animationDuration = `${5 + Math.random() * 3}s`;

      particle._x = x;
      particle._y = y;
      particle._size = size;
      particle._speedX = (Math.random() - 0.5) * 0.5;
      particle._speedY = (Math.random() - 0.5) * 0.5;

      particleContainer.appendChild(particle);
      state.particles.push(particle);
    }

    function syncParticlePool() {
      const targetCount = particleCount();

      while (state.particles.length < targetCount) {
        createParticle();
      }

      while (state.particles.length > targetCount) {
        const particle = state.particles.pop();
        particle.remove();
      }
    }

    function animateParticles() {
      state.particles.forEach((particle) => {
        particle._x += particle._speedX;
        particle._y += particle._speedY;

        const dx = state.mouseX - particle._x;
        const dy = state.mouseY - particle._y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          const force = (110 - distance) / 110;
          particle._x -= dx * force * 0.0045;
          particle._y -= dy * force * 0.0045;
        }

        if (particle._x < 0 || particle._x > state.viewportWidth) {
          particle._speedX *= -1;
        }

        if (particle._y < 0 || particle._y > state.viewportHeight) {
          particle._speedY *= -1;
        }

        particle._x = Math.max(0, Math.min(state.viewportWidth, particle._x));
        particle._y = Math.max(0, Math.min(state.viewportHeight, particle._y));

        particle.style.left = `${particle._x}px`;
        particle.style.top = `${particle._y}px`;
      });

      state.rafId = window.requestAnimationFrame(animateParticles);
    }

    shapes.forEach((shape) => {
      shape.style.animationDelay = `${Math.random() * 5}s`;
    });

    document.addEventListener('mousemove', (event) => {
      state.mouseX = event.clientX;
      state.mouseY = event.clientY;

      const ratioX = event.clientX / state.viewportWidth - 0.5;
      const ratioY = event.clientY / state.viewportHeight - 0.5;

      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.45;
        shape.style.setProperty('--shape-shift-x', `${ratioX * speed * 18}px`);
        shape.style.setProperty('--shape-shift-y', `${ratioY * speed * 18}px`);
      });
    });

    window.addEventListener('resize', () => {
      updateViewport();
      syncParticlePool();
    });

    updateViewport();
    syncParticlePool();
    animateParticles();
  }

  window.addEventListener('load', initSiteBackdrop);

  /**
   * Match reference button hover/click ripple behavior
   */
  function initReferenceButtonEffects() {
    const buttons = document.querySelectorAll('.btn-getstarted, .cta-button, .btn-submit');

    if (!buttons.length) return;

    function createRipple(button) {
      const ripple = document.createElement('div');

      ripple.style.position = 'absolute';
      ripple.style.borderRadius = 'inherit';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'button-ripple 0.6s linear';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.marginLeft = '-50px';
      ripple.style.marginTop = '-50px';
      ripple.style.pointerEvents = 'none';
      ripple.style.zIndex = '0';

      button.appendChild(ripple);

      window.setTimeout(() => {
        ripple.remove();
      }, 600);
    }

    function createClickEffect(button) {
      button.style.transform = 'scale(0.95)';

      window.setTimeout(() => {
        button.style.transform = 'scale(1)';
      }, 150);
    }

    buttons.forEach((button) => {
      button.addEventListener('mouseenter', () => {
        createRipple(button);
      });

      button.addEventListener('click', () => {
        createClickEffect(button);
      });
    });
  }

  window.addEventListener('load', initReferenceButtonEffects);

  /**
   * Hero typing animation
   */
  function initHeroTypingAnimation() {
    const tagTypingTargets = Array.from(document.querySelectorAll('#hero .typing-target'))
      .sort((firstElement, secondElement) => {
        const firstSequence = Number(firstElement.dataset.typingSequence || 0);
        const secondSequence = Number(secondElement.dataset.typingSequence || 0);

        return firstSequence - secondSequence;
      });
    const lineTypingTargets = Array.from(document.querySelectorAll('#hero .typing-line'))
      .sort((firstElement, secondElement) => {
        const firstSequence = Number(firstElement.dataset.typingSequence || 0);
        const secondSequence = Number(secondElement.dataset.typingSequence || 0);

        return firstSequence - secondSequence;
      });

    if (!tagTypingTargets.length && !lineTypingTargets.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const mobileQuery = window.matchMedia('(max-width: 576px)');

    const tagTypingState = tagTypingTargets.map((element) => {
      const originalText = element.textContent.trim();
      const measuredHeight = element.offsetHeight || 0;
      const measuredWidth = element.offsetWidth || 0;
      element.dataset.typingOriginal = originalText;

      if (!element.classList.contains('tag-dot')) {
        element.style.minHeight = `${measuredHeight}px`;
      }
      element.dataset.typingMeasuredWidth = `${measuredWidth}`;

      element.textContent = '';

      return {
        element,
        text: originalText
      };
    });
    const lineTypingState = lineTypingTargets.map((element) => {
      const originalText = element.textContent.trim();
      const measuredWidth = element.offsetWidth || 0;

      element.dataset.typingMeasuredWidth = `${measuredWidth}`;
      element.textContent = '';

      return {
        element,
        text: originalText
      };
    });

    function syncTypingLayoutConstraints() {
      const isMobileViewport = mobileQuery.matches;

      tagTypingState.forEach((item) => {
        if (isMobileViewport) {
          item.element.style.minWidth = '0';
          return;
        }

        item.element.style.minWidth = `${Number(item.element.dataset.typingMeasuredWidth || 0)}px`;
      });

      lineTypingState.forEach((item) => {
        if (isMobileViewport) {
          item.element.style.minWidth = '0';
          item.element.style.width = '100%';
          return;
        }

        item.element.style.width = '';
        item.element.style.minWidth = `${Number(item.element.dataset.typingMeasuredWidth || 0)}px`;
      });
    }

    syncTypingLayoutConstraints();
    mobileQuery.addEventListener('change', syncTypingLayoutConstraints);

    function typeText(element, text, speed) {
      return new Promise((resolve) => {
        let index = 0;

        element.classList.add('is-typing');

        function step() {
          element.textContent = text.slice(0, index);
          index += 1;

          if (index <= text.length) {
            window.setTimeout(step, speed);
            return;
          }

          element.textContent = text;
          element.classList.remove('is-typing');
          resolve();
        }

        step();
      });
    }

    function deleteText(element, speed) {
      return new Promise((resolve) => {
        let index = element.textContent.length;

        element.classList.add('is-typing');

        function step() {
          element.textContent = element.textContent.slice(0, index);
          index -= 1;

          if (index >= 0) {
            window.setTimeout(step, speed);
            return;
          }

          element.textContent = '';
          element.classList.remove('is-typing');
          resolve();
        }

        step();
      });
    }

    function waitForVisibility() {
      if (!document.hidden) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        function handleVisibilityChange() {
          if (!document.hidden) {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            resolve();
          }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange);
      });
    }

    async function runTypingSequence() {
      await new Promise((resolve) => window.setTimeout(resolve, 350));

      while (true) {
        await waitForVisibility();

        for (const item of tagTypingState) {
          const speed = item.element.classList.contains('tag-dot') ? 140 : 42;
          await typeText(item.element, item.text, speed);
          await new Promise((resolve) => window.setTimeout(resolve, 180));
        }

        for (const item of lineTypingState) {
          await waitForVisibility();
          await typeText(item.element, item.text, 44);
          await new Promise((resolve) => window.setTimeout(resolve, 220));
        }

        await new Promise((resolve) => window.setTimeout(resolve, 1300));
        await waitForVisibility();

        for (const item of [...lineTypingState].reverse()) {
          await deleteText(item.element, 24);
          await new Promise((resolve) => window.setTimeout(resolve, 140));
        }

        await new Promise((resolve) => window.setTimeout(resolve, 260));
        await waitForVisibility();

        for (const item of [...tagTypingState].reverse()) {
          const speed = item.element.classList.contains('tag-dot') ? 90 : 24;
          await deleteText(item.element, speed);
          await new Promise((resolve) => window.setTimeout(resolve, 120));
        }

        await new Promise((resolve) => window.setTimeout(resolve, 280));
      }
    }

    runTypingSequence();
  }

  window.addEventListener('load', initHeroTypingAnimation);

  /**
   * Why choose section typing animation
   */
  function initWhyChooseTypingAnimation() {
    const section = document.querySelector('#who .hero-content-secondary-custom');
    const targets = Array.from(document.querySelectorAll('#who .typing-once-target'))
      .sort((firstElement, secondElement) => {
        const firstSequence = Number(firstElement.dataset.typingOnceSequence || 0);
        const secondSequence = Number(secondElement.dataset.typingOnceSequence || 0);

        return firstSequence - secondSequence;
      });

    if (!section || !targets.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const state = targets.map((element) => {
      const originalText = element.textContent.trim();
      const measuredHeight = element.offsetHeight || 0;

      element.style.minHeight = `${measuredHeight}px`;
      element.textContent = '';

      return {
        element,
        text: originalText
      };
    });

    function typeText(element, text, speed) {
      return new Promise((resolve) => {
        let index = 0;
        element.classList.add('is-typing');

        function step() {
          element.textContent = text.slice(0, index);
          index += 1;

          if (index <= text.length) {
            window.setTimeout(step, speed);
            return;
          }

          element.textContent = text;
          element.classList.remove('is-typing');
          resolve();
        }

        step();
      });
    }

    async function runSequence() {
      for (const item of state) {
        const speed = item.element.classList.contains('typing-once-paragraph') ? 18 : 42;
        await typeText(item.element, item.text, speed);
        await new Promise((resolve) => window.setTimeout(resolve, 220));
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        runSequence();
      });
    }, {
      threshold: 0.35
    });

    observer.observe(section);
  }

  window.addEventListener('load', initWhyChooseTypingAnimation);

  /**
   * Header language toggle simulation (visual only)
   */
  function initLanguageToggleSimulation() {
    const toggleButton = document.querySelector('.header .lang-toggle');
    const flagElement = toggleButton ? toggleButton.querySelector('.lang-toggle__flag') : null;

    if (!toggleButton) return;

    function applyState(state) {
      const isEnglish = state === 'en';
      toggleButton.classList.toggle('is-en', isEnglish);
      toggleButton.dataset.langState = isEnglish ? 'en' : 'ar';
      toggleButton.setAttribute('aria-pressed', isEnglish ? 'true' : 'false');
      toggleButton.setAttribute('title', isEnglish ? 'Language preview: English' : 'Language preview: Arabic');
      toggleButton.setAttribute('aria-label', isEnglish ? 'Language preview set to English' : 'Language preview set to Arabic');
      if (flagElement) {
        flagElement.classList.toggle('lang-toggle__flag--gb', isEnglish);
        flagElement.classList.toggle('lang-toggle__flag--iq', !isEnglish);
      }
    }

    applyState(toggleButton.dataset.langState === 'en' ? 'en' : 'ar');

    toggleButton.addEventListener('click', () => {
      const nextState = toggleButton.dataset.langState === 'en' ? 'ar' : 'en';
      applyState(nextState);
    });
  }

  window.addEventListener('load', initLanguageToggleSimulation);

})();
