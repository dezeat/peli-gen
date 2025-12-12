/**
 * Carousel functionality for card carousels
 * Handles keyboard navigation, mouse wheel scrolling, fade indicators, and nav buttons
 */
(function() {
  'use strict';

  const CARD_WIDTH = 320;
  const GAP = 24;

  /**
   * Initialize a single carousel element
   * @param {HTMLElement} carousel - The carousel container element
   */
  function initCarousel(carousel) {
    const cardWidth = carousel.querySelector('.carousel-item')?.offsetWidth || CARD_WIDTH;
    const scrollAmount = cardWidth + GAP;

    // Focus carousel on mouse enter for keyboard navigation
    carousel.addEventListener('mouseenter', () => {
      carousel.focus({ preventScroll: true });
    });

    // Also focus on touch start for mobile
    carousel.addEventListener('touchstart', () => {
      carousel.focus({ preventScroll: true });
    }, { passive: true });

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });

    // Mouse wheel horizontal scroll
    carousel.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        e.preventDefault();
        carousel.scrollBy({ left: e.deltaY, behavior: 'auto' });
      }
    }, { passive: false });

    // Initialize fade indicators
    initFades(carousel);
  }

  /**
   * Initialize fade indicators for a carousel
   * @param {HTMLElement} carousel - The carousel container element
   */
  function initFades(carousel) {
    const wrapper = carousel.closest('.carousel-wrapper');
    if (!wrapper) return;

    const fadeLeft = wrapper.querySelector('.carousel-fade-left');
    const fadeRight = wrapper.querySelector('.carousel-fade-right');

    function updateFades() {
      if (fadeLeft) {
        fadeLeft.style.opacity = carousel.scrollLeft > 10 ? '1' : '0';
      }
      if (fadeRight) {
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        fadeRight.style.opacity = carousel.scrollLeft < maxScroll - 10 ? '1' : '0';
      }
    }

    carousel.addEventListener('scroll', updateFades);
    window.addEventListener('resize', updateFades);
    
    // Initial update after a short delay to ensure layout is complete
    setTimeout(updateFades, 100);
  }

  /**
   * Initialize navigation buttons for carousels
   */
  function initNavButtons() {
    document.querySelectorAll('.carousel-nav').forEach(nav => {
      const carouselId = nav.dataset.carousel;
      const carousel = document.getElementById(carouselId);
      const prevBtn = nav.querySelector('.prev');
      const nextBtn = nav.querySelector('.next');

      if (!carousel || !prevBtn || !nextBtn) return;

      const cardWidth = carousel.querySelector('.carousel-item')?.offsetWidth || CARD_WIDTH;
      const scrollAmount = cardWidth + GAP;

      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        carousel.focus({ preventScroll: true });
      });

      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        carousel.focus({ preventScroll: true });
      });
    });
  }

  /**
   * Initialize all carousels on the page
   */
  function init() {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(initCarousel);
    initNavButtons();
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();