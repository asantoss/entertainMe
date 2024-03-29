var youtubeVideoDiv = $('#player');
var youtubeVideoDivContainer = $('#playerContainer');
//This array contains a set of video id's from Tasty;
var bestCookingVidsId = [{ video_id: "vEROU2XtPR8", author: "Traversy Media", title: "JavaScript Fundamentals For Beginners", video_quality: "medium", video_quality_features: Array(0) }, { video_id: "z4L2E6_Gmkk", author: "Tasty", title: "I Made A Giant 30-Pound Burger", video_quality: "medium", video_quality_features: Array(0) }, { video_id: "hHW1oY26kxQ", author: "ChilledCow", title: "lofi hip hop radio - beats to relax/study to", video_quality: "medium", video_quality_features: Array(0) }];

// Promise.all(bestCookingVidsId.map(video => { return getUserRecommendeds(video) })).then(results => { curatedVideos = results })
var userReccomendations;

//This function calls out to the youtube search api using one of the Ids from our array.
var giveMeRandomVid = () => {
    if (userReccomendations != undefined) {
        videoList = userReccomendations;
    } else {
        videoList = curatedVideos
    }
    if (videoList === undefined) {
        videoList = bestCookingVidsId;
        video = videoList[randNum(0, videoList.length)].video_id;
    } else {
        let vidId = videoList[randNum(0, videoList.length)]
        var random = randNum(0, vidId.items.length)
        video = vidId.items[random].id.videoId;
    }
    if (video) {
        player.loadVideoById(video)
    } else {
        video = vidId.items[random + 1].id.videoId;
        player.loadVideoById(video)
    }
    youtubeVideoDivContainer.css('display', 'block');
    youtubeVideoDivContainer.css('opacity', '1');
    youtubeVideoDivContainer.css('animation', 'videoOn 1s ease-in');
    //After our ajax request is fufilled we set the iframe to display block and add a src attribute
}


function reccomendVideos() {
    if (userVidIds === undefined) {
        userReccomendations = curatedVideos;
    } else {
        Promise.all(userVidIds.map(video => { return getUserRecommendeds(video) })).then(results => { userReccomendations = results })
    }
}
function getUserRecommendeds(video) {
    var youtubeApi = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&relatedToVideoId=${video.video_id}&type=video&key=${firebaseConfig.apiKey}`
    return new Promise((resolve, reject) => {
        $.get(youtubeApi)
            .done(results => {
                resolve(results)
            })
            .fail(error => {
                reject(error)
            })
    })
}



//This function just gives me a random number from a min & max
var randNum = function (min, max) {
    if (Number.isInteger(min) && Number.isInteger(max)) {
        return Math.floor((Math.random() * max) + min);
    } else {
        console.log(`Please give me numbers!`)
    }
}

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
window.onYouTubeIframeAPIReady = function () {
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'M7lc1UVf-VE'
    });
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function stopVideo() {
    player.stopVideo();
}
function playVideo() {
    player.playVideo();
}