document.addEventListener('DOMContentLoaded', function() {
    // Navigation Toggle
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.innerHTML = navMenu.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.background = 'white';
        }
    });
    
    // Tabs functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab pane
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Interactive image markers
    const markers = document.querySelectorAll('.marker');
    
    markers.forEach(marker => {
        marker.addEventListener('mouseenter', function() {
            const infoId = this.getAttribute('data-info');
            document.getElementById(infoId).style.opacity = '1';
            document.getElementById(infoId).style.visibility = 'visible';
            document.getElementById(infoId).style.transform = 'translateY(0)';
        });
        
        marker.addEventListener('mouseleave', function() {
            const infoId = this.getAttribute('data-info');
            document.getElementById(infoId).style.opacity = '0';
            document.getElementById(infoId).style.visibility = 'hidden';
            document.getElementById(infoId).style.transform = 'translateY(10px)';
        });
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#f44336';
                    setTimeout(() => {
                        field.style.borderColor = '#ddd';
                    }, 2000);
                }
            });
            
            if (isValid) {
                // Simulate form submission
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Wird gesendet...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Vielen Dank für Ihre Anfrage! Wir werden uns in Kürze mit Ihnen in Verbindung setzen.');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            } else {
                alert('Bitte füllen Sie alle erforderlichen Felder aus.');
            }
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .accessory-card, .contact-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = 1;
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initialize animations
    document.querySelectorAll('.benefit-card, .accessory-card, .contact-card').forEach(element => {
        element.style.opacity = 0;
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Form field animations
    const formFields = document.querySelectorAll('.form-group input, .form-group textarea, .form-group select');
    
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        field.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        if (field.value) {
            field.parentElement.classList.add('focused');
        }
    });
});
