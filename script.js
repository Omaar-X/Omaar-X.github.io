/* =========================================================
   Omar Farque | Portfolio interactions
   3D canvas, dynamic text, scroll motion, modal, and UI polish
   ========================================================= */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const CONTACT_WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzh7SrCudXmd7qiZwqpAn-Ftfk-NPAXzYpr3Vzy0wrxYQ7VZBXX0mYpdOVlCaIAEdQ0JA/exec";

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons({ attrs: { "stroke-width": 1.8 } });
  }
}

window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const welcome = document.getElementById("welcome-intro");
  const welcomeSkip = document.getElementById("welcome-skip");

  function closeWelcome() {
    if (!welcome || welcome.classList.contains("leaving")) return;
    welcome.classList.add("leaving");
    welcome.classList.remove("active");
    welcome.setAttribute("aria-hidden", "true");
    window.setTimeout(() => welcome.classList.remove("leaving"), 520);
  }

  if (prefersReducedMotion) {
    loader?.classList.add("hidden");
    return;
  }

  window.setTimeout(() => {
    loader?.classList.add("hidden");
    if (!welcome) return;
    welcome.classList.add("active");
    welcome.setAttribute("aria-hidden", "false");
    window.setTimeout(closeWelcome, 2600);
  }, 850);

  welcomeSkip?.addEventListener("click", closeWelcome);
});

/* Theme toggle */
(function initThemeToggle() {
  const toggle = document.getElementById("theme-toggle");
  const storageKey = "omar-portfolio-theme";

  function getStoredTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function setStoredTheme(theme) {
    try {
      window.localStorage.setItem(storageKey, theme);
    } catch (error) {
      // Storage can be unavailable in some private browser contexts.
    }
  }

  function applyTheme(theme) {
    const light = theme === "light";
    document.body.classList.toggle("light-mode", light);
    if (!toggle) return;
    toggle.setAttribute("aria-pressed", String(light));
    toggle.setAttribute("aria-label", light ? "Switch to dark mode" : "Switch to light mode");
    toggle.innerHTML = `<i data-lucide="${light ? "moon" : "sun"}"></i>`;
    refreshIcons();
  }

  applyTheme(getStoredTheme() === "light" ? "light" : "dark");

  toggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-mode") ? "dark" : "light";
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
  });
})();

refreshIcons();

/* 3D background */
(function initThreeScene() {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas || !window.THREE || prefersReducedMotion) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(64, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 16);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.42));
  const tealLight = new THREE.PointLight(0x42e8d4, 1.9, 64);
  tealLight.position.set(-9, 7, 12);
  scene.add(tealLight);
  const goldLight = new THREE.PointLight(0xf5c451, 1.35, 62);
  goldLight.position.set(10, -7, 10);
  scene.add(goldLight);

  const group = new THREE.Group();
  scene.add(group);

  const geometries = [
    new THREE.BoxGeometry(1.6, 1.6, 1.6, 2, 2, 2),
    new THREE.IcosahedronGeometry(1.2, 1),
    new THREE.TorusGeometry(1, 0.26, 18, 80),
    new THREE.OctahedronGeometry(1.22, 1),
  ];

  const shapes = [];
  for (let i = 0; i < 8; i += 1) {
    const material = new THREE.MeshStandardMaterial({
      color: i % 3 === 0 ? 0xf5c451 : i % 3 === 1 ? 0x42e8d4 : 0xa99cff,
      roughness: 0.3,
      metalness: 0.72,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const mesh = new THREE.Mesh(geometries[i % geometries.length], material);
    mesh.position.set((Math.random() - 0.5) * 26, (Math.random() - 0.5) * 15, -7 - Math.random() * 8);
    mesh.scale.setScalar(0.58 + Math.random() * 1.2);
    mesh.userData = {
      baseY: mesh.position.y,
      phase: Math.random() * Math.PI * 2,
      spinX: (Math.random() - 0.5) * 0.006,
      spinY: (Math.random() - 0.5) * 0.008,
      floatAmp: 0.25 + Math.random() * 0.55,
      floatSpeed: 0.35 + Math.random() * 0.5,
    };
    group.add(mesh);
    shapes.push(mesh);
  }

  const particleCount = 680;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < positions.length; i += 3) {
    positions[i] = (Math.random() - 0.5) * 52;
    positions[i + 1] = (Math.random() - 0.5) * 28;
    positions[i + 2] = -4 - Math.random() * 34;
  }
  const particleGeometry = new THREE.BufferGeometry();
  particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const particles = new THREE.Points(
    particleGeometry,
    new THREE.PointsMaterial({
      color: 0x42e8d4,
      size: 0.045,
      transparent: true,
      opacity: 0.68,
    })
  );
  scene.add(particles);

  const pointer = { x: 0, y: 0 };
  window.addEventListener(
    "mousemove",
    (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5;
      pointer.y = event.clientY / window.innerHeight - 0.5;
    },
    { passive: true }
  );

  const clock = new THREE.Clock();
  function animate() {
    const time = clock.getElapsedTime();
    shapes.forEach((mesh) => {
      mesh.rotation.x += mesh.userData.spinX;
      mesh.rotation.y += mesh.userData.spinY;
      mesh.position.y = mesh.userData.baseY + Math.sin(time * mesh.userData.floatSpeed + mesh.userData.phase) * mesh.userData.floatAmp;
    });

    particles.rotation.y = time * 0.018;
    particles.rotation.x = Math.sin(time * 0.12) * 0.05;

    camera.position.x += (pointer.x * 2.2 - camera.position.x) * 0.045;
    camera.position.y += (-pointer.y * 1.6 - window.scrollY * 0.0008 - camera.position.y) * 0.045;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

/* Dynamic hero build text */
(function initBuildRotator() {
  const target = document.getElementById("build-rotator");
  if (!target || prefersReducedMotion) return;

  const phrases = [
    "premium web portfolios",
    "responsive business websites",
    "AI automation workflows",
    "SEO-ready landing pages",
    "polished video edits",
    "travel-tech web systems",
    "digital brand experiences",
  ];

  let phraseIndex = 0;
  let charIndex = phrases[0].length;
  let deleting = true;

  function typeNext() {
    const phrase = phrases[phraseIndex];
    target.textContent = phrase.slice(0, charIndex);

    if (!deleting && charIndex === phrase.length) {
      deleting = true;
      window.setTimeout(typeNext, 1250);
      return;
    }

    if (deleting && charIndex === 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      window.setTimeout(typeNext, 260);
      return;
    }

    charIndex += deleting ? -1 : 1;
    window.setTimeout(typeNext, deleting ? 28 : 58);
  }

  window.setTimeout(typeNext, 1300);
})();

/* Navigation */
const navbar = document.getElementById("navbar");
const navToggle = document.getElementById("nav-toggle");
const navLinksWrap = document.getElementById("nav-links");
const navLinks = [...document.querySelectorAll(".nav-link")];
const progress = document.getElementById("scroll-progress");

function updateScrollChrome() {
  navbar?.classList.toggle("scrolled", window.scrollY > 36);
  if (!progress) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progress.style.width = `${Math.min(100, Math.max(0, percent))}%`;
}

window.addEventListener("scroll", updateScrollChrome, { passive: true });
updateScrollChrome();

navToggle?.addEventListener("click", () => {
  const open = navLinksWrap?.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(Boolean(open)));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinksWrap?.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (event) => {
    const href = anchor.getAttribute("href");
    if (!href || href.length < 2) return;
    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 74;
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
});

const sections = [...document.querySelectorAll("section[id]")];
if (sections.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-44% 0px -50% 0px" }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

/* Scroll reveal */
(function initReveals() {
  const revealItems = [...document.querySelectorAll(".reveal")];
  if (!revealItems.length) return;

  if (window.gsap && window.ScrollTrigger && !prefersReducedMotion) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".hero .reveal", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.09,
      delay: 0.9,
    });

    revealItems
      .filter((element) => !element.closest(".hero"))
      .forEach((element) => {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
          },
        });
      });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );
  revealItems.forEach((item) => observer.observe(item));
})();

/* Counters */
(function initCounters() {
  const counters = [...document.querySelectorAll("[data-count]")];
  if (!counters.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const target = Number(element.dataset.count || 0);
        const suffix = element.dataset.suffix || "";
        const duration = target > 1000 ? 900 : 760;
        const startTime = performance.now();

        function tick(now) {
          const progressValue = Math.min(1, (now - startTime) / duration);
          const eased = 1 - Math.pow(1 - progressValue, 3);
          const current = Math.round(target * eased);
          element.textContent = `${current}${progressValue === 1 ? suffix : ""}`;
          if (progressValue < 1) window.requestAnimationFrame(tick);
        }

        window.requestAnimationFrame(tick);
        observer.unobserve(element);
      });
    },
    { threshold: 0.55 }
  );

  counters.forEach((counter) => observer.observe(counter));
})();

/* Gallery modal */
(function initGalleryModal() {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const items = [...document.querySelectorAll(".gallery-item")];
  if (!modal || !modalImg || !modalCaption || !items.length) return;

  let currentIndex = 0;

  function setModal(index) {
    const item = items[index];
    currentIndex = index;
    modalImg.src = item.dataset.img || "";
    modalCaption.textContent = item.dataset.caption || "";
  }

  function openModal(index) {
    setModal(index);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function stepModal(direction) {
    const nextIndex = (currentIndex + direction + items.length) % items.length;
    setModal(nextIndex);
  }

  items.forEach((item, index) => {
    item.addEventListener("click", () => openModal(index));
  });

  document.querySelector(".modal-close")?.addEventListener("click", closeModal);
  document.querySelector(".modal-next")?.addEventListener("click", () => stepModal(1));
  document.querySelector(".modal-prev")?.addEventListener("click", () => stepModal(-1));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  window.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("open")) return;
    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowRight") stepModal(1);
    if (event.key === "ArrowLeft") stepModal(-1);
  });
})();

/* Project image fallback */
document.querySelectorAll(".project-preview img").forEach((image) => {
  image.addEventListener("error", () => {
    const preview = image.closest(".project-preview");
    if (!preview) return;
    preview.classList.add("preview-missing");
    image.alt = "Project preview unavailable";
  });
});

/* Lead form -> Google Apps Script */
(function initLeadForm() {
  const form = document.getElementById("lead-form");
  const status = document.getElementById("lead-status");
  if (!form || !status) return;

  const isConnected = /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/i.test(CONTACT_WEB_APP_URL);

  function setStatus(message, type = "") {
    status.textContent = message;
    status.classList.remove("success", "error");
    if (type) status.classList.add(type);
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!isConnected) {
      setStatus("Lead sheet is ready. Paste the deployed Apps Script Web App URL in script.js first.", "error");
      return;
    }

    const submitButton = form.querySelector("button[type='submit']");
    const formData = new FormData(form);
    formData.append("pageUrl", window.location.href);
    formData.append("userAgent", navigator.userAgent);
    formData.append("source", "Omar Farque Portfolio");

    try {
      submitButton.disabled = true;
      setStatus("Sending your message...");

      await fetch(CONTACT_WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        body: new URLSearchParams(formData),
      });

      form.reset();
      setStatus("Message sent. Thank you, I will review it soon.", "success");
    } catch (error) {
      setStatus("Could not send right now. Please try again later.", "error");
    } finally {
      submitButton.disabled = false;
    }
  });
})();

/* Cursor, magnetic buttons, and tilt */
(function initPointerEffects() {
  if (!window.matchMedia("(hover: hover)").matches || prefersReducedMotion) return;

  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursor-ring");
  if (!cursor || !ring) return;

  let cursorX = 0;
  let cursorY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener(
    "mousemove",
    (event) => {
      cursorX = event.clientX;
      cursorY = event.clientY;
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    },
    { passive: true }
  );

  function ringLoop() {
    ringX += (cursorX - ringX) * 0.18;
    ringY += (cursorY - ringY) * 0.18;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    window.requestAnimationFrame(ringLoop);
  }
  ringLoop();

  document.querySelectorAll("a, button, .tilt, .tilt-soft, .magnetic").forEach((element) => {
    element.addEventListener("mouseenter", () => ring.classList.add("hover"));
    element.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.12}px, ${y * 0.18}px)`;
    });
    element.addEventListener("mouseleave", () => {
      element.style.transform = "";
    });
  });

  document.querySelectorAll(".tilt, .tilt-soft").forEach((element) => {
    element.addEventListener("mousemove", (event) => {
      const rect = element.getBoundingClientRect();
      const px = event.clientX / rect.width - rect.left / rect.width - 0.5;
      const py = event.clientY / rect.height - rect.top / rect.height - 0.5;
      const strength = element.classList.contains("tilt-soft") ? 5 : 8;
      element.style.transform = `perspective(900px) rotateY(${px * strength}deg) rotateX(${-py * strength}deg)`;
    });
    element.addEventListener("mouseleave", () => {
      element.style.transform = "";
    });
  });
})();
