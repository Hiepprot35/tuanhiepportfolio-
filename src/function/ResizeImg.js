export const ResizeImg = (imgBlob, callback) => {
    const img = new Image();
    img.onload = () => {
        const canvas = document.createElement('canvas');
        const newWidth = 100;
        const newHeight = 100;

        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, newWidth, newHeight);

        canvas.toBlob((blob) => {
            callback(blob);
        }, 'image/jpeg', 0.7);
    };

    const reader = new FileReader();
    reader.onload = (event) => {
        img.src = event.target.result;
    };
    reader.readAsDataURL(imgBlob);
};