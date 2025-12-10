// Smooth scrolling for navigation links
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

// Breadcrumb navigation update
function updateBreadcrumb() {
    const sections = ['about', 'education', 'experience', 'projects', 'certifications', 'skills', 'hobbies', 'references', 'contact', 'faq'];
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

// Loading spinner functionality
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

// CAPTCHA functionality
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

// Send message functionality
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
        generateCaptcha();
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

// Form validation
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    if (name.value.length < 2) {
        name.classList.add('is-invalid');
        isValid = false;
    } else {
        name.classList.remove('is-invalid');
        name.classList.add('is-valid');
    }
    
    if (!email.validity.valid) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }
    
    if (message.value.length < 10) {
        message.classList.add('is-invalid');
        isValid = false;
    } else {
        message.classList.remove('is-invalid');
        message.classList.add('is-valid');
    }
    
    return isValid;
}

// Initialize functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize breadcrumb updates
    updateBreadcrumb();
    
    // Add real-time validation
    const inputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateForm);
    });
});