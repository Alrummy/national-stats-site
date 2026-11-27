import { data } from './data.js';
import * as views from './views.js';

const islandPalette = ['#d86e48', '#e69c57', '#9caa70', '#668c83', '#bc836b', '#728aa0', '#c0a866'];
const labelShort = { 'Bali & Nusa Tenggara': 'Bali & Nusa Tenggara' };

function islandChart() {
  const host = document.querySelector('#island-chart');
  if (!host) return;
  const max = 160;
  host.innerHTML = data.population.islands.map((x, i) => `<div class="bar-row"><span class="bar-label">${labelShort[x.name] || x.name}</span><span class="bar-track"><i style="width:${(x.people / max * 100).toFixed(2)}%;--bar-color:${islandPalette[i]}"></i></span><strong>${x.people}M</strong></div>`).join('');
}

function agePyramid() {
  const host = document.querySelector('#age-pyramid');
  if (!host) return;
  const rows = [...data.population.age].reverse();
  const max = 13;
  host.innerHTML = `<div class="pyramid-head"><span>FEMALE</span><span>AGE</span><span>MALE</span></div>${rows.map(x => `<div class="pyramid-row"><i class="pyr-left"><b style="width:${x.female / max * 100}%"></b></i><span>${x.label}</span><i class="pyr-right"><b style="width:${x.male / max * 100}%"></b></i></div>`).join('')}`;
}

function sectorChart(year) {
  const datum = data.economy[year];
  const host = document.querySelector('#sector-chart');
  const legend = document.querySelector('#sector-legend');
  if (!host || !legend) return;
  const colors = ['#d87651', '#879b79', '#526e6a'];
  let start = 0;
  const stops = datum.sectors.map((s, i) => {
    const a = start, b = start + s.value * 3.6; start = b;
    return `${colors[i]} ${a}deg ${b}deg`;
  });
  host.style.background = `conic-gradient(${stops.join(',')})`;
  host.innerHTML = `<div class="donut-hole"><strong>${datum.sectors.reduce((n, s) => n + s.value, 0).toFixed(0)}<span>%</span></strong><small>GDP</small></div>`;
  legend.innerHTML = datum.sectors.map((s, i) => `<div class="legend-item"><i style="background:${colors[i]}"></i><span>${s.name}</span><strong>${s.value.toFixed(1)}%</strong></div>`).join('');
}

function lifeChart() {
  const host = document.querySelector('#life-chart');
  if (!host) return;
  const values = data.people.life, W = 720, H = 245, left = 46, right = 14, top = 16, bottom = 34;
  const min = 70, max = 74;
  const x = i => left + i * (W - left - right) / (values.length - 1);
  const y = v => top + (max - v) * (H - top - bottom) / (max - min);
  const line = values.map((p, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(p.value).toFixed(1)}`).join(' ');
  const area = `${line} L${x(values.length - 1)},${H - bottom} L${left},${H - bottom} Z`;
  const grid = [70, 71, 72, 73, 74].map(t => `<line x1="${left}" x2="${W - right}" y1="${y(t)}" y2="${y(t)}" class="grid-line"/><text x="${left - 11}" y="${y(t) + 4}" text-anchor="end" class="axis-label">${t}</text>`).join('');
  const years = values.map((p, i) => i % 2 === 0 || i === values.length - 1 ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" class="axis-label">${p.year}</text>` : '').join('');
  host.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Life expectancy rises from ${values[0].value} years in 2015 to ${values.at(-1).value} years in 2024"><defs><linearGradient id="life-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d87651" stop-opacity=".22"/><stop offset="1" stop-color="#d87651" stop-opacity="0"/></linearGradient></defs>${grid}<path d="${area}" fill="url(#life-fill)"/><path d="${line}" fill="none" stroke="#d87651" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>${values.map((p,i) => `<circle cx="${x(i)}" cy="${y(p.value)}" r="${i===values.length-1?5:3}" class="life-point"/>`).join('')}${years}<text x="${x(9)-9}" y="${y(72.9)-14}" class="last-value">72.9</text></svg>`;
}

export function drawCharts(year = 2024) { islandChart(); agePyramid(); sectorChart(year); lifeChart(); }

export function bindInteractions() {
  const nav = document.querySelector('.main-nav');
  const menu = document.querySelector('.menu-toggle');
  menu?.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open)); nav.classList.toggle('nav-open', open);
  });
  document.querySelectorAll('.main-nav a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('nav-open'); menu?.setAttribute('aria-expanded', 'false');
  }));
  const yearPicker = document.querySelector('#economy-year');
  yearPicker?.addEventListener('change', () => updateEconomy(yearPicker.value));
  document.querySelectorAll('#population-table [data-sort]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.sort;
    const ascending = button.dataset.direction !== 'asc';
    document.querySelectorAll('#population-table [data-sort]').forEach(b => delete b.dataset.direction);
    button.dataset.direction = ascending ? 'asc' : 'desc';
    const rows = [...data.population.islands].sort((a,b) => {
      const av = a[key], bv = b[key];
      return typeof av === 'string' ? av.localeCompare(bv) * (ascending ? 1 : -1) : (av - bv) * (ascending ? 1 : -1);
    });
    document.querySelector('#population-table tbody').innerHTML = renderRows(rows);
  }));
  const search = document.querySelector('#geo-search');
  search?.addEventListener('input', () => {
    const term = search.value.trim().toLocaleLowerCase();
    const matches = data.geography.filter(x => `${x.name} ${x.note}`.toLocaleLowerCase().includes(term));
    document.querySelector('#geo-table tbody').innerHTML = renderGeo(matches);
    document.querySelector('#geo-empty').hidden = matches.length > 0;
    document.querySelector('#geo-table').hidden = matches.length === 0;
  });
  search?.addEventListener('keydown', event => { if (event.key === 'Escape') { search.value = ''; search.dispatchEvent(new Event('input')); } });
  document.addEventListener('keydown', event => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k' && search) { event.preventDefault(); search.focus(); }
  });
}

function renderRows(rows) { return rows.map((x,i) => `<tr><td class="row-index">${String(i+1).padStart(2,'0')}</td><th scope="row">${x.name}</th><td>${x.people}M</td><td>${x.share.toFixed(1)}%</td><td>${new Intl.NumberFormat('en-US').format(x.area)} km²</td></tr>`).join(''); }
function renderGeo(rows) { return rows.map((x,i) => `<tr><td class="row-index">${String(i+1).padStart(2,'0')}</td><th scope="row">${x.name}</th><td>${new Intl.NumberFormat('en-US').format(x.area)} km²</td><td>${x.note}</td></tr>`).join(''); }
function updateEconomy(year) {
  const d = data.economy[year];
  document.querySelector('#gdp-value').innerHTML = `$${d.gdp.toFixed(2)}<span>T</span>`;
  document.querySelector('#growth-value').innerHTML = `${d.growth.toFixed(2)}<span>%</span>`;
  document.querySelector('#inflation-value').innerHTML = `${d.inflation.toFixed(2)}<span>%</span>`;
  document.querySelector('#unemployment-value').innerHTML = `${d.unemployment.toFixed(2)}<span>%</span>`;
  document.querySelector('#export-value').textContent = d.exports.toFixed(1);
  document.querySelector('#sector-year-note').textContent = `${year} EDITION`;
  sectorChart(year);
}

const pages = { overview: views.overview, population: views.population, economy: views.economy, geography: views.geography, people: views.people };
let currentPage = '';
function route() {
  const requested = location.hash.slice(1).replace(/^\//, '').split('/')[0] || 'overview';
  const page = Object.hasOwn(pages, requested) ? requested : 'overview';
  if (page === currentPage) return;
  currentPage = page;
  document.querySelector('#main-content').innerHTML = pages[page]();
  document.querySelectorAll('.main-nav a').forEach(a => {
    const active = a.dataset.route === page;
    a.classList.toggle('active', active);
    if (active) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  drawCharts(2024); bindInteractions();
  window.scrollTo({ top: 0, behavior: 'instant' });
}
window.addEventListener('hashchange', route);
route();
