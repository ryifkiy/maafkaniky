const screens = [...document.querySelectorAll("[data-screen]")];
const navigationButtons = [...document.querySelectorAll("[data-go]")];
const envelope = document.querySelector("#open-letter");
const petalsContainer = document.querySelector(".petals");

function showScreen(name) {
  const next = screens.find((screen) => screen.dataset.screen === name);
  if (!next) return;

  screens.forEach((screen) => screen.classList.remove("is-active"));
  next.classList.add("is-active");
  window.scrollTo({ top: 0, behavior: "instant" });
  const titles = {
    intro: "Untuk Rizka — dari Iky",
    menu: "Empat Hal untuk Rizka — dari Iky",
    photos: "Foto Kita — untuk Rizka",
    moments: "Hal-Hal Kecil — untuk Rizka",
    music: "Alonica — untuk Rizka",
    letter: "Surat dari Iky — untuk Rizka",
  };
  document.title = titles[name] || "Untuk Rizka — dari Iky";

  if (history.replaceState) history.replaceState(null, "", `#${name}`);
}

navigationButtons.forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

envelope?.addEventListener("click", () => {
  envelope.classList.add("is-open");
  window.setTimeout(() => showScreen("menu"), 650);
});

document.querySelectorAll(".photo-slot img").forEach((image) => {
  const markAsEmpty = () => {
    const slot = image.parentElement;
    image.remove();
    slot?.classList.add("is-empty");
  };
  image.addEventListener("error", markAsEmpty);
  if (image.complete && image.naturalWidth === 0) markAsEmpty();
});

function createPetal() {
  if (document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const petal = document.createElement("i");
  petal.className = "petal";
  petal.style.left = `${Math.random() * 100}vw`;
  petal.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);
  petal.style.animationDuration = `${7 + Math.random() * 7}s`;
  petal.style.opacity = `${0.25 + Math.random() * 0.5}`;
  petalsContainer.appendChild(petal);
  petal.addEventListener("animationend", () => petal.remove());
}

window.setInterval(createPetal, 1100);

const initialScreen = window.location.hash.replace("#", "");
if (screens.some((screen) => screen.dataset.screen === initialScreen)) showScreen(initialScreen);
