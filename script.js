/* =========================================================
   PORTFÓLIO — MIGUEL SILVA COELHO
========================================================= */


/* =========================================================
   LINKS DO MENU
   Destaca a seção que está atualmente na tela.
========================================================= */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav a");


const navObserver = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (!entry.isIntersecting) {
        return;
      }


      const id = entry.target.getAttribute("id");


      navLinks.forEach((link) => {

        const isActive =
          link.getAttribute("href") === `#${id}`;


        link.classList.toggle("active", isActive);

      });

    });

  },
  {
    rootMargin: "-40% 0px -50% 0px"
  }
);


sections.forEach((section) => {

  navObserver.observe(section);

});


/* =========================================================
   ANIMAÇÃO DAS SEÇÕES
========================================================= */

const prefersReducedMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


if (prefersReducedMotion) {

  /*
   * Se o usuário prefere menos movimento,
   * as seções aparecem imediatamente.
   */

  sections.forEach((section) => {

    section.classList.add("is-visible");

  });

} else {

  /*
   * Caso contrário, cada seção aparece suavemente
   * quando entra na tela.
   */

  const revealObserver =
    new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) {
            return;
          }


          entry.target.classList.add("is-visible");


          /*
           * Depois que a seção apareceu,
           * não precisamos observá-la novamente.
           */

          observer.unobserve(entry.target);

        });

      },
      {
        threshold: 0.15
      }
    );


  sections.forEach((section) => {

    revealObserver.observe(section);

  });

}


/* =========================================================
   PAC-MAN
========================================================= */

/*
 * O Pac-Man é puramente decorativo.
 *
 * A animação principal dele está no CSS.
 * Aqui deixamos uma pequena proteção para usuários
 * que ativaram redução de movimento.
 */

const pacmanElements =
  document.querySelectorAll(".pacman");


if (prefersReducedMotion) {

  pacmanElements.forEach((pacman) => {

    pacman.style.animation = "none";

  });

}


/* =========================================================
   ANO AUTOMÁTICO DO FOOTER
========================================================= */

const footerYear =
  document.querySelector(".footer p");


if (footerYear) {

  footerYear.innerHTML =
    `© ${new Date().getFullYear()} Miguel Silva Coelho`;

}
