//
// Scaffolded by main.js — Shayan Ghadamian portfolio
// Vite + React + TypeScript, deployable to Cloudflare Workers
// and GitHub Pages. Build: vite. Worker entry: src/worker.ts.
//
import { useEffect, useRef, useState } from 'react';

// ════════════════════════════════════════════════════════════════════════
// TYPES & DATA
// ════════════════════════════════════════════════════════════════════════

interface Repo {
  name: string;
  desc: string;
  lang: string | null;
  langColor: string;
  stars: number;
  forks: number;
  topics: string[];
  url: string;
  icon: string;
  fork: boolean;
}

interface TechCard {
  icon: string;
  title: string;
  desc: string;
  tags: string[];
  stats: [number, number, number];
}

const GIT = 'https://github.com/Shayanghad0';

const starsSvg = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25z"/></svg>';
const forksSvg = '<svg viewBox="0 0 16 16" fill="currentColor"><path d="M5 3.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm0 2.122a2.25 2.25 0 1 0-1.5 0v.878A2.25 2.25 0 0 0 5.75 8.5h1.5v2.128a2.251 2.251 0 1 0 1.5 0V8.5h1.5a2.25 2.25 0 0 0 2.25-2.25v-.878a2.25 2.25 0 1 0-1.5 0v.878a.75.75 0 0 1-.75.75h-4.5A.75.75 0 0 1 5 6.25v-.878zm3.75 7.378a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm3-8.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z"/></svg>';

const pinnedRepos: Repo[] = [
  { name: 'vorcleaner', desc: 'Vorcleaner is a modern and user-friendly Windows cache cleaner built with PyQt5, designed to improve performance, free up space, and optionally disable Windows Updates with a single click.', lang: 'Python', langColor: '#3776AB', stars: 5, forks: 2, topics: ['pyqt5', 'windows', 'cache', 'cleaner'], url: GIT + '/vorcleaner', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/></svg>' },
  { name: 'uninstall-edge', desc: 'Script to completely uninstall and remove Microsoft Edge (and Edge Update) from Windows. Requires administrator privileges.', lang: 'Python', langColor: '#3776AB', stars: 0, forks: 0, topics: ['windows', 'edge', 'uninstall'], url: GIT + '/uninstall-edge', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>' },
  { name: 'QuantPulse', desc: 'Browser-based backtesting terminal for sequential price data with moving average crossover strategies.', lang: 'TypeScript', langColor: '#3178C6', stars: 0, forks: 0, topics: ['trading', 'backtesting', 'quant'], url: GIT + '/QuantPulse', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
  { name: 'Bit24-Easy-To-use', desc: 'A Short Document for buy and sell for bit24 exchange.', lang: 'C', langColor: '#555555', stars: 2, forks: 0, topics: ['crypto', 'exchange', 'api'], url: GIT + '/Bit24-Easy-To-use', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>' },
  { name: 'TikTok-Downloader', desc: 'A easy TikTok video downloader.', lang: 'Python', langColor: '#3776AB', stars: 0, forks: 0, topics: ['tiktok', 'downloader'], url: GIT + '/TikTok-Downloader', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' },
  { name: 'updategittelg', desc: 'A Telegram bot that monitors a specified GitHub user for new public repositories and announces them with a stylish message and inline buttons.', lang: 'Python', langColor: '#3776AB', stars: 0, forks: 0, topics: ['telegram', 'bot', 'github'], url: GIT + '/updategittelg', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4"/><line x1="8" y1="16" x2="8" y2="16"/><line x1="16" y1="16" x2="16" y2="16"/></svg>' }
];

const extraRepos: Repo[] = [
  { name: 'Polygon-Wallet', desc: 'Blockchain wallet for Polygon network.', lang: 'JavaScript', langColor: '#F7DF1E', stars: 1, forks: 0, topics: ['blockchain', 'polygon', 'wallet'], url: GIT + '/Polygon-Wallet', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>' },
  { name: 'MGTB', desc: 'MetaTrader 5 grid trading bots for automated forex trading with partial TP, live dashboards, and HTML reports.', lang: 'Python', langColor: '#3776AB', stars: 0, forks: 0, topics: ['mt5', 'forex', 'trading-bot'], url: GIT + '/MGTB', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><polyline points="7 8 10 11 7 14"/><line x1="13" y1="14" x2="17" y2="14"/></svg>' },
  { name: 'Skills-trading', desc: 'Trading skills, indicators, scalping notes — free to use.', lang: 'HTML', langColor: '#E34F26', stars: 1, forks: 1, topics: ['trading', 'skills', 'indicators', 'ai'], url: GIT + '/Skills-trading', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>' },
  { name: 'ZEUS-PANEL', desc: 'Serverless VLESS proxy management panel on Cloudflare Workers & D1 SQL Database.', lang: null, langColor: '#888888', stars: 0, forks: 0, topics: ['cloudflare', 'workers', 'proxy'], url: GIT + '/ZEUS-PANEL', fork: true, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>' },
  { name: 'trade-bot-toobit', desc: 'Crypto exchange trading bot for Toobit CEX.', lang: 'Python', langColor: '#3776AB', stars: 0, forks: 0, topics: ['crypto', 'bot', 'toobit'], url: GIT + '/trade-bot-toobit', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>' },
  { name: 'OHLCs', desc: 'Open-High-Low-Close price data collection and analysis.', lang: 'Python', langColor: '#3776AB', stars: 0, forks: 0, topics: ['ohlc', 'data', 'analysis'], url: GIT + '/OHLCs', fork: false, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="8" x2="8" y2="16"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="16" y1="10" x2="16" y2="14"/></svg>' }
];

const allRepos: Repo[] = [...pinnedRepos, ...extraRepos];

const techCards: TechCard[] = [
  { icon: '<img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>', title: 'Languages', desc: 'Core programming languages for building robust systems.', tags: ['Python', 'Go', 'TypeScript', 'JavaScript', 'PHP', 'HTML5', 'CSS3', 'Shell'], stats: [8, 5, 120] },
  { icon: '<img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>', title: 'Frameworks & Libraries', desc: 'Modern frameworks for fast, scalable applications.', tags: ['Flask', 'FastAPI', 'Django', 'React', 'Vite', 'Node.js', 'PyQt5'], stats: [7, 4, 85] },
  { icon: '<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>', title: 'Databases', desc: 'Reliable data storage and management solutions.', tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'MariaDB'], stats: [5, 6, 200] },
  { icon: '<img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black" alt="Linux"/>', title: 'DevOps & Tools', desc: 'Infrastructure automation and deployment pipelines.', tags: ['Linux', 'Git', 'GitLab CI', 'GitHub Actions', 'Nginx', 'Apache'], stats: [6, 5, 340] },
  { icon: '<img src="https://img.shields.io/badge/gRPC-4285F4?style=flat-square&logo=grpc&logoColor=white" alt="gRPC"/>', title: 'APIs & Integration', desc: 'Bot APIs, real-time protocols, and service integration.', tags: ['Telegram Bot', 'Discord Bot', 'gRPC', 'WebSocket', 'OpenAPI'], stats: [5, 4, 150] },
  { icon: '<img src="https://img.shields.io/badge/Cloudflare-FFC629?style=flat-square&logo=cloudflare&logoColor=black" alt="Cloudflare"/>', title: 'Security & Networking', desc: 'VPN, proxy, and network security infrastructure.', tags: ['OpenVPN', 'WireGuard', 'XRay', 'V2Ray', 'SSL/TLS', 'Cloudflare', 'Nmap'], stats: [7, 3, 90] },
  { icon: '<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch"/>', title: 'AI/ML & Data Science', desc: 'Machine learning frameworks and data analysis tools.', tags: ['Jupyter', 'PyTorch', 'Pandas', 'NumPy', 'n8n'], stats: [5, 3, 60] },
  { icon: '<img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=flat-square&logo=ethereum&logoColor=white" alt="Ethereum"/>', title: 'Blockchain & Web3', desc: 'Decentralized applications and smart contract development.', tags: ['Ethereum', 'Solidity', 'Web3.js', 'Bitcoin', 'Smart Contracts'], stats: [5, 2, 45] }
];

const typingPhrases = ['Backend Developer', 'Crypto Infrastructure', 'API Automation', 'Open Source', 'Python & Go'];

const PARTICLE_COLORS = ['#00ff88', '#00ccff', '#aa66ff', '#ff66aa', '#ffaa00'];

// ════════════════════════════════════════════════════════════════════════
// PARTICLE ENGINE
// ════════════════════════════════════════════════════════════════════════

class Particle {
  private ctx: CanvasRenderingContext2D;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
  color: string;
  rot: number;
  rs: number;

  constructor(x: number, y: number, ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 8;
    this.vy = (Math.random() - 0.5) * 8 - 3;
    this.life = 1;
    this.decay = Math.random() * 0.02 + 0.01;
    this.size = Math.random() * 6 + 2;
    this.color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
    this.rot = Math.random() * 360;
    this.rs = (Math.random() - 0.5) * 10;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.12;
    this.life -= this.decay;
    this.rot += this.rs;
  }

  draw() {
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate((this.rot * Math.PI) / 180);
    this.ctx.globalAlpha = this.life;
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    this.ctx.restore();
  }
}

// ════════════════════════════════════════════════════════════════════════
// SMALL COMPONENTS
// ════════════════════════════════════════════════════════════════════════

function RepoCard({ r }: { r: Repo }) {
  return (
    <a href={r.url} target="_blank" rel="noreferrer" className="repo-card reveal" data-hover>
      <div className="repo-card-inner">
        <div className="repo-header">
          <div className="repo-icon" dangerouslySetInnerHTML={{ __html: r.icon }} />
          <div className="repo-name-group">
            <div className="repo-name">{r.name}</div>
            {r.fork && <span className="repo-fork-badge">Forked</span>}
          </div>
        </div>
        <div className="repo-desc">{r.desc}</div>
        {r.topics.length > 0 && (
          <div className="repo-topics">
            {r.topics.map(t => <span className="repo-topic" key={t}>{t}</span>)}
          </div>
        )}
        <div className="repo-footer">
          {r.lang && (
            <span className="repo-lang">
              <span className="repo-lang-dot" style={{ background: r.langColor }}></span>
              {r.lang}
            </span>
          )}
          <span className="repo-stars" dangerouslySetInnerHTML={{ __html: starsSvg }} />
          <span className="repo-stars">{r.stars}</span>
          <span className="repo-forks-count" dangerouslySetInnerHTML={{ __html: forksSvg }} />
          <span className="repo-forks-count">{r.forks}</span>
          <span className="repo-link">View →</span>
        </div>
      </div>
    </a>
  );
}

function SkeletonCard() {
  return (
    <div className="repo-card">
      <div className="repo-card-inner">
        <div className="skeleton" style={{ width: 44, height: 44, borderRadius: 12, marginBottom: 16 }}></div>
        <div className="skeleton" style={{ width: '60%', height: 16, marginBottom: 12 }}></div>
        <div className="skeleton" style={{ width: '100%', height: 12, marginBottom: 8 }}></div>
        <div className="skeleton" style={{ width: '80%', height: 12 }}></div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════
// APP
// ════════════════════════════════════════════════════════════════════════

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const t = localStorage.getItem('theme');
    return t === 'light' ? 'light' : 'dark';
  });
  const [typing, setTyping] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [modal, setModal] = useState<TechCard | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spawnRef = useRef<(x: number, y: number, n?: number) => void>(() => {});

  // ── loader + content reveal ───────────────────────────────────────────
  useEffect(() => {
    const t1 = setTimeout(() => setLoaded(true), 600);
    const t2 = setTimeout(() => setReady(true), 800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // ── theme ─────────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // ── typing effect ─────────────────────────────────────────────────────
  useEffect(() => {
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const loop = () => {
      const current = typingPhrases[phraseIdx];
      if (isDeleting) {
        charIdx -= 1;
        setTyping(current.substring(0, charIdx));
        if (charIdx < 0) {
          isDeleting = false;
          phraseIdx = (phraseIdx + 1) % typingPhrases.length;
          timer = setTimeout(loop, 500);
          return;
        }
        timer = setTimeout(loop, 40);
      } else {
        charIdx += 1;
        setTyping(current.substring(0, charIdx));
        if (charIdx > current.length) {
          isDeleting = true;
          timer = setTimeout(loop, 2000);
          return;
        }
        timer = setTimeout(loop, 80);
      }
    };
    timer = setTimeout(loop, 800);
    return () => clearTimeout(timer);
  }, []);

  // ── scroll: progress bar, header, back-to-top ────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollTop / (h.scrollHeight - h.clientHeight) * 100;
      setProgress(pct);
      setScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── custom cursor ─────────────────────────────────────────────────────
  useEffect(() => {
    const cursor = document.getElementById('cursor');
    const dot = document.getElementById('cursorDot');
    if (!cursor || !dot) return;
    let mx = 0, my = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + 'px';
      dot.style.top = my + 'px';
    };
    const over = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (el && el.closest('[data-hover]')) cursor.classList.add('hover');
      else cursor.classList.remove('hover');
    };
    const anim = () => {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      cursor.style.left = cx + 'px';
      cursor.style.top = cy + 'px';
      raf = requestAnimationFrame(anim);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    raf = requestAnimationFrame(anim);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf);
    };
  }, []);

  // ── particles canvas ──────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let particles: Particle[] = [];
    let raf = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.life > 0);
      particles.forEach(p => { p.update(); p.draw(); });
      raf = requestAnimationFrame(anim);
    };
    raf = requestAnimationFrame(anim);
    spawnRef.current = (x, y, n = 20) => {
      for (let i = 0; i < n; i++) particles.push(new Particle(x, y, ctx));
    };
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
      spawnRef.current = () => {};
    };
  }, []);

  // ── click: ripple + tech-card modal ───────────────────────────────────
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;

      const btn = target.closest('.btn') as HTMLElement | null;
      if (btn) {
        const c = document.createElement('span');
        const d = Math.max(btn.clientWidth, btn.clientHeight);
        c.style.width = c.style.height = d + 'px';
        c.style.left = (e.clientX - btn.getBoundingClientRect().left - d / 2) + 'px';
        c.style.top = (e.clientY - btn.getBoundingClientRect().top - d / 2) + 'px';
        c.className = 'ripple';
        const old = btn.querySelector('.ripple');
        if (old) old.remove();
        btn.appendChild(c);
      }

      const card = target.closest('.game-card') as HTMLElement | null;
      if (card && card.dataset.index !== undefined) {
        const data = techCards[Number(card.dataset.index)];
        if (data) {
          setModal(data);
          spawnRef.current(e.clientX, e.clientY, 18);
        }
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  // ── 3D tilt + hover micro-particles ──────────────────────────────────
  useEffect(() => {
    const move = (e: MouseEvent) => {
      const target = e.target as Element | null;
      if (!target) return;
      const card = target.closest('.game-card, .repo-card') as HTMLElement | null;
      if (card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotateX = (y - cy) / 20;
        const rotateY = (cx - x) / 20;
        card.style.transform = 'perspective(800px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)';
        if (Math.random() < 0.05) spawnRef.current(e.clientX, e.clientY, 1);
      }
    };
    const leave = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const card = target && target.closest('.game-card, .repo-card') as HTMLElement | null;
      if (card) card.style.transform = '';
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseout', leave, true);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseout', leave, true);
    };
  }, []);

  // ── scroll reveal + animated counters ─────────────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('visible');
        en.target.querySelectorAll('[data-target]').forEach(c => {
          const el = c as HTMLElement;
          if (el.dataset.done) return;
          el.dataset.done = '1';
          const targetNum = parseInt(el.dataset.target || '0', 10);
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - start) / 1800, 1);
            el.textContent = Math.round((1 - Math.pow(1 - p, 4)) * targetNum) + '+';
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      });
    }, { threshold: 0.1 });
    const nodes = document.querySelectorAll('.reveal');
    nodes.forEach(n => obs.observe(n));
    return () => obs.disconnect();
  }, [ready]);

  // ── pull to refresh (mobile) ──────────────────────────────────────────
  useEffect(() => {
    const id = document.getElementById('ptrIndicator');
    if (!id) return;
    let pullStart = 0;
    let pulling = false;
    let reloadTimer: ReturnType<typeof setTimeout> | null = null;
    const ts = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        pullStart = e.touches[0].clientY;
        pulling = true;
      }
    };
    const tm = (e: TouchEvent) => {
      if (!pulling) return;
      if (e.touches[0].clientY - pullStart > 60 && window.scrollY === 0) id.classList.add('visible');
    };
    const te = () => {
      if (id.classList.contains('visible') && !reloadTimer) {
        reloadTimer = setTimeout(() => {
          id.classList.remove('visible');
          window.location.reload();
        }, 1200);
      }
      pulling = false;
    };
    document.addEventListener('touchstart', ts);
    document.addEventListener('touchmove', tm, { passive: true });
    document.addEventListener('touchend', te);
    return () => {
      document.removeEventListener('touchstart', ts);
      document.removeEventListener('touchmove', tm);
      document.removeEventListener('touchend', te);
      if (reloadTimer) clearTimeout(reloadTimer);
    };
  }, []);

  const closeSheet = () => setSheetOpen(false);
  const heroClick = (e: { clientX: number; clientY: number }) => spawnRef.current(e.clientX, e.clientY, 40);

  return (
    <>
      {/* ── Loading screen ── */}
      <div className={loaded ? 'loader done' : 'loader'} id="loader">
        <div className="loader-ring"></div>
        <div className="loader-text">Loading</div>
      </div>

      {/* ── Custom cursor ── */}
      <div className="cursor" id="cursor"></div>
      <div className="cursor-dot" id="cursorDot"></div>

      {/* ── Scroll progress ── */}
      <div className="scroll-progress" id="scrollProgress" style={{ width: progress + '%' }}></div>

      {/* ── Particles ── */}
      <canvas id="particleCanvas" ref={canvasRef}></canvas>

      {/* ── Pull to refresh ── */}
      <div className="ptr-indicator" id="ptrIndicator"><span className="spinner"></span>Refreshing...</div>

      {/* ── Header ── */}
      <header className={scrolled ? 'header scrolled' : 'header'} id="header">
        <div className="header-inner">
          <a href={GIT} target="_blank" rel="noreferrer" className="logo" data-hover>Shayan Ghadamian</a>
          <ul className="nav-links">
            <li><a href="#about" data-hover>About</a></li>
            <li><a href="#repos" data-hover>Repos</a></li>
            <li><a href="#skills" data-hover>Skills</a></li>
            <li><a href="#github" data-hover>GitHub</a></li>
          </ul>
          <div className="nav-right">
            <div className="theme-toggle" id="themeToggle" title="Toggle theme" data-hover onClick={() => setTheme(t => (t === 'dark' ? 'light' : 'dark'))}></div>
            <button className={sheetOpen ? 'hamburger active' : 'hamburger'} id="hamburger" aria-label="Menu" data-hover onClick={() => setSheetOpen(o => !o)}>
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>

      {/* ── Bottom sheet ── */}
      <div className={sheetOpen ? 'bs-overlay active' : 'bs-overlay'} id="bsOverlay" onClick={closeSheet}></div>
      <div className={sheetOpen ? 'bs active' : 'bs'} id="bottomSheet">
        <div className="bs-handle"></div>
        <nav>
          <a href="#about" onClick={closeSheet}>About</a>
          <a href="#repos" onClick={closeSheet}>Repos</a>
          <a href="#skills" onClick={closeSheet}>Skills</a>
          <a href="#github" onClick={closeSheet}>GitHub</a>
          <a href={GIT} target="_blank" rel="noreferrer" onClick={closeSheet}>GitHub Profile ↗</a>
        </nav>
      </div>

      {/* ── Modal ── */}
      <div className={modal ? 'modal-overlay active' : 'modal-overlay'} id="modalOverlay" onClick={e => { if (e.target === e.currentTarget) setModal(null); }}>
        <div className="modal">
          <button className="modal-close" id="modalClose" data-hover onClick={() => setModal(null)}>&times;</button>
          {modal && (
            <>
              <h3>{modal.title}</h3>
              <p>{modal.desc}</p>
              <div className="modal-stats">
                <div className="modal-stat"><div className="num">{modal.stats[0]}</div><div className="lbl">Projects</div></div>
                <div className="modal-stat"><div className="num">{modal.stats[1]}</div><div className="lbl">Years</div></div>
                <div className="modal-stat"><div className="num">{modal.stats[2]}</div><div className="lbl">Commits</div></div>
              </div>
              <div className="card-tags">
                {modal.tags.map(t => <span className="tag-sm" key={t}>{t}</span>)}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="hero" id="hero" onClick={heroClick}>
        <div className="hero-bg"><div className="orb"></div><div className="orb"></div><div className="orb"></div></div>
        <div className="hero-content">
          <div className="hero-top-row">
            <a href={GIT} target="_blank" rel="noreferrer" className="hero-avatar-wrap" data-hover>
              <div className="hero-avatar-ring"></div>
              <img className="hero-avatar" src="https://avatars.githubusercontent.com/u/140709126?v=4" alt="Shayan Ghadamian" width="56" height="56" />
            </a>
            <div className="typing-wrap">
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <div className="typing-dot"></div>
              <span className="typing-text" id="typingText">{typing}</span>
              <span className="typing-cursor"></span>
            </div>
          </div>

          <h1>Shayan <span className="accent">Ghadamian</span></h1>
          <p className="bio">Backend developer focused on crypto infrastructure, APIs, automation systems and experimental software.</p>
          <p className="quote">"I am suffering the pain of a love I couldn't tell 'I love you.'"</p>

          <div className="profile-stats">
            <div className="profile-stat reveal"><span className="num" data-target="63">0</span><span className="lbl">Repos</span></div>
            <div className="profile-stat reveal reveal-delay-1"><span className="num" data-target="88">0</span><span className="lbl">Stars</span></div>
            <div className="profile-stat reveal reveal-delay-2"><span className="num" data-target="15">0</span><span className="lbl">Followers</span></div>
            <div className="profile-stat reveal reveal-delay-3"><span className="num" data-target="24">0</span><span className="lbl">Following</span></div>
          </div>

          <div className="social-links">
            <a href={GIT} target="_blank" rel="noreferrer" className="social-link" data-hover>
              <svg viewBox="0 0 16 16" fill="currentColor" width="16" height="16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub
            </a>
            <a href="https://linkedin.com/in/shayan-ghadamian-a15ab42b4" target="_blank" rel="noreferrer" className="social-link" data-hover>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://t.me/shayanghad0" target="_blank" rel="noreferrer" className="social-link" data-hover>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              Telegram
            </a>
            <a href="https://donofa.com/shayanghad0/" target="_blank" rel="noreferrer" className="social-link" data-hover>
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-1h2v1zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/></svg>
              Money
            </a>
          </div>
          <div className="hero-buttons">
            <a href="#repos" className="btn btn-primary" data-hover>View Projects →</a>
            <a href={GIT} target="_blank" rel="noreferrer" className="btn btn-secondary" data-hover>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
              GitHub Profile
            </a>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section className="section" id="about">
        <div className="about-grid">
          <div className="about-text reveal">
            <div className="section-divider"></div>
            <div className="tag">About Me</div>
            <h2>Building the <span style={{ color: 'var(--ac)' }}>future</span> of infrastructure</h2>
            <p>Backend developer focused on crypto infrastructure, APIs, automation systems and experimental software.</p>
            <ul className="about-list">
              <li>Building backend systems & automation tools</li>
              <li>Infrastructure engineering enthusiast</li>
              <li>Crypto exchange API integration</li>
              <li>Open-source experimentation</li>
            </ul>
            <div className="about-location">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Tehran, Iran
            </div>
          </div>
          <div className="reveal reveal-delay-2">
            <div className="github-card">
              <img src="https://github-readme-activity-graph.vercel.app/graph?username=shayanghad0&theme=tokyo-night&hide_border=true&bg_color=12121f&color=70a5fd&line=00ff88&point=ffffff" alt="Activity Graph" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="section" id="stats" style={{ paddingTop: 0 }}>
        <div className="stats-grid">
          <div className="stat-card reveal"><div className="stat-number" data-target="63">0</div><div className="stat-label">Repositories</div></div>
          <div className="stat-card reveal reveal-delay-1"><div className="stat-number" data-target="88">0</div><div className="stat-label">Total Stars</div></div>
          <div className="stat-card reveal reveal-delay-2"><div className="stat-number" data-target="8">0</div><div className="stat-label">Languages</div></div>
          <div className="stat-card reveal reveal-delay-3"><div className="stat-number" data-target="7">0</div><div className="stat-label">Frameworks</div></div>
        </div>
      </section>

      {/* ═══ PINNED REPOS ═══ */}
      <section className="section" id="repos" style={{ paddingTop: 0 }}>
        <div className="section-header reveal">
          <div className="section-divider"></div>
          <div className="tag">Pinned</div>
          <h2>Featured Projects</h2>
          <p>My most popular and active repositories</p>
        </div>
        <div className="repos-grid" id="reposGrid">
          {!ready && (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}
          {ready && allRepos.map(r => <RepoCard r={r} key={r.url} />)}
        </div>
        <div className="carousel-wrap" id="reposCarousel">
          {ready && allRepos.map(r => <RepoCard r={r} key={'c' + r.url} />)}
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section className="section" id="skills" style={{ paddingTop: 0 }}>
        <div className="section-header reveal">
          <div className="section-divider"></div>
          <div className="tag">Tech Stack</div>
          <h2>Tools & Technologies</h2>
          <p>The technologies I work with daily</p>
        </div>
        <div className="tech-table-wrap reveal">
          <table className="tech-table">
            <thead>
              <tr><th>Category</th><th>Technologies</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Languages</strong></td>
                <td className="tech-badges">
                  <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/>
                  <img src="https://img.shields.io/badge/Go-00ADD8?style=flat-square&logo=go&logoColor=white" alt="Go"/>
                  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/>
                  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript"/>
                  <img src="https://img.shields.io/badge/PHP-777BB4?style=flat-square&logo=php&logoColor=white" alt="PHP"/>
                  <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5"/>
                  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3"/>
                  <img src="https://img.shields.io/badge/Shell_Script-4EAA25?style=flat-square&logo=gnubash&logoColor=white" alt="Shell Script"/>
                </td>
              </tr>
              <tr>
                <td><strong>Frameworks & Libraries</strong></td>
                <td className="tech-badges">
                  <img src="https://img.shields.io/badge/Flask-000000?style=flat-square&logo=flask&logoColor=white" alt="Flask"/>
                  <img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/>
                  <img src="https://img.shields.io/badge/Django-092E20?style=flat-square&logo=django&logoColor=white" alt="Django"/>
                  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/>
                  <img src="https://img.shields.io/badge/vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite"/>
                  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js"/>
                  <img src="https://img.shields.io/badge/PyQT5-3776AB?style=flat-square&logo=python&logoColor=white" alt="PyQt5"/>
                </td>
              </tr>
              <tr>
                <td><strong>Databases</strong></td>
                <td className="tech-badges">
                  <img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
                  <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" alt="MySQL"/>
                  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/>
                  <img src="https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white" alt="SQLite"/>
                  <img src="https://img.shields.io/badge/MariaDB-003545?style=flat-square&logo=mariadb&logoColor=white" alt="MariaDB"/>
                </td>
              </tr>
              <tr>
                <td><strong>DevOps & Tools</strong></td>
                <td className="tech-badges">
                  <img src="https://img.shields.io/badge/Linux-FCC624?style=flat-square&logo=linux&logoColor=black" alt="Linux"/>
                  <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white" alt="Git"/>
                  <img src="https://img.shields.io/badge/GitLab_CI-FC6D26?style=flat-square&logo=gitlab&logoColor=white" alt="GitLab CI"/>
                  <img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=github-actions&logoColor=white" alt="GitHub Actions"/>
                  <img src="https://img.shields.io/badge/Nginx-009639?style=flat-square&logo=nginx&logoColor=white" alt="Nginx"/>
                  <img src="https://img.shields.io/badge/Apache-D22128?style=flat-square&logo=apache&logoColor=white" alt="Apache"/>
                </td>
              </tr>
              <tr>
                <td><strong>APIs & Integration</strong></td>
                <td className="tech-badges">
                  <img src="https://img.shields.io/badge/Telegram_Bot_API-26A5E4?style=flat-square&logo=telegram&logoColor=white" alt="Telegram Bot API"/>
                  <img src="https://img.shields.io/badge/Discord_Bot_API-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord Bot API"/>
                  <img src="https://img.shields.io/badge/gRPC-4285F4?style=flat-square&logo=grpc&logoColor=white" alt="gRPC"/>
                  <img src="https://img.shields.io/badge/WebSocket-010101?style=flat-square&logo=socket.io&logoColor=white" alt="WebSocket"/>
                  <img src="https://img.shields.io/badge/OpenAPI-6BA539?style=flat-square&logo=openapiinitiative&logoColor=white" alt="OpenAPI"/>
                </td>
              </tr>
              <tr>
                <td><strong>Security & Networking</strong></td>
                <td className="tech-badges">
                  <img src="https://img.shields.io/badge/OpenVPN-EA7E20?style=flat-square&logo=openvpn&logoColor=white" alt="OpenVPN"/>
                  <img src="https://img.shields.io/badge/WireGuard-88171A?style=flat-square&logo=wireguard&logoColor=white" alt="WireGuard"/>
                  <img src="https://img.shields.io/badge/XRay-000000?style=flat-square&logo=cloudflare&logoColor=white" alt="XRay"/>
                  <img src="https://img.shields.io/badge/V2Ray-000000?style=flat-square&logo=v2ray&logoColor=white" alt="V2Ray"/>
                  <img src="https://img.shields.io/badge/SSL/TLS-5A5A5A?style=flat-square&logo=letsencrypt&logoColor=white" alt="SSL/TLS"/>
                  <img src="https://img.shields.io/badge/Cloudflare-FFC629?style=flat-square&logo=cloudflare&logoColor=black" alt="Cloudflare"/>
                  <img src="https://img.shields.io/badge/Nmap-004B97?style=flat-square&logo=nmap&logoColor=white" alt="Nmap"/>
                </td>
              </tr>
              <tr>
                <td><strong>AI/ML & Data Science</strong></td>
                <td className="tech-badges">
                  <img src="https://img.shields.io/badge/Jupyter-F37626?style=flat-square&logo=jupyter&logoColor=white" alt="Jupyter"/>
                  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white" alt="PyTorch"/>
                  <img src="https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white" alt="Pandas"/>
                  <img src="https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white" alt="NumPy"/>
                  <img src="https://img.shields.io/badge/n8n-orange?style=flat-square&logo=n8n&logoColor=white" alt="n8n"/>
                </td>
              </tr>
              <tr>
                <td><strong>Blockchain & Web3</strong></td>
                <td className="tech-badges">
                  <img src="https://img.shields.io/badge/Ethereum-3C3C3D?style=flat-square&logo=ethereum&logoColor=white" alt="Ethereum"/>
                  <img src="https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white" alt="Solidity"/>
                  <img src="https://img.shields.io/badge/Web3.js-F16822?style=flat-square&logo=web3dotjs&logoColor=white" alt="Web3.js"/>
                  <img src="https://img.shields.io/badge/bitcoin-FF9B00?style=flat-square&logo=bitcoin&logoColor=white" alt="Bitcoin"/>
                  <img src="https://img.shields.io/badge/Smart_Contracts-000000?style=flat-square&logo=ethereum&logoColor=white" alt="Smart Contracts"/>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cards-grid" id="cardsGrid" style={{ marginTop: 48 }}>
          {techCards.map((c, i) => (
            <div className={'game-card reveal reveal-delay-' + (i % 4)} data-index={i} data-hover key={c.title}>
              <div className="glass-overlay"></div>
              <div className="game-card-inner">
                <div className="card-icon" dangerouslySetInnerHTML={{ __html: c.icon }} />
                <div className="card-title">{c.title}</div>
                <div className="card-desc">{c.desc}</div>
                <div className="card-tags">{c.tags.map(t => <span className="tag-sm" key={t}>{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="carousel-wrap" id="carouselWrap" style={{ paddingTop: 24 }}>
          {techCards.map((c, i) => (
            <div className={'game-card reveal reveal-delay-' + (i % 4)} data-index={i} data-hover key={'c' + c.title}>
              <div className="glass-overlay"></div>
              <div className="game-card-inner">
                <div className="card-icon" dangerouslySetInnerHTML={{ __html: c.icon }} />
                <div className="card-title">{c.title}</div>
                <div className="card-desc">{c.desc}</div>
                <div className="card-tags">{c.tags.map(t => <span className="tag-sm" key={t}>{t}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ GITHUB ═══ */}
      <section className="section" id="github" style={{ paddingTop: 0 }}>
        <div className="section-header reveal">
          <div className="section-divider"></div>
          <div className="tag">GitHub</div>
          <h2>Analytics</h2>
        </div>
        <div className="github-grid">
          <div className="github-card reveal">
            <img src="https://github-readme-stats-fast.vercel.app/api?username=Shayanghad0&show_icons=true&theme=tokyonight&hide_border=true&bg_color=12121f&include_all_commits=true" alt="Stats" loading="lazy" />
          </div>
          <div className="github-card reveal reveal-delay-1">
            <img src="https://github-readme-stats-fast.vercel.app/api/top-langs/?username=Shayanghad0&theme=tokyonight&hide_border=true&bg_color=12121f&layout=compact" alt="Top Languages" loading="lazy" />
          </div>
        </div>
        <div className="activity-card reveal">
          <img src="https://github-readme-streak-stats.herokuapp.com/?user=Shayanghad0&theme=tokyonight&hide_border=true&background=12121f" alt="Streak Stats" loading="lazy" />
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="footer">
        <div className="footer-glow"></div>
        <p>Built with <span className="accent">♥</span> by Shayan Ghadamian</p>
        <div className="footer-links">
          <a href={GIT} target="_blank" rel="noreferrer" data-hover>GitHub</a>
          <a href="https://linkedin.com/in/shayan-ghadamian-a15ab42b4" target="_blank" rel="noreferrer" data-hover>LinkedIn</a>
          <a href="https://t.me/shayanghad0" target="_blank" rel="noreferrer" data-hover>Telegram</a>
          <a href="https://donofa.com/shayanghad0/" target="_blank" rel="noreferrer" data-hover>Donate Link</a>
        </div>
        <div className="footer-status">
          <span className="pulse"></span>
          Available for work
        </div>
      </footer>

      <button className={showTop ? 'back-to-top visible' : 'back-to-top'} id="backToTop" title="Back to top" data-hover onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
    </>
  );
}
