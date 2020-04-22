
function openSlideMenu(){
    document.getElementById('menu').style.width = '250px';
    document.getElementById('sidebar_content').style.marginLeft = '250px';
}
function closeSlideMenu(){
    document.getElementById('menu').style.width = '0';
    document.getElementById('sidebar_content').style.marginLeft = '0';
}

function openBackMenu(){
    document.querySelector('.modal-bg').style.display = 'flex';
    document.querySelector('.modal-bgscreen').style.display = 'flex';
}

function closeBackMenu(){
    document.querySelector('.modal-bgscreen').style.display = 'none';
    document.querySelector('.modal-bg').style.display = 'none';
}

function openSoundMenu(){
    document.querySelector('.modal-bg').style.display = 'flex';
    document.querySelector('.modal-bgsound').style.display = 'flex';
}

function closeSoundMenu(){
    document.querySelector('.modal-bgsound').style.display = 'none';
    document.querySelector('.modal-bg').style.display = 'none';
}

