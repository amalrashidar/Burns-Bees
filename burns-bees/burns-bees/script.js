// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    mainNav.style.display = mainNav.classList.contains('open') ? 'flex' : '';
  });
}

// Contact form — opens the visitor's email app with a pre-filled message to Burns Bees
const CONTACT_EMAIL = 'burnsbeesapiary@gmail.com';
const form = document.getElementById('contact-form');
const note = document.getElementById('form-note');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    const subject = `Message from ${name} via Burns Bees website`;
    const body = `${message}\n\n— ${name} (${email})`;
    const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
    note.textContent = "Opening your email app to send this to us — thanks for reaching out! 🐝";
    form.reset();
  });
}

// Fade-in sections on scroll
const revealEls = document.querySelectorAll('.product-card, .award-card, .placeholder-img, .gallery-photo, .about-photo');
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach((el) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease';
  io.observe(el);
});

// Product pricing modal
const modal = document.getElementById('product-modal');
const modalClose = document.getElementById('modal-close');
const modalPanels = {
  honey: document.getElementById('modal-honey'),
  honeycomb: document.getElementById('modal-honeycomb'),
};

function openModal(product) {
  Object.entries(modalPanels).forEach(([key, panel]) => {
    if (panel) panel.hidden = key !== product;
  });
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.product-card[data-product]').forEach((card) => {
  card.addEventListener('click', () => openModal(card.dataset.product));
});

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  modal.querySelectorAll('.modal-cta').forEach((cta) => {
    cta.addEventListener('click', closeModal);
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && !modal.hidden) closeModal();
});
