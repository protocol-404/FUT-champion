export function renderPlayerSidebarCard(data) {

  if(data.position === 'GK'){

    return `
          <div  class="empty-card p-card side-card drop-zone" data-pos="${data.position}" draggable="true">


            <img src="assets/images/card/badg_bg_champions.png" alt="" class="empty-image" draggable="false">
            
            <!-- inside card info -->
            <div class="card-info-empty">

              <!-- player-img-empty -->
              <img src="${data.photo}" alt="" class="player-img-empty" draggable="false">

              

              <!-- rating -->
              <div class="rating-empty">
                <p>${data.rating}</p>
                <span>${data.position}</span>
              </div>

              <div class="info-down-emprt">
                <!-- name -->
                <h3 class="name-empty">
                  ${data.name}
                </h3>
                <!-- stats -->
                <div class="power-stats-empty">
                  <div class="stats-empty pac">
                    <span>DIV</span>
                    <p>${data.diving}</p>
                  </div>

                  <div class="stats-empty sho">
                    <span>HAN</span>
                    <p>${data.handling}</p>
                  </div>

                  <div class="stats-empty pas">
                    <span>KIC</span>
                    <p>${data.kicking}</p>
                  </div>

                  <div class="stats-empty dri">
                    <span>REF</span>
                    <p>${data.reflexes}</p>
                  </div>

                  <div class="stats-empty def">
                    <span>SPD</span>
                    <p>${data.speed}</p>
                  </div>

                  <div class="stats-empty phy">
                    <span>POS</span>
                    <p>${data.positioning}</p>
                  </div>
                </div>
                <!-- country -->
                <div class="countr-team-empty">
                  <img src="${data.flag}" alt="">
                  <img src="${data.logo}" alt="">
                </div>

              </div>




            </div>


          </div>
    ` 

  }else{

    return `

    <!-- player for side -->
    <div  class="empty-card p-card side-card drop-zone" data-pos="${data.position}" draggable="true">


      <img src="assets/images/card/badg_bg_champions.png" alt="" class="empty-image" draggable="false">
      
      <!-- inside card info -->
      <div class="card-info-empty">

        <!-- player-img-empty -->
        <img src="${data.photo}" alt="" class="player-img-empty" draggable="false">

        

        <!-- rating -->
        <div class="rating-empty">
          <p>${data.rating}</p>
          <span>${data.position}</span>
        </div>

        <div class="info-down-emprt">
          <h3 class="name-empty">
            ${data.name}
          </h3>
          <div class="power-stats-empty">
            <div class="stats-empty pac">
              <span>PAC</span>
              <p>${data.pace}</p>
            </div>

            <div class="stats-empty sho">
              <span>SHO</span>
              <p>${data.shooting}</p>
            </div>

            <div class="stats-empty pas">
              <span>PAS</span>
              <p>${data.passing}</p>
            </div>

            <div class="stats-empty dri">
              <span>DRI</span>
              <p>${data.dribbling}</p>
            </div>

            <div class="stats-empty def">
              <span>DEF</span>
              <p>${data.defending}</p>
            </div>

            <div class="stats-empty phy">
              <span>PHY</span>
              <p>${data.physical}</p>
            </div>
          </div>
          <!-- country -->
          <div class="countr-team-empty">
            <img src="${data.flag}" alt="">
            <img src="${data.logo}" alt="">
          </div>

        </div>

      </div>


    </div>
    `
  }
}


let existCB = false;
let existCM = 0;

export function renderPlayerTeamCard(data) {

  let emptyCardClass = '';
  const position = data.position;


  switch (position) {
    case "GK":
      emptyCardClass = "empty-card-1";
      break;
    case "LB":
      emptyCardClass = "empty-card-2";
      break;
    case "RB":
      emptyCardClass = "empty-card-5";
      break;
    case "CB":

      if (!existCB) {
        emptyCardClass = "empty-card-3";
        existCB = true;
      }else{
        emptyCardClass = "empty-card-4";
      }
      
      break;

    case "CM":
      if (existCM == 0) {
        emptyCardClass = "empty-card-6";
        existCM++;
      }else if (existCM == 1) {
        emptyCardClass = "empty-card-7";
        existCM++;
      }else{
        emptyCardClass = "empty-card-8";
        existCM++;
      }
      break;
    case "LW":
      emptyCardClass = "empty-card-9";
      break;
    case "ST":
      emptyCardClass = "empty-card-10";
      break;
    case "RW":
      emptyCardClass = "empty-card-11";
      break;
  }


  if(data.position === 'GK'){

    return `
          <div  class="empty-card ${emptyCardClass} p-card team-card drop-zone" data-pos="${data.position}" draggable="true">

            <img src="assets/images/card/badg_bg_champions.png" alt="" class="empty-image" draggable="false">

            <div class="card-info-empty">

              <img src="${data.photo}" alt="" class="player-img-empty" draggable="false">


              <div class="rating-empty">
                <p>${data.rating}</p>
                <span>${data.position}</span>
              </div>

              <div class="info-down-emprt">
                <h3 class="name-empty">
                  ${data.name}
                </h3>
                <!-- stats -->
                <div class="power-stats-empty">
                  <div class="stats-empty pac">
                    <span>DIV</span>
                    <p>${data.diving}</p>
                  </div>

                  <div class="stats-empty sho">
                    <span>HAN</span>
                    <p>${data.handling}</p>
                  </div>

                  <div class="stats-empty pas">
                    <span>KIC</span>
                    <p>${data.kicking}</p>
                  </div>

                  <div class="stats-empty dri">
                    <span>REF</span>
                    <p>${data.reflexes}</p>
                  </div>

                  <div class="stats-empty def">
                    <span>SPD</span>
                    <p>${data.speed}</p>
                  </div>

                  <div class="stats-empty phy">
                    <span>POS</span>
                    <p>${data.positioning}</p>
                  </div>
                </div>
                <!-- country -->
                <div class="countr-team-empty">
                  <img src="${data.flag}" alt="">
                  <img src="${data.logo}" alt="">
                </div>

              </div>

            </div>
          </div>

    `
 
  }else{


    return `
          <div  class="empty-card ${emptyCardClass}  p-card team-card drop-zone" data-pos="${data.position}" draggable="true">

            <img src="assets/images/card/badg_bg_champions.png" alt="" class="empty-image" draggable="false">

            <!-- inside card info -->
            <div class="card-info-empty">

              <!-- player-img-empty -->           
              <img src="${data.photo}" alt="" class="player-img-empty" draggable="false">

              

              <!-- rating -->
              <div class="rating-empty">
                <p>${data.rating}</p>
                <span>${data.position}</span>
              </div>

              <div class="info-down-emprt">
                <!-- name -->
                <h3 class="name-empty">
                   ${data.name}
                </h3>
                <!-- stats -->
                <div class="power-stats-empty">
                  <div class="stats-empty pac">
                    <span>PAC</span>
                    <p>${data.pace}</p>
                  </div>

                  <div class="stats-empty sho">
                    <span>SHO</span>
                    <p>${data.shooting}</p>
                  </div>

                  <div class="stats-empty pas">
                    <span>PAS</span>
                    <p>${data.passing}</p>
                  </div>

                  <div class="stats-empty dri">
                    <span>DRI</span>
                    <p>${data.dribbling}</p>
                  </div>

                  <div class="stats-empty def">
                    <span>DEF</span>
                    <p>${data.defending}</p>
                  </div>

                  <div class="stats-empty phy">
                    <span>PHY</span>
                    <p>${data.physical}</p>
                  </div>
                </div>
                <!-- country -->
                <div class="countr-team-empty">
                  <img src="${data.flag}" alt="">
                  <img src="${data.logo}" alt="">
                </div>

              </div>

            </div>
          </div>

    `


  }


}


export function createEmptyPositionCard(position, isSubstitute = false) {
  const cardClass = isSubstitute ? 'substitute-card' : 'stadium-card';
  return `
    <div class="empty-card p-card drop-zone empty-placeholder ${cardClass}" data-pos="${position}" draggable="false">
      <img src="assets/images/card/card_empty_default.png" alt="" class="empty-image" draggable="false">
      
      <!-- inside card info -->
      <div class="card-info-empty">
        <!-- Empty placeholder -->
        <div class="placeholder-content">
          <div class="position-indicator">
            <span class="position-label">${position}</span>
            <span class="drag-hint">Drag player here</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function createPlayerCardTemplate(data) {
    return `
        <div class="player-card relative bg-gray-800 rounded-lg overflow-hidden shadow-lg" data-player-id="${data.id}">
            <!-- Card Background -->
            <div class="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-gray-900"></div>
            
            <!-- Player Image and Rating -->
            <div class="relative pt-4 px-4">
                <div class="flex justify-between items-start mb-2">
                    <div class="bg-orange-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold">
                        ${data.rating}
                    </div>
                    <div class="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
                        ${data.position}
                    </div>
                </div>
                <div class="flex justify-center">
                    <img src="${data.photo}" alt="${data.name}" class="w-32 h-32 object-contain">
                </div>
            </div>
            
            <!-- Player Info -->
            <div class="relative p-4">
                <!-- Name -->
                <h3 class="text-lg font-bold text-white text-center mb-3">${data.name}</h3>
                
                <!-- Club and Nation -->
                <div class="flex justify-center gap-4 mb-4">
                    <div class="flex flex-col items-center">
                        <img src="${data.flag}" alt="${data.nationality}" class="w-8 h-8 object-cover rounded-full mb-1">
                        <span class="text-xs text-gray-400">${data.nationality}</span>
                    </div>
                    <div class="flex flex-col items-center">
                        <img src="${data.logo}" alt="${data.club}" class="w-8 h-8 object-cover rounded-full mb-1">
                        <span class="text-xs text-gray-400">${data.club}</span>
                    </div>
                </div>
                
                <!-- Stats -->
                ${createPlayerStatsTemplate(data)}
            </div>
        </div>
    `;
}

function createPlayerStatsTemplate(data) {
    if (data.position === 'GK') {
        return `
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">DIV</span>
                    <span class="text-white font-medium">${data.diving}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">HAN</span>
                    <span class="text-white font-medium">${data.handling}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">KIC</span>
                    <span class="text-white font-medium">${data.kicking}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">REF</span>
                    <span class="text-white font-medium">${data.reflexes}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">SPD</span>
                    <span class="text-white font-medium">${data.speed}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">POS</span>
                    <span class="text-white font-medium">${data.positioning}</span>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">PAC</span>
                    <span class="text-white font-medium">${data.pace || '-'}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">SHO</span>
                    <span class="text-white font-medium">${data.shooting || '-'}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">PAS</span>
                    <span class="text-white font-medium">${data.passing || '-'}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">DRI</span>
                    <span class="text-white font-medium">${data.dribbling || '-'}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">DEF</span>
                    <span class="text-white font-medium">${data.defending || '-'}</span>
                </div>
                <div class="flex justify-between items-center bg-gray-700/50 rounded px-2 py-1">
                    <span class="text-gray-400">PHY</span>
                    <span class="text-white font-medium">${data.physical || '-'}</span>
                </div>
            </div>
        `;
    }
}
