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

setText(
"playerName",
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

setText(
"matches",
"Matches : " +
player.matches
);

setText(
"runs",
"Runs : " +
player.totalRuns
);

setText(
"highest",
"Highest : " +
player.highestScore
);

setText(
"catches",
"Catches : " +
player.catches
);

setText(
"wickets",
"Wickets : " +
player.wickets
);

setText(
"economy",
"Economy : " +
player.economy
);

setText(
"average",
"Average : " +
player.battingAverage
);

setText(
"strikeRate",
"SR : " +
player.battingStrikeRate
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
"speed",
player.highestBowlingSpeed
);

document.getElementById(
    "image"
).src =

"player photos/" +

player.name
.toLowerCase()

+

".jfif";