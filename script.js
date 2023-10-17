const queryInput = document.getElementById("queryInput");
const searchBtn = document.getElementById("searchBtn");
const resultContainer = document.getElementById("resultContainer");
const animeInfoContainer = document.getElementById("animeInfoContainer");
const watchContainer = document.getElementById("qualityContainer");
const mainLoading = document.getElementById("mainLoading");
const videoPlayer = document.getElementById("player");

searchBtn.addEventListener("click", async function () {
    animeInfoContainer.style.display = 'none';
    videoPlayer.style.display = 'none';
    videoPlayer.src = "";
    resultContainer.style.display = 'block';
    mainLoading.style.display = 'flex';
    resultContainer.innerHTML="";

    const query = queryInput.value;
    const rest = await fetch(`https://wajik-anime-api.vercel.app/search/?query=${query}&page=1`);
    const data = await rest.json();
    displayResults(data.list);
});

function displayResults(results) {
    resultContainer.innerHTML = "";
    mainLoading.style.display = "none";

    results.forEach(result => {
        const resultDiv = document.createElement("div");
        resultMain = `${result.title} | ${result.star} | ${result.type}`;

        resultDiv.innerHTML = resultMain;
        resultDiv.addEventListener("click", async function () {
            mainLoading.style.display = "flex";
            resultContainer.style.display = "none";
            

            if (result.type == 'Movie') {
                const res1 = await fetch(`https://wajik-anime-api.vercel.app/movie/${result.slug}`);
                const data1 = await res1.json();
                displayMoviesInfo(data1)
            }else{
            const res = await fetch(`https://wajik-anime-api.vercel.app/anime/${result.slug}`);
            const data = await res.json();
            displayAnimeInfo(data);
            }
        });
        resultContainer.appendChild(resultDiv);
    });
};

function displayMoviesInfo(data1) {
    animeInfoContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    watchContainer.style.display = 'block';
    mainLoading.style.display = "none";
    

    console.log(data1);

    const videoTitle = document.getElementById('videoTitle');
    videoTitle.innerHTML = `Judul : ${data1.title}`;
    const status = document.getElementById("status");
    status.innerHTML = `Status : ${data1.status}`;
    const description = document.getElementById('videoDescription');
    description.innerHTML = `Sinopsis : </br>${data1.description}`;

    const serverSelect = document.getElementById('serverSelect');
    serverSelect.innerHTML = "";

    data1.videoPlayer.forEach(stream =>{
        const option = document.createElement('button');
        option.value = stream.url;
        option.className = "qualityBtn";
        let streamquality = stream.kualitas.replace('default','auto');
        option.innerHTML = `${streamquality}`;
        serverSelect.appendChild(option);
    })
    const watchBtn = document.querySelectorAll(".qualityBtn");
    for (let i = 0; i < watchBtn.length; i++) {
        watchBtn[i].addEventListener("click",function () {
            videoPlayer.style.display = 'block';
            const serverUrl = this.value;
            console.log(serverUrl);
            videoPlayer.src = `${serverUrl}`;
        });
    };
}

function displayAnimeInfo(data) {
    animeInfoContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    watchContainer.style.display = 'none';
    mainLoading.style.display = 'none';

    const videoTitle = document.getElementById('videoTitle');
    videoTitle.innerHTML = `Judul : ${data.title}`;
    const status = document.getElementById("status");
    status.innerHTML = `${data.detailsList[8].subTitle} : ${data.detailsList[8].title}`;
    const genres = document.getElementById('genres');
    genres.innerHTML = "Genre :";
    data.genres.forEach((genre)=>{
        const test = document.createElement('p');
        test.innerHTML = `${genre}`;
        genres.appendChild(test);
    })
    const totalEpisode = document.getElementById('totalEpisode');
    totalEpisode.innerHTML = `${data.detailsList[2].subTitle} : ${data.detailsList[2].title}`;
    const aired = document.getElementById('aired');
    aired.innerHTML = `${data.detailsList[4].subTitle} : ${data.detailsList[4].title}`;
    const rating = document.getElementById('rating');
    rating.innerHTML = `${data.detailsList[6].subTitle} : ${data.detailsList[6].title}`;
    const type = document.getElementById('type');
    type.innerHTML = `${data.detailsList[7].subTitle} : ${data.detailsList[7].title}`;
    const description = document.getElementById('videoDescription');
    description.innerHTML = `Sinopsis : </br>${data.description}`;
    const episodeSelect = document.getElementById('selectElement');
    episodeSelect.style.display = 'block';
    episodeSelect.innerHTML = "";
    const an = document.getElementById('an');
    an.style.display = 'block';


    for (let i = 1; i <= data.currentTotalEpisodes; i++) {
        let option = document.createElement('option');
        option.value = `${data.slugPlayer}/${i}`;
        option.innerHTML = `Episode ${i}`;
        episodeSelect.appendChild(option);
    }

    const watchBtn = document.getElementById('episodeButton');
    watchBtn.style.display = 'block';
    watchBtn.addEventListener("click", async function () {
        const serverSelect = document.getElementById('serverSelect');
        serverSelect.innerHTML="";
        watchContainer.style.display = "none";
        mainLoading.style.display = "flex";
        
        const episodeId = document.getElementById("selectElement").value;
        const res = await fetch(`https://wajik-anime-api.vercel.app/anime/${episodeId}`);
        const episodeData = await res.json();
        displayWatchInfo(episodeData,data.title);
    });
};

function displayWatchInfo(episodeData,titleName) {
    watchContainer.style.display = 'block';
    mainLoading.style.display = "none";

    const downloadButton = document.getElementById('downloadButton');
    downloadButton.href = episodeData.download;

    const serverSelect = document.getElementById('serverSelect');
    serverSelect.innerHTML = "";

    episodeData.videoPlayer.forEach((stream) => {
        const option = document.createElement('button');
        console.log(stream);
        option.value = stream.url;
        option.className = "qualityBtn";
        let streamquality = stream.quality.replace('default','auto');
        option.innerHTML = `${streamquality}`;
        serverSelect.appendChild(option);
    });

    const watchBtn = document.querySelectorAll(".qualityBtn");
    for (let i = 0; i < watchBtn.length; i++) {
        watchBtn[i].addEventListener("click",function () {
            videoPlayer.style.display = 'block';
            const serverUrl = this.value;
            videoPlayer.title = titleName;
            videoPlayer.src = `${serverUrl}`;
        });
    };
};
