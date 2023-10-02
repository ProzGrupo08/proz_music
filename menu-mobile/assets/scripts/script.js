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
	e.preventDefault()
alert("A conexão com o banco de dados ainda não está implementada.")

})
