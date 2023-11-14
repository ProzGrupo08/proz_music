mostrarMenu.addEventListener("click", () => {
	menu.style.display = "flex"

	menu.style.right = (menu.offsetWidth * -1) + "px"

	mostrarMenu.style.display = "none"

	setTimeout(() => {
		menu.style.opacity = "1"
		
		menu.style.right = "0"
	}, 10)
		
})

ocultarMenu.addEventListener("click", () => {
	menu.style.opacity = "0"

	menu.style.right = (menu.offsetWidth * -1) + "px"

	setTimeout(() => {
		menu.removeAttribute("style")
		mostrarMenu.removeAttribute("style")
	}, 200) 			
  	
})


btnSubmit.addEventListener("click", (e)=>{
	var inputNome = document.getElementById("nome");
	var inputEmail = document.getElementById("email");
	
	// Verificar se os campos estão vazios
	if (inputNome.value ==="" || inputEmail.value ==="")  {
		alert("Campo nome e e-mail obrigatório, por favor preencha.");	

	}else if (inputNome.value ==="" && inputEmail.value ===""){
		alert("Campo nome e e-mail obrigatório, por favor preencha.");
		
	}else {
		alert("Obrigado pelo seu interesse em nossa plataforma! Entraremos em contato.");	
	}
})

