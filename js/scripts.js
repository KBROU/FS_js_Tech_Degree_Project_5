//Project 5: Use a Public API to Create an Employee Directory
//Kody Broussard
//8/21/2018

//Global Variables
const pictureGallery = document.getElementById('gallery');
let card = document.createElement('div');
let modalContainer = document.createElement('div');
modalContainer.classList.add('modal-container');
let modalInfo = document.createElement('p');
const searchDiv = document.querySelector('.search-container');
let firstName = '';
let lastName = '';

//Fetch method to GET data from randomuser.me API. Made sure results were only US nationality
fetch('https://randomuser.me/api/?results=12&nat=us')
    .then(response => response.json())
    .then(data => imageData(data.results))

//*************function to process the random user data***********************
function imageData(data) {
    let html = '';
    data.forEach(image => {
        //Variables for data items
        const picture = image.picture.medium;
        firstName = image.name.first;
        lastName = image.name.last;
        const email = image.email;
        const city = image.location.city;
        const state = image.location.state;
        const phoneNumber = image.cell;
        const address = image.location.street;
        const postCode= image.location.postcode;
        const dob = image.dob.date;
        const cell = image.cell;


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
                <p class="card-text dob mod">${dob}</p>
                <p class="card-text cell mod">${cell}</p>
                <p class="card-text post mod">${postCode}</p>
                <p class="card-text address mod cap">${address}</p>

            </div>
        </div>
        `;
    });
    //add html to index.html under the div with gallery ID
    pictureGallery.innerHTML = html;
    //Selecting all card div nodes
    card = document.querySelectorAll('.card');
    //Selecting all card div nodes with mod class
    modalInfo = document.querySelectorAll('.mod');
    //hiding the additional modal information
    Array.from(modalInfo).forEach(obj =>{
        obj.style.display = 'none';
    });

    //Card Event Listener. Used to listen to when ever a card is clicked
    Array.from(card).forEach(img =>{
        img.addEventListener('click', (e) => {
            modalContainer.style.display = 'block';
            var cardArray = Array.from(card);
            var clickCard = img;
            modal(clickCard, cardArray);
        });
    });
}


// ************************Search Feature**************************************
//adding the search html to index.html
let searchHTML = '';
searchHTML += `
  <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
`;
searchDiv.innerHTML = searchHTML;
//variables for search feature
const searchInput = document.getElementById('search-input');
const submitButton = document.getElementById('search-submit');
//Event Listener for search feature submit button. Sends user typed data to filter function in lower case letters.
submitButton.addEventListener('click', (e) => {
  const searchValue = searchInput.value.toLowerCase();
  filter(searchValue);
});
//Filter function filters card name data based on user input into search bar
function filter (sValue) {
  Array.from(card).forEach(name =>{
      const searchName = name.querySelector('.card-name').textContent;

      if (searchName.indexOf(sValue) > -1) {
        name.style.display = 'block';
      } else {
        name.style.display = 'none';
      };
  });
}
//*******************Modal Window function*************************************

function modal(click, cArray) {
    //console.log(modData);
    var targetCard = click;
    //Modal window variables
    const modalPicture =  targetCard.querySelector('.card-img').src;
    const modalName = targetCard.querySelector('.card-name').textContent;
    const modalEmail = targetCard.querySelector('.card-text').textContent;
    const modalLocation = targetCard.querySelector('.card-text.cap').textContent;
    const modDoB = targetCard.querySelector('.card-text.dob.mod').textContent.slice(0, 10).split('-').reverse();
    const tempModDoB =modDoB.splice(1, 1);
    modDoB.splice(0, 0, tempModDoB[0]);
    const modalCell = targetCard.querySelector('.card-text.cell.mod').textContent;
    const modalAddress = targetCard.querySelector('.card-text.address.mod.cap').textContent;
    const modalPost = targetCard.querySelector('.card-text.post.mod').textContent;


    //dynamic html for modal window
    let html = '';
    html += `

        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src='${modalPicture}' alt="profile picture">
                <h3 id="name" class="modal-name cap">${modalName}</h3>
                <p class="modal-text">${modalEmail}</p>
                <p class="modal-text cap">${modalLocation}</p>
                <hr>
                <p class="modal-text">${modalCell}</p>
                <p class="modal-text cap">${modalAddress}, ${modalLocation} ${modalPost}</p>
                <p class="modal-text">Birthday: ${modDoB.join('-')}</p>
            </div>
        </div>
        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>

    `;
    modalContainer.innerHTML = html;
    pictureGallery.parentNode.insertBefore(modalContainer,pictureGallery.nextElementSibling);
//Close button feature
    const closeButton = document.getElementById('modal-close-btn');
    closeButton.addEventListener('click', (e) => {
        modalContainer.style.display = 'none';
    });
//Previous and Next Button feature variables
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    //Event listener for prev and next buttons
    modalPrev.addEventListener('click', (e) => {
      if(cArray.indexOf(click) > 0 ) {
        var prevC = cArray[cArray.indexOf(click) - 1];
        modal(prevC, cArray);
      } else {
        var prevC = cArray[11];
        modal(prevC, cArray);
      }
    });

    modalNext.addEventListener('click', (e) => {
      if(cArray.indexOf(click) < 11 ) {
        var nextC = cArray[cArray.indexOf(click) + 1];
        modal(nextC, cArray);
      } else {
        var nextC = cArray[0];
        modal(nextC, cArray);
      }
    });
}
