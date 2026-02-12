/* ==========================================
   IMAM's PORTFOLIO - MAIN JAVASCRIPT
   Interactive Features & Functionality
   ========================================== */

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================

    const config = {
        typewriterTexts: [
            'Breaking systems securely...',
            'Hunting threats relentlessly...',
            'Defending digital frontiers...',
            'Securing applications...',
            'Analyzing CloudTrail events...',
            'Writing detection rules...',
            'Investigating incidents...'
        ],
        typewriterSpeed: 100,
        typewriterDelay: 2000,
        terminalLines: [
            { type: 'output', text: '[+] Initializing security scan...', class: 'success' },
            { type: 'output', text: '[+] Loading threat intelligence...', class: 'success' },
            { type: 'output', text: '[+] Calibrating detection systems...', class: 'success' },
            { type: 'output', text: '', class: '' },
            { type: 'output', text: '=== OFFENSIVE CAPABILITIES ===', class: 'offensive' },
            { type: 'output', text: '✓ Web/API Penetration Testing', class: 'success' },
            { type: 'output', text: '✓ OWASP Top 10 Expertise', class: 'success' },
            { type: 'output', text: '✓ Burp Suite Proficiency', class: 'success' },
            { type: 'output', text: '✓ Vulnerability Assessment', class: 'success' },
            { type: 'output', text: '', class: '' },
            { type: 'output', text: '=== DEFENSIVE CAPABILITIES ===', class: 'defensive' },
            { type: 'output', text: '✓ SIEM Deployment (ELK Stack)', class: 'success' },
            { type: 'output', text: '✓ Detection Engineering', class: 'success' },
            { type: 'output', text: '✓ Threat Hunting', class: 'success' },
            { type: 'output', text: '✓ Incident Response', class: 'success' },
            { type: 'output', text: '', class: '' },
            { type: 'output', text: '[✓] All systems operational', class: 'success' },
            { type: 'output', text: '[✓] Security status: ENHANCED', class: 'success' }
        ]
    };

    // ============================================
    // TYPEWRITER EFFECT
    // ============================================

    class Typewriter {
        constructor(element, texts, speed = 100, delay = 2000) {
            this.element = element;
            this.texts = texts;
            this.speed = speed;
            this.delay = delay;
            this.textIndex = 0;
            this.charIndex = 0;
            this.isDeleting = false;
        }

        type() {
            const currentText = this.texts[this.textIndex];
            
            if (this.isDeleting) {
                this.element.textContent = currentText.substring(0, this.charIndex - 1);
                this.charIndex--;
            } else {
                this.element.textContent = currentText.substring(0, this.charIndex + 1);
                this.charIndex++;
            }

            let typeSpeed = this.speed;

            if (this.isDeleting) {
                typeSpeed /= 2;
            }

            if (!this.isDeleting && this.charIndex === currentText.length) {
                typeSpeed = this.delay;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.textIndex = (this.textIndex + 1) % this.texts.length;
                typeSpeed = 500;
            }

            setTimeout(() => this.type(), typeSpeed);
        }

        start() {
            this.type();
        }
    }

    // ============================================
    // TERMINAL ANIMATION
    // ============================================

    class Terminal {
        constructor(element, lines) {
            this.element = element;
            this.lines = lines;
            this.currentLine = 0;
        }

        addLine(line) {
            const lineElement = document.createElement('div');
            lineElement.className = `terminal-line ${line.class}`;
            
            if (line.class === 'offensive') {
                lineElement.style.color = '#ff6b9d';
            } else if (line.class === 'defensive') {
                lineElement.style.color = '#00d4ff';
            }
            
            const textElement = document.createElement('span');
            textElement.className = 'output';
            textElement.textContent = line.text;
            
            lineElement.appendChild(textElement);
            this.element.appendChild(lineElement);

            // Scroll to bottom
            this.element.scrollTop = this.element.scrollHeight;
        }

        async start() {
            for (const line of this.lines) {
                await new Promise(resolve => {
                    setTimeout(() => {
                        this.addLine(line);
                        resolve();
                    }, 300);
                });
            }
        }
    }

    // ============================================
    // NAVIGATION
    // ============================================

    class Navigation {
        constructor() {
            this.navbar = document.querySelector('.navbar');
            this.navLinks = document.querySelectorAll('.nav-link');
            this.hamburger = document.querySelector('.hamburger');
            this.navMenu = document.querySelector('.nav-menu');
            this.init();
        }

        init() {
            // Smooth scrolling
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }

                    // Close mobile menu if open
                    if (this.navMenu.classList.contains('active')) {
                        this.toggleMobileMenu();
                    }
                });
            });

            // Hamburger menu
            if (this.hamburger) {
                this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
            }

            // Navbar scroll effect
            window.addEventListener('scroll', () => this.handleScroll());

            // Active link on scroll
            this.handleActiveLink();
            window.addEventListener('scroll', () => this.handleActiveLink());
        }

        toggleMobileMenu() {
            this.hamburger.classList.toggle('active');
            this.navMenu.classList.toggle('active');
        }

        handleScroll() {
            if (window.scrollY > 100) {
                this.navbar.style.background = 'rgba(10, 14, 39, 0.98)';
                this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
            } else {
                this.navbar.style.background = 'rgba(10, 14, 39, 0.95)';
                this.navbar.style.boxShadow = 'none';
            }
        }

        handleActiveLink() {
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;

            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    this.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }
    }

    // ============================================
    // SKILLS SECTION
    // ============================================

    class SkillsManager {
        constructor() {
            this.toggleBtns = document.querySelectorAll('.toggle-btn');
            this.skillCategories = document.querySelectorAll('.skill-category');
            console.log('[Skills] Found', this.toggleBtns.length, 'buttons and', this.skillCategories.length, 'categories');
            this.init();
        }

        init() {
            this.toggleBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    console.log('[Skills] Button clicked');
                    this.handleToggle(btn);
                });
            });
            
            // Set initial state - show only offensive on load
            this.setInitialState();
        }
        
        setInitialState() {
            console.log('[Skills] Setting initial state');
            this.skillCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                if (categoryType === 'defensive') {
                    category.style.display = 'none';
                } else {
                    category.style.display = 'block';
                }
            });
        }

        handleToggle(btn) {
            const mode = btn.getAttribute('data-mode');
            console.log('[Skills] Toggling to mode:', mode);
            
            // Update button states
            this.toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide categories
            this.skillCategories.forEach(category => {
                const categoryType = category.getAttribute('data-category');
                let shouldShow = false;
                
                if (mode === 'all') {
                    // Show everything
                    shouldShow = true;
                } else if (categoryType === 'all') {
                    // Core skills always visible
                    shouldShow = true;
                } else if (categoryType === mode) {
                    // Show matching category
                    shouldShow = true;
                }
                
                console.log('[Skills] Category:', categoryType, 'Mode:', mode, 'Show:', shouldShow);
                
                if (shouldShow) {
                    category.style.display = 'block';
                    category.style.animation = 'fadeInUp 0.6s ease';
                } else {
                    category.style.display = 'none';
                }
            });
        }
    }

    // ============================================
    // SCROLL REVEAL ANIMATIONS
    // ============================================

    class ScrollReveal {
        constructor() {
            this.elements = document.querySelectorAll('[data-aos]');
            this.init();
        }

        init() {
            this.observe();
            window.addEventListener('scroll', () => this.reveal());
            this.reveal(); // Initial check
        }

        observe() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('aos-animate');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });

            this.elements.forEach(element => {
                observer.observe(element);
            });
        }

        reveal() {
            const reveals = document.querySelectorAll('.reveal');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                }
            });
        }
    }

    // ============================================
    // PROJECT CARDS INTERACTION
    // ============================================

    class ProjectCards {
        constructor() {
            this.cards = document.querySelectorAll('.project-card');
            this.init();
        }

        init() {
            this.cards.forEach(card => {
                card.addEventListener('mouseenter', (e) => this.handleMouseEnter(e));
                card.addEventListener('mouseleave', (e) => this.handleMouseLeave(e));
            });
        }

        handleMouseEnter(e) {
            const card = e.currentTarget;
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }

        handleMouseLeave(e) {
            const card = e.currentTarget;
            card.style.transform = 'translateY(0) scale(1)';
        }
    }

    // ============================================
    // MODE TOGGLE (Optional Feature)
    // ============================================

    class ModeToggle {
        constructor() {
            this.toggleBtn = document.getElementById('modeToggle');
            this.init();
        }

        init() {
            if (!this.toggleBtn) return;

            this.toggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');
                
                // Update icon
                const icon = this.toggleBtn.querySelector('i');
                if (document.body.classList.contains('light-mode')) {
                    icon.className = 'fas fa-moon';
                } else {
                    icon.className = 'fas fa-shield-alt';
                }
            });
        }
    }

    // ============================================
    // STATS COUNTER ANIMATION
    // ============================================

    class StatsCounter {
        constructor() {
            this.stats = document.querySelectorAll('.stat-number');
            this.animated = false;
            this.init();
        }

        init() {
            window.addEventListener('scroll', () => this.animateIfVisible());
            this.animateIfVisible(); // Initial check
        }

        animateIfVisible() {
            if (this.animated) return;

            const heroSection = document.querySelector('.hero');
            if (!heroSection) return;

            const rect = heroSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                this.animateCounters();
                this.animated = true;
            }
        }

        animateCounters() {
            this.stats.forEach(stat => {
                const target = stat.textContent;
                const isPercentage = target.includes('%');
                const numericValue = parseInt(target);
                
                if (isNaN(numericValue)) return;

                let current = 0;
                const increment = numericValue / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= numericValue) {
                        current = numericValue;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current) + (isPercentage ? '%' : '');
                }, 40);
            });
        }
    }

    // ============================================
    // UTILITY FUNCTIONS
    // ============================================

    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // ============================================
    // INITIALIZATION
    // ============================================

    function init() {
        // Initialize Typewriter
        const typewriterElement = document.getElementById('typewriter');
        if (typewriterElement) {
            const typewriter = new Typewriter(
                typewriterElement,
                config.typewriterTexts,
                config.typewriterSpeed,
                config.typewriterDelay
            );
            typewriter.start();
        }

        // Initialize Terminal
        const terminalElement = document.getElementById('terminal-output');
        if (terminalElement) {
            const terminal = new Terminal(terminalElement, config.terminalLines);
            setTimeout(() => terminal.start(), 500);
        }

        // Initialize Navigation
        new Navigation();

        // Initialize Skills Manager
        new SkillsManager();

        // Initialize Scroll Reveal
        new ScrollReveal();

        // Initialize Project Cards
        new ProjectCards();

        // Initialize Mode Toggle
        new ModeToggle();

        // Initialize Stats Counter
        new StatsCounter();

        // Add smooth reveal to all sections
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('reveal');
        });

        // Performance: Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        console.log('%c[✓] Cyber Nexus Portfolio Initialized', 'color: #00d4ff; font-weight: bold; font-size: 14px;');
        console.log('%c[+] Breaking systems securely | Hunting threats relentlessly', 'color: #ff6b9d; font-size: 12px;');
        console.log('%c[DEBUG] All systems operational', 'color: #4dffa6; font-size: 12px;');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
