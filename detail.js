
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

getDataFromApiDetailAnime();
async function fetchDataFromApiDetailAnime(slug) {
    // Ganti URL API dan parameter sesuai kebutuhan Anda
    const apiUrl = `https://wajik-anime-api.vercel.app/anime/${slug}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };
  async function getDataFromApiDetailAnime() {
    const data = await fetchDataFromApiDetailAnime(saveData);
    console.log(data);
    jdlDetail.innerHTML = `${data.title}`;
    wrpContainer.src = `${data.poster}`;
    pstDetail.src = `${data.poster}`;
    desDetail.innerHTML = `${data.description}`;
    rlsDetail.innerHTML = `${data.detailsList[6].title}`;
    score.innerHTML = `${data.detailsList[3].title[0]+data.detailsList[3].title[1]+data.detailsList[3].title[2]+data.detailsList[3].title[3]}`;
    titleScore.innerHTML = `${data.detailsList[3].subTitle}`;
    episod.innerHTML = `${data.currentTotalEpisodes}`;
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
      episodeSelect.appendChild(option);
  }
  const watchBtn = document.getElementById('episodeButton');
    watchBtn.style.display = 'block';
    watchBtn.addEventListener("click", async function () {
        const episodeId = document.getElementById("selectElement").value;
        localStorage.setItem('playerKey',JSON.stringify(episodeId));
        window.location = "player.html";
    });
  }