document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Before-After Slider Functionality
    initializeBeforeAfterSlider();
    
    // Testimonial Slider
    initializeTestimonialSlider();
    
    // Comparison Slider
    initializeComparisonSlider();
    
    // Quote Modal
    initializeModal();
    
    // Form Submissions
    initializeFormSubmissions();
});

// Before-After Slider Functionality
function initializeBeforeAfterSlider() {
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const beforeImage = slider.querySelector('.before-image');
        let isDragging = false;
        
        // Set initial position to middle
        beforeImage.style.width = '50%';
        handle.style.left = '50%';
        
        // Touch and mouse events for the handle
        handle.addEventListener('mousedown', startDragging);
        handle.addEventListener('touchstart', startDragging);
        
        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag);
        
        document.addEventListener('mouseup', stopDragging);
        document.addEventListener('touchend', stopDragging);
        
        function startDragging(e) {
            e.preventDefault();
            isDragging = true;
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            let clientX;
            if (e.type === 'touchmove') {
                clientX = e.touches[0].clientX;
            } else {
                clientX = e.clientX;
            }
            
            const sliderRect = slider.getBoundingClientRect();
            let position = (clientX - sliderRect.left) / sliderRect.width * 100;
            
            // Clamp position between 0% and 100%
            position = Math.max(0, Math.min(100, position));
            
            beforeImage.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        }
        
        function stopDragging() {
            isDragging = false;
        }
    });
}

 
// Comparison Slider
function initializeComparisonSlider() {
    const compItems = document.querySelectorAll('.comparison-item');
    const compDots = document.querySelectorAll('.comparison-dots .dot');
    const prevBtn = document.querySelector('.prev-comp');
    const nextBtn = document.querySelector('.next-comp');
    
    if (compItems.length === 0) return;
    
    let currentCompIndex = 0;
    
    // Create additional comparison items (not in HTML yet)
    const comparisonItems = [
        {
            before: {
                title: "Manual Invoicing",
                description: "Time-consuming Excel spreadsheets",
                imgAlt: "Manual Invoice Process"
            },
            after: {
                title: "Automated Invoicing",
                description: "Streamlined Zoho-generated invoices",
                imgAlt: "Automated Invoice Process"
            }
        },
        {
            before: {
                title: "Manual Inventory",
                description: "Error-prone spreadsheet tracking",
                imgAlt: "Manual Inventory Management"
            },
            after: {
                title: "Automated Inventory",
                description: "Real-time Sage inventory control",
                imgAlt: "Automated Inventory Management"
            }
        },
        {
            before: {
                title: "Manual Reporting",
                description: "Hours spent creating reports",
                imgAlt: "Manual Reporting Process"
            },
            after: {
                title: "Automated Reporting",
                description: "Instant Zoho analytics dashboards",
                imgAlt: "Automated Reporting Process"
            }
        }
    ];
    
    // Initialize
    showComparisonItem(0);
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentCompIndex = (currentCompIndex + 1) % comparisonItems.length;
        showComparisonItem(currentCompIndex);
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentCompIndex = (currentCompIndex - 1 + comparisonItems.length) % comparisonItems.length;
        showComparisonItem(currentCompIndex);
    });
    
    // Dot navigation
    compDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentCompIndex = index;
            showComparisonItem(currentCompIndex);
        });
    });
    
    function showComparisonItem(index) {
        const item = comparisonItems[index];
        
        // Update content (assuming structure from HTML)
        const sliderContainer = document.querySelector('.comparison-item');
        
        // Update before content
        const beforeContent = sliderContainer.querySelector('.before-image .content');
        beforeContent.querySelector('h3').textContent = item.before.title;
        beforeContent.querySelector('p').textContent = item.before.description;
        beforeContent.querySelector('img').alt = item.before.imgAlt;
        
        // Update after content
        const afterContent = sliderContainer.querySelector('.after-image .content');
        afterContent.querySelector('h3').textContent = item.after.title;
        afterContent.querySelector('p').textContent = item.after.description;
        afterContent.querySelector('img').alt = item.after.imgAlt;
        
        // Update dots
        compDots.forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === index);
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    console.log('Mobile menu button:', mobileMenuBtn); // Debug
    console.log('Nav menu:', navMenu); // Debug
    
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        console.log('Menu button clicked'); // Debug
        navMenu.classList.toggle('active');
      });
      
      // Close menu when clicking elsewhere
      document.addEventListener('click', function(event) {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(event.target) && 
            !mobileMenuBtn.contains(event.target)) {
          navMenu.classList.remove('active');
        }
      });
    } else {
      console.error('Menu elements not found'); // Debug
    }
  });