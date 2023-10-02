function processa() {
    const inputBusca = document.getElementById("input-buscar").value.trim();
    const resultText = document.getElementById("result-text");
  
    if (!inputBusca) {
      resultText.textContent = "Por favor, digite o nome do autor e da música.";
      return;
    }
  
    // Lista de palavras comuns que devem permanecer em minúscula
    const palavrasMinusc = ["a", "an", "the", "in", "on", "of", "and", "for", "with", "to", "by"];
  
    // Função para converter a primeira letra de uma palavra para maiúscula
    function primeiraLetraMaiuscula(word) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  
    // Dividir o termo de busca em palavras
    const palavras = inputBusca.split(' ');
  
    // Converter apenas as primeiras letras das palavras não comuns para maiúsculas
    const input = palavras.map((word, index) => {
      return (index === 0 || !palavrasMinusc.includes(word.toLowerCase())) ? primeiraLetraMaiuscula(word) : word.toLowerCase();
    }).join('_');
  
    const busca = (input + '_' + '(canção)');
    console.log(busca);
    fetch(`https://pt.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext=1&titles=${input}`)
      .then((response) => response.json())
      .then((data) => {
        const pages = data.query.pages;
        const firstPageId = Object.keys(pages)[0];
        const extract = pages[firstPageId].extract;
        resultText.innerHTML = extract ? extract : "Não foi possível encontrar informações.";
      })
      .catch((error) => {
        console.error("Ocorreu um erro na pesquisa da biografia: " + error);
        resultText.textContent = "Ocorreu um erro ao buscar a biografia.";
      });
  }
  