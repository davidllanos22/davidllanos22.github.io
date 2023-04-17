const resizeObserver = new ResizeObserver((entries) => {
  let cvs = entries[0].target;
  let ctx = cvs.getContext("2d");
  cvs.width = cvs.clientWidth;
  cvs.height = cvs.clientHeight;

  for(let i = 0; i < 100; i++){
    let x = Math.random() * cvs.width;
    let y = Math.random() * cvs.height;

    fillRect(ctx, x, y, 1, 1, "white");
  }
});

document.addEventListener("DOMContentLoaded",()=>{
  let cvs = document.querySelector("#cvs");
  resizeObserver.observe(cvs);
});

function fillRect(ctx, x, y, w, h, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

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