document.addEventListener('DOMContentLoaded', () => {
    // 1. Verify authentication
    fetch('/api/check-auth')
        .then(res => res.json())
        .then(data => {
            if (!data.isAuthenticated) {
                // Not authenticated, redirect to login
                window.location.href = '/';
            } else {
                // Authenticated, fetch hotels
                fetchHotels();
            }
        })
        .catch(err => {
            console.error('Auth check error:', err);
            window.location.href = '/';
        });

    // 2. Fetch Hotels
    async function fetchHotels() {
        try {
            const res = await fetch('/api/hotels');
            if (res.status === 401) {
                window.location.href = '/';
                return;
            }
            
            const hotels = await res.json();
            renderHotels(hotels);
        } catch (error) {
            console.error('Error fetching hotels:', error);
            document.getElementById('hotel-grid').innerHTML = '<p class="text-center">Failed to load hotels. Please try again later.</p>';
            document.getElementById('loader').style.display = 'none';
            document.getElementById('hotel-grid').style.display = 'block';
        }
    }

    // 3. Render Hotels to DOM
    function renderHotels(hotels) {
        const grid = document.getElementById('hotel-grid');
        const loader = document.getElementById('loader');
        
        grid.innerHTML = ''; // Clear loading state
        
        if (hotels.length === 0) {
            grid.innerHTML = '<p class="text-center" style="grid-column: 1 / -1;">No hotels available at the moment.</p>';
        } else {
            hotels.forEach(hotel => {
                const card = document.createElement('div');
                card.className = 'hotel-card';
                
                // Format price to currency
                const priceFormatted = new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    maximumFractionDigits: 0
                }).format(hotel.price);

                card.innerHTML = `
                    <div class="hotel-img-wrapper">
                        <img src="${hotel.imageUrl}" alt="${hotel.title}" class="hotel-img" loading="lazy">
                    </div>
                    <div class="hotel-info">
                        <div class="hotel-title">${hotel.title}</div>
                        <div class="hotel-location">${hotel.location}</div>
                        <div class="hotel-rating">
                            <svg class="star-icon" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                            </svg>
                            ${hotel.rating.toFixed(1)}
                        </div>
                        <div class="hotel-price">${priceFormatted} <span style="font-weight: normal; font-size: 0.9em; color: var(--text-light);">night</span></div>
                    </div>
                `;
                
                grid.appendChild(card);
            });
        }
        
        loader.style.display = 'none';
        grid.style.display = 'grid';
    }

    // 4. Logout Logic
    const logoutBtn = document.getElementById('logout-btn');
    logoutBtn.addEventListener('click', async () => {
        try {
            const res = await fetch('/api/logout', { method: 'POST' });
            if (res.ok) {
                window.location.href = '/';
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    });
});
