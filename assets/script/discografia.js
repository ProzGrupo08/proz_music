const busca = document.getElementsByClassName("busca");

async function buscarDiscografia(){
    const url = "https://www.vagalume.com.br/u2/discografia/index.js"
    const data = await fetch(url);
    console.log(data.json());
}

buscarDiscografia();