const discogTemplate = document.querySelector("[discog-template]");
const discogContainer = document.querySelector("[discog-container]");
var discography = []

// for discography.json sed "s/\"/'/g"

// Stores current width in index 0 and previous width when popUp was last called
var windowWidth = 0;
var currentIndex = 0;

const showcaseContainers = [
    "",
    "",
    "-mobile"
]

const getWidth = () => window.innerWidth > 600 ? 1 : 2;



function popUp(idx, close = true){
    windowWidth = getWidth();
    currentIndex = idx;
    let w = showcaseContainers[windowWidth]
    const ent = document.getElementById("album-showcase-container" + w);
    if(ent.style.visibility == "visible" && close) {
        ent.style.opacity = "0"
        ent.style.visibility = "hidden";
        document.getElementById("album-showcase-embed").innerHTML = "";
        document.body.classList.remove("remove-scrolling");
        windowWidth = 0
        return;
    }
        let entry = discography[idx]
        document.body.classList.add("remove-scrolling");
        document.getElementById("album-showcase-name" + w).innerText=entry.name;
        document.getElementById("album-showcase-title" + w).innerText=entry.title;
        document.getElementById("album-showcase-description" + w).innerText=entry.description;
        document.getElementById("album-showcase-cover" + w).src = entry.img_location;
        document.getElementById("album-showcase-embed" + w).innerHTML = entry.embed;
        
        let next = (idx + 1 == discography.length) ? 0 : idx + 1;
        let prev = (idx - 1 == -1)? discography.length - 1 : idx - 1;
    
        document.getElementById("button-left"+ w).onclick = function() { nextShowcase(prev) }
        document.getElementById("button-right"+ w).onclick = function() { nextShowcase(next) }
        ent.style.visibility = "visible";

        ent.style.opacity = "1"
        return;
}

function nextShowcase(idx){
    popUp(idx, false)
}

fetch("./assets/scripts/discography.json")
    .then((res) => res.json())
    .then((data) => {
        discography = data;

        data.forEach((entry) => {
            const discogCard = discogTemplate.content.cloneNode(true).children[0];
            const discogCover = discogCard.querySelector("[discog-cover]");
            const vinylLabel = discogCard.querySelector("[vinyl-label]"); 
            vinylLabel.src = entry.img_location;
            discogCover.src = entry.img_location;
            
            discogCard.onclick = function() {
                popUp(discography.indexOf(entry));
            };
            discogContainer.append(discogCard);
        })
    })

window.addEventListener("resize", function () {
    if (windowWidth === 0) {
        return;
    }
    let width = getWidth()
    if (width !== windowWidth){
        const oldEnt = document.getElementById("album-showcase-container" + showcaseContainers[windowWidth])
        oldEnt.style.opacity = "0"
        oldEnt.style.visibility = "hidden";
        windowWidth = width;
        popUp(currentIndex, false)
        return;
    }
});
