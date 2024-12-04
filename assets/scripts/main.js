import { renderPlayerSidebarCard, renderPlayerTeamCard, createEmptyPositionCard } from './components.js';

let dataPlayers = [];
let dataSubArr = [];
let dataTeamArr = [];
let dataPlayearArr = [];

const positions = {
  stadium: ['GK', 'LB', 'CB', 'CB', 'RB', 'CM', 'CM', 'CM', 'LW', 'ST', 'RW'],
  substitutes: ['GK', 'DEF', 'MID', 'ATT', 'ATT', 'ATT', 'ATT', 'ATT']
};



function setupEmptyStadiumPositions() {
  const teamZone = document.getElementById('team-zone');
  positions.stadium.forEach((pos, index) => {
    const emptyCard = createEmptyPositionCard(pos);
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = emptyCard;
    cardDiv.firstElementChild.classList.add(`empty-card-${index + 1}`);
    teamZone.appendChild(cardDiv.firstElementChild);
  });
}

function setupEmptySubstituteBench() {
  const subZone = document.getElementById('substitutes-zone');
  positions.substitutes.forEach(pos => {
    const emptyCard = createEmptyPositionCard(pos);
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = emptyCard;
    subZone.appendChild(cardDiv.firstElementChild);
  });
}

fetch('/Data/players.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        dataPlayers = data.players;
        
        setupEmptyStadiumPositions();
        setupEmptySubstituteBench();

        dataPlayearArr = dataPlayers;
        renderPlayersList(dataPlayearArr);

        initializeDragAndDrop();
        initializePlayerSearch();
        initializePositionFilter();
        initializeFormationChange();

        // console.log(dataPlayers);
    })
    .catch(error => {
        console.error('fetch Error:', error);
    });





function renderPlayersList(data) {
    const boxPlayers = document.getElementById('side-zone');
    for (let i = 0; i < data.length; i++) {
        boxPlayers.innerHTML += renderPlayerSidebarCard(data[i]);
    }
}





function initializeDragAndDrop() {
  const playerCard = document.querySelectorAll('.p-card');
  const dropZone = document.querySelectorAll('.drop-zone');
  const deleteZone = document.getElementById('drop-delet');
  
  const cardOrigins = new Map();

  function initializeCardEvents(card) {
    card.addEventListener('dragstart', (e) => {
      card.classList.add('dragging');

      // start drag
      const origin = {
        section: card.closest('#team-zone') ? 'stadium' : 
                 card.closest('#substitutes-zone') ? 'substitutes' : 'sidebar',
        position: card.classList.contains('substitute-card') ? null : 
                 Array.from(card.classList).find(cls => cls.startsWith('empty-card-'))
      };
      cardOrigins.set(card, origin);
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
    });
  }

  playerCard.forEach(initializeCardEvents);

  deleteZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    const draggingCard = document.querySelector('.dragging');
    if (draggingCard && (draggingCard.closest('#team-zone') || draggingCard.closest('#substitutes-zone'))) {
      deleteZone.classList.add('scale-110', 'bg-gradient-to-r', 'from-red-500', 'to-red-700', 'shadow-[0_0_20px_rgba(255,68,68,0.6),0_0_40px_rgba(255,68,68,0.3)]');
      deleteZone.querySelector('svg').classList.add('rotate-[-8deg]', 'scale-120', 'animate-[shake_0.3s_ease-in-out]');
    }
  });

  deleteZone.addEventListener('dragleave', () => {
    deleteZone.classList.remove('scale-110', 'bg-gradient-to-r', 'from-red-500', 'to-red-700', 'shadow-[0_0_20px_rgba(255,68,68,0.6),0_0_40px_rgba(255,68,68,0.3)]');
    deleteZone.querySelector('svg').classList.remove('rotate-[-8deg]', 'scale-120', 'animate-[shake_0.3s_ease-in-out]');
  });

  deleteZone.addEventListener('drop', (e) => {
    e.preventDefault();
    const draggingCard = document.querySelector('.dragging');
    if (!draggingCard) return;

    const origin = cardOrigins.get(draggingCard);
    
    if (origin && origin.section !== 'sidebar') {

      const emptyCard = document.createElement('div');
      if (origin.section === 'stadium') {
        const position = draggingCard.dataset.pos;
        emptyCard.innerHTML = createEmptyPositionCard(position);
        emptyCard.firstElementChild.classList.add(origin.position);
      } else {
        emptyCard.innerHTML = createEmptyPositionCard(draggingCard.dataset.pos);
        emptyCard.firstElementChild.classList.add('substitute-card');
      }
      
      draggingCard.parentNode.replaceChild(emptyCard.firstElementChild, draggingCard);
      
      initializeCardEvents(emptyCard.firstElementChild);
      
      draggingCard.remove();
      
      updatePlayerDataFromDOM();
    }
    
    deleteZone.classList.remove('scale-110', 'bg-gradient-to-r', 'from-red-500', 'to-red-700', 'shadow-[0_0_20px_rgba(255,68,68,0.6),0_0_40px_rgba(255,68,68,0.3)]');
    deleteZone.querySelector('svg').classList.remove('rotate-[-8deg]', 'scale-120', 'animate-[shake_0.3s_ease-in-out]');
  });

  dropZone.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggingCard = document.querySelector('.dragging');
      const targetSection = zone.closest('#substitutes-zone') ? 'substitutes' : 'stadium';
      
      if (targetSection === 'substitutes' || zone.dataset.pos === draggingCard.dataset.pos) {
        zone.classList.add('valid-drop-target');
      } else {
        zone.classList.add('invalid-drop-target');
      }
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('valid-drop-target', 'invalid-drop-target');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      const draggingCard = document.querySelector('.dragging');
      if (!draggingCard) return;

      const targetSection = zone.closest('#substitutes-zone') ? 'substitutes' : 'stadium';
      const origin = cardOrigins.get(draggingCard);
      
      if (targetSection === 'stadium' && zone.dataset.pos !== draggingCard.dataset.pos) {
        return;
      }

      if (!zone.classList.contains('empty-placeholder')) {
        const existingCard = zone.cloneNode(true);
        const existingOrigin = cardOrigins.get(zone);
        
        if (origin && origin.section !== 'sidebar') {
          let sectionId;
          if (origin.section === 'stadium') {
              sectionId = 'team-zone';
          } else {
              sectionId = 'substitutes-zone';
          }

          const originSection = document.getElementById(sectionId);

          if (origin.section === 'stadium') {
            existingCard.className = `empty-card p-card drop-zone ${origin.position || ''}`;
          } else {
            existingCard.className = 'empty-card p-card drop-zone substitute-card';
          }
          originSection.appendChild(existingCard);
          initializeCardEvents(existingCard);
        } else {
          const sideZone = document.getElementById('side-zone');
          existingCard.className = 'p-card side-card';
          existingCard.setAttribute('draggable', 'true');
          sideZone.appendChild(existingCard);
          initializeCardEvents(existingCard);
        }
      }

      const newCard = draggingCard.cloneNode(true);
      newCard.classList.remove('dragging', 'side-card');
      
      if (targetSection === 'substitutes') {
        newCard.className = 'empty-card p-card drop-zone substitute-card';
      } else {
        const position = Array.from(zone.classList)
          .find(cls => cls.startsWith('empty-card-'));
        newCard.className = `empty-card p-card drop-zone ${position || ''}`;
      }

      // Update the card's position
      zone.parentNode.replaceChild(newCard, zone);
      initializeCardEvents(newCard);
      
      draggingCard.remove();
      
      document.querySelectorAll('.drop-zone').forEach(z => {
        z.classList.remove('valid-drop-target', 'invalid-drop-target');
      });
      
      updatePlayerDataFromDOM();
    });
  });
}



// update data to loacl:
function updatePlayerDataFromDOM() {
  const teamBoxCards = document.querySelectorAll('.team-card');
  const substitutesZone = document.getElementById('substitutes-zone');
  const playersZone = document.getElementById('side-zone');

  dataTeamArr = Array.from(teamBoxCards).map(card => card.outerHTML);
  dataSubArr = Array.from(substitutesZone.children).map(card => card.outerHTML);
  dataPlayearArr = Array.from(playersZone.children).map(card => card.outerHTML);

  saveDataToLocalStorage();
}

// save data to local:
function saveDataToLocalStorage() {
  localStorage.setItem('dataTeamArr', JSON.stringify(dataTeamArr));
  localStorage.setItem('dataSubArr', JSON.stringify(dataSubArr));
  localStorage.setItem('dataPlayearArr', JSON.stringify(dataPlayearArr));

}



// search about player :
function initializePlayerSearch() {
  const inputSearch = document.getElementById('search-dropdown');
  
  inputSearch.addEventListener('input', ()=>{
    const playersZone = document.getElementById('side-zone');
    const cards = playersZone.querySelectorAll('.side-card');
    
    cards.forEach(element => {
      const cardPlayerName = element.querySelector('.name-empty').textContent.trim().toLowerCase();

      if ( cardPlayerName.includes(inputSearch.value.toLowerCase()) ) {        
        element.style.display = 'block';
      } else {
        element.style.display = 'none';
      
      }
    });
  });
}



// dropdown filter : 
function initializePositionFilter() {
  const filterBtnChoice = document.getElementById('dropdown-button');
  const choiceBtn = document.getElementById('dropdown').querySelectorAll('button');
  choiceBtn.forEach(element => {
    element.addEventListener('click', ()=>{
      const playersZone = document.getElementById('side-zone');
      const cards = playersZone.querySelectorAll('.side-card');
            
      const yourChoice = element.textContent;
      
      filterBtnChoice.firstChild.textContent = yourChoice;
      

      cards.forEach(element => {

        const cardPlayerName = element.dataset.pos;
        if (yourChoice == 'ALL') {
          element.style.display = 'block';
        }else if (yourChoice == cardPlayerName) {
          
          element.style.display = 'block';
        } else {
          element.style.display = 'none';
        
        }
      });

      filterBtnChoice.click();

    });
  });
}





const nameFormRegex = /^[a-zA-Z]{2,10}( [a-zA-Z]{2,10})?$/;
const numberFormRegex = /^(1[0-9]|[2-9][0-9])$/;
const imgUrlRegex = /https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|bmp|svg)/i;
  

const addNewPlayearBtn = document.getElementById('submit-new-player');

const nameForm = document.getElementById('namefrom');
const imgForm = document.getElementById('imgform');

const ratingForm = document.getElementById('ratingform');
const posForm = document.getElementById('posform');

const pacForm = document.getElementById('pacform');
const shoForm = document.getElementById('shoform');
const pasForm = document.getElementById('pasform');
const driForm = document.getElementById('driform');
const defForm = document.getElementById('defform');
const phyForm = document.getElementById('phyform');


function validatePlayerInputs() {
  let inputsValide = true;

  // name:
  if (!nameFormRegex.test(nameForm.value)) {
    inputsValide = false;
    nameForm.classList.add('input-not-valide');
  }else{
    nameForm.classList.remove('input-not-valide');
  }

  // img Form:
  if (!imgUrlRegex.test(imgForm.value) && imgForm.value != "") {
    inputsValide = false;
    imgForm.classList.add('input-not-valide');
  }else{
    imgForm.classList.remove('input-not-valide');
  }

  // rating:
  if (!numberFormRegex.test(ratingForm.value)) {
    inputsValide = false;
    ratingForm.classList.add('input-not-valide');
  }else{
    ratingForm.classList.remove('input-not-valide');
  }

  // pac:
  if (!numberFormRegex.test(pacForm.value)) {
    inputsValide = false;
    pacForm.classList.add('input-not-valide');
  }else{
    pacForm.classList.remove('input-not-valide');
  }

  // sho:
  if (!numberFormRegex.test(shoForm.value)) {
    inputsValide = false;
    shoForm.classList.add('input-not-valide');
  }else{
    shoForm.classList.remove('input-not-valide');
  }

  // pas:
  if (!numberFormRegex.test(pasForm.value)) {
    inputsValide = false;
    pasForm.classList.add('input-not-valide');
  }else{
    pasForm.classList.remove('input-not-valide');
  }

  // dri:
  if (!numberFormRegex.test(driForm.value)) {
    inputsValide = false;
    driForm.classList.add('input-not-valide');
  }else{
    driForm.classList.remove('input-not-valide');
  }

  // def:
  if (!numberFormRegex.test(defForm.value)) {
    inputsValide = false;
    defForm.classList.add('input-not-valide');
  }else{
    defForm.classList.remove('input-not-valide');
  }

  // phy:
  if (!numberFormRegex.test(phyForm.value)) {
    inputsValide = false;
    phyForm.classList.add('input-not-valide');
  }else{
    phyForm.classList.remove('input-not-valide');
  }

  
  return inputsValide;
}





// get data from inputs from to object :
function createPlayerDataObject() {
  let dataAddNew = {};
  if (posForm.value === "GK") {

    dataAddNew = {
      "name": nameForm.value,
      "photo": imgForm.value? imgForm.value : "https://cdn.sofifa.net/players/231/410/25_120.png",
      "position": posForm.value,
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "Al-Hilal",
      "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
      "rating": ratingForm.value,
      "diving": pacForm.value,
      "handling": shoForm.value,
      "kicking": pasForm.value,
      "reflexes": driForm.value,
      "speed": defForm.value,
      "positioning": phyForm.value
    };
  }else{
    dataAddNew = {
      "name": nameForm.value,
      "photo": imgForm.value? imgForm.value : "https://cdn.sofifa.net/players/231/410/25_120.png",
      "position": posForm.value,
      "nationality": "Morocco",
      "flag": "https://cdn.sofifa.net/flags/ma.png",
      "club": "Al-Hilal",
      "logo": "https://cdn.sofifa.net/meta/team/3468/120.png",
      "rating": ratingForm.value,
      "pace": pacForm.value,
      "shooting": shoForm.value,
      "passing": pasForm.value,
      "dribbling": driForm.value,
      "defending": defForm.value,
      "physical": phyForm.value
    };
  }


  return dataAddNew;
}



function addPlayerToSidebar() {
  const playersZone = document.getElementById('side-zone');
  playersZone.innerHTML = renderPlayerSidebarCard(createPlayerDataObject()) + playersZone.innerHTML;

 
}




addNewPlayearBtn.addEventListener('click', ()=>{
  if (validatePlayerInputs()) {
    addPlayerToSidebar();

    const closeModal = document.getElementById('close-modal');

    closeModal.click();
    clearPlayerInputs();

    updatePlayerDataFromDOM();
    initializeDragAndDrop();
    initializePlayerSearch();
    initializePositionFilter();
  }else{
    console.log('nvalid');
  }
});




function clearPlayerInputs() {

  nameForm.value = "";
  imgForm.value = "";
  ratingForm.value = "";
  
  pacForm.value = "";
  shoForm.value = "";
  pasForm.value = "";
  driForm.value = "";
  defForm.value = "";
  phyForm.value = "";

}



function initializeFormationChange() {
  const optionFormation = document.getElementById('teamformation');
  
  optionFormation.addEventListener('change', () => {
    
    if (optionFormation.value == "442") {
      const parTeam = document.getElementById('team-zone');
      const allCardTeamFormation = parTeam.querySelectorAll('.empty-card');

      allCardTeamFormation.forEach(element => {
        element.classList.add('second-plan');
        
      });

    }
    
    if (optionFormation.value == "433") {
      
      const parTeam = document.getElementById('team-zone');
      const allCardTeamFormation = parTeam.querySelectorAll('.empty-card');

      allCardTeamFormation.forEach(element => {
        element.classList.remove('second-plan');
        
      });

    }
      

  });

};