// ==========================================
// ANIMATIONS.JS
// Animações extras do portfólio
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


  // ==========================================
  // 🟡 PAC-MAN
  // ==========================================

  const pacman = document.querySelector(".pacman");
  const pacmanTrack = document.querySelector(".pacman-track");

  if (pacman && pacmanTrack && !reduceMotion) {

    let position = 0;
    let direction = 1;

    function movePacman() {
      const trackWidth = pacmanTrack.offsetWidth;
      const pacmanWidth = pacman.offsetWidth;

      position += 1.2 * direction;

      if (position >= trackWidth - pacmanWidth) {
        direction = -1;
        pacman.style.transform = "scaleX(-1)";
      }

      if (position <= 0) {
        direction = 1;
        pacman.style.transform = "scaleX(1)";
      }

      pacman.style.left = `${position}px`;

      requestAnimationFrame(movePacman);
    }

    pacman.style.position = "absolute";
    pacman.style.left = "0";

    movePacman();
  }


  // ==========================================
  // ✨ PARTÍCULAS / PIXELS DOURADOS
  // ==========================================

  if (!reduceMotion) {

    const particlesContainer = document.createElement("div");

    particlesContainer.className = "ambient-particles";

    document.body.appendChild(particlesContainer);

    const particleStyle = document.createElement("style");

    particleStyle.textContent = `
      .ambient-particles {
        position: fixed;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
      }

      .ambient-pixel {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #f2c14e;
        opacity: 0.35;
        animation: pixelFloat linear infinite;
      }

      @keyframes pixelFloat {
        from {
          transform: translateY(110vh);
        }

        to {
          transform: translateY(-20vh);
        }
      }

      body > *:not(.ambient-particles) {
        position: relative;
        z-index: 1;
      }
    `;

    document.head.appendChild(particleStyle);

    for (let i = 0; i < 18; i++) {

      const pixel = document.createElement("span");

      pixel.className = "ambient-pixel";

      pixel.style.left = `${Math.random() * 100}%`;
      pixel.style.animationDuration = `${8 + Math.random() * 12}s`;
      pixel.style.animationDelay = `${Math.random() * -15}s`;

      particlesContainer.appendChild(pixel);
    }
  }


  // ==========================================
  // 🎞️ FRAMES
  // ==========================================

  const frames = document.querySelectorAll(".frame");

  if (!reduceMotion) {

    frames.forEach((frame, index) => {

      frame.style.animationDelay = `${index * 0.15}s`;

    });
  }


  // ==========================================
  // ⚪ SQUASH & STRETCH
  // ==========================================

  const ball = document.querySelector(".bounce-ball");

  if (ball && !reduceMotion) {

    ball.addEventListener("animationiteration", () => {

      ball.style.transform = "scaleX(1.25) scaleY(0.75)";

      setTimeout(() => {
        ball.style.transform = "";
      }, 120);

    });
  }


  // ==========================================
  // 💫 EFEITO AO PASSAR O MOUSE
  // ==========================================

  const interactiveElements = document.querySelectorAll(
    "a, .card, .skill, .project, button"
  );

  interactiveElements.forEach((element) => {

    element.addEventListener("mouseenter", () => {

      if (reduceMotion) return;

      element.style.transform = "translateY(-3px)";

    });

    element.addEventListener("mouseleave", () => {

      element.style.transform = "";

    });

  });


  // ==========================================
  // 🕹️ EFEITO RETRÔ
  // ==========================================

  document.addEventListener("click", (event) => {

    if (reduceMotion) return;

    const pixel = document.createElement("span");

    pixel.style.position = "fixed";
    pixel.style.left = `${event.clientX}px`;
    pixel.style.top = `${event.clientY}px`;
    pixel.style.width = "6px";
    pixel.style.height = "6px";
    pixel.style.background = "#f2c14e";
    pixel.style.pointerEvents = "none";
    pixel.style.zIndex = "9999";

    document.body.appendChild(pixel);

    pixel.animate(
      [
        {
          transform: "scale(1)",
          opacity: 1
        },
        {
          transform: "scale(3) translateY(-15px)",
          opacity: 0
        }
      ],
      {
        duration: 350,
        easing: "steps(4)"
      }
    );

    setTimeout(() => {
      pixel.remove();
    }, 350);

  });

});
