// display.js
document.addEventListener('DOMContentLoaded', function() {
    // Retrieve placement details from session storage
    const placementDetails = sessionStorage.getItem('placementDetails');

    // Retrieve placement images from session storage
    const placementImages = sessionStorage.getItem('placementImages');

    // Display the placement details on the page
    const detailsContainer = document.getElementById('placementDetails');
    if (placementDetails) {
        detailsContainer.innerText = placementDetails;
    } else {
        detailsContainer.innerText = 'No placement details found.';
    }

    // Display placement images on the page
    const imagesContainer = document.getElementById('placementImages');
    if (placementImages) {
        const images = JSON.parse(placementImages);
        images.forEach(imageUrl => {
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = 'Placement Image';
            imagesContainer.appendChild(imgElement);
        });
    } else {
        imagesContainer.innerText = 'No placement images found.';
    }
});
