//Assign variables, run setupComics, add eventlisteners and get and adjust canvas node.
window.onload = function() {
    setupComics()

    let canvas = document.getElementById("bgCanvas");

    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;

    canvas.width = winWidth;
    canvas.height = winHeight;

    let ctx = canvas.getContext("2d");

    let fps = 60;

    setInterval(update,1000/fps);

    //Draw squares when called upon with the right parameters.
    function drawRect(w, h, offX, offY, trX, trY, a, fstyle) {
        ctx.save();
        ctx.translate(trX, trY);
        ctx.rotate(a * Math.PI / 180);
        ctx.fillStyle = fstyle;
        ctx.fillRect(offX, offY, w, h);
        ctx.restore();
    }

    //Assign some variables for managing particles.
    let shootingStars = [];
    let timer = 0;

    //Filter-function for removing "dead" particles.
    function checkStatus(checkStar) {
        return checkStar != "dead";
    }

    //Updates a set amount of times per second (if possible).
    function update() {
        //Readjust canvas.
        winWidth = window.innerWidth;
        winHeight = window.innerHeight;

        canvas.width = winWidth;
        canvas.height = winHeight;

        //Remove "dead" particles.
        shootingStars = shootingStars.filter(checkStatus);

        timer++

        //Spawn a new particle with parameters on timer reset.
        if (timer >= 3) {
            shootingStars.push({"x":Math.floor(Math.random()*winWidth*2-winWidth),"y":-50, "angle":0, "speed":Math.floor(Math.random()*3+1)})
            timer = 0
        }

        //Iterate through particles and move/rotate/kill them.
        for (let i = 0; i < shootingStars.length; i++) {
            shootingStars[i].x += 1;
            shootingStars[i].y += 2;
            shootingStars[i].angle += shootingStars[i].speed*2;

            //Draw particles on screen.
            drawRect(6, 6, -3, -3, shootingStars[i].x+3, shootingStars[i].y+3, shootingStars[i].angle, "#ffffff");

            if (shootingStars[i].y >= winHeight+75) {
                shootingStars[i] = "dead";
            }
        }
    }
}