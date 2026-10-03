const params =
new URLSearchParams(
window.location.search
);

const playerId =
Number(
params.get("id")
);

const player =
players.find(
p => p.id === playerId
);

if(!player){

    document.body.innerHTML =

    "<h1>Player Not Found</h1>";

    throw new Error(
    "Player Not Found"
    );
}

function setText(
id,
value
){

    document.getElementById(
    id
    ).innerText =
    value;
}

/* ---------- COUNTRY THEME ---------- */

const countryNames = {
    india: "India",
    australia: "Australia",
    pakistan: "Pakistan",
    srilanka: "Sri Lanka",
    southafrica: "South Africa",
    england: "England",
    newzealand: "New Zealand",
    westindies: "West Indies",
    bangladesh: "Bangladesh",
    zimbabwe: "Zimbabwe"
};

const countryKey =
String(player.country || "")
.toLowerCase();

if(countryNames[countryKey]){

    document.getElementById(
    "card"
    ).classList.add(
    "theme-" + countryKey
    );
}

setText(
"playerCountry",
countryNames[countryKey] ||
player.country ||
""
);

setText(
"backCountry",
countryNames[countryKey] ||
player.country ||
""
);

/* ---------- IDENTITY ---------- */

setText(
"playerName",
player.name
);

setText(
"backName",
player.name
);

setText(
"playerId",
player.id
);

setText(
"handType",
player.handtype
);

setText(
"playerType",
player.type
);

/* othertype: secondary tag, only when meaningful */

const otherType =
String(player.othertype || "")
.trim();

const otherLower =
otherType.toLowerCase();

if(
otherType &&
otherLower !==
String(player.handtype || "").trim().toLowerCase() &&
otherLower !==
String(player.type || "").trim().toLowerCase()
){

    const tag =
    document.getElementById(
    "playerTag"
    );

    tag.innerText =
    otherType;

    tag.hidden =
    false;
}

/* ---------- PERFORMANCE ---------- */

setText(
"matches",
player.matches
);

setText(
"runs",
player.totalRuns
);

setText(
"wickets",
player.wickets
);

setText(
"average",
player.battingAverage
);

setText(
"strikeRate",
player.battingStrikeRate
);

setText(
"economy",
player.economy
);

/* hide meaningless zero economy */

if(Number(player.economy) === 0){

    document.getElementById(
    "economyStat"
    ).hidden =
    true;
}

/* ---------- RECORDS ---------- */

setText(
"highest",
player.highestScore
);

setText(
"fours",
player.fours
);

setText(
"sixes",
player.sixes
);

setText(
"fifties",
player.fifties
);

setText(
"hundreds",
player.hundreds
);

setText(
"catches",
player.catches
);

/* ---------- ADDITIONAL ---------- */

setText(
"speed",
player.highestBowlingSpeed
);

/* hide meaningless zero speed (e.g. "0 km/h") */

if(parseFloat(player.highestBowlingSpeed) === 0){

    document.getElementById(
    "additional"
    ).hidden =
    true;
}

/* ---------- IMAGE (filename logic unchanged) ---------- */

const photoBox =
document.getElementById(
"photo"
);

const initialsWords =
String(player.name)
.trim()
.split(/\s+/);

setText(
"photoFallback",

(
initialsWords.length > 1
?
initialsWords[0][0] +
initialsWords[
initialsWords.length - 1
][0]
:
initialsWords[0].slice(0,2)
)
.toUpperCase()
);

const imageEl =
document.getElementById(
"image"
);

imageEl.onerror =
function(){

    photoBox.classList.add(
    "no-image"
    );
};

imageEl.alt =
player.name;

imageEl.src =

player.name
.toLowerCase()

+

".jfif";

/* ---------- FLIP (tap / click / Enter / Space) ---------- */

const flipCardEl =
document.getElementById(
"card"
);

function flipCard(){

    const flipped =
    flipCardEl.classList.toggle(
    "flipped"
    );

    flipCardEl.setAttribute(
    "aria-pressed",
    flipped
    );
}

flipCardEl.addEventListener(
"click",
flipCard
);

flipCardEl.addEventListener(
"keydown",
function(e){

    if(
    e.key === "Enter" ||
    e.key === " " ||
    e.key === "Spacebar"
    ){

        e.preventDefault();

        flipCard();
    }
}
);
