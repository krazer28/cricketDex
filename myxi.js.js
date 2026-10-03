const XI_LIMIT = 11;

const xiSearchBox = document.getElementById("xiSearchBox");
const xiSuggestions = document.getElementById("xiSuggestions");
const xiGrid = document.getElementById("xiGrid");
const xiEmpty = document.getElementById("xiEmpty");
const xiCount = document.getElementById("xiCount");
const xiWarnings = document.getElementById("xiWarnings");

function getXI(){

    return JSON.parse(
        localStorage.getItem("myXI")
    ) || [];
}

function saveXI(xi){

    localStorage.setItem(
        "myXI",
        JSON.stringify(xi)
    );
}

function playerImage(player){

    return player.name.toLowerCase() + ".jfif";
}

function placeholderImg(){

    return "data:image/svg+xml;utf8," +
        encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48">' +
            '<rect width="100%" height="100%" fill="#ddd"/></svg>'
        );
}

function isWicketKeeper(player){

    return player.type === "Wicket-Keeper Batter" ||
           player.othertype === "Wicket-Keeper Batter";
}

function isCaptain(player){

    return player.type === "captain" ||
           player.othertype === "captain";
}

function renderWarnings(squadPlayers){

    xiWarnings.innerHTML = "";

    const keeperCount =
        squadPlayers.filter(isWicketKeeper).length;

    const captainCount =
        squadPlayers.filter(isCaptain).length;

    if(keeperCount > 1){

        const w = document.createElement("div");

        w.classList.add("xi-warning");

        w.innerText =
            "⚠ You have " + keeperCount +
            " Wicket-Keepers in your XI - most teams only play 1.";

        xiWarnings.appendChild(w);
    }

    if(captainCount > 1){

        const w = document.createElement("div");

        w.classList.add("xi-warning");

        w.innerText =
            "⚠ You have " + captainCount +
            " players tagged as captain - a team only has 1 captain.";

        xiWarnings.appendChild(w);
    }
}

function renderXI(){

    const xi = getXI();

    xiGrid.innerHTML = "";

    xiCount.innerText =
        xi.length + " / " + XI_LIMIT + " players";

    if(xi.length === 0){

        xiEmpty.classList.add("show");
    }
    else{

        xiEmpty.classList.remove("show");
    }

    const squadPlayers = [];

    xi.forEach(id => {

        const player =
            players.find(p => p.id === id);

        if(!player){
            return;
        }

        squadPlayers.push(player);

        const card = document.createElement("div");

        card.classList.add("xi-card");

        card.innerHTML =
            `<img src="${playerImage(player)}" onerror="this.src='${placeholderImg()}'">` +
            `<div class="info">` +
            `<div class="name">${player.name}</div>` +
            `<div class="role">${player.country} · ${player.type || ""}</div>` +
            `</div>` +
            `<button class="remove-btn" data-id="${player.id}">×</button>`;

        card.querySelector(".remove-btn").onclick = function(){

            const updated =
                getXI().filter(x => x !== player.id);

            saveXI(updated);

            renderXI();
        };

        xiGrid.appendChild(card);
    });

    renderWarnings(squadPlayers);
}

function findMatches(query){

    if(!query){
        return [];
    }

    const q = query.toLowerCase();

    const xi = getXI();

    return players
        .filter(p =>
            p.name.toLowerCase().includes(q) &&
            !xi.includes(p.id)
        )
        .slice(0, 8);
}

function renderSuggestions(list){

    xiSuggestions.innerHTML = "";

    const xi = getXI();

    const xiFull = xi.length >= XI_LIMIT;

    if(list.length === 0){

        xiSuggestions.classList.remove("show");

        return;
    }

    list.forEach(player => {

        const item = document.createElement("div");

        item.classList.add("suggestion-item");

        if(xiFull){
            item.classList.add("disabled");
        }

        item.innerHTML =
            `<span>${player.name}</span>` +
            `<span class="tag">${xiFull ? "XI full" : player.country}</span>`;

        if(!xiFull){

            item.onclick = function(){

                const updated = getXI();

                if(updated.length >= XI_LIMIT){
                    return;
                }

                updated.push(player.id);

                saveXI(updated);

                renderXI();

                xiSearchBox.value = "";

                xiSuggestions.classList.remove("show");
            };
        }

        xiSuggestions.appendChild(item);
    });

    xiSuggestions.classList.add("show");
}

xiSearchBox.addEventListener("input", function(){

    renderSuggestions(findMatches(this.value));
});

document.addEventListener("click", function(e){

    if(!e.target.closest(".xi-search")){

        xiSuggestions.classList.remove("show");
    }
});

renderXI();
