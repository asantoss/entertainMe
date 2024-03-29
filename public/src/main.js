var apiResults = $('#apiResults');
var random;
var loader = document.getElementById('loader')
var saveBtn = document.getElementById('saveButton')
const main = document.getElementById("main");
$('#entertainMeBtn').click(() => {
    main.classList.add("expanded");
    saveBtn.innerText = 'Save'
    youtubeVideoDivContainer.css('opacity', '0');
    youtubeVideoDivContainer.css('display', 'none');
    document.getElementById('nyt_tmdb').setAttribute('style', 'display: none;');
    document.getElementById('errorStats').innerHTML = ""
    document.getElementById('mainLoader').style.display = 'block'
    stopVideo();
    //This portion sets our iframe element to hide
    setTimeout(() => {
        random = Math.floor((Math.random() * 4) + 1);
        if (random === 1) {
            saveBtn.addEventListener('click', () => {
                saveBtn.style.display = 'none'
                loader.style.display = 'block'
                setTimeout(() => {
                    saveVid(uid, player.getVideoData()).then(() => {
                        loader.style.display = 'none'
                        saveBtn.style.display = 'block'
                        saveBtn.innerText = 'Saved'
                    })
                }, 1500)
            })
            giveMeRandomVid()
        } else if (random === 2) {
            saveBtn.addEventListener('click', () => {
                saveBtn.style.display = 'none'
                loader.style.display = 'block'
                setTimeout(() => {
                    saveBook(uid, currentBook).then(() => {
                        loader.style.display = 'none'
                        saveBtn.style.display = 'block'
                        saveBtn.innerText = 'Saved'
                    })
                }, 1500)
            })
            document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
            getNYT()
        } else if (random === 3) {
            saveBtn.addEventListener('click', () => {
                saveBtn.style.display = 'none'
                loader.style.display = 'block'
                setTimeout(() => {
                    saveMovie(uid, currentMovie).then(() => {
                        loader.style.display = 'none'
                        saveBtn.style.display = 'block'
                        saveBtn.innerText = 'Saved'
                    })
                }, 1500)
            })
            document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
            getMovies()
        } else if (random === 4) {
            document.getElementById('nyt_tmdb').setAttribute('style', 'display: block');
            newRandomSong()
            saveBtn.addEventListener('click', () => {
                saveBtn.style.display = 'none'
                loader.style.display = 'block'
                setTimeout(() => {
                    saveSong(uid, song).then(() => {
                        loader.style.display = 'none'
                        saveBtn.style.display = 'block'
                        saveBtn.innerText = 'Saved'
                    })
                }, 1500)
            })
        }
        document.getElementById('mainLoader').style.display = 'none'
    }, 1500)

})







