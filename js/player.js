// Video Player Functionality
const playerModal = document.getElementById('playerModal');
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');
const closeBtn = document.querySelector('.close');

function openVideoPlayer(media) {
    videoPlayer.src = media.videoUrl;
    videoTitle.textContent = media.title;
    videoDescription.textContent = media.description;
    playerModal.style.display = 'block';
    
    // Auto play video
    videoPlayer.play().catch(e => {
        console.log('Autoplay prevented:', e);
    });
}

function closeVideoPlayer() {
    playerModal.style.display = 'none';
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
}

// Event listeners
closeBtn.addEventListener('click', closeVideoPlayer);

window.addEventListener('click', function(event) {
    if (event.target === playerModal) {
        closeVideoPlayer();
    }
});

// Keyboard controls
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && playerModal.style.display === 'block') {
        closeVideoPlayer();
    }
});

// Fullscreen functionality
videoPlayer.addEventListener('dblclick', function() {
    if (videoPlayer.requestFullscreen) {
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.webkitRequestFullscreen) {
        videoPlayer.webkitRequestFullscreen();
    } else if (videoPlayer.msRequestFullscreen) {
        videoPlayer.msRequestFullscreen();
    }
});
