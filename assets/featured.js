const discogTemplate = document.querySelector("[discog-template]");
const discogContainer = document.querySelector("[discog-container]");
var discography = []

function popUp(idx){
    let entry = discography[idx]
    const ent = document.getElementById("album-showcase-container");
    if(ent.style.visibility == "visible") {
        ent.style.visibility = "hidden";
        document.body.classList.remove("remove-scrolling");
        return;
    }
        ent.style.visibility = "visible";
        document.body.classList.add("remove-scrolling");
        document.getElementById("album-showcase-name").innerText=entry.name;
        document.getElementById("album-showcase-title").innerText=entry.title;
        document.getElementById("album-showcase-description").innerText=entry.description;
        document.getElementById("album-showcase-cover").src = entry.img_location;
        document.getElementById("album-showcase-embed").innerHTML = entry.embed;
        let next = (idx + 1 == discography.length) ? idx : idx + 1
        let prev = (idx - 1 == -1)? idx : idx - 1
    
        document.getElementById("button-left").onclick = function() { nextShowcase(prev) }
        document.getElementById("button-right").onclick = function() { nextShowcase(next) }
        return;
}

function nextShowcase(idx){
    const ent = document.getElementById("album-showcase-container");
    ent.style.visibility = "hidden";
    popUp(idx)
    
}


fetch("./assets/discography.json")
    .then((res) => res.json())
    .then((data) => {
        discography = data;

        data.forEach((entry) => {
            const discogCard = discogTemplate.content.cloneNode(true).children[0];
            const discogCover = discogCard.querySelector("[discog-cover]"); 
            discogCover.src = entry.img_location;
            
            discogCard.onclick = function() {
                popUp(discography.indexOf(entry));
            };
            discogContainer.append(discogCard);
        })
    })




/* convert iframe html double quotes to single quotes:
echo 'iframe' | sed "s/\"/'/g"
*/
/*
const featuredTemplate = document.querySelector("[featured-template]");
const featuredContainer = document.querySelector("[featured-container]");

const blurbTemplate = document.querySelector("[blurb-template]");
const blurbContainer = document.querySelector("[blurb-container]");

var featured_ids = [];

function idName(name){
    
}

fetch("./assets/discography.json")
    .then((res) => res.json())
    .then((data) => {
        entries = data.map((entry) => {
            const featured_id = (entry.name).replace(" ", "-");
            featured_ids.push(featured_id);

            const featuredCard = featuredTemplate.content.cloneNode(true).children[0];
            const featured_title = featuredCard.querySelector("[featured-title]");
            const featured_description = featuredCard.querySelector("[featured-description]"); 
            const featured_img = featuredCard.querySelector("[featured-img]"); 
           
            featured_title.textContent = entry.name;
            featured_description.textContent = entry.description;
            featured_img.src = entry.img_location;
            
            featuredCard.onclick = function() {
                popUp(featured_id);
            };
            featuredContainer.append(featuredCard);

            const blurbCard = blurbTemplate.content.cloneNode(true).children[0];
            const blurb_title = blurbCard.querySelector("[blurb-header]");
            const blurb_button = blurbCard.querySelector("[blurb-button]");
            const blurb_description = blurbCard.querySelector("[blurb-description]");
            const blurb_showcase = blurbCard.querySelector("[blurb-showcase]");

            blurb_title.textContent = entry.name;
            blurb_description.textContent = entry.blurb;
            blurb_button.onclick = function() {
                popDown();
            };
            blurb_button.textContent = "X";

            blurb_showcase.innerHTML = entry.iframe;

            blurbCard.setAttribute("id", featured_id);
            blurbContainer.append(blurbCard);

        })
    })


*/

