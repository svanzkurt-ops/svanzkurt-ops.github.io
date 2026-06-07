// ==================== Navigation Active Link ==================== //
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Mobile Menu Toggle ==================== //
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ==================== Contact Form Handler ==================== //
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Validate form
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// ==================== Scroll Animation ==================== //
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.achievement-card, .project-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==================== Smooth Scroll for Navigation ==================== //
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== Project Links Handler ==================== //
const projectLinks = document.querySelectorAll('.project-link');

projectLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Project details page would be linked here. Replace the href="#" with your actual project URL.');
    });
});

// ==================== Skill Bar Animation ==================== //
const skillBars = document.querySelectorAll('.skill-bar');

const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 50);
            }
            skillBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillBarObserver.observe(bar);
});

// ==================== Counter Animation ==================== //
const stats = document.querySelectorAll('.stat h3');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const finalValue = parseInt(target.textContent);
            let currentValue = 0;
            const increment = Math.ceil(finalValue / 50);
            
            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= finalValue) {
                    target.textContent = finalValue + '+';
                    clearInterval(counter);
                } else {
                    target.textContent = currentValue + '+';
                }
            }, 30);
            
            counterObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    counterObserver.observe(stat);
});

// ==================== Page Load Animation ==================== //
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

// ==================== Dark Mode Toggle (Optional) ==================== //
const darkModeToggle = () => {
    const root = document.documentElement;
    const isDarkMode = root.style.colorScheme === 'dark';
    
    if (isDarkMode) {
        root.style.colorScheme = 'light';
        localStorage.setItem('theme', 'light');
    } else {
        root.style.colorScheme = 'dark';
        localStorage.setItem('theme', 'dark');
    }
};

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.style.colorScheme = savedTheme;
}

// ==================== Keyboard Navigation ==================== //
document.addEventListener('keydown', (e) => {
    // Skip to main content with Alt+M
    if (e.altKey && e.code === 'KeyM') {
        document.querySelector('section').focus();
    }
});

// ==================== Performance: Lazy Load Images ==================== //
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ==================== Console Message ==================== //
console.log('%cWelcome to Svanzkurt\'s Portfolio!', 'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cFeel free to explore and get in touch!', 'color: #ec4899; font-size: 14px;');
