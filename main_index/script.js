document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = new Image();
            image.onload = function () {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
                if (qrCode) {
                    const placementDetails = qrCode.data;
                    sessionStorage.setItem('placementDetails', placementDetails);
                    document.getElementById('submitButton').style.display = 'block';
                } else {
                    alert('No QR code found.');
                }
            };
            image.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('openCamera').addEventListener('click', function () {
    // Access the camera stream
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
        .then(function (stream) {
            const video = document.createElement('video');
            video.setAttribute('playsinline', '');
            video.srcObject = stream;
            video.play();
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            requestAnimationFrame(scan);

            function scan() {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
                const qrCode = jsQR(imageData.data, imageData.width, imageData.height);
                if (qrCode) {
                    const placementDetails = qrCode.data;
                    sessionStorage.setItem('placementDetails', placementDetails);
                    document.getElementById('submitButton').style.display = 'block';
                } else {
                    requestAnimationFrame(scan);
                }
            }
        })
        .catch(function (error) {
            console.error('Error accessing camera:', error);
            alert('Error accessing camera. Please allow camera access and try again.');
        });
});

document.getElementById('submitButton').addEventListener('click', function () {
    window.location.href = 'display.html';
});
