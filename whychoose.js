
// Wait for everything to load
window.addEventListener('load', function() {
    
    let currentCard = 1;
    const totalCards = 6;
    const cards = document.querySelectorAll('.rotate-card');
    const dots = document.querySelectorAll('.dot');
    
    console.log('✓ Script loaded');
    console.log('✓ Found', cards.length, 'cards');
    console.log('✓ Found', dots.length, 'dots');
    
    // Function to remove all active classes
    function removeAllActive() {
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
    }
    
    // Function to highlight a specific card
    function highlightCard(cardNumber) {
        console.log('→ Highlighting card:', cardNumber);
        
        // Remove all active classes first
        removeAllActive();
        
        // Calculate array index
        const cardIndex = cardNumber - 1;
        
        // Add active class to specific card
        if (cards[cardIndex]) {
            cards[cardIndex].classList.add('active');
            console.log('✓ Card', cardNumber, 'activated');
        }
        
        // Add active class to corresponding dot
        if (dots[cardIndex]) {
            dots[cardIndex].classList.add('active');
        }
    }
    
    // Function to rotate to next card
    function rotateCards() {
        currentCard++;
        if (currentCard > totalCards) {
            currentCard = 1;
        }
        highlightCard(currentCard);
    }
    
    // Initialize with card 1
    highlightCard(1);
    
    // Auto-rotate every 3 seconds
    let autoRotate = setInterval(rotateCards, 3000);
    console.log('✓ Auto-rotation started (3 seconds interval)');
    
    // Manual dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(autoRotate);
            currentCard = index + 1;
            highlightCard(currentCard);
            autoRotate = setInterval(rotateCards, 3000);
        });
    });
    
    // Pause on card hover
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            clearInterval(autoRotate);
        });
        
        card.addEventListener('mouseleave', function() {
            autoRotate = setInterval(rotateCards, 3000);
        });
    });
    
    console.log('✓ All event listeners attached');
    console.log('✓ Animation ready!');
});

