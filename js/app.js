
const videoCardContainer = document.getElementById('videos')

let api_key = "AIzaSyA4TU1Uek6u_tVuH3YodOHWErgbj1DtrJQ"
let video_http=" https://www.googleapis.com/youtube/v3/videos?"
let channel_http = "https://www.googleapis.com/youtube/v3/channels?"


fetch(video_http + new URLSearchParams({
key:api_key,
part:'snippet',
chart:'mostPopular',
maxResults:50,
regionCode:'IN'
}))
.then(res=> res.json())
.then(data => {
    data.items.forEach((item)=>{
getChannelIcon(item)
    })
})
.catch((err)=>{
    console.log(err)
})


const getChannelIcon = (video_data) =>{
fetch(channel_http + new URLSearchParams({
    key:api_key,
    part:'snippet',
    id:video_data.snippet.channelId
    
}))
.then(res => res.json())
.then(data =>{
    video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url
    makeVideoCard(video_data)
})
}

const makeVideoCard = (data) =>{
    videoCardContainer.innerHTML += `
    <div class="video-container" onClick = "location.href = 'https://youtube.com/watch?v=${data.id}'">
    <div class="video">
    <div class="iframe">
 <img src=${data.snippet.thumbnails.high.url} alt="user-img">
       </div>
    </div>
    <div class="video-content">
    <img src= ${data.channelThumbnail} alt="logo">
        <h5>${data.snippet.title}</h5>
    </div>
     <div class="video-detail">
        <h6>${data.snippet.channelTitle}</h6>
        <h6> ${data.snippet.publishedAt}</h6>
    </div>
</div>`
}

const searchInput = document.querySelector(".input-text")
const searchBtn = document.querySelector("#searchButton")
let searchLink = "https://www.youtube.com/results?search_query="


searchBtn.addEventListener('click', () =>{
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value
    }
})


























