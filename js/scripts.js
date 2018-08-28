//Project 5: Use a Public API to Create an Employee Directory
//Kody Broussard
//8/21/2018

//Variables
const pictureGallery = document.getElementById('gallery');
let card = document.createElement('div');



//Dynamic HTML Structure

//const galleryHTML = [
//     '<div class="card">',
//        '<div class="card-img-container">',
//            '<img class="card-img" >',
//         '</div>',
//         '<div class="card-info-container">',
//            '<h3 id="name" class="card-name cap">first last</h3>',
//            '<p class="card-text">email</p>',
//            '<p class="card-text cap">city, state</p>',
//          '</div>',
//        '</div>'
//].join('');
//
//galleryElement.innerHTML = galleryHTML;
//pictureGallery.appendChild(galleryElement);



//Fetch method to GET data from randomuser.me API
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => imageData(data.results))

function imageData(data) {
    //console.log(data);
    let html = '';
    data.forEach(image => {
        //Variables for data items
        const picture = image.picture.medium;
        const firstName = image.name.first;
        const lastName = image.name.last;
        const email = image.email;
        const city = image.location.city;
        const state = image.location.state;
        
        //Dynamic html
        html += `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src='${picture}' alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
                <p class="card-text">${email}</p>
                <p class="card-text cap">${city}, ${state}</p>
            </div>
        </div>
        `;
    });
    pictureGallery.innerHTML = html;
    //Selecting all card div nodes
    card = document.querySelectorAll('.card');
    
    //Card Event Listener
    Array.from(card).forEach(img =>{
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            //var clickTarget = e.target; 
            var clickCard = img;
            //console.log(clickImg);
            modal(clickCard);    
        }); 
    });  
}


//Variables after HTML is added



//Modal Window
//<div class="modal-container">
//                <div class="modal">
//                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//                    <div class="modal-info-container">
//                        <img class="modal-img" src="https://placehold.it/125x125" alt="profile picture">
//                        <h3 id="name" class="modal-name cap">name</h3>
//                        <p class="modal-text">email</p>
//                        <p class="modal-text cap">city</p>
//                        <hr>
//                        <p class="modal-text">(555) 555-5555</p>
//                        <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//                        <p class="modal-text">Birthday: 10/21/2015</p>
//                    </div>
//                </div>
//
//                // IMPORTANT: if you're not going for exceeds 
//                <div class="modal-btn-container">
//                    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//                    <button type="button" id="modal-next" class="modal-next btn">Next</button>
//                </div>
//            </div>

function modal(targetCard) {
    console.log(targetCard);
}


//Event Listeners
//card.addEventListener('click', alertA);











////////////////////////////////////Notes//////////////////////////

//html += `
//        <div class="card">
//            <div class="card-img-container">
//                <img class="card-img" src='${picture}' alt="profile picture">
//            </div>
//            <div class="card-info-container">
//                <h3 id="name" class="card-name cap">${firstName} ${lastName}</h3>
//                <p class="card-text">${email}</p>
//                <p class="card-text cap">${city}, ${state}</p>
//            </div>
//        </div>
//        
//        `;




