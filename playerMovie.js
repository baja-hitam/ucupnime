const playerMovie = JSON.parse(localStorage.getItem('moviePlayer'));
const qualityControl = document.getElementById('qualityContainer');
const judulDetail = document.getElementById('judul_detail');
const releaseDetail = document.getElementById('release_detail');
const deskripsi = document.getElementById('deskripsi');
const posterDetail = document.getElementById('poster_detail');
const poster = document.getElementById('poster');
const videoPlayer = document.getElementById('player');
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
const playerMovieContainer = document.getElementById('playerMovieContainer');
const searchBtn = document.querySelectorAll('.searchBtn');
const queryInput = document.querySelectorAll('.queryInput');

getDataFromApiWatchMovie(playerMovie);

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
    playerMovieContainer.style.display = 'none';
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