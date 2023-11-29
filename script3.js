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
const searchBtn = document.querySelectorAll('.searchBtn');
const queryInput = document.querySelectorAll('.queryInput');
const homeContainer = document.getElementById('homeContainer');
const searchContainer = document.getElementById('searchContainer');
const namaSearch = document.getElementById('namaSearch');
const menu = document.querySelectorAll('.menu');
const menuPage = document.querySelectorAll('.menu-page');
const itemsMenu = document.querySelectorAll('.items-menu');
const menuClose = document.querySelectorAll('.menu-close');
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
const mop = [];

getDataFilter();
setTimeout(() => {
  getDataFilterSlug();
}, 10000);
setTimeout(() => {
  getDataFromApi();
}, 25000);
getDataFromApiSeries();
getDataFromApiMovie();


async function search() {
  homeContainer.style.display = 'none';
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
  //namaSearch.innerHTML = `Search = ${query}`;
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
searchBtn.forEach((e)=>{
  e.addEventListener("click", async function () {
    search();
  });
})

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
      pstOngoing[i].src = `${data.list[i].poster}`;
      sta[i].innerHTML = `${data.list[i].star}`;
      eps[i].innerHTML = `${data.list[i].episode}`;
      jdl[i].innerHTML = `${data.list[i].title}`;
      seriesWarp[i].addEventListener('click',async function() {
        localStorage.setItem('datakey',JSON.stringify(data.list[i].slug));
        window.location = "detail.html";
      })
    }
    for (let i = 0; i < 12;i++){
      const data1= await fetchDataFromApiDetailAnime(data.list[i].slug);
      premiered.push(data1.detailsList[5].title);
      pred[i].innerHTML = `${premiered[i]} / Sub Indo`;
    }
  }

  async function getDataFromApiMovie() {
    const data = await fetchDataFromApiMovie(1);
    for (let i = 0; i < 12; i++) {
      moviesWarp[i].addEventListener('click',async function() {
        localStorage.setItem('moviePlayer',JSON.stringify(data.list[i].slug));
        window.location = "player_movie.html";
      })
    }
    for (let i = 0; i < 12; i++) {
      const data1= await fetchDataFromApiDetailMovie(data.list[i].slug);
      premieredMovie.push(data1.year);
  }
    for (let i = 0; i < 12; i++) {
      staMovie[i].innerHTML = `${data.list[i].star}`;
      jdlMovie[i].innerHTML = `${data.list[i].title}`;
      pstMovie[i].src = `${data.list[i].poster}`;
      predMovie[i].innerHTML = `${premieredMovie[i]}`;
    }
  }
  async function getDataFilter() {
    for (let page = 1; page <= totalRequests; page++) {
      try {
        const data = await fetchDataFromApiAnime(page);
        const test = data.list.filter((anm) => parseFloat(anm.star) >= 7.5);
        test.forEach((r)=>{
          mop.push(r.slug);
        })
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    }
  }

  async function getDataFilterSlug() {
    for (let i = 0; i < 11; i++) {
      const data = await fetchDataFromApiDetailAnime(mop[i]);
      dataTitle.push(data.title);
      dataResults.push(data.poster);
      dataAired.push(data.detailsList[6].title);
      dataSinopsis.push(data.description);
    }
  }
  function getDataFromApi() {
    for (let i = 0; i < 11; i++) {
        pst[i].src = `${dataResults[i]}`
        jdlSlide[i].innerHTML = `${dataTitle[i]}`;
        airedDate[i].innerHTML = `${dataAired[i]}`;
        sinopsis[i].innerHTML = `${dataSinopsis[i]}`;
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
      counter = 10;
    }
  slide[counter].classList.add('utama');
  if (counter === 4) {
    nt.forEach(u=>{
      u.style.display = 'block';
    })
    nt[5].style.display = 'none';
  }
  setTimeout(() => {
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
    if (counter === 11) {
      counter = 0;
    }
  slide[counter].classList.add('utama');
  if (counter === 4) {
    nt.forEach(u=>{
      u.style.display = 'block';
    })
    nt[3].style.display = 'none';
  }
  setTimeout(() => {
    nt[counter].classList.add('main');
  }, 500);
})
