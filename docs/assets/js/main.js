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

    // Safety timeout: prevent long blocking on slow mobile networks.
    const isMobileViewport = window.matchMedia('(max-width: 767.98px)').matches;
    window.setTimeout(finishPreloader, isMobileViewport ? 2200 : 6000);
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
    let layout = isotopeItem.getAttribute('data-layout') || 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') || '*';
    let sort = isotopeItem.getAttribute('data-sort') || 'original-order';

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
      if (state.viewportWidth <= 575) {
        return Math.max(24, Math.min(40, Math.round(densityBase / 26000)));
      }
      if (state.viewportWidth <= 991) {
        return Math.max(36, Math.min(70, Math.round(densityBase / 21000)));
      }
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
   * Services flip cards (click/tap)
   */
  function initServiceFlipCards() {
    const cards = Array.from(document.querySelectorAll('[data-service-card]'));
    if (!cards.length) return;

    function closeOtherCards(currentCard) {
      cards.forEach((card) => {
        if (card !== currentCard) {
          card.classList.remove('is-flipped');
        }
      });
    }

    cards.forEach((card) => {
      const trigger = card.querySelector('.service-flip-trigger');
      const backButton = card.querySelector('.service-flip-back');
      const frontFace = card.querySelector('.service-face-front');

      if (trigger) {
        trigger.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          closeOtherCards(card);
          card.classList.add('is-flipped');
        });
      }

      if (backButton) {
        backButton.addEventListener('click', (event) => {
          event.preventDefault();
          event.stopPropagation();
          card.classList.remove('is-flipped');
        });
      }

      if (frontFace) {
        frontFace.addEventListener('click', (event) => {
          if (card.classList.contains('is-flipped')) return;
          if (event.target.closest('.service-flip-trigger')) return;
          card.classList.toggle('is-active');
        });
      }
    });

    document.addEventListener('click', (event) => {
      cards.forEach((card) => {
        if (!card.contains(event.target)) {
          card.classList.remove('is-active');
        }
      });
    });
  }

  window.addEventListener('load', initServiceFlipCards);

  /**
   * Static showcase interactions for GitHub Pages
   */
  function initStaticShowcaseMode() {
    const pageBody = document.body;

    if (!pageBody || pageBody.dataset.staticShowcaseMode !== 'true') return;

    const basePath = pageBody.dataset.staticShowcaseBasePath || '/';
    const mostaqlUrl = pageBody.dataset.staticShowcaseMostaqlUrl || '';
    const isArabic = document.documentElement.lang === 'ar';
    const message = isArabic ? pageBody.dataset.staticShowcaseMessageAr : pageBody.dataset.staticShowcaseMessageEn;
    const buttonLabel = isArabic ? pageBody.dataset.staticShowcaseButtonAr : pageBody.dataset.staticShowcaseButtonEn;
    const ctaLinks = document.querySelectorAll('.btn-getstarted, .hero-start-mobile, .service-back-cta');
    const languageToggle = document.querySelector('[data-static-language-toggle="true"]');
    let noticeTimeoutId = null;

    const notice = document.createElement('div');
    notice.className = 'showcase-notice';
    notice.setAttribute('aria-live', 'polite');
    notice.innerHTML = `
      <div class="showcase-notice__panel">
        <button type="button" class="showcase-notice__close" aria-label="${isArabic ? 'إغلاق' : 'Close'}">&times;</button>
        <div class="showcase-notice__icon"><i class="bi bi-megaphone-fill"></i></div>
        <p class="showcase-notice__message">${message}</p>
        ${mostaqlUrl ? `<a class="showcase-notice__action" href="${mostaqlUrl}" target="_blank" rel="noopener noreferrer">${buttonLabel}</a>` : ''}
      </div>
    `;
    document.body.appendChild(notice);

    function hideNotice() {
      notice.classList.remove('is-visible');
    }

    function showNotice() {
      notice.classList.add('is-visible');
      window.clearTimeout(noticeTimeoutId);
      noticeTimeoutId = window.setTimeout(hideNotice, 5500);
    }

    notice.querySelector('.showcase-notice__close')?.addEventListener('click', hideNotice);
    notice.addEventListener('click', (event) => {
      if (event.target === notice) {
        hideNotice();
      }
    });

    ctaLinks.forEach((link) => {
      link.addEventListener('click', () => {
        showNotice();
      });
    });

    if (languageToggle) {
      languageToggle.addEventListener('click', () => {
        const normalizedBasePath = basePath.endsWith('/') ? basePath : `${basePath}/`;
        const targetPath = document.documentElement.lang === 'ar' ? normalizedBasePath : `${normalizedBasePath}ar/`;
        window.location.href = targetPath;
      });
    }

    window.__staticShowcase = {
      showNotice,
    };
  }

  window.addEventListener('load', initStaticShowcaseMode);

  /**
   * Project inquiry multi-step form
   */
  function initProjectInquiryForm() {
    const inquiryForm = document.querySelector('.project-inquiry-form');

    if (!inquiryForm) return;

    const steps = Array.from(inquiryForm.querySelectorAll('.project-step'));
    const totalSteps = steps.length;
    const prevButton = inquiryForm.querySelector('[data-project-prev]');
    const nextButton = inquiryForm.querySelector('[data-project-next]');
    const submitButton = inquiryForm.querySelector('[data-project-submit]');
    const stepNumberElement = inquiryForm.querySelector('[data-current-step]');
    const progressElement = inquiryForm.querySelector('[data-progress-fill]');
    const progressPercentElement = inquiryForm.querySelector('[data-progress-percent]');
    const progressTrack = inquiryForm.querySelector('.project-form-progress__track');
    const recaptchaContainer = inquiryForm.querySelector('.project-recaptcha[data-recaptcha-required="true"]');
    const recaptchaErrorElement = inquiryForm.querySelector('[data-recaptcha-error]');
    const legalConsentCheckbox = inquiryForm.querySelector('input[name="project_consent"]');
    const successMessage = inquiryForm.querySelector('.sent-message');
    const errorMessage = inquiryForm.querySelector('.error-message');
    const loadingMessage = inquiryForm.querySelector('.loading');
    const staticShowcaseMode = document.body?.dataset.staticShowcaseMode === 'true';
    const staticShowcaseSuccessMessage = document.documentElement.lang === 'ar'
      ? 'يرجى التواصل معي عبر حسابي على مستقل لبدء مشروعك.'
      : 'Please contact me through my Mostaql account to start your project.';
    let currentStep = 1;
    let lastInvalidField = null;
    let recaptchaLoadingPromise = null;
    let recaptchaReady = typeof window.grecaptcha !== 'undefined' && typeof window.grecaptcha.getResponse === 'function';
    const recaptchaWidget = recaptchaContainer ? recaptchaContainer.querySelector('.g-recaptcha') : null;
    const recaptchaSiteKey = recaptchaWidget ? (recaptchaWidget.getAttribute('data-sitekey') || '').trim() : '';
    const recaptchaConfigured = Boolean(recaptchaWidget && recaptchaSiteKey && !/^YOUR_/i.test(recaptchaSiteKey));
    const iraqiPhoneRegex = /^(?:\+9647\d{9}|07\d{9})$/;

    function ensureRecaptchaLoaded() {
      if (staticShowcaseMode) {
        return Promise.resolve(true);
      }

      if (!recaptchaContainer || recaptchaContainer.getAttribute('data-recaptcha-required') !== 'true') {
        return Promise.resolve(true);
      }

      if (!recaptchaConfigured) {
        return Promise.resolve(false);
      }

      if (typeof window.grecaptcha !== 'undefined' && typeof window.grecaptcha.getResponse === 'function') {
        recaptchaReady = true;
        return Promise.resolve(true);
      }

      if (recaptchaLoadingPromise) {
        return recaptchaLoadingPromise;
      }

      recaptchaLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js';
        script.async = true;
        script.defer = true;
        script.onload = () => {
          recaptchaReady = typeof window.grecaptcha !== 'undefined' && typeof window.grecaptcha.getResponse === 'function';
          resolve(recaptchaReady);
        };
        script.onerror = () => {
          recaptchaReady = false;
          resolve(false);
        };
        document.head.appendChild(script);
      });

      return recaptchaLoadingPromise;
    }

    function messageForField(field) {
      if (field.validity.valueMissing) {
        if (field.name === 'phone_whatsapp') {
          return 'Please enter a valid phone or WhatsApp number (e.g. +9647XXXXXXXX)';
        }
        if (field.type === 'checkbox' && field.name === 'project_consent') {
          return 'You must accept the Privacy Policy and Terms of Service before submitting.';
        }
        if (field.type === 'checkbox') return 'Please confirm your consent to continue.';
        return 'This field is required.';
      }

      if (field.validity.typeMismatch && field.type === 'email') {
        return 'Please enter a valid email address.';
      }

      if (field.validity.patternMismatch && field.name === 'phone_whatsapp') {
        return 'Please enter a valid phone or WhatsApp number (e.g. +9647XXXXXXXX)';
      }

      if (field.validity.tooShort) {
        return `Please enter at least ${field.minLength} characters.`;
      }

      return 'Please check this field.';
    }

    function normalizePhoneValue(rawValue) {
      if (typeof rawValue !== 'string') return '';

      const arabicIndicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
      const easternArabicDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

      let normalized = rawValue;

      arabicIndicDigits.forEach((digit, index) => {
        normalized = normalized.replaceAll(digit, String(index));
      });

      easternArabicDigits.forEach((digit, index) => {
        normalized = normalized.replaceAll(digit, String(index));
      });

      normalized = normalized.replace(/\s+/g, '');

      const hasPlus = normalized.includes('+');
      normalized = normalized.replace(/[^\d+]/g, '').replace(/\+/g, '');

      if (hasPlus) {
        normalized = `+${normalized}`;
      }

      return normalized;
    }

    function clearFieldError(field) {
      const wrapper = field.closest('.input-wrapper');
      const group = field.closest('.input-group-custom');
      const choiceGroup = field.closest('.choice-group');
      const consentBlock = field.closest('.consent-check');
      const errorElement = (group && group.querySelector('.field-error')) || (consentBlock && consentBlock.parentElement.querySelector('.field-error'));

      if (wrapper) wrapper.classList.remove('is-invalid');
      if (choiceGroup) choiceGroup.classList.remove('is-invalid');
      if (errorElement) errorElement.textContent = '';
    }

    function syncChoiceVisuals() {
      inquiryForm.querySelectorAll('.choice-group').forEach((group) => {
        group.querySelectorAll('.choice-item').forEach((item) => {
          const input = item.querySelector('input[type="radio"]');
          item.classList.toggle('is-selected', Boolean(input && input.checked));
        });
      });
    }

    function setFieldError(field, message) {
      const wrapper = field.closest('.input-wrapper');
      const group = field.closest('.input-group-custom');
      const choiceGroup = field.closest('.choice-group');
      const consentBlock = field.closest('.consent-check');
      const errorElement = (group && group.querySelector('.field-error')) || (consentBlock && consentBlock.parentElement.querySelector('.field-error'));

      if (wrapper) wrapper.classList.add('is-invalid');
      if (choiceGroup) choiceGroup.classList.add('is-invalid');
      if (errorElement) errorElement.textContent = message;
    }

    function validateStep(stepIndex) {
      const stepElement = steps[stepIndex - 1];
      const requiredFields = Array.from(stepElement.querySelectorAll('[required]'));
      const handledRadioNames = new Set();
      let valid = true;
      lastInvalidField = null;

      requiredFields.forEach((field) => {
        clearFieldError(field);
      });

      requiredFields.forEach((field) => {
        if (field.type === 'radio') {
          if (handledRadioNames.has(field.name)) return;
          handledRadioNames.add(field.name);

          const groupFields = Array.from(stepElement.querySelectorAll(`input[type="radio"][name="${field.name}"]`));
          const isChecked = groupFields.some((radio) => radio.checked);

          if (!isChecked) {
            valid = false;
            setFieldError(field, 'Please choose one option.');
            if (!lastInvalidField) {
              lastInvalidField = field;
            }
          }
          return;
        }

        if (typeof field.value === 'string' && field.value.trim() === '') {
          valid = false;
          setFieldError(field, messageForField(field));
          if (!lastInvalidField) {
            lastInvalidField = field;
          }
          return;
        }

        if (field.name === 'phone_whatsapp') {
          const normalizedValue = normalizePhoneValue(field.value);
          if (field.value !== normalizedValue) {
            field.value = normalizedValue;
          }
          if (!iraqiPhoneRegex.test(normalizedValue)) {
            valid = false;
            setFieldError(field, 'Please enter a valid phone or WhatsApp number (e.g. +9647XXXXXXXX)');
            if (!lastInvalidField) {
              lastInvalidField = field;
            }
            return;
          }
        }

        if (!field.checkValidity()) {
          valid = false;
          setFieldError(field, messageForField(field));
          if (!lastInvalidField) {
            lastInvalidField = field;
          }
        }
      });

      return valid;
    }

    function focusFirstInvalidField() {
      if (!lastInvalidField) return;

      const header = document.querySelector('#header');
      const headerHeight = header ? header.offsetHeight : 0;
      const targetElement = lastInvalidField.closest('.input-wrapper, .choice-group, .consent-check') || lastInvalidField;
      const targetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const offsetTop = Math.max(0, targetTop - headerHeight - 18);
      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

      window.scrollTo({ top: offsetTop, behavior });

      if (typeof lastInvalidField.focus === 'function') {
        window.setTimeout(() => {
          lastInvalidField.focus({ preventScroll: true });
        }, 140);
      }
    }

    function validateRecaptcha() {
      if (staticShowcaseMode) return true;

      if (!recaptchaContainer || recaptchaContainer.getAttribute('data-recaptcha-required') !== 'true') return true;

      if (recaptchaErrorElement) {
        recaptchaErrorElement.textContent = '';
      }

      if (!recaptchaConfigured) {
        if (recaptchaErrorElement) {
          recaptchaErrorElement.textContent = 'Please set a valid reCAPTCHA site key in the template.';
        }
        return false;
      }

      if (!recaptchaReady || typeof grecaptcha === 'undefined' || typeof grecaptcha.getResponse !== 'function') {
        if (recaptchaErrorElement) {
          recaptchaErrorElement.textContent = 'reCAPTCHA is still loading. Please wait a moment.';
        }
        return false;
      }

      const token = grecaptcha.getResponse();
      if (!token) {
        if (recaptchaErrorElement) {
          recaptchaErrorElement.textContent = 'Please complete the reCAPTCHA check.';
        }
        return false;
      }

      return true;
    }

    function updateProgress(stepIndex) {
      const progressPercentage = Math.round((stepIndex / totalSteps) * 100);

      if (stepNumberElement) stepNumberElement.textContent = `${stepIndex}`;
      if (progressElement) progressElement.style.width = `${progressPercentage}%`;
      if (progressPercentElement) progressPercentElement.textContent = `${progressPercentage}%`;
      if (progressTrack) progressTrack.setAttribute('aria-valuenow', `${stepIndex}`);
    }

    function updateSubmitAvailability() {
      if (!submitButton) return;

      const isLastStep = currentStep === totalSteps;
      const isConsentChecked = legalConsentCheckbox ? legalConsentCheckbox.checked : true;
      submitButton.disabled = isLastStep ? !isConsentChecked : true;
      submitButton.setAttribute('aria-disabled', submitButton.disabled ? 'true' : 'false');
    }

    function updateNavigation(stepIndex) {
      if (prevButton) prevButton.hidden = stepIndex === 1;
      if (nextButton) nextButton.hidden = stepIndex === totalSteps;
      if (submitButton) submitButton.hidden = stepIndex !== totalSteps;
      updateSubmitAvailability();
    }

    function scrollToFormTop() {
      const formCard = inquiryForm.closest('.form-card');
      const cardHeader = formCard ? formCard.querySelector('.form-card-header') : null;
      const target = cardHeader || inquiryForm;
      if (!target) return;

      const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
      window.setTimeout(() => {
        const header = document.querySelector('#header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.pageYOffset;
        const offsetTop = Math.max(0, targetTop - headerHeight - 12);
        window.scrollTo({ top: offsetTop, behavior });
      }, 40);
    }

    function showStep(stepIndex) {
      currentStep = Math.max(1, Math.min(totalSteps, stepIndex));

      steps.forEach((stepElement, index) => {
        const isActive = index + 1 === currentStep;
        stepElement.hidden = !isActive;
        stepElement.classList.toggle('is-active', isActive);
      });

      updateNavigation(currentStep);
      updateProgress(currentStep);

      if (currentStep === totalSteps) {
        ensureRecaptchaLoaded();
      }
    }

    inquiryForm.querySelectorAll('input, select, textarea').forEach((field) => {
      field.addEventListener('input', () => {
        if (field.name === 'phone_whatsapp') {
          const normalizedPhone = normalizePhoneValue(field.value);
          if (field.value !== normalizedPhone) {
            field.value = normalizedPhone;
          }
          const phoneValue = normalizedPhone;
          const isValidPhone = iraqiPhoneRegex.test(phoneValue);
          if (phoneValue === '' || isValidPhone) {
            clearFieldError(field);
          } else {
            setFieldError(field, 'Please enter a valid phone or WhatsApp number (e.g. +9647XXXXXXXX)');
          }
        } else {
          clearFieldError(field);
        }
        if (successMessage) successMessage.style.display = 'none';
        if (field === legalConsentCheckbox) {
          updateSubmitAvailability();
        }
      });
      field.addEventListener('change', () => {
        if (field.name === 'phone_whatsapp') {
          const normalizedPhone = normalizePhoneValue(field.value);
          if (field.value !== normalizedPhone) {
            field.value = normalizedPhone;
          }
          const phoneValue = normalizedPhone;
          const isValidPhone = iraqiPhoneRegex.test(phoneValue);
          if (phoneValue === '' || isValidPhone) {
            clearFieldError(field);
          } else {
            setFieldError(field, 'Please enter a valid phone or WhatsApp number (e.g. +9647XXXXXXXX)');
          }
        } else {
          clearFieldError(field);
        }
        syncChoiceVisuals();
        if (successMessage) successMessage.style.display = 'none';
        if (field === legalConsentCheckbox) {
          updateSubmitAvailability();
        }
      });
    });

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (!validateStep(currentStep)) {
          focusFirstInvalidField();
          return;
        }
        showStep(currentStep + 1);
        scrollToFormTop();
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        showStep(currentStep - 1);
        scrollToFormTop();
      });
    }

    inquiryForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      let allValid = true;

      for (let stepIndex = 1; stepIndex <= totalSteps; stepIndex += 1) {
        if (!validateStep(stepIndex)) {
          allValid = false;
          showStep(stepIndex);
          window.setTimeout(() => {
            focusFirstInvalidField();
          }, 60);
          break;
        }
      }

      if (!allValid) {
        return;
      }

      if (staticShowcaseMode) {
        if (errorMessage) errorMessage.style.display = 'none';
        if (loadingMessage) loadingMessage.style.display = 'none';
        if (successMessage) {
          successMessage.textContent = staticShowcaseSuccessMessage;
          successMessage.style.display = 'block';
        }
        if (window.__staticShowcase && typeof window.__staticShowcase.showNotice === 'function') {
          window.__staticShowcase.showNotice();
        }
        return;
      }

      await ensureRecaptchaLoaded();

      if (!validateRecaptcha()) {
        return;
      }

      const formData = new FormData(inquiryForm);

      if (errorMessage) errorMessage.style.display = 'none';
      if (successMessage) successMessage.style.display = 'none';
      if (loadingMessage) loadingMessage.style.display = 'block';

      try {
        const response = await fetch(inquiryForm.action, {
          method: 'POST',
          body: formData,
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        });

        const payload = await response.json().catch(() => ({ ok: false, message: 'Unexpected server response.' }));
        if (!response.ok || !payload.ok) {
          if (errorMessage) {
            errorMessage.textContent = payload.message || 'Could not submit your request. Please try again.';
            errorMessage.style.display = 'block';
          }
          return;
        }

        inquiryForm.reset();
        showStep(1);
        if (successMessage) successMessage.style.display = 'block';
      } catch (_) {
        if (errorMessage) {
          errorMessage.textContent = 'Network error. Please check your connection and try again.';
          errorMessage.style.display = 'block';
        }
      } finally {
        if (loadingMessage) loadingMessage.style.display = 'none';
      }

      if (typeof grecaptcha !== 'undefined' && typeof grecaptcha.reset === 'function' && recaptchaConfigured) {
        grecaptcha.reset();
      }
    });

    showStep(1);
    syncChoiceVisuals();
    updateSubmitAvailability();
  }

  window.addEventListener('load', initProjectInquiryForm);

  /**
   * Hero typing animation
   */
  function initHeroTypingAnimation() {
    const heroSection = document.querySelector('#hero');
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
    const revealTargets = Array.from(document.querySelectorAll('#hero [data-hero-reveal]'));
    const questionMark = document.querySelector('#hero .tag-question-mark');
    let heroDetailsRevealed = false;

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

    if (questionMark) {
      questionMark.classList.add('question-mark-animated');
    }

    function popQuestionMark() {
      if (!questionMark) return;
      questionMark.classList.remove('is-popped');
      void questionMark.offsetWidth;
      questionMark.classList.add('is-popped');
    }

    function hideQuestionMark() {
      if (!questionMark) return;
      questionMark.classList.remove('is-popped');
    }

    function popStepBadge(element) {
      if (!element || !element.dataset.stepNumber) return;
      element.classList.remove('step-popped');
      void element.offsetWidth;
      element.classList.add('step-popped');
    }

    function hideStepBadge(element) {
      if (!element || !element.dataset.stepNumber) return;
      element.classList.remove('step-popped');
    }

    function setHeroDetailsVisible(visible) {
      revealTargets.forEach((element) => {
        element.classList.toggle('is-visible', visible);
      });
    }

    function syncHeroDetailsVisibilityMode() {
      if (!heroSection || !revealTargets.length) return;
      heroSection.classList.add('hero-typing-ready');
      setHeroDetailsVisible(heroDetailsRevealed);
    }

    syncHeroDetailsVisibilityMode();

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
          const speed = item.element.classList.contains('tag-dot') ? 140 : 60;
          await typeText(item.element, item.text, speed);
          await new Promise((resolve) => window.setTimeout(resolve, 180));
        }
        popQuestionMark();

        for (const item of lineTypingState) {
          await waitForVisibility();
          const lineTypingSpeed = mobileQuery.matches ? 44 : 60;
          const linePause = mobileQuery.matches ? 120 : 220;
          popStepBadge(item.element);
          await new Promise((resolve) => window.setTimeout(resolve, 90));
          await typeText(item.element, item.text, lineTypingSpeed);
          await new Promise((resolve) => window.setTimeout(resolve, linePause));
        }

        if (!heroDetailsRevealed) {
          heroDetailsRevealed = true;
          syncHeroDetailsVisibilityMode();
        }

        await new Promise((resolve) => window.setTimeout(resolve, 2000));
        await waitForVisibility();

        for (const item of [...lineTypingState].reverse()) {
          hideStepBadge(item.element);
          await deleteText(item.element, 24);
          await new Promise((resolve) => window.setTimeout(resolve, 140));
        }

        await new Promise((resolve) => window.setTimeout(resolve, 260));
        await waitForVisibility();
        hideQuestionMark();

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

})();
