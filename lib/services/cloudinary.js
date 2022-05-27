require('dotenv').config();
// const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.uploader
  .upload('./assets/ingredient_cinnamon.png', {
    resource_type: 'image',
    tags: 'ingredient image',
  })
  .then((results) => {
    console.log('successful upload', JSON.stringify(results, null, 2));
  })
  .catch((error) => {
    console.log('error in uploading', JSON.stringify(error, null, 2));
  });
