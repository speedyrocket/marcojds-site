document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Scroll progress bar ---------- */
(function scrollProgress() {
  const bar = document.getElementById("scroll-progress");
  if (!bar) return;

  function update() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
})();

/* ---------- About: mouse-tracked spotlight ---------- */
(function aboutSpotlight() {
  const grid = document.querySelector(".about-grid");
  if (!grid || prefersReducedMotion) return;

  grid.addEventListener("pointermove", (e) => {
    if (e.pointerType && e.pointerType !== "mouse") return;
    const rect = grid.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    grid.style.setProperty("--mx", x + "%");
    grid.style.setProperty("--my", y + "%");
  });
})();

/* ---------- Achievements: 3D badge tilt ---------- */
(function badgeTilt() {
  if (prefersReducedMotion) return;
  const maxTilt = 8;

  document.querySelectorAll(".badge-card").forEach((card) => {
    card.addEventListener("pointermove", (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-4px) rotateX(${(-py * maxTilt).toFixed(2)}deg) rotateY(${(
        px * maxTilt
      ).toFixed(2)}deg)`;
    });

    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });
})();

/* ---------- Scroll reveal ---------- */
(function scrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach((el) => observer.observe(el));
})();

/* ---------- Typewriter effect ---------- */
(function typewriter() {
  const el = document.getElementById("typewriter-text");
  if (!el) return;

  const phrases = ["things.", "solutions.", "because I love it."];

  if (prefersReducedMotion) {
    el.textContent = phrases[0];
    return;
  }

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const current = phrases[phraseIndex];

    if (!deleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(tick, 1400);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(tick, deleting ? 35 : 65);
  }

  tick();
})();

/* ---------- Particle network background ---------- */
(function particleNetwork() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas || prefersReducedMotion) return;

  const ctx = canvas.getContext("2d");
  let width, height, particles;
  const linkDistance = 130;

  function resize() {
    const hero = canvas.closest(".hero");
    width = canvas.width = hero.clientWidth;
    height = canvas.height = hero.clientHeight;
    const count = Math.min(80, Math.floor((width * height) / 14000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < linkDistance) {
          ctx.strokeStyle = `rgba(110, 231, 183, ${0.18 * (1 - dist / linkDistance)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const p of particles) {
      ctx.fillStyle = "rgba(96, 165, 250, 0.8)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize);
  requestAnimationFrame(step);
})();
