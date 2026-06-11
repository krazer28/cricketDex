let currentCountry = null;

let currentType = null;

let currentSort = null;

let currentSearch = "";

document.addEventListener("DOMContentLoaded", () => {

    /* RESTORE SCROLL */

const savedScroll =
localStorage.getItem(
    "scrollPosition"
);

if(savedScroll){

    window.scrollTo(
        0,
        Number(savedScroll)
    );
}

    const container =
        document.getElementById("players");

        let currentPlayers = players;
    

    /* BUTTONS */

    const allPlayersBtn =
        document.getElementById("allPlayersBtn");

    const resetBtn =
    document.getElementById("resetBtn");

    resetBtn.onclick = function(){

    currentCountry = null;

    currentType = null;

    currentSort = null;

    currentSearch = "";

    document.getElementById(
        "searchBox"
    ).value = "";

    localStorage.removeItem(
        "savedPlayers"
    );

    localStorage.removeItem(
        "savedCountry"
    );

    localStorage.removeItem(
        "savedType"
    );

    localStorage.removeItem(
        "savedSort"
    );

    localStorage.removeItem(
        "savedSearch"
    );

    localStorage.removeItem(
        "scrollPosition"
    );

    renderPlayers(players);
};

    const countryBtn =
        document.getElementById("countryBtn");

    const typesBtn =
        document.getElementById("typesBtn");

    /* DROPDOWNS */

    const playersDropdown =
        document.getElementById("playersDropdown");

    const countryDropdown =
        document.getElementById("countryDropdown");

    const typeDropdown =
        document.getElementById("typeDropdown");

    /* ITEMS */

    const sortItems =
        document.querySelectorAll(".sort");

    const countryItems =
        document.querySelectorAll(".country");

    const typeItems =
        document.querySelectorAll(".type");

        function formatCountry(country){

    if(country === "westindies"){

        return "West Indies";
    }

    else if(country === "southafrica"){

        return "South Africa";
    }

    else if(country === "newzealand"){

        return "New Zealand";
    }

    else if(country === "srilanka"){

        return "Sri Lanka";
    }

    return country.charAt(0).toUpperCase() +
           country.slice(1);
}
function defineHandRole(player){

    const hand =
        player.handtype.toLowerCase();

    let roles = [];

    /* BATTER */

    if(

        hand.includes("right") &&

        (

            hand.includes("batter") ||

            hand.includes("batsman")

        )

    ){

        roles.push("Right Hand Batsman");
    }

    if(

        hand.includes("left") &&

        (

            hand.includes("batter") ||

            hand.includes("batsman")

        )

    ){

        roles.push("Left Hand Batsman");
    }

    /* BOWLER */

    if(

        hand.includes("right") &&

        (

            hand.includes("fast") ||

            hand.includes("medium") ||

            hand.includes("spin") ||

            hand.includes("spinner") ||

            hand.includes("off spin") ||

            hand.includes("leg spin")

        )

    ){

        roles.push("Right Hand Bowler");
    }

    if(

        hand.includes("left") &&

        (

            hand.includes("fast") ||

            hand.includes("medium") ||

            hand.includes("spin") ||

            hand.includes("spinner") ||

            hand.includes("off spin") ||

            hand.includes("leg spin")

        )

    ){

        roles.push("Left Hand Bowler");
    }

    return roles.join(" / ");
}

    /* CREATE CARD */
function createPlayerCard(player){

    const div =
        document.createElement("div");

    div.classList.add("card");

div.innerHTML = `

<a href="player.html?id=${player.id}"
   class="player-link"
   onclick="localStorage.setItem('scrollPosition',window.scrollY)">

    <div class="highlight-box ${player.country}">

        <span class="player-text">

            ${player.id} | ${player.name}

        </span>

        <i class="fa-regular fa-heart fav-btn"
           data-id="${player.id}">
        </i>

    </div>

</a>

`;

    container.appendChild(div);
}

function getFavorites(){

    return JSON.parse(

        localStorage.getItem(
            "favorites"
        )

    ) || [];
}

    /* RENDER */

function renderPlayers(playerList){

    currentPlayers =
        playerList;

    container.innerHTML = "";

    playerList.forEach(player => {

        createPlayerCard(player);
    });
    const favButtons =

document.querySelectorAll(
    ".fav-btn"
);

favButtons.forEach(btn => {

    const id = Number(
        btn.dataset.id
    );

    let favorites =
        getFavorites();

   if(
    favorites.includes(id)
){

    btn.classList.remove(
        "fa-regular"
    );

    btn.classList.add(
        "fa-solid"
    );

    btn.classList.add(
        "active"
    );
}

    btn.onclick = function(e){

        e.preventDefault();

        e.stopPropagation();

           btn.classList.toggle(
        "active"
           )   
        let favorites =
            getFavorites();

        if(
            favorites.includes(id)
        ){

            favorites =
            favorites.filter(
                x => x !== id
            );

        btn.classList.remove(
          "fa-solid"
      );

        btn.classList.add(
           "fa-regular"
      );

        btn.classList.remove(
            "active"
      );
      }

        else{

            favorites.push(id);

       btn.classList.remove(
       "fa-regular"
   );

     btn.classList.add(
    "fa-solid"
   );

     btn.classList.add(
    "active"
   );
};

        localStorage.setItem(

            "favorites",

            JSON.stringify(
                favorites
            )
        );
           
    };
});

const favoritesBtn =
document.getElementById(
    "favoritesBtn"
);

favoritesBtn.onclick =
function(){

    const favorites =

        getFavorites();

    const favPlayers =

        players.filter(

            p => favorites.includes(
                p.id
            )

        );

    renderPlayers(
        favPlayers
    );
};   
}

   /* DEFAULT LOAD */

const savedPlayers =
JSON.parse(
    localStorage.getItem(
        "savedPlayers"
    )
);

currentCountry =
localStorage.getItem(
    "savedCountry"
);

currentType =
localStorage.getItem(
    "savedType"
);

currentSort =
localStorage.getItem(
    "savedSort"
);

if(
    currentCountry ||
    currentType ||
    currentSort
){
    applyFilters();
}
else if(savedPlayers){

    const filteredPlayers =
        players.filter(
            p =>
            savedPlayers.includes(
                p.id
            )
        );

    renderPlayers(
        filteredPlayers
    );
}
else{

    renderPlayers(
        players
    );
}

function applyFilters(){

    let filtered = [...players];

    if(currentCountry){

        filtered = filtered.filter(player =>

            player.country ===
            currentCountry
        );
    }

       if(currentSearch){

    filtered =
    filtered.filter(player =>

        player.name
            .toLowerCase()
            .includes(
                currentSearch
            )
    );
}

if(currentType){

    filtered =
    filtered.filter(player =>

        player.type === currentType ||

        player.othertype === currentType ||

        defineHandRole(player)
        .includes(currentType)
    );
}
    if(currentSort === "az"){

        filtered.sort((a,b)=>

            a.name.localeCompare(
                b.name
            )
        );
    }

    else if(currentSort === "za"){

        filtered.sort((a,b)=>

            b.name.localeCompare(
                a.name
            )
        );
    }

    else if(currentSort === "idAsc"){

        filtered.sort((a,b)=>

            a.id - b.id
        );
    }

    else if(currentSort === "idDesc"){

        filtered.sort((a,b)=>

            b.id - a.id
        );
    }

    renderPlayers(filtered);

    localStorage.setItem(
    "savedPlayers",
    JSON.stringify(
        filtered.map(
            p => p.id
        )
    )
);
    
}

/* TYPES */

typeItems.forEach(item => {

    item.onclick = function(){

       currentType =
    this.dataset.type;

localStorage.setItem(
    "savedType",
    currentType
);

applyFilters();

        typeDropdown.classList.remove(
            "show"
        );
    };
});

/* COUNTRIES */

countryItems.forEach(item => {

    item.onclick = function(){

       currentCountry =
    this.dataset.country
        .toLowerCase()
        .replace(/\s/g,"");

localStorage.setItem(
    "savedCountry",
    currentCountry
);

applyFilters();

countryDropdown.classList.remove("show");
    };
});

/* SORT */

sortItems.forEach(item => {

    item.onclick = function(){

        console.log(
            this.dataset.sort
        );

        currentSort =
            this.dataset.sort;

        localStorage.setItem(
            "savedSort",
            currentSort
        );

        applyFilters();

        playersDropdown.classList.remove(
            "show"
        );
    };
});

/* RESET */

allPlayersBtn.onclick = function(e){

    e.stopPropagation();

    playersDropdown.classList.toggle(
        "show"
    );

    countryDropdown.classList.remove(
        "show"
    );

    typeDropdown.classList.remove(
        "show"
    );
};

/* TYPES BUTTON */

typesBtn.onclick = function(e){

    e.stopPropagation();

    typeDropdown.classList.toggle(
        "show"
    );

    playersDropdown.classList.remove(
        "show"
    );

    countryDropdown.classList.remove(
        "show"
    );
};

const searchBox =
document.getElementById(
    "searchBox"
);

searchBox.addEventListener(
    "input",
    function(){

       currentSearch =
    this.value
        .toLowerCase();

localStorage.setItem(
    "savedSearch",
    currentSearch
);

applyFilters();
    }
);

/* COUNTRY BUTTON */

countryBtn.onclick = function(e){

    e.stopPropagation();

    countryDropdown.classList.toggle(
        "show"
    );

    playersDropdown.classList.remove(
        "show"
    );

    typeDropdown.classList.remove(
        "show"
    );
};
    const buttons =
        document.querySelectorAll(".filter-btn");

    buttons.forEach(button => {

        button.onmouseenter = function(){

            button.style.transform =
                "scale(1.05)";
        };

        button.onmouseleave = function(){

            button.style.transform =
                "scale(1)";
        };
    });

    document.onclick = function(){

        playersDropdown.classList.remove("show");

        countryDropdown.classList.remove("show");

        typeDropdown.classList.remove("show");
    };

    [
        playersDropdown,
        countryDropdown,
        typeDropdown
    ].forEach(menu => {

        menu.onclick = function(e){

            e.stopPropagation();
        };
    });

   document.getElementById(
    "submitSuggestion"
).onclick = function(){

    const type =
    document.getElementById(
        "suggestionType"
    ).value;

    const text =
    document.getElementById(
        "suggestionText"
    ).value.trim();

    if(!text){

        alert(
            "Please enter a suggestion."
        );

        return;
    }

    let suggestions =
    JSON.parse(
        localStorage.getItem(
            "suggestions"
        )
    ) || [];

    suggestions.push({

        type,
        text,

        date:
        new Date()
        .toLocaleString()

    });

    localStorage.setItem(

        "suggestions",

        JSON.stringify(
            suggestions
        )
    );

    alert(
        "Suggestion submitted!"
    );

    document.getElementById(
        "suggestionText"
    ).value = "";
};
});
