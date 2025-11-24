
document.querySelector("#btn").addEventListener("click", () => {
  document.body.classList.add("blackhole-out");
  setTimeout(() => {
    window.location.href = "index2.html";
  }, 1000); // espera animação terminar
});
