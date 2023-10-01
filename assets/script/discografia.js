

const searchButton = document.getElementById("fetchDiscography");

searchButton.addEventListener("click", function () {
  const albumName = document.getElementById("artistInput").value;

  if (!albumName) {
    alert("Por favor, ingresa el nombre del álbum.");
    return;
  }

  
  const albumSearchURL = `https://api.vagalume.com.br/search.alb?apikey=660a4395f992ff67786584e238f501aa&q=${encodeURIComponent(albumName)}&limit=5`;


  fetch(albumSearchURL)
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      const albums = data.response.docs;

      console.log(albums);
      const resultElement = document.getElementById("result");
      resultElement.innerHTML = albums.map(album => `
        <div>
          <p>Nombre del Álbum: ${album.title}</p>
          <p>Banda/Artista: ${album.band}</p>
        </div>
      `).join("");
    })
    .catch(error => {
      console.error("Error:", error);
    });
});