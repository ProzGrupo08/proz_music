// Função para buscar a letra da música
function buscarLetra() {
    var artista = $("#artista").val();
    var musica = $("#musica").val();

    // Adicione feedback visual
    $('#resultado').html('Buscando...');

    var url = "https://api.vagalume.com.br/search.php?art=" + encodeURIComponent(artista) + "&mus=" + encodeURIComponent(musica);

    $.getJSON(url, function (data) {
        if (data.type == 'exact' || data.type == 'aprox') {
            // Exibir a letra da música no elemento "resultado"
            var letraComQuebraDeLinha = data.mus[0].text.replace(/\n/g, '<br>');
            $('#resultado').html(letraComQuebraDeLinha);

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