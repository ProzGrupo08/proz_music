const API_KEY = 'bdb11fddf6msh306d9980f566ee8p138cc2jsnacd2bd7d40fa';
const BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com/';
const query = document.getElementById("query");
const divResults = document.getElementById("resultados");
const numImagesToShow = 15;

function searchTracks(singerName) {
  const url = `${BASE_URL}search?q=${singerName}`;
  divResults.innerHTML = "";

  return fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Não conseguimos obter a informação da API');
      }
    })
    .then((res) => {
      const albums = res.data.map((item) => item.album);
      for (let i = 6; i < numImagesToShow; i++) {
        const imgInfo = albums[i];
        const p = document.createElement('p');
        p.innerHTML = imgInfo.title
        const imgElement = document.createElement('img');
        imgElement.src = imgInfo.cover;
        imgElement.alt = imgInfo.title;
        imgElement.className ="imgs-cover";
        divResults.appendChild(imgElement);}
        console.log(albums);
    })
    .catch((error) => {
      console.error('Error: ' + error.message);
    });
}

query.addEventListener('keypress',(e)=>{
  if(e.key ==="Enter"){
    e.preventDefault();
    searchTracks(query.value);
  }
});

function toggleMenu() {
  const mobileNav = document.querySelector('.mobile-nav');
  mobileNav.style.display = (mobileNav.style.display === 'block') ? 'none' : 'block';
}