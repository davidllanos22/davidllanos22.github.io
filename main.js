document.addEventListener("DOMContentLoaded",()=>{
  let node = document.querySelector(".transition-none");
  node.classList.remove("transition-none");
});

let currentTheme = "dark";

function toggleTheme(){
  let colorLight = getComputedStyle(document.body).getPropertyValue("--color-light");
  let colorDark = getComputedStyle(document.body).getPropertyValue("--color-dark");

  let lightIcon = document.querySelector("#light");
  let darkIcon = document.querySelector("#dark");

  if(currentTheme == "dark"){
    currentTheme = "light";
    document.documentElement.style.setProperty("--color-bg", colorLight);
    document.documentElement.style.setProperty("--color-fg", colorDark);
    darkIcon.classList.remove("d-none");
    lightIcon.classList.add("d-none");
  }else if(currentTheme == "light"){
    currentTheme = "dark";
    document.documentElement.style.setProperty("--color-bg", colorDark);
    document.documentElement.style.setProperty("--color-fg", colorLight);
      lightIcon.classList.remove("d-none");
    darkIcon.classList.add("d-none");
  }
}