// Função para buscar a letra da música
function buscarLetra() {
    var artista = $("#artista").val();
    var musica = $("#musica").val();

    // Adicione feedback visual
    $('#resultado').html('Buscando...');

    var url = "https://api.vagalume.com.br/search.php?art=" + encodeURIComponent(artista) + "&mus=" + encodeURIComponent(musica);

    $.getJSON(url, function (data) {
        if (data.type == 'exact' || data.type == 'aprox') {
            // Exibir o nome do artista e o nome da música
            var nomeArtista = data.art.name;
            var nomeMusica = data.mus[0].name;

            var detalhesMusica = '<p>Artista: ' + nomeArtista + '</p>' +
                                '<p>Música: ' + nomeMusica + '</p>';

            // Exibir a letra da música no elemento "resultado" com os detalhes
            var letra = data.mus[0].text;
            var refrões = letra.split(/\[.*?\]/g); // Separa a letra em refrões

            var letraFormatada = ''; // Para armazenar a letra formatada
            for (var i = 0; i < refrões.length; i++) {
                if (refrões[i].trim() !== '') {
                    // Centraliza o texto do refrão usando CSS
                    letraFormatada += '<div style="text-align: center;">' + refrões[i].replace(/\n/g, '<br>') + '</div>';
                }
            }

            // Exibir a letra da música no centro do elemento "resultado" com detalhes e refrões
            $('#resultado').html(detalhesMusica + letraFormatada);

            // Buscar vídeo no YouTube com base no nome da música
            var apiKey = 'AIzaSyAu-rj5xMlknShTkj1VdzdoTDPuVciZtXQ';
            var maxResults = 1; // Número máximo de resultados desejados

            var videoUrl = "https://www.googleapis.com/youtube/v3/search?key=" + apiKey +
                            "&q=" + encodeURIComponent(musica + " " + artista) +
                            "&part=snippet&type=video&maxResults=" + maxResults;

            $.getJSON(videoUrl, function (videoData) {
                if (videoData.items.length > 0) {
                    // Exiba o vídeo relacionado
                    var video = videoData.items[0];
                    var videoId = video.id.videoId;
                    var videoTitulo = video.snippet.title;
                    var videoHtml = '<p>Vídeo Relacionado: <a href="https://www.youtube.com/watch?v=' + videoId + '" target="_blank">' + videoTitulo + '</a></p>';
                    $('#video').html(videoHtml);
                } else {
                    $('#video').html('Vídeo não encontrado.');
                }
            });
        } else if (data.type == 'song_notfound') {
            $('#resultado').html('Música não encontrada.');
            $('#video').html('');
        } else {
            $('#resultado').html('Artista não encontrado.');
            $('#video').html('');
        }
    });
}

// Associar a função de busca ao clique no botão
$("#buscar").click(buscarLetra);


// Função para limpar os campos de pesquisa
function limparCampos() {
    $("#artista").val('');
    $("#musica").val('');
    $('#resultado').html(''); // Limpa o resultado da pesquisa
    $('#video').html(''); // Limpa o vídeo relacionado
}

// Associar a função de limpar ao clique no botão
$("#limpar").click(limparCampos);
