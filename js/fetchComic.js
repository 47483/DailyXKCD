//Start eventlisteners with belonging functions for all buttons.
//Gets executed in background.js.
function setupComics() {
    //Assign current comic and max comic value "latestComic".
    document.latestComic = -1;
    document.comic = 1;

    getComic("latest");
    let first = document.getElementById("first");
    first.addEventListener("click", function(){
        getComic(1);
    });

    let last = document.getElementById("last");
    last.addEventListener("click", function(){
        getComic("latest");
    });

    let previous = document.getElementById("previous");
    previous.addEventListener("click", function(){
        if (document.comic > 1) {
            getComic(document.comic - 1);
        }
    });

    let next = document.getElementById("next");
    next.addEventListener("click", function(){
        if (document.comic < document.latestComic) {
            getComic(document.comic + 1);
        }
    });

    let random = document.getElementById("random");
    random.addEventListener("click", function(){
        getComic(Math.floor(Math.random()*document.latestComic)+1);
    });
}

//Function that access xkcd api and validates it.
//Called whenever a button is pressed.
function getComic(call) {
    //Access api
    fetch("https://xkcd.vercel.app/?comic="+call)
    //If successful
    .then(function(response){
        if (response.status == 200) {
            return response.json();
        }
    })
    .then(function(data){
        //Change latestComic on the go
        if (document.latestComic < data.num) {
            document.latestComic = data.num;
        }

        document.comic = data.num;

        appendComic(data);
    })
}

//Inserts the given comic data as html elements.
//Called whenever api connection is successful.
function appendComic(data) {
    //Connect to the html element for storing comic.
    let mainComic = document.getElementById("mainComic");

    //Add a title and empty previous comics.
    let title = document.createElement("h2");
    title.innerHTML = data.title;
    mainComic.replaceChildren(title);

    //Add the date of the comics release.
    let date = document.createElement("h3");
    date.innerHTML = new Date(data.year,data.month,data.day).toLocaleDateString();

    mainComic.appendChild(date);

    //Make a figure to store image and caption.
    let figure = document.createElement("figure");

    //Get image from json and add to figure with appropriate data.
    let image = document.createElement("img");
    image.src = data.img;
    image.alt = data.alt;
    image.onclick = function() {window.open("https://xkcd.com/"+data.num, "_blank")};
    image.id = "comicImage";
    figure.appendChild(image);

    //Add the image id as a caption.
    let caption = document.createElement("figcaption");
    caption.innerHTML = "Nr. "+data.num;
    figure.appendChild(caption);

    mainComic.appendChild(figure);
}