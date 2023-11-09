const playerMovie = JSON.parse(localStorage.getItem('moviePlayer'));
const qualityControl = document.getElementById('qualityContainer');
const judulDetail = document.getElementById('judul_detail');
const releaseDetail = document.getElementById('release_detail');
const deskripsi = document.getElementById('deskripsi');
const posterDetail = document.getElementById('poster_detail');
const poster = document.getElementById('poster');
const videoPlayer = document.getElementById('player');

getDataFromApiWatchMovie(playerMovie);
async function fetchDataFromApiMovie(slug) {
    const apiUrl = `https://wajik-anime-api.vercel.app/movie/${slug}`

    return fetch(apiUrl)
    .then(respons =>respons.json())
    .catch(error => console.error('Terjadi Kesalahan :',error));
}

async function getDataFromApiWatchMovie(slug) {
    const data = await fetchDataFromApiMovie(slug);
    posterDetail.src =`${data.poster}`;
    judulDetail.innerHTML =`${data.title}`;
    deskripsi.innerHTML = `${data.description}`;
    releaseDetail.innerHTML = `${data.year}`;
    poster.src = `${data.poster}`;
    qualityControl.style.display = 'block';

    const serverSelect = document.getElementById('serverSelect');
    serverSelect.innerHTML = '';
    data.videoPlayer.forEach((stream) => {
        const option = document.createElement('button');
        option.value = stream.url;
        option.className = "qualityBtn";
        let streamquality = stream.kualitas.replace('default','auto');
        let streamName = stream.server;
        option.innerHTML = `${streamName+streamquality}`;
        serverSelect.appendChild(option);
    });

    const watchBtn = document.querySelectorAll('.qualityBtn');
    for (let i = 0; i < watchBtn.length; i++) {
        watchBtn[i].addEventListener('click',function(){
        const serverUrl = this.value;
        videoPlayer.src = `${serverUrl}`;
        })
        
    }
}