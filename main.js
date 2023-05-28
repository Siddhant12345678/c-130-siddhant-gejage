song1="";
song2="";
scoreleftWrist=0;
scorerightWrist=0;
leftWristx=0;
leftWristy=0;
rightWristx=0;
rightWristy=0;
function preload(){
    song1=loadSound("Maroon 5 - Memories (Official Video).mp3");
    song2=loadSound("Ed Sheeran - Shape of You (Official Music Video).mp3");
}
function setup(){
    canvas=createCanvas(350,350);
    video=createCapture(VIDEO);
    video.hide();
    canvas.center();
    canvas.position(450,200);
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on("pose", gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    playsong1=song1.isPlaying();
    if(scoreleftWrist>0.2){
    circle(leftWristx,leftWristy,20);
    song2.stop();
    if(playsong1=false){
        song1.play();
        document.getElementById('songname').innerHTML="songName="+song1;
    }
    }
    playsong2=song2.isPlaying();
    if(scorerightWrist>0.2){
    circle(rightWristx,rightWristy,20);
    song1.stop();
    if(playsong2=false){
        song2.play();
        document.getElementById('songname').innerHTML="songName="+song2;
    }
    }
}
function modelLoaded(){
    console.log("model is initailized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);

        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log(leftWristx+" "+leftWristy+" "+rightWristx+" "+rightWristy);
        scoreleftWrist=results[0].pose.keypoints[9].score;
        scorerightWrist=results[0].pose.keypoints[10].score;
    }
}