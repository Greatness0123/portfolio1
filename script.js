
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const header = document.getElementById('header');
const backToTopButton = document.getElementById('back-to-top');
const progressBars = document.querySelectorAll('.progress-fill');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const currentDateTimeElement = document.getElementById('current-date-time');
const currentYearElement = document.getElementById('current-year');

const jobTitles = [
    { text: "Frontend Developer", color: "var(--primary-400)" },
    { text: "Cloud Engineer", color: "var(--secondary-500)" },
    { text: "Software Programmer", color: "var(--accent-pink)" },
    { text: "Backend Developer", color: "var(--orange-500)" },
    { text: "UI/UX Specialist", color: "var(--purple-500)" }
];

let currentJobIndex = 0;
const jobTitleElement = document.getElementById('job-title');


mobileMenuButton.addEventListener('click', () => {
    const menuIcon = mobileMenuButton.querySelector('i');
    
    if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
        menuIcon.className = 'fas fa-bars';
    } else {
        mobileMenu.style.display = 'block';
        menuIcon.className = 'fas fa-times';
    }
});


window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
        mobileMenuButton.querySelector('i').className = 'fas fa-bars';
    }
});


document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.style.display = 'none';
        mobileMenuButton.querySelector('i').className = 'fas fa-bars';
    });
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, 
                behavior: 'smooth'
            });
        }
    });
});


window.addEventListener('scroll', () => {
    
    if (window.scrollY > 50) {
        header.style.padding = '0.5rem 0';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    } else {
        header.style.padding = '1rem 0';
        header.style.boxShadow = 'none';
    }
    
    
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
    
    
    highlightActiveSection();
});


backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


function highlightActiveSection() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.desktop-nav a, .mobile-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}


function animateJobTitle() {
    
    jobTitleElement.style.color = jobTitles[currentJobIndex].color;
    jobTitleElement.textContent = jobTitles[currentJobIndex].text;
    
    jobTitleElement.style.animation = 'none';
    void jobTitleElement.offsetWidth; 
    jobTitleElement.style.animation = 'swipeUp 3s forwards';
    
   
    setTimeout(() => {
        currentJobIndex = (currentJobIndex + 1) % jobTitles.length;
    }, 2500);
}


setInterval(animateJobTitle, 3000);
animateJobTitle();


function animateSkills() {
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        
        
        bar.style.width = '0%';
        
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                   
                    setTimeout(() => {
                        bar.style.width = `${width}%`;
                    }, 200);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(bar);
    });
}


animateSkills();


filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
       
        const filter = button.getAttribute('data-filter');
        
       
        projectCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});



contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');
    
  
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const consentError = document.getElementById('consent-error');
    
   
    const formSuccess = document.getElementById('form-success');
    const formError = document.getElementById('form-error');
    
    
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    consentError.textContent = '';
    formStatus.textContent = '';
    formSuccess.style.display = 'none';
    formError.style.display = 'none';
    
   
    let isValid = true;
    
    if (!name.value.trim()) {
        nameError.textContent = 'Name is required';
        isValid = false;
    }
    
    if (!email.value.trim()) {
        emailError.textContent = 'Email is required';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        emailError.textContent = 'Please enter a valid email address';
        isValid = false;
    }
    
    if (!message.value.trim()) {
        messageError.textContent = 'Message is required';
        isValid = false;
    }
    
    if (!consent.checked) {
        consentError.textContent = 'You must consent to storing your information';
        isValid = false;
    }
    
    if (isValid) {
        try {
           
            formSuccess.style.display = 'block';
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            contactForm.reset();
          
            setTimeout(() => {
                window.location.href = `mailto:grucookorie@gmail.com?subject=${encodeURIComponent(document.getElementById('subject').value || 'Contact from Portfolio')}&body=${encodeURIComponent('Name: ' + name.value + '\nEmail: ' + email.value + '\n\nMessage: ' + message.value)}`;
            }, 3000);
            
        } catch (error) {
           
            formError.style.display = 'block';
            console.error("Form submission error:", error);
        }
    } else {
        formStatus.textContent = 'Please fix the errors above.';
        formStatus.style.color = 'red';
    }
});


document.querySelectorAll('#contact-form input, #contact-form textarea').forEach(input => {
    input.addEventListener('input', () => {
        const errorElement = document.getElementById(`${input.id}-error`);
        if (errorElement) {
            errorElement.textContent = '';
        }
        formStatus.textContent = '';
    });
});


function updateDateTime() {
    const now = new Date();
    
    
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
   
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true
    };
    
    
    if (currentDateTimeElement) {
        currentDateTimeElement.textContent = `${now.toLocaleDateString('en-US', dateOptions)} | ${now.toLocaleTimeString('en-US', timeOptions)}`;
    }
    
    if (currentYearElement) {
        currentYearElement.textContent = now.getFullYear();
    }
}


updateDateTime();

setInterval(updateDateTime, 1000);

document.addEventListener('DOMContentLoaded', () => {
  
    highlightActiveSection();

    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    }
});