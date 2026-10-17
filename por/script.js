const currentYear = document.getElementById('current-year');
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

const words = [
  'Web Developer',
  'Laravel Enthusiast',
  'Software Engineering Student',
  'PHP & Java Programmer'
];

let wordIndex = 0;
let typingTimer;

function typingEffect() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  const currentWord = words[wordIndex].split('');

  const loopTyping = () => {
    if (currentWord.length > 0) {
      typingText.innerHTML += currentWord.shift();
      typingTimer = setTimeout(loopTyping, 100);
    } else {
      setTimeout(deletingEffect, 1600);
    }
  };

  typingText.innerHTML = '';
  loopTyping();
}

function deletingEffect() {
  const typingText = document.getElementById('typing-text');
  if (!typingText) return;

  const currentWord = words[wordIndex].split('');

  const loopDeleting = () => {
    if (currentWord.length > 0) {
      currentWord.pop();
      typingText.innerHTML = currentWord.join('');
      typingTimer = setTimeout(loopDeleting, 50);
    } else {
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typingEffect, 400);
    }
  };

  loopDeleting();
}

if (document.getElementById('typing-text')) {
  typingEffect();
}

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

mobileLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileMenu) {
      mobileMenu.classList.add('hidden');
    }
  });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterBtns.forEach((b) => {
      b.classList.remove('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/20');
      b.classList.add('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800');
    });

    btn.classList.add('bg-indigo-600', 'text-white', 'shadow-lg', 'shadow-indigo-600/20');
    btn.classList.remove('bg-slate-900', 'text-slate-300', 'border', 'border-slate-800');

    const filterValue = btn.getAttribute('data-filter');

    projectCards.forEach((card) => {
      const matches = filterValue === 'all' || card.getAttribute('data-category') === filterValue;
      card.style.display = matches ? 'block' : 'none';
    });
  });
});

function showToast(title, desc, iconClass = 'fa-solid fa-circle-check') {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toast-title');
  const toastDesc = document.getElementById('toast-desc');
  const toastIcon = document.getElementById('toast-icon');

  if (!toast || !toastTitle || !toastDesc || !toastIcon) {
    return;
  }

  toastTitle.innerText = title;
  toastDesc.innerText = desc;
  toastIcon.innerHTML = `<i class="${iconClass}"></i>`;

  toast.classList.remove('translate-y-32', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-32', 'opacity-0');
  }, 4000);
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const message = name ? `Terima kasih ${name}, pesan Anda berhasil dikirim ke Zaki.` : 'Terima kasih, pesan Anda berhasil dikirim ke Zaki.';
    showToast('Pesan Terkirim!', message);
    e.target.reset();
  });
}

const downloadCvBtn = document.getElementById('download-cv-btn');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', () => {
    showToast('Mengunduh CV...', 'Kurikulum Vitae Zaki Firmansah sedang disiapkan.', 'fa-solid fa-file-arrow-down');
  });
}

const revealElements = document.querySelectorAll('.reveal');
if (revealElements.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach((element) => revealObserver.observe(element));
}

const navLinks = document.querySelectorAll('nav a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
  const scrollPosition = window.scrollY + 160;

  sections.forEach((section) => {
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPosition >= top && scrollPosition < bottom) {
      navLinks.forEach((link) => {
        link.classList.remove('text-indigo-400');
        link.classList.add('text-slate-300');
      });

      const activeLink = document.querySelector(`nav a[href="#${id}"]`);
      if (activeLink) {
        activeLink.classList.remove('text-slate-300');
        activeLink.classList.add('text-indigo-400');
      }
    }
  });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
  const percent = windowHeight > 0 ? (scrollTop / windowHeight) * 100 : 0;
  if (scrollProgress) {
    scrollProgress.style.width = `${percent}%`;
  }

  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.classList.toggle('hidden', scrollTop < 500);
    backToTop.classList.toggle('flex', scrollTop >= 500);
  }
});

document.getElementById('back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const statCounters = document.querySelectorAll('[data-count]');
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = Number(counter.dataset.count || 0);
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        counter.textContent = `${start}${target === 100 ? '%' : '+'}`;
        if (start >= target) {
          clearInterval(interval);
          if (target === 100) {
            counter.textContent = '100%';
          }
        }
      }, 35);
      statObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

statCounters.forEach((counter) => statObserver.observe(counter));

document.querySelectorAll('.btn-ripple').forEach((button) => {
  button.addEventListener('click', (event) => {
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.className = 'ripple';

    const existingRipple = button.querySelector('.ripple');
    if (existingRipple) existingRipple.remove();

    button.appendChild(circle);
  });
});

document.querySelectorAll('[data-tilt]').forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = (0.5 - (y / rect.height)) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  });
});

const copyEmailBtn = document.getElementById('copy-email-btn');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('zakifirmansah@example.com');
      showToast('Email Disalin!', 'Alamat email berhasil disalin ke clipboard.', 'fa-solid fa-copy');
    } catch (error) {
      showToast('Gagal Menyalin', 'Silakan salin email secara manual.', 'fa-solid fa-triangle-exclamation');
    }
  });
}

const heroStatus = document.getElementById('hero-status');
const skillCards = document.querySelectorAll('.skill-card');
const portfolioProjectCards = document.querySelectorAll('.project-card');
const quickQuotes = [
  'Siap belajar, beradaptasi, dan membangun produk nyata.',
  'Setiap bug adalah kesempatan belajar dan memperbaiki.',
  'Saya terus berkembang sambil fokus pada solusi nyata.',
  'Mengerjakan proyek dengan detail, logika, dan disiplin.',
  'Ingin belajar lebih banyak sambil berkontribusi pada tim.'
];

function setHeroStatus(message) {
  if (heroStatus) {
    heroStatus.textContent = message;
  }
}

function randomizeQuote() {
  const quote = quickQuotes[Math.floor(Math.random() * quickQuotes.length)];
  setHeroStatus(quote);
}

function makeBurstEffect() {
  const homeSection = document.getElementById('home');
  if (!homeSection) return;

  for (let i = 0; i < 18; i += 1) {
    const dot = document.createElement('span');
    const angle = (Math.PI * 2 * i) / 18;
    const distance = 40 + Math.random() * 70;

    dot.className = 'burst-dot';
    dot.style.left = `${50 + Math.cos(angle) * 12}%`;
    dot.style.top = `${50 + Math.sin(angle) * 12}%`;
    dot.style.setProperty('--dx', `${Math.cos(angle) * distance}px`);
    dot.style.setProperty('--dy', `${Math.sin(angle) * distance}px`);
    homeSection.appendChild(dot);
    setTimeout(() => dot.remove(), 800);
  }
}

function triggerSkillSpotlight() {
  if (!skillCards.length) return;
  const randomIndex = Math.floor(Math.random() * skillCards.length);
  skillCards.forEach((card, index) => {
    card.classList.toggle('is-active', index === randomIndex);
  });

  const activeSkill = skillCards[randomIndex]?.dataset.skill || 'Skill utama';
  setHeroStatus(`${activeSkill} sedang saya fokuskan hari ini.`);
  skillCards[randomIndex]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.getElementById('quick-copy-email')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('zakifirmansah@example.com');
    setHeroStatus('Email berhasil disalin ke clipboard.');
    showToast('Email Disalin!', 'Alamat email siap dikirim ke recruiter.', 'fa-solid fa-copy');
  } catch (error) {
    showToast('Gagal Menyalin', 'Silakan salin email secara manual.', 'fa-solid fa-triangle-exclamation');
  }
});

document.getElementById('quick-copy-wa')?.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('+6281234567890');
    setHeroStatus('Nomor WhatsApp berhasil disalin.');
    showToast('WhatsApp Disalin!', 'Nomor kontak sudah siap dibagikan.', 'fa-brands fa-whatsapp');
  } catch (error) {
    showToast('Gagal Menyalin', 'Silakan salin WhatsApp secara manual.', 'fa-solid fa-triangle-exclamation');
  }
});

document.getElementById('quick-focus')?.addEventListener('click', () => {
  const isFocus = document.body.classList.toggle('focus-mode');
  setHeroStatus(isFocus ? 'Focus mode aktif untuk melihat konten utama lebih jelas.' : 'Focus mode nonaktif, tampilan kembali normal.');
  showToast(isFocus ? 'Focus Mode Aktif' : 'Focus Mode Nonaktif', 'Mode fokus telah diperbarui.', 'fa-solid fa-eye');
});

document.getElementById('quick-quote')?.addEventListener('click', () => {
  randomizeQuote();
  showToast('Quote Baru', 'Status hero berhasil diperbarui.', 'fa-solid fa-quote-left');
});

document.getElementById('quick-project')?.addEventListener('click', () => {
  const randomProject = [...portfolioProjectCards][Math.floor(Math.random() * portfolioProjectCards.length)];
  if (!randomProject) return;
  portfolioProjectCards.forEach((card) => card.classList.remove('ring-2', 'ring-indigo-400', 'ring-offset-2', 'ring-offset-transparent'));
  randomProject.classList.add('ring-2', 'ring-indigo-400', 'ring-offset-2', 'ring-offset-transparent');
  randomProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setHeroStatus(`Proyek ${randomProject.querySelector('h4')?.textContent || 'utama'} sedang ditampilkan.`);
});

document.getElementById('quick-contact')?.addEventListener('click', () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  setHeroStatus('Menuju bagian kontak untuk komunikasi lebih lanjut.');
});

document.getElementById('quick-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setHeroStatus('Kembali ke atas halaman.');
});

document.getElementById('quick-burst')?.addEventListener('click', () => {
  makeBurstEffect();
  setHeroStatus('Burst effect aktif sebagai sentuhan visual baru.');
  showToast('Burst Effect', 'Animasi visual baru dipicu.', 'fa-solid fa-wand-sparkles');
});

document.getElementById('quick-skill')?.addEventListener('click', () => {
  triggerSkillSpotlight();
  showToast('Skill Spotlight', 'Skill utama baru berhasil di-highlight.', 'fa-solid fa-star');
});

const currentTime = document.createElement('span');
currentTime.id = 'live-clock';
currentTime.className = 'text-xs font-medium text-slate-500';
const navWrap = document.querySelector('nav .flex.items-center.justify-between');
if (navWrap && !document.getElementById('live-clock')) {
  navWrap.appendChild(currentTime);
}

function updateClock() {
  const clock = document.getElementById('live-clock');
  if (!clock) return;
  const now = new Date();
  clock.textContent = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}

updateClock();
setInterval(updateClock, 60000);

const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach((item) => {
  const button = item.querySelector('.faq-question');
  if (!button) return;

  button.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');
    faqItems.forEach((faq) => {
      faq.classList.remove('active');
    });

    if (!isOpen) {
      item.classList.add('active');
    }
  });
});

const testimonialCards = document.querySelectorAll('.testimonial-card');
let testimonialIndex = 0;
setInterval(() => {
  testimonialCards.forEach((card, idx) => {
    card.classList.toggle('active', idx === testimonialIndex);
  });
  testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
}, 3500);


const pointerGlow = document.createElement('div');
pointerGlow.className = 'mouse-glow';
document.body.appendChild(pointerGlow);
window.addEventListener('pointermove', (event) => {
  pointerGlow.style.left = `${event.clientX}px`;
  pointerGlow.style.top = `${event.clientY}px`;
});

const navAnchors = document.querySelectorAll('nav a[href^="#"]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navAnchors.forEach((link) => {
        const href = link.getAttribute('href');
        link.classList.toggle('nav-link-active', href === `#${entry.target.id}`);
      });
    }
  });
}, { threshold: 0.55 });

sections.forEach((section) => sectionObserver.observe(section));

const availabilityBadge = document.createElement('div');
availabilityBadge.className = 'inline-flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full';
availabilityBadge.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>Available for internship';
const heroBadge = document.querySelector('#home .inline-flex');
if (heroBadge && !document.querySelector('.availability-badge')) {
  availabilityBadge.classList.add('availability-badge');
  heroBadge.after(availabilityBadge);
}

const copyAllBtn = document.getElementById('copy-all-contact');
if (copyAllBtn) {
  copyAllBtn.addEventListener('click', async () => {
    try {
      const text = 'Email: zakifirmansah@example.com\nWhatsApp: +6281234567890\nInstagram: @zakifirmansah';
      await navigator.clipboard.writeText(text);
      showToast('Kontak Disalin!', 'Semua informasi kontak berhasil disalin.', 'fa-solid fa-address-book');
    } catch (error) {
      showToast('Gagal Menyalin', 'Silakan salin secara manual.', 'fa-solid fa-triangle-exclamation');
    }
  });
}

const scrollHint = document.createElement('div');
scrollHint.className = 'fixed bottom-6 left-6 z-50 hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 shadow-lg backdrop-blur';
scrollHint.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Scroll to discover';
document.body.appendChild(scrollHint);
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  scrollHint.style.opacity = y > 100 ? '0' : '1';
  scrollHint.style.transform = y > 100 ? 'translateY(8px)' : 'translateY(0)';
});

