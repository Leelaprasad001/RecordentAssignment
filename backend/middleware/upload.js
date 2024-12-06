const fileUpload = require('express-fileupload');

// Use express-fileupload for handling file uploads
const upload = fileUpload({
  useTempFiles: true,   // You can use temporary files if you don't want to keep the file in memory
  tempFileDir: '/tmp/', // Temporary directory (only needed if `useTempFiles` is true)
  limits: { fileSize: 50 * 1024 * 1024 }, // Optional: set a file size limit (50 MB here)
});

module.exports = upload;
