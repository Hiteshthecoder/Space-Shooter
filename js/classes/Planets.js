

function planet1() {

    var gradient = c.createRadialGradient(canvas.width * 0.10, canvas.height * 0.2, 0, canvas.width *
        0.10, canvas.height * 0.2, canvas.width * 0.11);
    gradient.addColorStop(0.4, "dodgerblue");
    gradient.addColorStop(1, "black");

    c.fillStyle = gradient;
    c.beginPath();
    c.arc(canvas.width * 0.1, canvas.height * 0.2, canvas.width * 0.20, 0, Math.PI * 2, false);
    c.fill();

    gradient = c.createRadialGradient(canvas.width * 0.09, canvas.height * 0.1, 0, canvas.width *
        0.09, canvas.height * 0.1, canvas.width * 0.09);

    gradient.addColorStop(0.4, "purple");
    gradient.addColorStop(1, "blue");

    c.fillStyle = gradient;
    c.beginPath();
    c.arc(canvas.width * 0.1, canvas.height * 0.2, canvas.width * 0.09, 0, Math.PI * 2, false);
    c.fill();
}

function planet2() {

    var gradient1 = c.createRadialGradient(canvas.width * 0.4, canvas.height * 0.12, 0, canvas.width *
        0.4, canvas.height * 0.12, canvas.width * 0.06);
    gradient1.addColorStop(0.4, "#90EE90");
    gradient1.addColorStop(1, "black");

    c.fillStyle = gradient1;
    c.beginPath();
    c.arc(canvas.width * 0.4, canvas.height * 0.12, canvas.width * 0.06, 0, Math.PI * 2, false);
    c.fill();

    gradient1 = c.createRadialGradient(canvas.width * 0.3, canvas.height * 0.11, 0, canvas.width *
        0.3, canvas.height * 0.11, canvas.width * 0.15);


    gradient1.addColorStop(0.4, "orange");
    gradient1.addColorStop(1, "#004a26");

    c.fillStyle = gradient1;
    c.beginPath();
    c.arc(canvas.width * 0.4, canvas.height * 0.12, canvas.width * 0.05, 0, Math.PI * 2, false);
    c.fill();
}

function planet3() {

    var gradient3 = c.createRadialGradient(canvas.width * 0.6, canvas.height * 0.07, 0, canvas.width *
        0.6, canvas.height * 0.07, canvas.width * 0.04);
    gradient3.addColorStop(0.4, "#fa8b47");
    gradient3.addColorStop(1, "black");

    c.fillStyle = gradient3;
    c.beginPath();
    c.arc(canvas.width * 0.6, canvas.height * 0.07, canvas.width * 0.04, 0, Math.PI * 2, false);
    c.fill();

   gradient3 = c.createRadialGradient(canvas.width * 0.5, canvas.height * 0.06, 0, canvas.width *
        0.5, canvas.height * 0.06, canvas.width * 0.10);


    gradient3.addColorStop(0.4, "red");
    gradient3.addColorStop(1, "orange");

    c.fillStyle = gradient3;
    c.beginPath();
    c.arc(canvas.width * 0.6, canvas.height * 0.07, canvas.width * 0.03, 0, Math.PI * 2, false);
    c.fill();

}