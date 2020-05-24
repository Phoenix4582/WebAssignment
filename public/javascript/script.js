let email = document.getElementById('e-mail').innerHTML;

function openSlideMenu(){
    document.getElementById('menu').style.width = '250px';
    document.getElementById('sidebar_content').style.marginLeft = '250px';
}

function closeSlideMenu(){
    document.getElementById('menu').style.width = '0';
    document.getElementById('sidebar_content').style.marginLeft = '0';
}


let soundswitch = document.getElementById('soundswitch');
soundswitch.addEventListener('change', function(){
    if(this.checked){
        document.getElementById('bgm').muted = false;
    }else{
        document.getElementById('bgm').muted = true;
    }
});

let volume = document.getElementById('volume');
volume.addEventListener('mousemove', function(){
    var v = this.value;
    document.getElementById('bgm').volume = v / 100;
});

let wallpaper = document.getElementById("video-source");
let wallpaperList = document.getElementById("syswallpaper");
let wallButton = document.getElementById("bg-apply");

wallpaperList.addEventListener('change', function(){
    var index = this.value;
    console.log(index);
    if(index <0 || index > 7){
        alert("No wallpaper found!");
    }else if(index == 0){
        alert("Please select a wallpaper!");
    }
    var segs = document.cookie.split(";");
    var cookies = searchCookie(segs, email);
    let user = cookies.split("%")[0].split("=")[1];
    let sound = cookies.split("%")[2];
    document.cookie = email +"="+user+"%"+"/video/video"+index+".mp4%"+sound;
});

let bgm = document.getElementById("bgm");
let bgmList = document.getElementById("syssound");
let bgmButton = document.getElementById("sd-apply");

bgmList.addEventListener('change', function(){
    var index = this.value;
    console.log(index);
    if(index <0 || index > 3){
        alert("No bgm found!");
    }else if(index == 0){
        alert("Please select a sound!");
    }
    var segs = document.cookie.split(";");
    var cookies = searchCookie(segs, email);
    let user = cookies.split("%")[0].split("=")[1];
    let video = cookies.split("%")[1];
    document.cookie = email +"="+user+"%"+video+"%/audio/audio"+index+".mp3";
});

function previewFile(type) {
    if(type === 'video'){
        const preview = document.getElementById('video-source');
        const file = document.getElementById('bgvideos').files[0];
        const reader = new FileReader();
        
        reader.onload = async (event) => {
            const result = await fetch(event.target.result);
            const blob = await result.blob();
            objUrl = URL.createObjectURL(blob);
        }
        if (file) {
          reader.readAsDataURL(file);
        }

    }else{
        const preview = document.getElementById('sound-source');
        const file = document.getElementById('bgsounds').files[0];
        const reader = new FileReader();
  
        reader.addEventListener("load", function () {
          preview.src = reader.result;
        }, false);
        
        if (file) {
          reader.readAsDataURL(file);
        }
    }
    
}

window.addEventListener('load', loadCookies(email));

function loadCookies(email){
    var result = document.cookie;
    var segs = result.split(";");
    console.log(email);
    var vid = document.getElementById('video-source');
    var sound = document.getElementById('sound-source');

    var cookies = searchCookie(segs, email);
    console.log(cookies);
    vid.src = cookies.split("%")[1];
    sound.src = cookies.split("%")[2];
    document.getElementById('user').innerHTML = cookies.split("%")[0].split("=")[1];
    document.getElementById('user-profile').innerHTML = cookies.split("%")[0].split("=")[1];
    document.getElementById('e-mail').innerHTML = email;
}

function searchCookie(cookies, name){
    for(var i = 0; i < cookies.length; i++){
      if(cookies[i].includes(name)){
        return cookies[i];
      }
    }
    return null;
}

var button1 = document.getElementById('bg-apply');
var button2 = document.getElementById('sd-apply');
var button3 = document.getElementById('pro-apply');

button1.addEventListener('click', refreshPage);
button2.addEventListener('click', refreshPage);
button3.addEventListener('click', logOut);

function refreshPage(){
    window.location.replace("/admin");
}

function logOut(){
    window.location.replace("/");
}