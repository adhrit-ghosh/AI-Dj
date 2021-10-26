song="";
leftwrist_x=0;
leftwrist_y=0;
rightwrist_x=0;
rightwrist_y=0;
score_leftwrist=0;
score_rightwrist=0;

function preload(){
song=loadSound("music.mp3");

}

function setup(){
    canvas=createCanvas(400,500);
    webcam=createCapture(VIDEO);
    webcam.hide();
    canvas.center();
    posenet= ml5.poseNet(webcam,modelLoaded);
    posenet.on('pose',gotPoses);
}
  
function modelLoaded(){
console.log('model is loaded')

}

function gotPoses(results){
    if(results.length>0){
        //console.log(results);
        score_leftwrist=results[0].pose.keypoints[9].score;
        score_rightwrist=results[0].pose.keypoints[10].score;
      leftwrist_x=results[0].pose.leftWrist.x;
      leftwrist_y=results[0].pose.leftWrist.y;
      rightwrist_x=results[0].pose.rightWrist.x;
      rightwrist_y=results[0].pose.rightWrist.y
      console.log("leftwrist( "+ leftwrist_x + ","+ leftwrist_y+ ")" );
      console.log("rightwrist( "+ rightwrist_x + ","+ rightwrist_y+ ")" );
    }
}

function draw(){
image(webcam,0,0,400,500); 
fill("red");
stroke("crimson");
if(score_leftwrist>0.2){
    circle(leftwrist_x, leftwrist_y, 20);
    number_leftwrist_y=Number(leftwrist_y);
    remove_decimal=floor(number_leftwrist_y);
    volume= remove_decimal/300;
    //volume= volume_data.toFixed(1);
    console.log(volume);
    song.setVolume(volume);
    document.getElementById("volume").innerHTML="volume="+volume;
}

if(score_rightwrist>0.2){
    circle(rightwrist_x, rightwrist_y, 20);
    if(rightwrist_y>=0 && rightwrist_y<=100){
        song.rate(0.5);
        document.getElementById("speed").innerHTML="speed = 0.5x";
    }
    if(rightwrist_y>100 && rightwrist_y<=200){
        song.rate(1);
        document.getElementById("speed").innerHTML="speed = 1x";
    }
    if(rightwrist_y>200 && rightwrist_y<=300){
        song.rate(1.5);
        document.getElementById("speed").innerHTML="speed = 1.5x";
    }

    if(rightwrist_y>300 && rightwrist_y<=400){
        song.rate(2);
        document.getElementById("speed").innerHTML="speed = 2x";
    }

    if(rightwrist_y>400 && rightwrist_y<=500){
        song.rate(2.5);
        document.getElementById("speed").innerHTML="speed = 2.5x";
    }
}
}

function playsound(){
    song.play();
    song.rate(1.5);
}
function stopsound(){
    song.stop();
}