// 1. Scroll suave para navegación
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// 2. Animación de fade-in al hacer scroll
const fadeElements = document.querySelectorAll('.seccion, section');
const fadeInOnScroll = () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('fade-in', 'transition-opacity', 'duration-700');
            el.classList.remove('opacity-0');
        } else {
            el.classList.remove('fade-in');
            el.classList.add('opacity-0');
        }
    });
};
window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('DOMContentLoaded', () => {
    fadeElements.forEach(el => el.classList.add('opacity-0'));
    fadeInOnScroll();
});

// 3. Validación y feedback del formulario de contacto
const form = document.querySelector('form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();
        let errorMsg = '';

        if (nombre.length < 2) errorMsg += 'El nombre es demasiado corto.\n';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errorMsg += 'El correo no es válido.\n';
        if (mensaje.length < 10) errorMsg += 'El mensaje es demasiado corto.\n';

        // Elimina mensajes previos
        let feedback = document.getElementById('form-feedback');
        if (feedback) feedback.remove();

        feedback = document.createElement('div');
        feedback.id = 'form-feedback';
        feedback.style.marginTop = '12px';
        feedback.style.padding = '10px';
        feedback.style.borderRadius = '6px';
        feedback.style.fontWeight = 'bold';

        if (errorMsg) {
            feedback.textContent = errorMsg;
            feedback.style.background = '#fee';
            feedback.style.color = '#c00';
            form.appendChild(feedback);
        } else {
            feedback.textContent = '¡Mensaje enviado correctamente!';
            feedback.style.background = '#e0f7fa';
            feedback.style.color = '#00796b';
            form.appendChild(feedback);
            form.reset();
        }
    });
}

// 4. Efecto hover en tarjetas de habilidades (solo JS, si quieres más interactividad)
document.querySelectorAll('.habilidad, .flex.flex-col.items-center.bg-gray-100').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.07)';
        card.style.boxShadow = '0 4px 16px rgba(0,188,212,0.15)';
        card.style.transition = 'transform 0.2s, box-shadow 0.2s';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
        card.style.boxShadow = '';
    });
});

// 5. Accesibilidad: resalta el enlace activo en el menú
const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
    let current = '';
    ['presentacion', 'experiencia', 'habilidades', 'contacto', 'redes'].forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) current = id;
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('bg-cyan-400', 'text-gray-900');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('bg-cyan-400', 'text-gray-900');
        }
    });
});