document.addEventListener("DOMContentLoaded", function()
  {
      const btnCadastro = document.getElementById("btnCadastro");
      if(btnCadastro){
        btnCadastro.addEventListener("click", function(){
            document.body.classList.add("blackhole-out");
            setTimeout(() => {
              window.location.href = "index2.html";
            }, 1000); // espera animação terminar
        });
      }
      const btnLogin = document.getElementById("btnLogin");
      if(btnLogin){
         btnLogin.addEventListener("click", function(){
            document.body.classList.add("blackhole-out");
            setTimeout(() => {
              window.location.href = "index2.html";
            }, 1000); // espera animação terminar
         });
      }
  });
        
                            



