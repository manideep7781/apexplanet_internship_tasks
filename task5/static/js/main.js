// static/js/main.js
document.addEventListener('DOMContentLoaded', function () {
  // mobile menu
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  menuToggle?.addEventListener('click', () => {
    if (mainNav.style.display === 'flex') mainNav.style.display = '';
    else mainNav.style.display = 'flex';
  });

  // smooth scrolling
  document.querySelectorAll('.main-nav a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (window.innerWidth < 800) mainNav.style.display = '';
    });
  });

  // load projects dynamically
  const projectsGrid = document.getElementById('projectsGrid');
  fetch('/static/data/projects.json').then(r => r.json()).then(arr => {
    arr.forEach(p => {
      const card = document.createElement('div'); card.className = 'card';
      card.innerHTML = `
        <img src="/static/${p.image}" alt="${p.title}">
        <h3>${p.title}</h3>
        <p>${p.short}</p>
        <button data-id="${p.id}">View</button>
      `;
      projectsGrid.appendChild(card);
    });
    // add click listeners for modal open
    projectsGrid.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => openProjectModal(arr.find(x => x.id === btn.dataset.id)));
    });
  }).catch(err => {
    projectsGrid.innerHTML = '<p>Unable to load projects.</p>';
    console.error(err);
  });

  // modal
  const modal = document.getElementById('projectModal');
  const modalClose = document.getElementById('modalClose');
  function openProjectModal(project) {
    if (!project) return;
    modal.setAttribute('aria-hidden', 'false');
    document.getElementById('modalImage').src = '/static/' + project.image;
    document.getElementById('modalTitle').textContent = project.title;
    document.getElementById('modalDesc').textContent = project.description;
    document.getElementById('modalTech').textContent = project.tech;
    const git = document.getElementById('modalGit'); git.href = project.github || '#';
    document.body.style.overflow = 'hidden';
  }
  function closeProjectModal() {
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeProjectModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  // skill bars animate on scroll
  const skillBars = document.querySelectorAll('.skill-bar');
  function animateSkills() {
    skillBars.forEach(bar => {
      const val = bar.dataset.value || 0;
      const fill = bar.querySelector('.skill-fill');
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        fill.style.width = val + '%';
      }
    });
  }
  window.addEventListener('scroll', animateSkills);
  animateSkills();

  // contact form AJAX
  const contactForm = document.getElementById('contactForm');
  const contactMsg = document.getElementById('contactMsg');
  contactForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    contactMsg.textContent = 'Sending...';
    const payload = {
      name: document.getElementById('cname').value.trim(),
      email: document.getElementById('cemail').value.trim(),
      message: document.getElementById('cmessage').value.trim()
    };
    try {
      const res = await fetch('/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.ok) {
        contactMsg.textContent = data.message;
        contactForm.reset();
      } else {
        contactMsg.textContent = data.error || 'Error sending message';
      }
    } catch (err) {
      contactMsg.textContent = 'Network error';
      console.error(err);
    }
  });
});

