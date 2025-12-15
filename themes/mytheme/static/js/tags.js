document.addEventListener("DOMContentLoaded", function() {
    const list = document.getElementById('tags-list');
    const btn = document.getElementById('show-more-tags');
    
    // Safety check: if the widget isn't on the page, stop here
    if (!list || !btn) return;

    const items = Array.from(list.getElementsByClassName('tag-item'));
    const INITIAL_COUNT = 10;
    let visibleCount = INITIAL_COUNT;

    // 1. SORT: Sort items by data-count (Descending)
    items.sort((a, b) => {
        const countA = parseInt(a.getAttribute('data-count') || "0");
        const countB = parseInt(b.getAttribute('data-count') || "0");
        return countB - countA; // Higher count first
    });

    // 2. REORDER: Put them back into the DOM in the new order
    items.forEach(item => list.appendChild(item));

    // 3. TOGGLE VISIBILITY function
    function updateVisibility() {
        items.forEach((item, index) => {
            if (index < visibleCount) {
                item.style.display = ''; // Show (default display)
            } else {
                item.style.display = 'none'; // Hide
            }
        });

        // --- BUTTON LOGIC ---
        
        // Case A: Total items are few (<= 10), hide button completely
        if (items.length <= INITIAL_COUNT) {
            btn.style.display = 'none';
            return;
        }

        // Always ensure button is visible if we have more items than 10
        btn.style.display = 'block';

        // Case B: We are showing ALL items -> Button becomes "Show less"
        if (visibleCount >= items.length) {
            btn.innerText = "Show less";
        } 
        // Case C: There are still hidden items -> Button says "Show more..."
        else {
            btn.innerText = "Show more";
        }
    }

    // 4. INITIALIZE
    updateVisibility();

    // 5. EVENT LISTENER
    btn.addEventListener('click', function(e) {
        e.preventDefault();

        if (visibleCount >= items.length) {
            // If button says "Show less" (we are at the end) -> Collapse back to 10
            visibleCount = INITIAL_COUNT;
            
            // Optional: Smoothly scroll back to the tags widget so the user doesn't get lost
            // list.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            // If button says "Show more" -> Show 10 more
            visibleCount += 10;
        }
        
        updateVisibility();
    });
});