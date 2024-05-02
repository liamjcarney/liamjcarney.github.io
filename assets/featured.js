const featuredTemplate = document.querySelector("[featured-template]");
const featuredContainer = document.querySelector("[featured-container]");

const blurbTemplate = document.querySelector("[blurb-template]");
const blurbContainer = document.querySelector("[blurb-container]");

var featured_ids = [];

function popUp(element){
    popDown();
    const ent = document.getElementById(element);
    ent.style.visibility = "visible";
}

function popDown(){
    for(let i = 0; i < featured_ids.length; i++){
        let ent = document.getElementById(featured_ids[i]);
        ent.style.visibility = "hidden";
    }

}

function idName(name){
    
}

fetch("./assets/featured.json")
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