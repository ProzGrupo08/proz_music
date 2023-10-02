function processa() {
    const inputBusca = document.getElementById("input-buscar").value.trim();
    const resultText = document.getElementById("result-text");
  
    if (!inputBusca) {
      resultText.textContent = "Por favor, digite o nome do autor e da música.";
      return;
    }
  
    // Formas exatas de busca
    const formasDeBusca = ["AllofMe", "All_of_Me_(canção_de_john_legend)", "All_of_Me_(canção)", "All_of_Me"];
  
    // Função para realizar a pesquisa
    function fazerPesquisa(index) {
      if (index >= formasDeBusca.length) {
        // Todas as tentativas de pesquisa foram feitas e nenhum resultado válido foi encontrado
        resultText.textContent = "Não foi possível encontrar informações.";
        return;
      }
  
      const busca = formasDeBusca[index];
      console.log(busca);
  
      fetch(`https://pt.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext=1&titles=${busca}`)
        .then((response) => response.json())
        .then((data) => {
          const pages = data.query.pages;
          const firstPageId = Object.keys(pages)[0];
          const extract = pages[firstPageId].extract;
          if (extract) {
            // Exibe o resultado se for encontrado
            resultText.innerHTML = extract;
          } else {
            // Se nenhum resultado for encontrado, tente a próxima forma de busca
            fazerPesquisa(index + 1);
          }
        })
        .catch((error) => {
          console.error("Ocorreu um erro na pesquisa da biografia: " + error);
          // Se ocorrer um erro, tente a próxima forma de busca
          fazerPesquisa(index + 1);
        });
    }
  
    // Inicie a pesquisa com a primeira forma de busca
    fazerPesquisa(0);
  }
  