const key_gif = '1PxlF2SLqUlTvagTQIQi6NJJpVpu6OhA';
const gif_url='https://api.giphy.com/v1/gifs/search';


/*function onjsn_gif(json){
    console.log('JSON gif ricevuto');
    console.log(json);
    const result=json.data[0];
    const immagine=result.images.downsized_medium.url;
    const img=document.createElement('img');
    img.src=immagine;
    boxes=document.querySelectorAll('.box');
    console.log(boxes)
    boxes[index].appendChild(img);
    index++;
}*/

function onjsn_gif(json){
    console.log('JSON gif ricevuto');
    console.log(json);
    const result=json.data[0];
    const immagine=result.images.downsized_medium.url;
    eliminazione.src=immagine;
    
}

function onresponse(response){
    console.log('Risposta ricevuta');
    return response.json();
}

let eliminazione;
function search(event){
    eliminazione=event.currentTarget;
    console.log('Eseguo ricerca per elementi rigurardanti:'+ eliminazione.dataset.url);
    gif_request = gif_url + '?api_key=' + key_gif + '&q=' + eliminazione.dataset.url + '&limit=1';
    fetch(gif_request).then(onresponse).then(onjsn_gif);    
}

const images=document.querySelectorAll('article img');
for(image of images){
    image.addEventListener('click', search);
}



//Credenziali spotify
const spotify_key= '403ebbde31a04ca7b3debea8430c834e';
const spotify_secret='58ea0d1efb324cecab527142a07bddae';
const spotify_token_endpoint = 'https://accounts.spotify.com/api/token';
const spotify_endpoint='https://api.spotify.com/v1/playlists/3MZB3HDdoxUJeoQqrFCO3e';


//richiedo token
let token;
let audio=new Audio();


fetch(spotify_token_endpoint, {
    method: "post",
    body: 'grant_type=client_credentials',
    headers:
    {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(spotify_key + ':' + spotify_secret)
    }
 }
).then(onTokenResponse).then(onTokenJson);

function onTokenResponse(response)
{
    return response.json();
}


function onTokenJson(json){

    console.log(json)
    token=json.access_token;

    fetch(spotify_endpoint,
        {
            headers:{
                'Authorization' : 'Bearer ' + token
            }
        }    
    ).then(onresponse).then(onJsonSpotify);
}

function onJsonSpotify(json){
    console.log('Json canzoni ricevuto')
    console.log(json)
    const num=4;
    const canzoni=json.tracks.items;
    const box_canzoni=document.querySelectorAll('.spotify_box');
    let i=0;
    for(c of box_canzoni){
        const immagine_song=c.querySelector('img');
        immagine_song.src=canzoni[i].track.album.images[0].url;
        const info_song=c.querySelector('.box_info');
        const info=document.createElement('a');
        info.classList.add('info-canzone');
        info.textContent = "Clicca per ascoltare ->  " + canzoni[i].track.name + " : " + canzoni[i].track.artists[0].name;
        info.link = canzoni[i].track.preview_url;
        info_song.appendChild(info);
        info.link=canzoni[i].track.preview_url;
        info.addEventListener('click', play)
        i++;
   }
}

function play(event){
    let link=event.currentTarget.link;
    audio.src=link;
    audio.play();
}




