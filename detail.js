
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
const detailContainer = document.getElementById('detailContainer');
const searchBtn = document.querySelectorAll('.searchBtn');
const queryInput = document.querySelectorAll('.queryInput');


getDataFromApiDetailAnime();

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
  detailContainer.style.display = 'none';
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