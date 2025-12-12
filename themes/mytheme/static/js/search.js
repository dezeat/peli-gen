/**
 * Blog Search & Filter
 * Handles instant search and category filtering for blog posts
 */
(function() {
  'use strict';

  let activeCategory = null;

  /**
   * Initialize search functionality
   */
  function init() {
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-search');
    const categoryButtons = document.querySelectorAll('.category-filter');

    if (!searchInput) return;

    // Search input handler with debounce
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        filterPosts(e.target.value.toLowerCase().trim());
        toggleClearButton(e.target.value);
      }, 150);
    });

    // Clear button handler
    if (clearButton) {
      clearButton.addEventListener('click', () => {
        searchInput.value = '';
        filterPosts('');
        toggleClearButton('');
        searchInput.focus();
      });
    }

    // Category filter handlers
    categoryButtons.forEach(button => {
      button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Toggle active state
        if (activeCategory === category) {
          activeCategory = null;
          button.classList.remove('active');
        } else {
          // Remove active from all buttons
          categoryButtons.forEach(btn => btn.classList.remove('active'));
          activeCategory = category;
          button.classList.add('active');
        }
        
        // Re-filter with current search term
        filterPosts(searchInput.value.toLowerCase().trim());
      });
    });

    // Handle keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      // Focus search on '/' key
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      // Clear search on Escape
      if (e.key === 'Escape' && document.activeElement === searchInput) {
        searchInput.value = '';
        filterPosts('');
        toggleClearButton('');
        searchInput.blur();
      }
    });
  }

  /**
   * Filter posts based on search query and active category
   * @param {string} query - Search query
   */
  function filterPosts(query) {
    const posts = document.querySelectorAll('.post-card');
    const noResults = document.querySelector('.no-results');
    let visibleCount = 0;

    posts.forEach(post => {
      const searchData = post.dataset.search || '';
      const matchesSearch = !query || searchData.includes(query);
      const matchesCategory = !activeCategory || searchData.includes(activeCategory);
      
      if (matchesSearch && matchesCategory) {
        post.style.display = '';
        visibleCount++;
        
        // Highlight matching text if there's a query
        if (query) {
          highlightText(post, query);
        } else {
          removeHighlights(post);
        }
      } else {
        post.style.display = 'none';
        removeHighlights(post);
      }
    });

    // Show/hide no results message
    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  /**
   * Toggle clear button visibility
   * @param {string} value - Input value
   */
  function toggleClearButton(value) {
    const clearButton = document.getElementById('clear-search');
    if (clearButton) {
      clearButton.style.display = value ? 'flex' : 'none';
    }
  }

  /**
   * Highlight matching text in post
   * @param {HTMLElement} post - Post element
   * @param {string} query - Search query
   */
  function highlightText(post, query) {
    // Remove existing highlights first
    removeHighlights(post);
    
    const title = post.querySelector('.post-title a');
    const summary = post.querySelector('.post-summary');
    
    if (title) {
      title.innerHTML = highlight(title.textContent, query);
    }
    if (summary) {
      summary.innerHTML = highlight(summary.textContent, query);
    }
  }

  /**
   * Remove highlights from post
   * @param {HTMLElement} post - Post element
   */
  function removeHighlights(post) {
    const title = post.querySelector('.post-title a');
    const summary = post.querySelector('.post-summary');
    
    if (title) {
      title.innerHTML = title.textContent;
    }
    if (summary) {
      summary.innerHTML = summary.textContent;
    }
  }

  /**
   * Wrap matching text with highlight span
   * @param {string} text - Original text
   * @param {string} query - Search query
   * @returns {string} - Text with highlights
   */
  function highlight(text, query) {
    if (!query) return text;
    
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  /**
   * Escape special regex characters
   * @param {string} string - String to escape
   * @returns {string} - Escaped string
   */
  function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();