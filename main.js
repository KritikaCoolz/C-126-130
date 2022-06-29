songName = "";
leftwristx = 0;
leftwristy = 0;

rightwristx = 0;
rightwristy = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload() {
    songName = loadSound("song.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet is initialized.");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist Accuracy - "+scoreLeftWrist);
        console.log("Right Wrist Accuracy - "+scoreRightWrist);

        leftwristx = results[0].pose.leftWrist.x;
        leftwristy = results[0].pose.leftWrist.y;
        console.log("Left Wrist X: "+leftwristx+", Left Wrist Y: "+leftwristy);

        rightwristx = results[0].pose.rightWrist.x;
        rightwristy = results[0].pose.rightWrist.y;
        console.log("Right Wrist X: "+rightwristx+", Right Wrist Y: "+rightwristy);
    }
}

function play() {
    songName.play();
    songName.setVolume(1);
    songName.rate(2);
}

function draw() {
    image(video, 0, 0, 600, 500);
    
    fill('#30e8b1');
    stroke('#30e8b1');

    if (scoreRightWrist > 0.2) {
    circle(rightwristx, rightwristy, 20);

    if (rightwristy > 0 && rightwristy <= 100){
        document.getElementById("speed").innerHTML = "speed is = 0.5x";
        song.rate(0.5);
    }
    else if (rightwristy > 100 && rightwristy <= 200){
        document.getElementById("speed").innerHTML = "speed is = 1x";
        song.rate(1);
    }
    else if (rightwristy > 200 && rightwristy <= 300){
        document.getElementById("speed").innerHTML = "speed is = 1.5x";
        song.rate(1.5);
    }
    else if (rightwristy > 300 && rightwristy <= 400){
        document.getElementById("speed").innerHTML = "speed is = 2x";
        song.rate(2);
    }
    else if (rightwristy > 400 && rightwristy <= 500){
        document.getElementById("speed").innerHTML = "speed is = 2.5x";
        song.rate(2.5);
    }
}
    if (scoreLeftWrist > 0.2) {

    circle(leftwristx, leftwristy, 20);
    InNumberleftWristY = Number(leftwristy);
    removeDecimals = floor(InNumberleftWristY);
    volume = removeDecimals/500;
    document.getElementById("volume").innerHTML = "Volume - "+volume;
    songName.setVolume(volume);
    }

}