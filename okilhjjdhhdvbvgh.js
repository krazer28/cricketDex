(function () {

const SECRET_SEQUENCE = "KRAZRE";

const SECRET_KEY = 53;

const ENCRYPTED_CODE = [
    78,
    20,
    7,
    22,
    17,
    0,
    3,
    19,
    31,
    72
];

let secretUnlocked = false;
let notificationClicks = 0;

function decryptSecret() {

    return ENCRYPTED_CODE
        .map(num => String.fromCharCode(num ^ SECRET_KEY))
        .join("");

}

function getFavorites() {

    return JSON.parse(
        localStorage.getItem("favorites")
    ) || [];

}

function getFavoritePlayers() {

    const favs = getFavorites();

    return players.filter(player =>
        favs.includes(player.id)
    );

}

function getFavoriteInitials() {

    return getFavoritePlayers()
        .map(player =>
            player.name
                .trim()
                .charAt(0)
                .toUpperCase()
        )
        .join("");

}

function isSecretUnlocked() {

    return localStorage.getItem("egg1Unlocked") === "true";

}

function saveSecretUnlocked() {

    localStorage.setItem(
        "egg1Unlocked",
        "true"
    );

}

function createSecretUI() {

    if(document.getElementById("secretBox"))
        return;

    const html = `

<div id="secretBox">

    <div id="secretTitle">
        🕵 SECRET DISCOVERED
    </div>

    <div id="secretStatus">
        Click 3 Times
    </div>

</div>

<div id="eggContainer">

    <img
        id="goldEgg"
        src="easter eggs.jfif"
        alt="Golden Egg"
    >

</div>

<div id="secretPopup">

    <h2>
        🥚 Easter Egg #1
    </h2>

    <p id="popupMessage">

        Congratulations!

        You discovered CricketDex's
        first hidden secret.

    </p>

    <div id="secretCode"></div>

    <button id="copySecret">

        Copy Code

    </button>

    <br><br>

    <button id="closeSecret">

        Close

    </button>

</div>

`;

    document.body.insertAdjacentHTML(
        "beforeend",
        html
    );

    const style = document.createElement("style");

    style.innerHTML = `

#secretBox{

display:none;
position:fixed;
right:25px;
top:50%;
transform:translateY(-50%);
background:#111;
border:3px solid gold;
border-radius:15px;
padding:18px;
color:white;
cursor:pointer;
z-index:999999;
width:230px;
text-align:center;
box-shadow:0 0 20px gold;
transition:.3s;

}

#secretBox:hover{

transform:translateY(-50%) scale(1.05);

}

#secretTitle{

font-size:18px;
font-weight:bold;
color:gold;

}

#secretStatus{

margin-top:10px;
font-size:15px;

}

#eggContainer{

display:none;
position:fixed;
left:0;
top:0;
width:100%;
height:100%;
background:rgba(0,0,0,.82);
z-index:999998;
justify-content:center;
align-items:center;

}

#goldEgg{

width:170px;
cursor:pointer;
animation:eggFloat 2s infinite ease-in-out;

}

@keyframes eggFloat{

0%{transform:translateY(0);}
50%{transform:translateY(-18px);}
100%{transform:translateY(0);}

}

#secretPopup{

display:none;
position:fixed;
left:50%;
top:50%;
transform:translate(-50%,-50%);
background:#111;
border:4px solid gold;
border-radius:20px;
padding:30px;
width:430px;
max-width:90%;
text-align:center;
color:white;
z-index:999999;

}

#secretPopup h2{

color:gold;
margin-bottom:20px;

}

#secretCode{

margin:25px 0;
font-size:24px;
font-weight:bold;
color:#ff4444;
letter-spacing:2px;

}

#copySecret,
#closeSecret{

padding:12px 24px;
margin:8px;
border:none;
border-radius:10px;
cursor:pointer;
font-weight:bold;

}

#copySecret{

background:gold;

}

#closeSecret{

background:#444;
color:white;

}

`;

    document.head.appendChild(style);

    const secretBox =
        document.getElementById("secretBox");

    const eggContainer =
        document.getElementById("eggContainer");

    const egg =
        document.getElementById("goldEgg");

    const popup =
        document.getElementById("secretPopup");

    const popupMessage =
        document.getElementById("popupMessage");

    const secretCode =
        document.getElementById("secretCode");

    const copyButton =
        document.getElementById("copySecret");

    const closeButton =
        document.getElementById("closeSecret");

            secretBox.addEventListener(
        "click",
        function(){

            notificationClicks++;

            const status =
                document.getElementById(
                    "secretStatus"
                );

            if(notificationClicks < 3){

                status.innerHTML =
                    "Clicks : " +
                    notificationClicks +
                    " / 3";

                return;

            }

            secretBox.style.display =
                "none";

            eggContainer.style.display =
                "flex";

        }
    );

    egg.addEventListener(
        "click",
        function(){

            egg.style.transition =
                ".7s";

            egg.style.transform =
                "scale(1.25) rotate(20deg)";

            egg.style.filter =
                "drop-shadow(0 0 35px gold)";

            setTimeout(function(){

                egg.style.transform =
                    "scale(.2) rotate(540deg)";

                egg.style.opacity =
                    "0";

            },600);

            setTimeout(function(){

                eggContainer.style.display =
                    "none";

                egg.style.opacity =
                    "1";

                egg.style.transform =
                    "";

                egg.style.filter =
                    "";

                popup.style.display =
                    "block";

                secretCode.innerHTML =
                    decryptSecret();

                popupMessage.innerHTML =
                    "Congratulations!<br><br>You have discovered CricketDex's first hidden Easter Egg.";

                saveSecretUnlocked();

                secretUnlocked = true;

            },1300);

        }
    );

    copyButton.addEventListener(
        "click",
        function(){

            navigator.clipboard
                .writeText(
                    decryptSecret()
                );

            const oldText =
                copyButton.innerHTML;

            copyButton.innerHTML =
                "✓ Copied";

            setTimeout(function(){

                copyButton.innerHTML =
                    oldText;

            },1500);

        }
    );

    closeButton.addEventListener(
        "click",
        function(){

            popup.style.display =
                "none";

        }
    );

}

function showSecretNotification(){

    createSecretUI();

    const secretBox =
        document.getElementById(
            "secretBox"
        );

    const status =
        document.getElementById(
            "secretStatus"
        );

    notificationClicks = 0;

    status.innerHTML =
        "Click 3 Times";

    secretBox.style.display =
        "block";

}

function reopenUnlockedEgg(){

    createSecretUI();

    document.getElementById(
        "secretPopup"
    ).style.display = "block";

    document.getElementById(
        "secretCode"
    ).innerHTML =
        decryptSecret();

}

function checkSecretCombination(){

    const initials =
        getFavoriteInitials();

    if(
        initials === SECRET_SEQUENCE &&
        !isSecretUnlocked()
    ){

        if(!secretUnlocked){

            secretUnlocked = true;

            setTimeout(function(){

                showSecretNotification();

            },700);

        }

        return;

    }

    if(isSecretUnlocked()){

        reopenUnlockedEgg();

    }

}

function watchFavorites(){

    const originalSetItem =
        localStorage.setItem;

    localStorage.setItem =
        function(key,value){

            originalSetItem.apply(
                this,
                arguments
            );

            if(key==="favorites"){

                setTimeout(function(){

                    checkSecretCombination();

                },200);

            }

        };

}

function observeDOMChanges(){

    const observer =
        new MutationObserver(function(){

            checkSecretCombination();

        });

    observer.observe(

        document.body,

        {

            childList:true,

            subtree:true

        }

    );

}

function attachKeyboardShortcut(){

    document.addEventListener(

        "keydown",

        function(event){

            if(

                event.ctrlKey &&

                event.shiftKey &&

                event.key.toUpperCase()==="E"

            ){

                if(

                    isSecretUnlocked()

                ){

                    reopenUnlockedEgg();

                }

            }

        }

    );

}

function addGoldenSparkles(){

    const style =
        document.createElement(
            "style"
        );

    style.innerHTML=`

.sparkle{

position:fixed;
width:8px;
height:8px;
background:gold;
border-radius:50%;
pointer-events:none;
z-index:999997;
animation:sparkleAnim 1s linear forwards;

}

@keyframes sparkleAnim{

0%{

opacity:1;
transform:translateY(0) scale(1);

}

100%{

opacity:0;
transform:translateY(-80px) scale(0);

}

}

`;

    document.head.appendChild(
        style
    );

}

function createSparkle(x,y){

    const sparkle =
        document.createElement(
            "div"
        );

    sparkle.className =
        "sparkle";

    sparkle.style.left =
        x + "px";

    sparkle.style.top =
        y + "px";

    sparkle.style.width =
        (4 + Math.random()*8) + "px";

    sparkle.style.height =
        sparkle.style.width;

    document.body.appendChild(
        sparkle
    );

    setTimeout(function(){

        sparkle.remove();

    },1000);

}

function startSparkleEffect(){

    const egg =
        document.getElementById(
            "goldEgg"
        );

    if(!egg)
        return;

    const timer =
        setInterval(function(){

            if(
                egg.parentElement == null ||
                egg.style.opacity==="0"
            ){

                clearInterval(timer);
                return;

            }

            const rect =
                egg.getBoundingClientRect();

            for(
                let i=0;
                i<6;
                i++
            ){

                createSparkle(

                    rect.left +
                    Math.random() *
                    rect.width,

                    rect.top +
                    Math.random() *
                    rect.height

                );

            }

        },200);

}

function pulseNotification(){

    const box =
        document.getElementById(
            "secretBox"
        );

    if(!box)
        return;

    let grow = true;

    setInterval(function(){

        if(
            box.style.display==="none"
        )
            return;

        box.style.transform =
            grow
            ?
            "translateY(-50%) scale(1.08)"
            :
            "translateY(-50%) scale(1)";

        grow = !grow;

    },500);

}

function animatePopup(){

    const popup =
        document.getElementById(
            "secretPopup"
        );

    if(!popup)
        return;

    popup.animate(

        [

            {

                transform:
                "translate(-50%,-60%) scale(.7)",

                opacity:0

            },

            {

                transform:
                "translate(-50%,-50%) scale(1)",

                opacity:1

            }

        ],

        {

            duration:500,

            easing:"ease-out"

        }

    );

}

function initializeEffects(){

    addGoldenSparkles();

    pulseNotification();

}

function initializeSecretSystem(){

    createSecretUI();

    initializeEffects();

    watchFavorites();

    observeDOMChanges();

    attachKeyboardShortcut();

    checkSecretCombination();

    const egg =
        document.getElementById(
            "goldEgg"
        );

    if(egg){

        egg.addEventListener(

            "mouseenter",

            function(){

                egg.style.filter =
                    "drop-shadow(0 0 35px gold)";

            }

        );

        egg.addEventListener(

            "mouseleave",

            function(){

                if(
                    document.getElementById(
                        "eggContainer"
                    ).style.display === "flex"
                ){

                    egg.style.filter =
                        "drop-shadow(0 0 20px gold)";

                }else{

                    egg.style.filter = "";

                }

            }

        );

    }

    const popup =
        document.getElementById(
            "secretPopup"
        );

    if(popup){

        const observer =
            new MutationObserver(function(){

                if(
                    popup.style.display === "block"
                ){

                    animatePopup();

                }

            });

        observer.observe(

            popup,

            {

                attributes:true,

                attributeFilter:["style"]

            }

        );

    }

    document.addEventListener(

        "visibilitychange",

        function(){

            if(

                !document.hidden

            ){

                checkSecretCombination();

            }

        }

    );

    window.addEventListener(

        "focus",

        function(){

            checkSecretCombination();

        }

    );

    const favButton =
        document.querySelector(
            "#favoritesBtn"
        );

    if(favButton){

        favButton.addEventListener(

            "click",

            function(){

                setTimeout(

                    checkSecretCombination,

                    300

                );

            }

        );

    }

    startSparkleEffect();

}

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(

        "DOMContentLoaded",

        initializeSecretSystem

    );

}else{

    initializeSecretSystem();

}

/* ==========================================================
   Extra protection so any change to favourites is detected
   ========================================================== */

window.addEventListener(

    "storage",

    function(event){

        if(
            event.key === "favorites"
        ){

            checkSecretCombination();

        }

    }

);

/* ==========================================================
   Expose helper for debugging
   ========================================================== */

window.CricketDexEgg = {

    check: checkSecretCombination,

    open: function(){

        reopenUnlockedEgg();

    },

    reset: function(){

        localStorage.removeItem(
            "egg1Unlocked"
        );

        secretUnlocked = false;

        notificationClicks = 0;

        const popup =
            document.getElementById(
                "secretPopup"
            );

        const box =
            document.getElementById(
                "secretBox"
            );

        const egg =
            document.getElementById(
                "eggContainer"
            );

        if(popup)
            popup.style.display =
                "none";

        if(box)
            box.style.display =
                "none";

        if(egg)
            egg.style.display =
                "none";

    },

    code: function(){

        return decryptSecret();

    },

    initials: function(){

        return getFavoriteInitials();

    }

};

/* ==========================================================
   Automatic first check after page loads
   ========================================================== */

setTimeout(

    function(){

        checkSecretCombination();

    },

    1000

);

setTimeout(

    function(){

        checkSecretCombination();

    },

    2500

);

setTimeout(

    function(){

        checkSecretCombination();

    },

    5000

);

})();
