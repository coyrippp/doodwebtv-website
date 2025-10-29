// Sample data untuk film dan series
const sampleData = {
    movies: [
        {
            id: 1,
            title: "Avengers: Endgame",
            year: 2019,
            genre: "Action, Adventure",
            rating: 8.4,
            image: "assets/images/placeholder.jpg",
            description: "The Avengers must travel back in time to undo Thanos' actions and restore order to the universe.",
            videoUrl: "https://example.com/video1.mp4"
        },
        {
            id: 2,
            title: "Spider-Man: No Way Home",
            year: 2021,
            genre: "Action, Adventure",
            rating: 8.2,
            image: "assets/images/placeholder.jpg",
            description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help.",
            videoUrl: "https://example.com/video2.mp4"
        },
        {
            id: 3,
            title: "The Batman",
            year: 2022,
            genre: "Action, Crime",
            rating: 7.8,
            image: "assets/images/placeholder.jpg",
            description: "When a killer targets Gotham's elite, Batman must uncover the corruption.",
            videoUrl: "https://example.com/video3.mp4"
        },
        {
            id: 4,
            title: "Black Panther",
            year: 2018,
            genre: "Action, Adventure",
            rating: 7.3,
            image: "assets/images/placeholder.jpg",
            description: "T'Challa returns home to Wakanda to take his rightful place as king.",
            videoUrl: "https://example.com/video4.mp4"
        }
    ],
    series: [
        {
            id: 1,
            title: "Stranger Things",
            year: 2016,
            genre: "Drama, Fantasy",
            rating: 8.7,
            image: "assets/images/placeholder.jpg",
            description: "When a young boy disappears, his mother must uncover the truth.",
            episodes: 34
        },
        {
            id: 2,
            title: "The Mandalorian",
            year: 2019,
            genre: "Action, Adventure",
            rating: 8.8,
            image: "assets/images/placeholder.jpg",
            description: "The travels of a lone bounty hunter in the outer reaches of the galaxy.",
            episodes: 24
        },
        {
            id: 3,
            title: "Wednesday",
            year: 2022,
            genre: "Comedy, Fantasy",
            rating: 8.2,
            image: "assets/images/placeholder.jpg",
            description: "Follows Wednesday Addams' years as a student at Nevermore Academy.",
            episodes: 8
        }
    ]
};

// Fungsi untuk memuat film
function loadFeaturedMovies() {
    const grid = document.getElementById('featuredMovies');
    grid.innerHTML = '';
    
    sampleData.movies.forEach(movie => {
        const movieCard = createMediaCard(movie, 'movie');
        grid.appendChild(movieCard);
    });
}

// Fungsi untuk memuat series
function loadSeries() {
    const grid = document.getElementById('seriesGrid');
    grid.innerHTML = '';
    
    sampleData.series.forEach(series => {
        const seriesCard = createMediaCard(series, 'series');
        grid.appendChild(seriesCard);
    });
}

// Fungsi untuk membuat kartu media
function createMediaCard(media, type) {
    const card = document.createElement('div');
    card.className = type === 'movie' ? 'movie-card' : 'series-card';
    card.setAttribute('data-id', media.id);
    card.setAttribute('data-type', type);
    
    card.innerHTML = `
        <img src="${media.image}" alt="${media.title}" class="card-image">
        <div class="card-content">
            <h3 class="card-title">${media.title}</h3>
            <div class="card-info">
                <span>${media.year}</span>
                <span>⭐ ${media.rating}</span>
            </div>
            ${type === 'series' ? `<div class="card-info"><span>${media.episodes} Episodes</span></div>` : ''}
        </div>
    `;
    
    card.addEventListener('click', () => {
        if (type === 'movie') {
            openVideoPlayer(media);
        } else {
            // Untuk series, bisa diarahkan ke halaman detail
            alert(`Series: ${media.title}\n${media.description}`);
        }
    });
    
    return card;
}

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    loadFeaturedMovies();
    loadSeries();
    
    // Smooth scroll untuk navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
