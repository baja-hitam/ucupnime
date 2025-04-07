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
const menu = document.querySelectorAll('.menu');
const menuPage = document.querySelectorAll('.menu-page');
const itemsMenu = document.querySelectorAll('.items-menu');
const menuClose = document.querySelectorAll('.menu-close');
const predSearch = document.querySelectorAll('.premieredSearch');
const jdlSearch = document.querySelectorAll('.judulSearch');
const epsSearch = document.querySelectorAll('.episodeSearch');
const staSearch = document.querySelectorAll('.starSearch');
const pstSearch = document.querySelectorAll(".posterSearch");
const searchWarp = document.querySelectorAll('.search_warp');
const searchContainer = document.getElementById('searchContainer');
const playerContainer = document.getElementById('playerContainer');
const searchBtn = document.querySelectorAll('.searchBtn');
const queryInput = document.querySelectorAll('.queryInput');

getDataFromApiDetailAnime();
displayWatchInfo(playerSave);

menu.forEach((f)=>{
  f.addEventListener(('click'),()=>{
    menuPage.forEach((c)=>{
      c.style.width = '100%';
    })
    itemsMenu.forEach((d)=>{
      d.style.display = 'flex';
    })
    })
})
menuClose.forEach((g)=>{
  g.addEventListener(('click'),()=>{
    menuPage.forEach((c)=>{
      c.style.width = '0';
    })
    itemsMenu.forEach((d)=>{
      d.style.display = 'none';
    })
    })
})

searchBtn.forEach((e)=>{
  e.addEventListener("click", async function () {
    search();
  });
})

async function search() {
  playerContainer.style.display = 'none';
  searchContainer.style.display = 'inline-block';
  itemsMenu.forEach((d)=>{
    d.style.display = 'none';
  })
  menuPage.forEach((c)=>{
    c.style.width = '0';
  })
  let query;
  queryInput.forEach((e)=>{
    if (e.value) {
      query= e.value;
    }
  })
  const data = await fetchDataFromApiSearch(query);
  for (let i = 0; i < 12; i++) {
    staSearch[i].innerHTML = `${data.list[i].star}`;
    epsSearch[i].innerHTML = `${data.list[i].type}`;
    jdlSearch[i].innerHTML = `${data.list[i].title}`;
    pstSearch[i].src = `${data.list[i].poster}`;
    if (data.list[i].type == 'Movie') {
      searchWarp[i].addEventListener('click',async function() {
        localStorage.setItem('moviePlayer',JSON.stringify(data.list[i].slug));
        window.location = "player_movie.html";
      })
    }else{
      searchWarp[i].addEventListener('click',async function() {
        localStorage.setItem('datakey',JSON.stringify(data.list[i].slug));
        window.location = "detail.html";
      })
    }
  }
}

async function fetchDataFromApiSearch(input) {
  // Ganti URL API dan parameter sesuai kebutuhan Anda
  const apiUrl = `https://wajik-anime-api.vercel.app/search?query=${input}`;

  return fetch(apiUrl)
    .then(response => response.json())
    .catch(error => {
      console.error('Terjadi kesalahan:', error);
    });
};

async function fetchDataFromApiDetailAnime(animeId) {
    // Ganti URL API dan parameter sesuai kebutuhan Anda
    const apiUrl = `https://wajik-anime-api.vercel.app/samehadaku/anime/${animeId}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };
  async function fetchDataFromApiEpisodeAnime(episodeId) {
    // Ganti URL API dan parameter sesuai kebutuhan Anda
    const apiUrl = `https://wajik-anime-api.vercel.app/samehadaku/episode/${episodeId}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };
  async function getDataFromApiDetailAnime() {
    const data = await fetchDataFromApiEpisodeAnime(playerSave);
    let detailAnime = data.data;
    // console.log(detailAnime);
    
    jdlDetail.innerHTML = `${detailAnime.title}`;
    wrpContainer.src = `${detailAnime.poster}`;
    pstDetail.src = `${detailAnime.poster}`;
    let sizeParagraph = detailAnime.synopsis.paragraphs.length;
      let sinopsis = '';
      for (let p = 0; p < sizeParagraph; p++) {
        sinopsis += detailAnime.synopsis.paragraphs[p];
      }
    desDetail.innerHTML = `${sinopsis}`;
    rlsDetail.innerHTML = `${detailAnime.releasedOn}`;
    detailAnime.genreList.forEach(e => {
      genreDetail.innerHTML += `${e.title}, `;
    });
    const data1 = await fetchDataFromApiDetailAnime(saveData)
    let detailAnime1 = data1.data;
    
    const episodeSelect = document.getElementById('selectElement');
    episodeSelect.style.display = 'block';
    episodeSelect.innerHTML = "";
    for (let i = 0; i < detailAnime1.episodeList.length; i++) {
      let option = document.createElement('option');
      option.value = `${detailAnime1.episodeList[i].episodeId}`;
      option.innerHTML = `Episode ${detailAnime1.episodeList[i].title ?? 'Special'}`;
      option.style.color = 'black';
      episodeSelect.appendChild(option);
  }

    episodeSelect.addEventListener("change", async function () {
        const episodeId = this.value;
        const data = await fetchDataFromApiEpisodeAnime(episodeId);
        watchContainer.style.display = 'block';
        const serverSelect = document.getElementById('serverSelect');
        serverSelect.innerHTML = "";
        videoPlayer.src = `${data.data.defaultStreamingUrl}`;
        displayWatchInfo(episodeId)
    });
  }
  async function displayWatchInfo(params) {
    const data = await fetchDataFromApiEpisodeAnime(params);
    watchContainer.style.display = 'block';
    const playerAnime = data.data;
    // console.log(playerAnime);
    
    
    const serverSelect = document.getElementById('serverSelect');
    serverSelect.innerHTML = "";
    const vPlayer = playerAnime.defaultStreamingUrl;
    videoPlayer.src = `${vPlayer}`;

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
            const serverUrl = hapusString(this.value,"/&autoplay=true");
            videoPlayer.src = `${serverUrl}`;
        });
    };
  }

  function hapusString(input, stringToBeDeleted) {
    return input.replace(new RegExp(stringToBeDeleted, 'g'), '');
  };