// Smooth scroll para links do menu
document.querySelectorAll('.nav-links a, .cta-button').forEach(link => {
    link.addEventListener('click', function(e) {
        if(this.getAttribute('href') && this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
    });
}

// Scroll effect para navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if(window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(135deg, #1a3b1e, #0f2611)';
    } else {
        navbar.style.background = 'linear-gradient(135deg, #2c5f2d, #1a3b1e)';
    }
});