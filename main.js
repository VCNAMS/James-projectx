// ==================== ACCORDION FUNCTIONALITY ====================
document.addEventListener('DOMContentLoaded', function() {
    // Modules Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            
            // Close other items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // FAQ Accordion
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.parentElement;
            
            // Close other items
            document.querySelectorAll('.faq-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ==================== FORM SUBMISSION ====================
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (name && email && message) {
                // Create success message
                const successMsg = document.createElement('div');
                successMsg.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #00ff88, #00f7ff);
                    color: #0a0e27;
                    padding: 1rem 2rem;
                    border-radius: 50px;
                    font-weight: 600;
                    z-index: 1000;
                    animation: slideInRight 0.5s ease-out;
                `;
                successMsg.textContent = '✓ Message sent successfully!';
                document.body.appendChild(successMsg);
                
                // Reset form
                this.reset();
                
                // Remove message after 3 seconds
                setTimeout(() => {
                    successMsg.style.animation = 'slideOutRight 0.5s ease-out';
                    setTimeout(() => successMsg.remove(), 500);
                }, 3000);
            }
        });
    }

    // ==================== MOUSE FOLLOW EFFECT ====================
    const background = document.querySelector('.background');
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        if (background) {
            background.style.backgroundPosition = `${mouseX * 30}px ${mouseY * 30}px`;
        }
    });

    // ==================== SCROLL ANIMATIONS ====================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
        observer.observe(section);
    });

    // ==================== BUTTON ANIMATIONS ====================
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            
            if (this.style.position === '' || this.style.position === 'static') {
                this.style.position = 'relative';
            }
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ==================== ACTIVE NAV LINK ====================
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.style.color = '#b0b8d4';
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = '#00f7ff';
            }
        });
    });

    // ==================== PROGRESS INDICATORS ====================
    const setupProgressBar = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollTop / docHeight;
        
        // Create or update progress indicator
        let progressBar = document.querySelector('.progress-bar');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #00f7ff, #00ff88, #ff00ff);
                z-index: 999;
                transition: width 0.1s;
            `;
            document.body.appendChild(progressBar);
        }
        progressBar.style.width = (scrollPercent * 100) + '%';
    };
    
    window.addEventListener('scroll', setupProgressBar);

    // ==================== LOADING ANIMATION ====================
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
    });

    // ==================== KEYBOARD SHORTCUTS ====================
    document.addEventListener('keydown', function(e) {
        // Press 'q' to scroll to top
        if (e.key === 'q' || e.key === 'Q') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
});

// Add CSS animation keyframes via JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
    
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== CUSTOM CURSOR ====================
document.addEventListener('DOMContentLoaded', function() {
    const cursor = document.createElement('div');
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid #00f7ff;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        display: none;
        box-shadow: 0 0 10px rgba(0, 247, 255, 0.5);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseout', () => {
        cursor.style.display = 'none';
    });
    
    // Hide default cursor on body
    document.body.style.cursor = 'none';
});

// ==================== PAGE VISIBILITY ====================
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = '👋 Come back!';
    } else {
        document.title = 'Bachelor of Science in Information Technology';
    }
});
