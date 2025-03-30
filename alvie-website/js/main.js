/**
 * ALVIE International - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const primaryMenu = document.querySelector('.primary-menu');
    
    if (mobileMenuToggle && primaryMenu) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            primaryMenu.classList.toggle('active');
        });
    }

    // Submenu dropdowns
    const menuItemsWithChildren = document.querySelectorAll('.menu-item-has-children');
    menuItemsWithChildren.forEach(item => {
        const link = item.querySelector('a');
        const submenu = item.querySelector('.submenu');
        
        if (window.innerWidth > 992) {
            item.addEventListener('mouseenter', function() {
                submenu.style.display = 'block';
                setTimeout(() => {
                    submenu.style.opacity = '1';
                    submenu.style.transform = 'translateY(0)';
                }, 10);
            });
            
            item.addEventListener('mouseleave', function() {
                submenu.style.opacity = '0';
                submenu.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    submenu.style.display = 'none';
                }, 300);
            });
        } else {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                if (submenu.style.display === 'block') {
                    submenu.style.display = 'none';
                } else {
                    submenu.style.display = 'block';
                }
            });
        }
    });

    // Search toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchOverlay = document.createElement('div');
    searchOverlay.className = 'search-overlay';
    searchOverlay.innerHTML = `
        <div class="search-container">
            <form class="search-form">
                <input type="text" placeholder="Tìm kiếm...">
                <button type="submit"><i class="fas fa-search"></i></button>
            </form>
            <button class="close-search"><i class="fas fa-times"></i></button>
        </div>
    `;
    document.body.appendChild(searchOverlay);
    
    if (searchToggle) {
        searchToggle.addEventListener('click', function(e) {
            e.preventDefault();
            searchOverlay.classList.add('active');
            setTimeout(() => {
                searchOverlay.querySelector('input').focus();
            }, 300);
        });
        
        searchOverlay.querySelector('.close-search').addEventListener('click', function() {
            searchOverlay.classList.remove('active');
        });
        
        searchOverlay.querySelector('.search-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input').value;
            if (searchInput) {
                console.log('Search for:', searchInput);
                // Implementation for search functionality
                alert('Đang tìm kiếm: ' + searchInput);
                searchOverlay.classList.remove('active');
            }
        });
    }

    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // Animation on scroll with different entry effects
    const animateElements = [
        { selector: '.service-card', effect: 'slide-up', delay: 100 },
        { selector: '.value-card', effect: 'fade-in', delay: 200 },
        { selector: '.about-content', effect: 'slide-up', delay: 0 },
        { selector: '.project-slide', effect: 'fade-in', delay: 100 },
        { selector: '.section-header', effect: 'fade-in', delay: 0 },
        { selector: '.mission-box, .vision-box', effect: 'scale-in', delay: 100 },
        { selector: '.team-member', effect: 'slide-up', delay: 150 },
        { selector: '.timeline-item', effect: 'slide-up', delay: 200 }
    ];
    
    const animateOnScroll = function() {
        animateElements.forEach(elementInfo => {
            const elements = document.querySelectorAll(elementInfo.selector);
            elements.forEach((element, index) => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    setTimeout(() => {
                        element.classList.add(elementInfo.effect);
                        element.style.visibility = 'visible';
                    }, elementInfo.delay * index);
                }
            });
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check on scroll (throttled for performance)
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                animateOnScroll();
                scrollTimeout = null;
            }, 10);
        }
    });

    // Projects slider with touch support
    const projectsSlider = document.querySelector('.projects-slider');
    let isDown = false;
    let startX;
    let scrollLeft;

    if (projectsSlider) {
        // Mouse events
        projectsSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            projectsSlider.classList.add('active');
            startX = e.pageX - projectsSlider.offsetLeft;
            scrollLeft = projectsSlider.scrollLeft;
        });
        
        projectsSlider.addEventListener('mouseleave', () => {
            isDown = false;
            projectsSlider.classList.remove('active');
        });
        
        projectsSlider.addEventListener('mouseup', () => {
            isDown = false;
            projectsSlider.classList.remove('active');
        });
        
        projectsSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsSlider.offsetLeft;
            const walk = (x - startX) * 2; // Scroll speed
            projectsSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        projectsSlider.addEventListener('touchstart', (e) => {
            isDown = true;
            projectsSlider.classList.add('active');
            startX = e.touches[0].pageX - projectsSlider.offsetLeft;
            scrollLeft = projectsSlider.scrollLeft;
        });
        
        projectsSlider.addEventListener('touchend', () => {
            isDown = false;
            projectsSlider.classList.remove('active');
        });
        
        projectsSlider.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            const x = e.touches[0].pageX - projectsSlider.offsetLeft;
            const walk = (x - startX) * 2;
            projectsSlider.scrollLeft = scrollLeft - walk;
        });
        
        // Add navigation arrows
        const prevButton = document.createElement('button');
        prevButton.className = 'slider-nav prev';
        prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
        
        const nextButton = document.createElement('button');
        nextButton.className = 'slider-nav next';
        nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        projectsSlider.parentNode.appendChild(prevButton);
        projectsSlider.parentNode.appendChild(nextButton);
        
        prevButton.addEventListener('click', () => {
            projectsSlider.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextButton.addEventListener('click', () => {
            projectsSlider.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter form submission with validation
    const newsletterForm = document.querySelector('.newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                    // Valid email format
                    console.log('Newsletter subscription for:', emailInput.value);
                    
                    // Show success message
                    const successMessage = document.createElement('div');
                    successMessage.className = 'form-success';
                    successMessage.innerText = 'Cảm ơn bạn đã đăng ký nhận bản tin từ ALVIE!';
                    
                    const formContainer = newsletterForm.parentNode;
                    formContainer.innerHTML = '';
                    formContainer.appendChild(successMessage);
                } else {
                    // Invalid email format
                    emailInput.classList.add('error');
                    
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'form-error';
                    errorMessage.innerText = 'Vui lòng nhập địa chỉ email hợp lệ';
                    
                    if (!newsletterForm.querySelector('.form-error')) {
                        newsletterForm.appendChild(errorMessage);
                    }
                    
                    emailInput.addEventListener('input', function() {
                        emailInput.classList.remove('error');
                        const existingError = newsletterForm.querySelector('.form-error');
                        if (existingError) {
                            existingError.remove();
                        }
                    });
                }
            }
        });
    }

    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add counter animation for statistics section
    const counters = document.querySelectorAll('.counter-number');
    if (counters.length > 0) {
        const startCountAnimation = () => {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000; // ms
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    const progress = Math.min(elapsedTime / duration, 1);
                    
                    // Easing function for smooth counting
                    const easeOutQuad = progress * (2 - progress);
                    const current = Math.floor(target * easeOutQuad);
                    
                    counter.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };
                
                requestAnimationFrame(updateCounter);
            });
        };

        // Start counter animation when section comes into view
        const statsSection = document.querySelector('.stats-section');
        if (statsSection) {
            const observeStats = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCountAnimation();
                        observeStats.disconnect();
                    }
                });
            }, { threshold: 0.2 });
            
            observeStats.observe(statsSection);
        } else {
            // If no specific section, start when any counter is in view
            const observeCounters = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startCountAnimation();
                        observeCounters.disconnect();
                    }
                });
            }, { threshold: 0.2 });
            
            counters.forEach(counter => {
                observeCounters.observe(counter);
            });
        }
    }

    // Create modal functionality
    const createModal = (content) => {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <div class="modal-body">${content}</div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';
        
        setTimeout(() => {
            modal.classList.add('active');
        }, 10);
        
        modal.querySelector('.modal-close').addEventListener('click', () => {
            closeModal(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
        
        return modal;
    };
    
    const closeModal = (modal) => {
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        }, 300);
    };
    
    // Add video player functionality
    const videoLinks = document.querySelectorAll('.video-link');
    videoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const videoUrl = this.getAttribute('href');
            if (videoUrl) {
                let videoContent;
                
                if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
                    // Parse YouTube URL to extract ID
                    let videoId;
                    if (videoUrl.includes('youtu.be/')) {
                        videoId = videoUrl.split('youtu.be/')[1];
                    } else if (videoUrl.includes('watch?v=')) {
                        videoId = videoUrl.split('watch?v=')[1].split('&')[0];
                    }
                    
                    videoContent = `<iframe width="100%" height="500" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                } else {
                    videoContent = `<video controls width="100%"><source src="${videoUrl}" type="video/mp4"></video>`;
                }
                
                createModal(videoContent);
            }
        });
    });

    // Initialize the page with fade-in animation
    document.body.classList.add('page-loaded');
}); 