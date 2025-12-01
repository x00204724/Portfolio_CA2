// Dynamic content functionality

// 1. Animated skill bars
document.addEventListener('DOMContentLoaded', function() {
    // Animate progress bars when they come into view
    const progressBars = document.querySelectorAll('.progress-bar');
    
    const animateProgressBars = () => {
        progressBars.forEach(bar => {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                bar.style.transition = 'width 2s ease-in-out';
            }
        });
    };
    
    window.addEventListener('scroll', animateProgressBars);
    animateProgressBars(); // Run once on load
});

// 2. Dynamic date and time in footer
function updateDateTime() {
    const now = new Date();
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
    };
    const dateTimeString = now.toLocaleDateString('en-US', options);
    
    const footerElement = document.getElementById('current-time');
    if (footerElement) {
        footerElement.textContent = `Last updated: ${dateTimeString}`;
    }
}

// Update time every minute
setInterval(updateDateTime, 60000);
updateDateTime(); // Run once on load

// Initialize tooltips on page load
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// 3. Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 4. Professional status updates
const statusUpdates = [
    "Currently seeking internship opportunities for Summer 2025",
    "Available for networking and collaboration opportunities",
    "Actively developing cloud computing and data visualization skills",
    "Open to discussing technology projects and innovations"
];

function displayStatusUpdate() {
    const statusElement = document.getElementById('status-update');
    if (statusElement) {
        const randomStatus = statusUpdates[Math.floor(Math.random() * statusUpdates.length)];
        statusElement.textContent = randomStatus;
    }
}

// Update status every 15 seconds
setInterval(displayStatusUpdate, 15000);
displayStatusUpdate(); // Run once on load

// 5. Project filter functionality
function filterProjects(year) {
    const carousel = document.getElementById('projectCarousel');
    const items = carousel.querySelectorAll('.carousel-item');
    
    if (year === 'all') {
        items.forEach(item => item.style.display = 'block');
    } else {
        items.forEach((item, index) => {
            const yearMatch = item.textContent.includes(`${year}th Year`);
            item.style.display = yearMatch ? 'block' : 'none';
        });
    }
}

// 6. Initialize tooltips
document.addEventListener('DOMContentLoaded', function() {
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});

// 7. Breadcrumb navigation update
function updateBreadcrumb() {
    const sections = ['about', 'education', 'experience', 'projects', 'skills', 'hobbies', 'contact'];
    const currentSection = document.getElementById('current-section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element && element.getBoundingClientRect().top <= 100) {
                current = section;
            }
        });
        
        if (current && currentSection) {
            currentSection.textContent = current.charAt(0).toUpperCase() + current.slice(1);
        }
    });
}

// 8. Download CV functionality
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'cv.pdf';
    link.download = 'Annit_Maria_Binu_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// 9. Loading spinner functionality
function showLoading(button) {
    const spinner = button.querySelector('.spinner-border');
    spinner.classList.remove('d-none');
    button.disabled = true;
    
    setTimeout(() => {
        spinner.classList.add('d-none');
        button.disabled = false;
        alert('Message sent successfully!');
    }, 2000);
}

// 10. CAPTCHA functionality
let captchaAnswer = 0;

function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    
    const captchaQuestion = document.getElementById('captcha-question');
    if (captchaQuestion) {
        captchaQuestion.textContent = `${num1} + ${num2}`;
    }
}

// Generate CAPTCHA when modal opens
document.addEventListener('DOMContentLoaded', function() {
    const contactModal = document.getElementById('contactModal');
    if (contactModal) {
        contactModal.addEventListener('shown.bs.modal', generateCaptcha);
    }
});

// 11. Send message functionality
function sendMessage() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const captchaInput = document.getElementById('captcha').value;
    
    if (!name || !email || !message || !captchaInput) {
        alert('Please fill in all fields.');
        return;
    }
    
    // Verify CAPTCHA
    if (parseInt(captchaInput) !== captchaAnswer) {
        alert('Incorrect security answer. Please try again.');
        generateCaptcha(); // Generate new CAPTCHA
        document.getElementById('captcha').value = '';
        return;
    }
    
    // Create mailto link
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;
    const mailtoLink = `mailto:annitbinu21@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Clear form and generate new CAPTCHA
    document.getElementById('contactForm').reset();
    document.getElementById('captcha').value = '';
    generateCaptcha();
    
    // Close modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
    modal.hide();
}

// Initialize breadcrumb updates
updateBreadcrumb();