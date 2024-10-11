document.addEventListener('DOMContentLoaded', () => {
    const mainContainers = document.querySelectorAll('.videocomparison-container');

    mainContainers.forEach(container => {
        const mainImages = container.querySelectorAll('.videocomparison-images img');
        const thumbnails = container.querySelectorAll('.thumbnail');
        const leftArrow = container.querySelector('.left-arrow');
        const rightArrow = container.querySelector('.right-arrow');

        const imagePathElement = container.querySelector('.videocomparison-info');
        const basePath = imagePathElement.dataset.path + "/"; // Note the trailing slash

        let currentIndex = 0; // Start with the first thumbnail selected

        function updateMainImages(index) {
            const video = container.querySelector('.demo-video');

            // Update video source based on selected thumbnail and method
            video.src = `${basePath}00${index}_result.mp4`; 
            video.poster = `/static/video_comparison/white.png`; // Or whatever image format you have

            // Play the video from the beginning
            video.currentTime = 0;
            video.autoplay = true; 
            video.loop = true;
            video.play(); 
        }


        function updateThumbnails() {
            thumbnails.forEach((thumbnail, index) => {
                thumbnail.classList.remove('selected');
            });

            thumbnails[currentIndex].classList.add('selected');
            // Offset to center the middle thumbnail
            const offset = -currentIndex * 120 + 60 * (thumbnails.length - 1); 
            const thumbBar = container.querySelector('.thumbnails');
            thumbBar.style.transform = `translateX(${offset}px)`;
        }

        leftArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
            updateMainImages(currentIndex);
            updateThumbnails();
        });

        rightArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % thumbnails.length;
            updateMainImages(currentIndex);
            updateThumbnails();
        });

        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                currentIndex = index;
                updateMainImages(currentIndex);
                updateThumbnails();
            });
        });

        // Initialize
        updateMainImages(currentIndex);
        updateThumbnails();
    });
});
