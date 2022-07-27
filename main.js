objects=[]
 text = document.getElementById("text").value

function setup() {
    canvas=createCanvas(380,280);
    canvas.center();
    video=createCapture(380,280)
    video.hide()
}

function draw() {
    image(video,0,0,480,380);
    if (status != "") {
        objectDetector.detect(video,gotResult);
    }
    for (i = 0; i < objects.length; i++) {
       
        

        fill("255,0,0");
        percent=floor(objects[i].confidence*100);
        text(objects[i].label +" "+percent+"%",objects[i].x+10,objects[i].y-5);
        noFill();
        stroke("red");
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        if (objects[i].label == text) {
            console.log(i);
            document.getElementById("no_of_objects").innerHTML=text+"is found"
        } else {
            console.log(i);
            document.getElementById("no_of_objects").innerHTML=text+"is not found"
        }
    }
}

function start() {
    objectDetector=ml5.objectDetector('cocossd',modelLoaded)
    document.getElementById("status").innerHTML="Status: Objects Detected";
    
}


function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    console.log(results);
    objects=results;
}


function modelLoaded() {
    console.log("model Loded!!");
    status=true
    video.loop();
    video.speed(1);
    video.volume(0);
}