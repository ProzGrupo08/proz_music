const musica = document.getElementById("nome-musica");
var mensagemBiografia = document.getElementById("mensagem-biografia");

document.getElementById("input-buscar").addEventListener("keydown", function(event) {
  // Verifique se a tecla pressionada é a tecla "Enter" (código 13)
  if (event.key === "Enter") {
      // Chame a função processa()
      processa();
  }
});


function processa() {
  const inputBusca = document.getElementById("input-buscar").value.trim();
  const resultText = document.getElementById("result-text");
  

  if (!inputBusca) {
    mensagemBiografia.innerHTML = " <br> <br> Por favor, digite o nome do autor e da música... <br> <br>";
    return;
  }


  // Lista de palavras comuns que devem permanecer em minúscula
  const palavrasMinusc = ["a", "an", "the", "in", "on", "of", "and", "for", "with", "to", "by","de"];

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

  const formattedString = input.replace(/_/g, ' '); // Fatia à string e remove o _  
  const words = formattedString.split(" ");    
  const nomeCantor = words.slice(-2).join("_");  // Captura o valor do cantor quando tiver nome e sobrenome
  const lastNomeCantor = words.slice(-1).join("_");    
  const removeNomeCantor = input.replace(lastNomeCantor,"").replace(/_+$/, "");  
  const nomeMusica = input.replace(nomeCantor, "");  // Onde tiver o nome do cantor, substitui por vazio  
  const removeUnderlineNomeMusica = nomeMusica.replace(/_+$/, ""); 
  const removeUnderlineAll = nomeMusica.replace(/_/g, '');  // Remove todos Under Line
  const labelMusic = formattedString.replace(lastNomeCantor,"");
 
    
  const formasDeBusca = []; // Lista vazia 
  formasDeBusca.push(input); // Adiciona Elemento na Lista
  formasDeBusca.push(`${nomeMusica}(canção_de_${lastNomeCantor})`); // Adiciona Elemento na Lista

  
  palavras.forEach((word) => {
    formasDeBusca.push(`${nomeMusica}(canção_de_${nomeCantor})`); // Adiciona Elemento na Lista
  });

  formasDeBusca.push(removeUnderlineAll); // Adiciona Elemento na Lista
  formasDeBusca.push(`${nomeMusica}(canção)`); // Adiciona Elemento na Lista
  formasDeBusca.push(removeUnderlineNomeMusica); // Adiciona Elemento na Lista
  formasDeBusca.push(removeNomeCantor); // Adiciona Elemento na Lista

  // Realize a pesquisa para cada forma de busca
  realizarPesquisa(formasDeBusca, 0);

  function realizarPesquisa(formasDeBusca, index) {
    if (index >= formasDeBusca.length) {
      // Todas as tentativas de pesquisa foram feitas e nenhum resultado válido foi encontrado
      mensagemBiografia.innerHTML = " <br> <br> Não foi possível encontrar informações sobre à Música/Autor <br> <br>";
      return;
    }

    const formaAtual = formasDeBusca[index];
    //console.log(formaAtual);

    fetch(`https://pt.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&explaintext=1&titles=${formaAtual}`)
      .then((response) => response.json())
      .then((data) => {
        const pages = data.query.pages;
        const firstPageId = Object.keys(pages)[0];
        const extract = pages[firstPageId].extract;
        if (extract) {
          // Exibe o resultado se for encontrado
          resultText.innerHTML = extract;
          obterImagemWikipedia(formaAtual,labelMusic);
          mensagemBiografia.innerHTML = ""; 
        } else {
          // Se nenhum resultado for encontrado, tente a próxima forma de busca
          realizarPesquisa(formasDeBusca, index + 1);
        }
      })
      .catch((error) => {
        console.error("Ocorreu um erro na pesquisa da biografia: " + error);
        // Se ocorrer um erro, tente a próxima forma de busca
        realizarPesquisa(formasDeBusca, index + 1);
      });
  }
}

function obterImagemWikipedia(title,labelMusic) {
  // Fazer uma solicitação para obter informações de mídia
  fetch(`https://pt.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=pageimages&titles=${title}&pithumbsize=300`)
    .then((response) => response.json())
    .then((mediaData) => {
      const pages = mediaData.query.pages;
      const firstPageId = Object.keys(pages)[0];
      const page = pages[firstPageId];
      const thumbnail = page.thumbnail;

      if (thumbnail && thumbnail.source) {
        // Exibir a imagem da Wikipedia se estiver disponível
        const capaMusica = document.getElementById("capaMusica");
        capaMusica.src = thumbnail.source;
        capaMusica.alt = "labelMusic";
        capaMusica.style.animation = "block";
        musica.textContent = labelMusic;
        
        const botaoPlay = document.createElement("img");
        botaoPlay.src = "assets/imgs/BotaoPlay.png";
        botaoPlay.title = "img botao Play";
        botaoPlay.alt = "Botão Play";
        botaoPlay.id = "botao-play";
        
        document.body.appendChild(botaoPlay);
      }
    })
    .catch((error) => {
      console.error("Ocorreu um erro ao buscar informações de mídia: " + error);
    });
}

