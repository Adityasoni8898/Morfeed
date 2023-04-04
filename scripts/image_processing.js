function processImage() {
  const inputImage = document.getElementById("mentor-image");

  return new Promise((resolve, reject) => {

    // inputImage.addEventListener("change", function() {

      const file = inputImage.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", function() {
        const img = new Image();

        img.addEventListener("load", function() {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxSize = 200 * 1024;
          let width = img.width;
          let height = img.height;

          // Compress the image
          let compressionRatio = 1;
          const fileSize = file.size;
          if (fileSize > maxSize) {
            compressionRatio = Math.sqrt(maxSize / fileSize);
          }

          const newWidth = width * compressionRatio;
          const newHeight = height * compressionRatio;
          canvas.width = newWidth;
          canvas.height = newHeight;
          ctx.drawImage(img, 0, 0, newWidth, newHeight);

          // Crop the image to a square with the maximum middle part of the image
          let offsetX = 0;
          let offsetY = 0;
          let cropWidth = width;
          let cropHeight = height;
          if (width > height) {
            cropWidth = height;
            offsetX = (width - height) / 2;
          } else {
            cropHeight = width;
            offsetY = (height - width) / 2;
          }
          canvas.width = cropWidth;
          canvas.height = cropHeight;
          ctx.drawImage(img, offsetX, offsetY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

          // Convert the cropped image to JPEG
          const jpegDataUrl = canvas.toDataURL("image/jpeg", 0.8);

          // Create a blob object from the JPEG data URL
          const blob = new Blob([jpegDataUrl], {type: 'image/jpeg'});

          // Set the blob object to the 'file' variable
          file = blob;

          // Return the blob object
          resolve(file);
        });

        img.src = reader.result;
      });

      // Convert the input image to a data URL and set the file type to "image/jpeg"
      reader.readAsDataURL(file);
      
    });
}

  // Call the processImage() function and use the result to display the JPEG image
// processImage().then(jpegDataUrl => {
//     file = jpegDataUrl;
//     console.log('new variable');
// });