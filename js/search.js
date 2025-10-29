// Search Functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        alert('Masukkan kata kunci pencarian');
        return;
    }
    
    // Gabungkan semua data untuk pencarian
    const allMedia = [...sampleData.movies, ...sampleData.series];
    
    // Filter hasil pencarian
    const searchResults = allMedia.filter(media => 
        media.title.toLowerCase().includes(searchTerm) ||
        media.genre.toLowerCase().includes(searchTerm) ||
        media.description.toLowerCase().includes(searchTerm)
    );
    
    displaySearchResults(searchResults, searchTerm);
}

function displaySearchResults(results, searchTerm) {
    // Sembunyikan sections utama
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Hapus hasil pencarian sebelumnya jika ada
    const existingResults = document.getElementById('searchResults');
    if (existingResults) {
        existingResults.remove();
    }
    
    // Buat section untuk hasil pencarian
    const searchResultsSection = document.createElement('section');
    searchResultsSection.id = 'searchResults';
    searchResultsSection.className = 'search-results';
    searchResultsSection.innerHTML = `
        <div class="container">
            <h2 class="section-title">Hasil Pencarian: "${searchTerm}"</h2>
            <div class="search-results-grid" id="searchResultsGrid"></div>
            ${results.length === 0 ? '<p class="no-results">Tidak ada hasil yang ditemukan.</p>' : ''}
        </div>
    `;
    
    // Sisipkan setelah header
    document.querySelector('.hero').after(searchResultsSection);
    
    // Tampilkan hasil
    const resultsGrid = document.getElementById('searchResultsGrid');
    results.forEach(media => {
        const mediaCard = createMediaCard(media, media.episodes ? 'series' : 'movie');
        resultsGrid.appendChild(mediaCard);
    });
}

// Event listeners
searchBtn.addEventListener('click', performSearch);

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
});

// Fungsi untuk kembali ke tampilan normal
function clearSearch() {
    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.remove();
    }
    
    // Tampilkan kembali sections utama
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'block';
    });
    
    searchInput.value = '';
}

// Tambahkan event listener untuk clear search ketika klik logo
document.querySelector('.nav-brand').addEventListener('click', function(e) {
    e.preventDefault();
    clearSearch();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
