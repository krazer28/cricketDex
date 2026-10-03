const CATEGORIES = [
    { key: "totalRuns", label: "Total Runs" },
    { key: "highestScore", label: "Highest Score" },
    { key: "battingAverage", label: "Batting Average" },
    { key: "battingStrikeRate", label: "Batting Strike Rate" },
    { key: "wickets", label: "Wickets" },
    { key: "economy", label: "Economy", lowerIsBetter: true },
    { key: "matches", label: "Matches Played" },
    { key: "highestBowlingSpeed", label: "Highest Bowling Speed" },
    { key: "hundreds", label: "Hundreds" },
    { key: "fifties", label: "Fifties" },
    { key: "sixes", label: "Sixes" },
    { key: "fours", label: "Fours" },
    { key: "catches", label: "Catches" }
];

let selectedA = null;
let selectedB = null;

const searchA = document.getElementById("searchA");
const searchB = document.getElementById("searchB");

const suggestionsA = document.getElementById("suggestionsA");
const suggestionsB = document.getElementById("suggestionsB");

const pickedA = document.getElementById("pickedA");
const pickedB = document.getElementById("pickedB");

const startCompareBtn = document.getElementById("startCompareBtn");

const scoreboard = document.getElementById("scoreboard");
const scoreNameA = document.getElementById("scoreNameA");
const scoreNameB = document.getElementById("scoreNameB");
const scoreValA = document.getElementById("scoreValA");
const scoreValB = document.getElementById("scoreValB");

const statRows = document.getElementById("statRows");
const resultBanner = document.getElementById("resultBanner");

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

function findMatches(query){

    if(!query){
        return [];
    }

    const q = query.toLowerCase();

    return players
        .filter(p => p.name.toLowerCase().includes(q))
        .slice(0, 8);
}

function renderSuggestions(list, container, onPick){

    container.innerHTML = "";

    if(list.length === 0){

        container.classList.remove("show");

        return;
    }

    list.forEach(player => {

        const item = document.createElement("div");

        item.classList.add("suggestion-item");

        item.innerHTML =
            `<span>${player.name}</span>` +
            `<span class="tag">${player.country}</span>`;

        item.onclick = function(){

            onPick(player);

            container.classList.remove("show");
        };

        container.appendChild(item);
    });

    container.classList.add("show");
}

function showPicked(player, container){

    container.classList.add("show");

    container.innerHTML =
        `<img src="${playerImage(player)}" onerror="this.src='${placeholderImg()}'">` +
        `<div class="meta">` +
        `<span>${player.name}</span>` +
        `<span class="sub">${player.country} · ${player.type || ""}</span>` +
        `</div>`;
}

function refreshCompareButton(){

    startCompareBtn.disabled =
        !selectedA ||
        !selectedB ||
        selectedA.id === selectedB.id;
}

searchA.addEventListener("input", function(){

    renderSuggestions(
        findMatches(this.value),
        suggestionsA,
        function(player){

            selectedA = player;

            searchA.value = player.name;

            showPicked(player, pickedA);

            refreshCompareButton();
        }
    );
});

searchB.addEventListener("input", function(){

    renderSuggestions(
        findMatches(this.value),
        suggestionsB,
        function(player){

            selectedB = player;

            searchB.value = player.name;

            showPicked(player, pickedB);

            refreshCompareButton();
        }
    );
});

document.addEventListener("click", function(e){

    if(!e.target.closest("#pickerA")){
        suggestionsA.classList.remove("show");
    }

    if(!e.target.closest("#pickerB")){
        suggestionsB.classList.remove("show");
    }
});

function bumpScore(el){

    el.classList.add("bump");

    setTimeout(() => el.classList.remove("bump"), 220);
}

function runComparison(){

    statRows.innerHTML = "";

    resultBanner.classList.remove("show");

    resultBanner.innerText = "";

    scoreNameA.innerText = selectedA.name;
    scoreNameB.innerText = selectedB.name;
    scoreValA.innerText = "0";
    scoreValB.innerText = "0";

    scoreboard.classList.add("show");

    let scoreA = 0;
    let scoreB = 0;

    const rowEls = CATEGORIES.map(cat => {

        const valA = Number(selectedA[cat.key]) || 0;
        const valB = Number(selectedB[cat.key]) || 0;

        const row = document.createElement("div");

        row.classList.add("stat-row");

        row.innerHTML =
            `<div class="bar-wrap left">` +
            `<div class="bar"></div>` +
            `<span class="bar-value">${valA}</span>` +
            `</div>` +
            `<div class="stat-label">${cat.label}` +
            (cat.lowerIsBetter ? `<span class="lower-note">lower is better</span>` : ``) +
            `</div>` +
            `<div class="bar-wrap right">` +
            `<div class="bar"></div>` +
            `<span class="bar-value">${valB}</span>` +
            `</div>`;

        statRows.appendChild(row);

        return { row, valA, valB, cat };
    });

    rowEls.forEach((entry, index) => {

        setTimeout(() => {

            entry.row.classList.add("revealed");

            const barLeft =
                entry.row.querySelector(".bar-wrap.left .bar");

            const barRight =
                entry.row.querySelector(".bar-wrap.right .bar");

            const maxVal =
                Math.max(entry.valA, entry.valB, 1);

            barLeft.style.width =
                Math.min(100, (entry.valA / maxVal) * 100) + "%";

            barRight.style.width =
                Math.min(100, (entry.valB / maxVal) * 100) + "%";

            const aIsBetter = entry.cat.lowerIsBetter
                ? entry.valA < entry.valB
                : entry.valA > entry.valB;

            const bIsBetter = entry.cat.lowerIsBetter
                ? entry.valB < entry.valA
                : entry.valB > entry.valA;

            if(aIsBetter){

                scoreA++;

                entry.row.classList.add("winA");

                scoreValA.innerText = scoreA;

                bumpScore(scoreValA);
            }
            else if(bIsBetter){

                scoreB++;

                entry.row.classList.add("winB");

                scoreValB.innerText = scoreB;

                bumpScore(scoreValB);
            }

            if(index === rowEls.length - 1){

                setTimeout(() => {

                    if(scoreA > scoreB){

                        resultBanner.innerText =
                            `${selectedA.name} wins ${scoreA}-${scoreB}!`;
                    }
                    else if(scoreB > scoreA){

                        resultBanner.innerText =
                            `${selectedB.name} wins ${scoreB}-${scoreA}!`;
                    }
                    else{

                        resultBanner.innerText =
                            `It's a draw ${scoreA}-${scoreB}!`;
                    }

                    resultBanner.classList.add("show");

                }, 650);
            }

        }, index * 500);
    });
}

startCompareBtn.onclick = function(){

    if(startCompareBtn.disabled){
        return;
    }

    runComparison();
};
