// JavaScript (convert.js)
document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.querySelector('#fileInput');
    const convertButton = document.querySelector('#convertButton');
    const resultContainer = document.querySelector('#resultContainer');
  
    convertButton.addEventListener('click', function() {
      const file = fileInput.files[0];
  
      if (file) {
        if (file.type === 'image/png') {
          convertToJPEG(file);
        } else {
          resultContainer.textContent = 'Please select a PNG file.';
        }
      } else {
        resultContainer.textContent = 'Please choose a file first.';
      }
    });
  
    function convertToJPEG(pngFile) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const image = new Image();
        image.src = event.target.result;
  
        image.onload = function() {
          const canvas = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;
  
          const ctx = canvas.getContext('2d');
          ctx.drawImage(image, 0, 0, image.width, image.height);
  
          canvas.toBlob(function(blob) {
            const jpegBlob = new Blob([blob], { type: 'image/jpeg' });
            const jpegUrl = URL.createObjectURL(jpegBlob);
            const jpegLink = document.createElement('a');
            jpegLink.href = jpegUrl;
            jpegLink.download = 'converted.jpeg';
            jpegLink.textContent = 'Download JPEG';
  
            resultContainer.innerHTML = '';
            resultContainer.appendChild(jpegLink);
          }, 'image/jpeg');
        };
      };
  
      reader.readAsDataURL(pngFile);
    }
  });
  