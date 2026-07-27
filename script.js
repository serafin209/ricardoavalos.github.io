const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const storedTheme = localStorage.getItem('ricardo-theme');

if (storedTheme) root.dataset.theme = storedTheme;
themeToggle.textContent = root.dataset.theme === 'dark' ? '☀' : '☾';

themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('ricardo-theme', root.dataset.theme);
  themeToggle.textContent = root.dataset.theme === 'dark' ? '☀' : '☾';
});

menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.navlinks a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll?.('.bar').forEach(bar => bar.classList.add('animated'));
    }
  });
}, { threshold: .13 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    let value = 0;
    const timer = setInterval(() => {
      value += Math.max(1, Math.ceil(target / 28));
      if (value >= target) {
        value = target;
        clearInterval(timer);
      }
      el.textContent = value + (target > 5 ? '+' : '+');
    }, 35);
    counterObserver.unobserve(el);
  });
}, { threshold: .7 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

document.querySelectorAll('.filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const category = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
    });
  });
});

window.addEventListener('scroll', () => {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  document.getElementById('scrollProgress').style.width = `${(doc.scrollTop / max) * 100}%`;
});

document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const name = encodeURIComponent(document.getElementById('name').value);
  const email = encodeURIComponent(document.getElementById('email').value);
  const message = encodeURIComponent(document.getElementById('message').value);
  const subject = encodeURIComponent(`Portfolio inquiry from ${decodeURIComponent(name)}`);
  const body = encodeURIComponent(`Name: ${decodeURIComponent(name)}\nEmail: ${decodeURIComponent(email)}\n\n${decodeURIComponent(message)}`);
  window.location.href = `mailto:Ricardoavalos14@icloud.com?subject=${subject}&body=${body}`;
});

document.getElementById('year').textContent = new Date().getFullYear();
