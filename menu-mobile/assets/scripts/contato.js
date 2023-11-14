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

