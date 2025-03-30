document.addEventListener('DOMContentLoaded', function() {
  // Variables
  const header = document.querySelector('.header');
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const parallaxLayers = document.querySelectorAll('.parallax-layer');
  const newsletterForm = document.querySelector('.newsletter-form');
  const characterCards = document.querySelectorAll('.character-card');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Handle Header Scroll Effect
  function handleScroll() {
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Parallax Effect
    if (parallaxLayers) {
      parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-depth');
        const yPos = -(window.scrollY * speed);
        layer.style.transform = `translateY(${yPos}px)`;
      });
    }
    
    // Animation on Scroll
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionBottom = section.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75 && sectionBottom > 0) {
        section.classList.add('in-view');
      }
    });
  }
  
  window.addEventListener('scroll', handleScroll);
  
  // Initial call to set correct state
  handleScroll();
  
  // Mobile Menu Toggle
  mobileToggle.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
    
    // Change icon
    const icon = mobileToggle.querySelector('i');
    if (navMenu.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });
  
  // Smooth Scrolling for Navigation
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      // Only process if it's a hash link pointing to an ID on this page
      if (this.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        // Close mobile menu if open
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileToggle.classList.remove('active');
          const icon = mobileToggle.querySelector('i');
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        
        if (targetElement) {
          // Calculate offset considering fixed header
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Characters Slider Drag to Scroll
  if (characterCards.length > 0) {
    const slider = document.querySelector('.characters-slider');
    let isDown = false;
    let startX;
    let scrollLeft;
    
    slider.addEventListener('mousedown', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('mouseleave', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    
    slider.addEventListener('mouseup', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    
    slider.addEventListener('mousemove', (e) => {
      if(!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      slider.scrollLeft = scrollLeft - walk;
    });
    
    // Touch support for mobile
    slider.addEventListener('touchstart', (e) => {
      isDown = true;
      slider.classList.add('active');
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    
    slider.addEventListener('touchend', () => {
      isDown = false;
      slider.classList.remove('active');
    });
    
    slider.addEventListener('touchmove', (e) => {
      if(!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  }
  
  // Newsletter Form Submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        // Normally you would send this to a server
        console.log('Newsletter subscription for:', email);
        
        // Show success message
        const formParent = newsletterForm.parentElement;
        const successMessage = document.createElement('div');
        successMessage.className = 'newsletter-success';
        successMessage.innerHTML = `
          <i class="fas fa-check-circle"></i>
          <h3>Thank You!</h3>
          <p>You have successfully subscribed to our newsletter.</p>
        `;
        
        // Replace form with success message
        newsletterForm.style.display = 'none';
        formParent.appendChild(successMessage);
        
        // Optional: Reset form for future use
        emailInput.value = '';
      }
    });
  }
  
  // Trailer Video Modal
  const trailerBtn = document.querySelector('.hero-btns .btn-outline');
  if (trailerBtn) {
    trailerBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Create modal
      const modal = document.createElement('div');
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="video-modal-content">
          <span class="close-modal">&times;</span>
          <div class="video-container">
            <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Echoes of Eternity Trailer" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
        </div>
      `;
      
      document.body.appendChild(modal);
      document.body.style.overflow = 'hidden'; // Prevent scrolling
      
      // Add modal styles dynamically
      const style = document.createElement('style');
      style.textContent = `
        .video-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.9);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .video-modal.active {
          opacity: 1;
        }
        .video-modal-content {
          width: 90%;
          max-width: 960px;
          position: relative;
        }
        .close-modal {
          position: absolute;
          top: -40px;
          right: 0;
          color: white;
          font-size: 3rem;
          cursor: pointer;
          transition: color 0.2s ease;
        }
        .close-modal:hover {
          color: var(--primary-color);
        }
      `;
      document.head.appendChild(style);
      
      // Animate modal in
      setTimeout(() => {
        modal.classList.add('active');
      }, 10);
      
      // Close modal when clicking close button or outside
      const closeModal = modal.querySelector('.close-modal');
      closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => {
          document.body.removeChild(modal);
          document.body.style.overflow = '';
        }, 300);
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
          setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
          }, 300);
        }
      });
    });
  }
  
  // Add animations to elements when they come into view
  const animateElements = document.querySelectorAll('.feature-card, .character-card, .world-image, .video-container');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  });
  
  animateElements.forEach(element => {
    observer.observe(element);
  });
  
  // Add CSS for animations
  const animationStyles = document.createElement('style');
  animationStyles.textContent = `
    .feature-card, .character-card, .world-image, .video-container {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .feature-card.animate, .character-card.animate, .world-image.animate, .video-container.animate {
      opacity: 1;
      transform: translateY(0);
    }
    
    .feature-card:nth-child(2) {
      transition-delay: 0.2s;
    }
    
    .feature-card:nth-child(3) {
      transition-delay: 0.4s;
    }
    
    .character-card {
      transition-delay: calc(var(--character-index, 0) * 0.1s);
    }
  `;
  document.head.appendChild(animationStyles);
  
  // Set delay indices for character cards
  characterCards.forEach((card, index) => {
    card.style.setProperty('--character-index', index);
  });
  
  // Parallax Effect on Mouse Move for Hero Section
  const hero = document.querySelector('.hero');
  if (hero && parallaxLayers.length > 0) {
    hero.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { width, height } = hero.getBoundingClientRect();
      
      // Calculate mouse position as percentage of container
      const xPos = clientX / width - 0.5;
      const yPos = clientY / height - 0.5;
      
      parallaxLayers.forEach(layer => {
        const speed = layer.getAttribute('data-depth');
        const moveX = xPos * 50 * speed;
        const moveY = yPos * 50 * speed;
        
        layer.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
    
    // Reset positions when mouse leaves
    hero.addEventListener('mouseleave', () => {
      parallaxLayers.forEach(layer => {
        layer.style.transform = 'translate(0, 0)';
      });
    });
  }
  
  // Add some loading animations to the hero
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    // Already handled by CSS, but we can enhance it
    const heroTitle = heroContent.querySelector('.hero-title');
    const heroSubtitle = heroContent.querySelector('.hero-subtitle');
    const heroBtns = heroContent.querySelector('.hero-btns');
    
    setTimeout(() => {
      heroTitle.style.opacity = '1';
      heroTitle.style.transform = 'translateY(0)';
      
      setTimeout(() => {
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
        
        setTimeout(() => {
          heroBtns.style.opacity = '1';
          heroBtns.style.transform = 'translateY(0)';
        }, 200);
      }, 200);
    }, 300);
  }
  
  // Play button hover effect
  const playBtn = document.querySelector('.btn-primary');
  if (playBtn) {
    playBtn.addEventListener('mouseenter', () => {
      playBtn.innerHTML = '<i class="fas fa-play"></i> Play Now';
    });
    
    playBtn.addEventListener('mouseleave', () => {
      playBtn.innerHTML = 'Play Now';
    });
  }
}); 