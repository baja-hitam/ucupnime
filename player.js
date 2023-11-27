const playerSave = JSON.parse(localStorage.getItem('playerKey'));
const saveData = JSON.parse(localStorage.getItem('datakey'));
const wrpContainer = document.getElementById('poster');
const jdlDetail = document.getElementById('judul_detail');
const rlsDetail = document.getElementById('release_detail');
const genreDetail = document.getElementById('genre_detail');
const desDetail = document.getElementById('deskripsi');
const pstDetail = document.getElementById('poster_detail');
const score = document.getElementById('score');
const titleScore = document.getElementById('tittle_score');
const episod = document.getElementById('episod');
const titleEpisod = document.getElementById('title_episod');
const watchContainer = document.getElementById("qualityContainer");
const videoPlayer = document.getElementById("player");
getDataFromApiDetailAnime();
displayWatchInfo(playerSave);

async function fetchDataFromApiDetailAnime(player) {
    // Ganti URL API dan parameter sesuai kebutuhan Anda
    const apiUrl = `https://wajik-anime-api.vercel.app/anime/${player}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };
  async function getDataFromApiDetailAnime() {
    const data = await fetchDataFromApiDetailAnime(saveData);
    jdlDetail.innerHTML = `${data.title}`;
    wrpContainer.src = `${data.poster}`;
    pstDetail.src = `${data.poster}`;
    desDetail.innerHTML = `${data.description}`;
    rlsDetail.innerHTML = `${data.detailsList[6].title}`;
    score.innerHTML = `${data.detailsList[3].title[0]+data.detailsList[3].title[1]+data.detailsList[3].title[2]+data.detailsList[3].title[3]}`;
    titleScore.innerHTML = `${data.detailsList[3].subTitle}`;
    episod.innerHTML = `${data.detailsList[1].title}`;
    titleEpisod.innerHTML = `${data.detailsList[2].subTitle}`;
    data.genres.forEach(e => {
      genreDetail.innerHTML += `${e}, `;
    });
    const episodeSelect = document.getElementById('selectElement');
    episodeSelect.style.display = 'block';
    episodeSelect.innerHTML = "";
    for (let i = 1; i <= data.currentTotalEpisodes; i++) {
      let option = document.createElement('option');
      option.value = `${data.slugPlayer}/${i}`;
      option.innerHTML = `Episode ${i}`;
      option.style.color = 'black';
      option.classList.add('bg-transparent');
      episodeSelect.appendChild(option);
  }
    episodeSelect.addEventListener("change", async function () {
        const episodeId = this.value;
        const data = await fetchDataFromApiDetailAnime(episodeId);
        watchContainer.style.display = 'block';
        const serverSelect = document.getElementById('serverSelect');
        serverSelect.innerHTML = "";
        videoPlayer.src = `${data.videoPlayer[0].url}`;
        displayWatchInfo(episodeId)
    });
  }
  async function displayWatchInfo(params) {
    const data = await fetchDataFromApiDetailAnime(params);
    watchContainer.style.display = 'block';

    const serverSelect = document.getElementById('serverSelect');
    serverSelect.innerHTML = "";

    data.videoPlayer.forEach((stream) => {
        const option = document.createElement('button');
        option.value = stream.url;
        option.className = "qualityBtn";
        let streamquality = stream.quality.replace('default','auto');
        let streamName = stream.server;
        option.innerHTML = `${streamName+streamquality}`;
        serverSelect.appendChild(option);
    });

    const watchBtn = document.querySelectorAll(".qualityBtn");
    for (let i = 0; i < watchBtn.length; i++) {
        watchBtn[i].addEventListener("click",function () {
            const serverUrl = this.value;
            videoPlayer.src = `${serverUrl}`;
        });
    };
  }