
async function loadContent(){
  const res = await fetch('content.json');
  const data = await res.json();
  document.querySelector('.name').textContent = data.brand.name;
  document.title = data.brand.name + ' — Portfólio';
  document.getElementById('footerName').textContent = data.brand.name;
  document.getElementById('heroTitle').textContent = data.hero.title;
  document.getElementById('heroSubtitle').textContent = data.hero.subtitle;
  document.querySelector('.hero .bg').style.backgroundImage = `url(${data.hero.cover})`;
  document.getElementById('aboutAvatar').src = data.about.avatar;
  document.getElementById('aboutText').textContent = data.about.text;
  document.getElementById('aboutQuote').textContent = data.about.quote;
  document.getElementById('btnWhats').href = `https://wa.me/${data.contacts.whatsapp}`;
  document.getElementById('btnMail').href = `mailto:${data.contacts.email}`;
  document.getElementById('btnInsta').href = data.contacts.instagram;
  const services = document.getElementById('servicesGrid');
  data.services.forEach(s => {
    const el = document.createElement('div');
    el.className = 'card';
    el.innerHTML = `<img src="${s.cover}" alt="${s.title}">
      <div class="pad"><div class="badge">${s.badge}</div><h3>${s.title}</h3><p class="lead">${s.text}</p></div>`;
    services.appendChild(el);
  });
  const tabs = document.getElementById('categoryTabs');
  ['Todos', ...data.categories].forEach((c, idx) => {
    const t = document.createElement('button');
    t.className = 'tab' + (idx===0? ' active':'');
    t.textContent = c;
    t.dataset.category = c;
    tabs.appendChild(t);
  });
  const grid = document.getElementById('portfolioGrid');
  function render(category='Todos'){
    grid.innerHTML = '';
    const items = (category==='Todos') ? data.portfolio : data.portfolio.filter(p => p.category===category);
    items.forEach(p => {
      const card = document.createElement('a');
      card.className = 'card';
      card.href = p.cover;
      card.setAttribute('data-lightbox','');
      card.innerHTML = `<img src="${p.cover}" alt="${p.title}"><div class="pad">
        <div><span class="badge">${p.category}</span></div>
        <h3>${p.title}</h3>
        <p class="lead">${p.subtitle||''}</p>
      </div>`;
      grid.appendChild(card);
    });
    bindLightbox();
  }
  render();
  tabs.addEventListener('click', (e) => {
    if(e.target.classList.contains('tab')){
      tabs.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
      e.target.classList.add('active');
      render(e.target.dataset.category);
    }
  });
}
function bindLightbox(){
  const lb = document.querySelector('.lightbox');
  const lbImg = lb.querySelector('img');
  document.querySelectorAll('[data-lightbox]')?.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      lbImg.src = a.getAttribute('href');
      lb.classList.add('open');
    });
  });
  lb.querySelector('.close').addEventListener('click', () => lb.classList.remove('open'));
  lb.addEventListener('click', (e) => { if(e.target === lb) lb.classList.remove('open') });
}
document.addEventListener('DOMContentLoaded', loadContent);
