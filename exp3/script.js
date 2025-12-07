const scriptURL = "https://script.google.com/macros/s/AKfycbyCovqq6mx2afT3WJGAzXvYvpC7iLddXekw0Yy3uQWVtke65cVVMK5Tccrd4AngTlQqaA/exec";
const form = document.getElementById("myForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch(scriptURL, { method: "POST", body: formData })
      .then((response) => {
        alert("Submitted Successfully!");
        form.reset();
      })
      .catch((error) => {
        alert("Something went wrong. Please try again!");
        console.error("Error!", error.message);
      });
  });
}

// 2️⃣ FOOTER YEAR
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// 3️⃣ TYPEWRITER EFFECT FOR HERO SUBTITLE
const typewriterEl = document.getElementById("typewriter");
if (typewriterEl) {
  const messages = [
    "Student · Aspiring Data Analyst",
    "Loves data, design & dashboards",
    "Learning, building, experimenting"
  ];
  let msgIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = messages[msgIndex];
    if (!deleting) {
      typewriterEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(typeLoop, 1200);
        return;
      }
    } else {
      typewriterEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        msgIndex = (msgIndex + 1) % messages.length;
      }
    }
    setTimeout(typeLoop, deleting ? 40 : 70);
  }

  typeLoop();
}

// 4️⃣ SCROLL REVEAL FOR SECTIONS
const reveals = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
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

  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add("visible"));
}


// 6️⃣ PROJECT MODAL POPUPS
const projectCards = document.querySelectorAll(".project-card");
const modal = document.getElementById("projectModal");
const modalBackdrop = modal ? modal.querySelector(".modal-backdrop") : null;
const modalClose = modal ? modal.querySelector(".modal-close") : null;
const modalTag = modal ? document.getElementById("modalTag") : null;
const modalTitle = modal ? document.getElementById("modalTitle") : null;
const modalBody = modal ? document.getElementById("modalBody") : null;
const modalLink = modal ? document.getElementById("modalLink") : null;

const projectConfig = {
  careercastle: {
    tag: "Web · AI · NLP",
    title: "CareerCastle – AI Resume Builder & Analyser",
    body:
      "CareerCastle is an AI-powered resume builder and analyser that helps users structure and refine resumes. It combines a clean front-end with NLP-based suggestions and scoring logic to highlight strengths and gaps.",
    link: "https://github.com/ayaka2303/careercastle"
  },
  mutualfund: {
    tag: "Python · Finance",
    title: "Mutual Fund Analysis",
    body:
      "A Python-based mutual fund analysis toolkit that explores returns, risk, volatility and comparative performance using Pandas, NumPy and visualization libraries, aimed at simplifying investment insights.",
    link: "https://github.com/ayaka2303/Mutual-fund-analysis"
  },
  disney: {
    tag: "Data Visualization",
    title: "Disney Movies – Exploratory Dashboard",
    body:
      "An exploratory data visualization project on Disney movies, focusing on trends in genres, ratings, release years and box-office performance using dashboarding tools and charts.",
    link: "" // no GitHub link yet
  }
};

function openModal(key) {
  if (!modal || !projectConfig[key]) return;
  const cfg = projectConfig[key];

  modalTag.textContent = cfg.tag;
  modalTitle.textContent = cfg.title;
  modalBody.textContent = cfg.body;

  if (cfg.link) {
    modalLink.href = cfg.link;
    modalLink.style.display = "inline-flex";
  } else {
    modalLink.style.display = "none";
  }

  modal.classList.add("open");
}

function closeModal() {
  if (modal) {
    modal.classList.remove("open");
  }
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const key = card.dataset.project;
    openModal(key);
  });
});

if (modalBackdrop) {
  modalBackdrop.addEventListener("click", closeModal);
}
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  }
});

// 7️⃣ SCROLL TO TOP BUTTON
const scrollBtn = document.getElementById("scrollTopBtn");
if (scrollBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("show");
    } else {
      scrollBtn.classList.remove("show");
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
