const pathName = window.location.pathname;
const pageName = pathName.split("/").pop();

if (pageName === 'index.html') {
    document.querySelector("#navbar .home").classList.add("active");
}
if (pageName === 'series.html') {
    document.querySelector("#navbar .series").classList.add("active");
}
if (pageName === 'movie.html') {
    document.querySelector("#navbar .movie").classList.add("active");
}

const pst = document.querySelectorAll(".poster")
const wrp = document.querySelectorAll(".poster-warp")
const ko = document.getElementById('test');
const nex = document.getElementById('next');
const pre = document.getElementById('prev');
const nt = document.querySelectorAll('.note')
const pstOngoing = document.querySelectorAll(".poster_ongoing")
const pstSearch = document.querySelectorAll(".posterSearch")
const pstMovie = document.querySelectorAll(".poster_movie")
const skeletonOngoing = document.querySelectorAll('#ongoing .skeleton')
const pred = document.querySelectorAll('.premiered');
const jdl = document.querySelectorAll('.judul');
const jdlSlide = document.querySelectorAll('.judulSlide');
const eps = document.querySelectorAll('.episode');
const sta = document.querySelectorAll('.star');
const airedDate = document.querySelectorAll('.airedDate');
const sinopsis = document.querySelectorAll('.sinopsis');
const predSearch = document.querySelectorAll('.premieredSearch');
const jdlSearch = document.querySelectorAll('.judulSearch');
const epsSearch = document.querySelectorAll('.episodeSearch');
const staSearch = document.querySelectorAll('.starSearch');
const staMovie = document.querySelectorAll(".star_movie");
const predMovie = document.querySelectorAll('.premiered_movie');
const jdlMovie = document.querySelectorAll('.judul_movie');
const seriesWarp = document.querySelectorAll('.series_warp');
const moviesWarp = document.querySelectorAll('.movies_warp');
const searchWarp = document.querySelectorAll('.search_warp');
const searchBtn = document.getElementById('searchBtn');
const queryInput = document.getElementById('queryInput');
const homeContainer = document.getElementById('homeContainer');
const searchContainer = document.getElementById('searchContainer');
const namaSearch = document.getElementById('namaSearch');
const totalRequests = 10;
const dataResults = [];
const dataSlug = [];
const dataTitle = [];
const dataDescription = [];
const dataStar = [];
const dataAired = [];
const dataGenre = [];
const dataSinopsis = [];
const dataEpisode = [];
const premiered = [];
const premieredSearch = [];
const premieredMovie = [];

const n = window.matchMedia('(min-width: 1024px)')

function maintenence(x) {
  if (x.matches) {
    getDataFromApi();
    getDataFromApiSeries();
    getDataFromApiMovie();
  }else{
    window.location = 'maintenence.html';
  }
}
n.addListener(maintenence(n));

searchBtn.addEventListener("click", async function () {
  homeContainer.style.display = 'none';
  searchContainer.style.display = 'inline-block';

  const query = queryInput.value;
  namaSearch.innerHTML = `Search = ${query}`;
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
});


async function fetchDataFromApiAnime(page) {
    // Ganti URL API dan parameter sesuai kebutuhan Anda
    const apiUrl = `https://wajik-anime-api.vercel.app/anime?page=${page}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };
  async function fetchDataFromApiSearch(input) {
    // Ganti URL API dan parameter sesuai kebutuhan Anda
    const apiUrl = `https://wajik-anime-api.vercel.app/search?query=${input}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };
  async function fetchDataFromApiMovie(page) {
    // Ganti URL API dan parameter sesuai kebutuhan Anda
    const apiUrl = `https://wajik-anime-api.vercel.app/movie?page=${page}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .catch(error => {
        console.error('Terjadi kesalahan:', error);
      });
  };
  async function fetchDataFromApiDetailMovie(slug) {
    // Ganti URL API dan parameter sesuai kebutuhan Anda
    const apiUrl = `https://wajik-anime-api.vercel.app/movie/${slug}`;
  
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
  
  async function getDataFromApiSeries() {
    const data = await fetchDataFromApiAnime(1);
    for (let i = 0; i < 12; i++) {
      sta[i].innerHTML = `${data.list[i].star}`;
      eps[i].innerHTML = `${data.list[i].episode}`;
      jdl[i].innerHTML = `${data.list[i].title}`;
      pstOngoing[i].src = `${data.list[i].poster}`;
    }
    for (let i = 0; i < 12; i++) {
      getDataFromApiSeriesSub(data.list[i].slug);
      seriesWarp[i].addEventListener('click',async function() {
        localStorage.setItem('datakey',JSON.stringify(data.list[i].slug));
        window.location = "detail.html";
      })
    }
  }

  async function getDataFromApiSeriesSub(ku) {
    for (let i = 0; i < 12; i++) {
      const data1= await fetchDataFromApiDetailAnime(ku);
      premiered.push(data1.detailsList[5].title);
      pred[i].innerHTML = `${premiered[i]} / Sub Indo`;
  }
  }
  async function getDataFromApiMovie() {
    const data = await fetchDataFromApiMovie(1);
    for (let i = 0; i < 12; i++) {
      staMovie[i].innerHTML = `${data.list[i].star}`;
      jdlMovie[i].innerHTML = `${data.list[i].title}`;
      pstMovie[i].src = `${data.list[i].poster}`;
    }
    for (let i = 0; i < 12; i++) {
      const data1= await fetchDataFromApiDetailMovie(data.list[i].slug);
      premieredMovie.push(data1.year);
      predMovie[i].innerHTML = `${premieredMovie[i]}`;
  }
  for (let i = 0; i < 12; i++) {
    moviesWarp[i].addEventListener('click',async function() {
      localStorage.setItem('moviePlayer',JSON.stringify(data.list[i].slug));
      window.location = "player_movie.html";
    })
  }
  }
  async function getDataFromApi() {
    for (let page = 1; page <= totalRequests; page++) {
      try {
        const data = await fetchDataFromApiAnime(page);
        const mop = data.list.filter((anm) => parseFloat(anm.star) >= 7.5)
        mop.forEach(async(tst)=>{
          dataResults.push(tst.poster);
          dataSlug.push(tst.slug)
          dataTitle.push(tst.title)
          dataStar.push(tst.star)
          dataEpisode.push(tst.episode);
          const data1 = await fetchDataFromApiDetailAnime(tst.slug);
          dataAired.push(data1.detailsList[6].title)
          console.log(data1);
          dataSinopsis.push(data1.description)
        })
      } catch (error) {
        // Handle errors or retry requests if needed
        console.error('Terjadi kesalahan:', error);
      }
    }
    const topPopularData = dataResults.slice(0, 11);
    const topPopularDataSlug = dataSlug.slice(0, 11);
    const topPopularDataStar = dataStar.slice(0,11);
    const topPopularDataTitle = dataTitle.slice(0, 11);
    const topPopularDataEpisode = dataEpisode.slice(0,11);
    const topPopularDataAired = dataAired.slice(0,11);
    const topPopularDataDescription = dataSinopsis.slice(0,11);

    for (let i = 0; i < 11; i++) {
        pst[i].src = `${topPopularData[i]}`
        jdlSlide[i].innerHTML = `${topPopularDataTitle[i]}`;
        airedDate[i].innerHTML = `${topPopularDataAired[i]}`;
        sinopsis[i].innerHTML = `${topPopularDataDescription[i]}`;
      }
  }

const slider = document.querySelector(".slider");
const slide = document.querySelectorAll(".slide");
const prevButton = document.querySelector("#prev-btn");
const nextButton = document.querySelector("#next-btn");

let counter = 5;


prevButton.addEventListener("click", function () {
  slider.insertAdjacentElement("afterbegin", slider.lastElementChild);
  slide[counter].classList.remove('utama');
  nt[counter].classList.remove('main');
  nt.forEach(u=>{
    u.style.display = 'block';
  })
  nt[counter].style.display = 'none';
    counter--;
    if (counter === -1) {
      counter = 8;
    }
  slide[counter].classList.add('utama');
  if (counter === 4) {
    nt.forEach(u=>{
      u.style.display = 'block';
    })
    console.log(nt[counter]);
    nt[5].style.display = 'none';
  }
  setInterval(() => {
    nt[counter].classList.add('main');
  }, 500);
});

nextButton.addEventListener("click", function () {
  slider.insertAdjacentElement("beforeend", slider.firstElementChild);
  slide[counter].classList.remove('utama');
  nt[counter].classList.remove('main');
  nt.forEach(u=>{
    u.style.display = 'block';
  })
  nt[counter].style.display = 'none';
    counter++;
    if (counter === 9) {
      counter = 0;
    }
  slide[counter].classList.add('utama');
  if (counter === 4) {
    console.log(nt[counter]);
    nt.forEach(u=>{
      u.style.display = 'block';
    })
    console.log(nt[counter]);
    nt[3].style.display = 'none';
  }
  setInterval(() => {
    nt[counter].classList.add('main');
  }, 500);
});
