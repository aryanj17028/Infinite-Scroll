const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'khwJM8C9VtsxGSt7rk8sL4q-JqSi60i-M_8dCLm5krc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
    console.log('image loaded');
    console.log(imagesLoaded);
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        console.log('ready equals', ready);
        loader.hidden = true;
       
    }
}



//Helper Function to Set Attribute on DOM Element
function setAttributes(element, attribute){
    for (const key in attribute){
        element.setAttribute(key, attribute[key]);
    }
}

//Create Elements For Links and Photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log('total images', totalImages);
    //Run function for each object in photosArray
    photosArray.forEach((photo)=> {
        //Create <a> to link to Unsplash
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        //Create <img> for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
           src: photo.urls.regular,
           alt: photo.alt_description,
           title: photo.alt_description,
        });

        //Event Listner check when each is finished loading
        img.addEventListener('load', imageLoaded());

        //Put <img> inside <a> then put both inside imageContainer Element
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });
}




//Get Photes from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        console.log(photosArray);
        displayPhotos();
    } catch (error){
        //Catch Error Here
    }
}


//Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();
