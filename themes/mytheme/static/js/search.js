document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Select DOM Elements ---
    const articles = document.querySelectorAll('.post-card');
    const searchInput = document.getElementById('search-input');
    const clearBtn = document.getElementById('clear-search');
    const noResults = document.querySelector('.no-results');
    const catButtons = document.querySelectorAll('.category-filter');
    const tagButtons = document.querySelectorAll('.tag-filter');
    const resetBtn = document.querySelector('.no-results .btn'); // The "Show all" button

    // --- 2. State Management ---
    let state = {
        filterType: 'all', // 'all', 'category', or 'tag'
        filterValue: '',   // e.g., 'career' or 'data engineering'
        searchTerm: ''
    };

    // --- 3. Initialization ---
    function init() {
        // Check URL for existing filters (e.g., ?tag=python or ?category=career)
        const params = new URLSearchParams(window.location.search);
        
        if (params.has('tag')) {
            setFilter('tag', params.get('tag').toLowerCase());
        } else if (params.has('category')) {
            setFilter('category', params.get('category').toLowerCase());
        } else {
            render(); // Render default state
        }
    }

    // --- 4. Core Actions ---

    /**
     * Updates the state and triggers a render
     */
    function setFilter(type, value) {
        state.filterType = type;
        state.filterValue = value;
        
        // Update URL
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete('tag');
        newUrl.searchParams.delete('category');

        if (type !== 'all') {
            newUrl.searchParams.set(type, value);
        }
        
        window.history.pushState({}, '', newUrl);
        render();
    }

    /**
     * Updates search term state and renders
     */
    function setSearch(term) {
        state.searchTerm = term.toLowerCase().trim();
        render();
    }

    /**
     * Visual Logic: Decides which articles to show/hide
     */
    function render() {
        let visibleCount = 0;

        // 1. Update Buttons Visual State
        updateActiveButtons();

        // 2. Show/Hide Clear Button
        if (clearBtn) {
            clearBtn.style.display = state.searchTerm.length > 0 ? 'flex' : 'none';
        }

        // 3. Filter Articles
        articles.forEach(article => {
            const matchesFilter = checkFilterMatch(article);
            const matchesSearch = checkSearchMatch(article);

            if (matchesFilter && matchesSearch) {
                article.style.display = 'flex';
                visibleCount++;
            } else {
                article.style.display = 'none';
            }
        });

        // 4. Toggle No Results Message
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // --- 5. Helper Functions ---

    function updateActiveButtons() {
        // Reset all
        [...catButtons, ...tagButtons].forEach(btn => btn.classList.remove('active'));

        // Highlight Active Category
        if (state.filterType === 'category') {
            const activeBtn = document.querySelector(`.category-filter[data-filter="${state.filterValue}"]`);
            if (activeBtn) activeBtn.classList.add('active');
        } 
        // Highlight Active Tag
        else if (state.filterType === 'tag') {
            const activeBtn = document.querySelector(`.tag-filter[data-tag="${state.filterValue}"]`);
            if (activeBtn) activeBtn.classList.add('active');
        }
        // Highlight "All"
        else {
            const allBtn = document.querySelector('.category-filter[data-filter="all"]');
            if (allBtn) allBtn.classList.add('active');
        }
    }

    function checkFilterMatch(article) {
        if (state.filterType === 'all') return true;
        
        if (state.filterType === 'category') {
            const artCat = article.getAttribute('data-category');
            return artCat === state.filterValue;
        }
        
        if (state.filterType === 'tag') {
            const artTags = article.getAttribute('data-tags');
            // Check if tag is in the comma-separated list
            return artTags.includes(state.filterValue); 
        }
        
        return true;
    }

    function checkSearchMatch(article) {
        if (!state.searchTerm) return true;
        const searchData = article.getAttribute('data-search');
        return searchData.includes(state.searchTerm);
    }

    function resetAll() {
        state.filterType = 'all';
        state.filterValue = '';
        state.searchTerm = '';
        if (searchInput) searchInput.value = '';
        
        const newUrl = new URL(window.location);
        newUrl.searchParams.delete('tag');
        newUrl.searchParams.delete('category');
        window.history.pushState({}, '', newUrl);
        
        render();
    }

    // --- 6. Event Listeners ---

    // Categories
    catButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            if (filter === 'all') {
                setFilter('all', '');
            } else {
                setFilter('category', filter);
            }
        });
    });

    // Tags
    tagButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tag = e.target.getAttribute('data-tag');
            setFilter('tag', tag);
        });
    });

    // Search Input
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            setSearch(e.target.value);
        });
    }

    // Clear Search Button
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            setSearch('');
            searchInput.focus();
        });
    }

    // "Show all posts" button in no-results state
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            resetAll();
        });
    }

    // Run Logic
    init();
});