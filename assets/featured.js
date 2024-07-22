const discogTemplate = document.querySelector("[discog-template]");
const discogContainer = document.querySelector("[discog-container]");
var discography = []

// for discography.json sed "s/\"/'/g"


function popUp(idx, close = true){
    const ent = document.getElementById("album-showcase-container");
    if(ent.style.visibility == "visible" && close) {
        ent.style.opacity = "0"
        ent.style.visibility = "hidden";
        document.getElementById("album-showcase-embed").innerHTML = "";
        document.body.classList.remove("remove-scrolling");
        return;
    }
        let entry = discography[idx]
        document.body.classList.add("remove-scrolling");
        document.getElementById("album-showcase-name").innerText=entry.name;
        document.getElementById("album-showcase-title").innerText=entry.title;
        document.getElementById("album-showcase-description").innerText=entry.description;
        document.getElementById("album-showcase-cover").src = entry.img_location;
        document.getElementById("album-showcase-embed").innerHTML = entry.embed;
        
        let next = (idx + 1 == discography.length) ? 0 : idx + 1
        let prev = (idx - 1 == -1)? discography.length - 1 : idx - 1
    
        document.getElementById("button-left").onclick = function() { nextShowcase(prev) }
        document.getElementById("button-right").onclick = function() { nextShowcase(next) }
        ent.style.visibility = "visible";

        ent.style.opacity = "1"
        return;
}

function nextShowcase(idx){
    popUp(idx, false)
}

fetch("./assets/discography.json")
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

