let on = false, strictOn=false, round =0, buttonPressed=0, randCount=0, sequence = [], playerSequence=[], playersTurn = false, interval1, interval2, match=0, maxCount = 2, 
compBtnSpeed=700, 
playerBtnInt=1500,
lapseInt=1100;

//SEQUENCE----------------------------------------------------------------
//0. ON PRESSED
//1. START PRESSED
//2. DEFAULT STATES
//3. COMPUTER SHOWS PATTERN
//4. PLAYER INPUT
//5. CHECKING IF THE PATTERN MATCHES THE ORIGINAL OR NOT
//6. IN NORMAL MODE IF THE PATTERN THE USER PROVIDES DOESN'T MATCH THAT OF THE ORIGINAL
//   THEN THE ORIGINAL PATTERN IS REPEATED UNTIL THE CORRECT PATTERN IS PROVIDED
//   THEN ANOTHER PATTERN IS PLAYED
//7. IN STRICT MODE IF WRONG PATTERN IS PROVIDED THEN THE GAME RESTARTS INSTEAD OF
//   REPEATING THE PATTERN
//   STRICT MODE CAN BE SWITCHED ON/OFF ANY TIME WHEN THE PLAYER BOARD IS ACTIVE
//------------------------------------------------------------------------
window.onload = function(){
  window.addEventListener('click',listening);
};
//START PRESSED
//----------------------------------------------------------
startPressed=()=>{
	defaultState();
	compActs();
}
//CLEAR function-----------------------------------------
//Maxcount is is the counter of cycles 
defaultState=()=>{
  clearInterval(interval1);
  clearInterval(interval2);
	on = true;
	round =0;
	buttonPressed=0;
	randCount=0;
	sequence = [];
	playerSequence=[];
	playersTurn = false;
	match=0;
	maxCount = 6;
}
//---------------------------------------------------------
//compActs---------------------------------------------
compActs =()=>{
	playersTurn=false;
	round++;
	if(round>maxCount){
    displayRound(round);
		alert("you won");
		alert("new game");
		startPressed();
	}
	else{
		inactLarge();
		randGen(sequence);
		console.log(sequence);
		displayRound(round);
		playSequence();
	}
}
//---------------------------------------------------------
playSequence=()=>{
	let i =0;
	interval1 = setInterval(()=>{
		if(i<round){
			console.log("round:"+round);
			if(sequence[i]===1){
				setTimeout(function(){
					sound.$aud1.play();
				  nodes.$b1.style.background="#CB2027";
				},compBtnSpeed);
				nodes.$b1.style.background="red";
			}
			else if(sequence[i]===2){
				setTimeout(function(){
					sound.$aud2.play();
				  nodes.$b2.style.background="#0176BF";
				},compBtnSpeed);
				nodes.$b2.style.background="lightblue";
			}
			else if(sequence[i]===3){
				setTimeout(function(){
					sound.$aud3.play();
				  nodes.$b3.style.background="#EEAD1C";
				},compBtnSpeed);
				nodes.$b3.style.background="yellow";
			}
			else if(sequence[i]===4){
				setTimeout(function(){
					sound.$aud4.play();
				  nodes.$b4.style.background="#018B62";
				},compBtnSpeed);
				nodes.$b4.style.background="lightgreen";
			}
			i++;
      displayRound(round);
		}
		else{
			clearInterval(interval1);
			playerSequence=[];
			playerActs();
		}
		},lapseInt);
}
//---------------------------------------
playerActs=()=>{
	playersTurn=true;
	actLarge();
	console.log("players turn"+playersTurn);
	interval2= setInterval(checkArray,round*playerBtnInt);
}
//--------------------------------------------------------------------
//TESTING IF VALUES GIVEN BY PLAYER ARE CORRECT IN STRICT AND NORMAL MODE
matchStrict=()=>{
	match=0;
	for(let i in sequence){
		if(sequence[i]===playerSequence[i]){
				match++;
		}
	}
	if(match===round){
			compActs();
		}
		else{
			alert("you lost,new game");
		startPressed();
		}
}
matchNormal=()=>{
	match=0;
		for(let i in sequence){
		if(sequence[i]===playerSequence[i]){
				match++;
		}
		}
		if(match===round){
			compActs();
		}
		else{
			nodes.$doc.getElementById('count-display').textContent="!!";
			console.log("repeat");
			playerSequence=[];
			playSequence();
		}
}
//----------------------------------------------------------
//CHECK METHOD IN SEQUENCE---------------------------------------------------------
checkArray=()=>{
	clearInterval(interval2);
	inactLarge();
	if(strictOn){
		matchStrict();
	}
	else if(!strictOn){
		matchNormal();
	}
}
//RANDGEN----------------------------------------
function randGen (sequence){
	randCount++;
	if(randCount<=maxCount){
		sequence.push(Math.floor((Math.random()*4)+1));
		console.log("sequence in rand"+sequence);
	}
}
//LARGE BUTTONS ACTIVATE INACTIVATE-----------------------------------------
inactLarge=()=>{
	nodes.$allButton.forEach(function(button){
	button.style.pointerEvents="none";
	});
}
actLarge=()=>{
	nodes.$allButton.forEach(function(button){
		button.style.pointerEvents="auto";
		button.style.cursor="pointer";
	});	
}
//---------------------------------------------------------------------------
//EVENT LISTENER-------------------------------------------------------
	listening=(event)=>{
	let id = event.toElement.id;
	console.log(id);
	switch(id){
		case "onoff-btn" : 
		onOff();
		inactLarge();
			break;
		case "start-btn" : startPressed();
			break;
		case "strict-btn" : strictPressed();
			break;
		case "b1" :	
			buttonPressed++;
			sound.$aud1.play();
			setTimeout(function(){
			  nodes.$b1.style.background="#CB2027";
			},500);
			nodes.$b1.style.background="red";
			playerSequence.push(1);
			console.log(playerSequence);
			break;
		case "b2" : 
		buttonPressed++;
			sound.$aud2.play();
			setTimeout(function(){
			  nodes.$b2.style.background="#0176BF";
			},500);
			nodes.$b2.style.background="lightblue";
			playerSequence.push(2);
			console.log(playerSequence);
			break;
		case "b3" : 
		buttonPressed++;
			sound.$aud3.play();
			setTimeout(function(){
			  nodes.$b3.style.background="#EEAD1C";
			},500);
			nodes.$b3.style.background="yellow";
			playerSequence.push(3);
			console.log(playerSequence);
			break;
		case "b4" : 
		buttonPressed++;
			sound.$aud4.play();
			setTimeout(function(){
				nodes.$b4.style.background="#018B62";
			},500);
			nodes.$b4.style.background="lightgreen";
			playerSequence.push(4);
			console.log(playerSequence);
			break;
		}
}
//NODES------------------------------------------------------
const nodes  = {
	$doc : document,
	$onOffBox : document.querySelector('#onoff-box'),
	$counter : document.querySelector('#count-display'),
	$strictLed : document.querySelector('#strictLed'),
	$startBtn : document.querySelector('#start-btn'),
	$strictBtn : document.querySelector('#strict-btn'),
	$allButton : document.querySelectorAll('.button'),
	$b1 : document.querySelector('#b1'),
	$b2 : document.querySelector('#b2'),
	$b3 : document.querySelector('#b3'),
	$b4 : document.querySelector('#b4')
};
//-------------------------------------------------------------
//SOUND---------------------------------------------------------
const sound = {
	$aud1 : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
	$aud2 : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
	$aud3 : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
	$aud4 : new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};
//---------------------------------------------------------------
//STRICT BUTTON PRESSED---------------------------
strictPressed=()=>{
	if(!strictOn){
		console.log(nodes.$strictLed.style.backgroundColor);
		nodes.$strictLed.style.background="#CB2027";
		strictOn=true;
	}
	else{
		nodes.$strictLed.style.background="#333333";
		strictOn=false;
	}
}
//DISPLAY WHICH ROUND------------------------------------------------
function displayRound(round){
	nodes.$doc.getElementById('count-display').textContent=round;
}
//----------------------------------------------------------------------
//the next rand number comes into the function and gets played-------------------------
playAudio=(rand)=>{
	if(rand===1){
		sound.$aud1.play();
	}
	if(rand===2){
		sound.$aud2.play();
	}
	if(rand===3){
		sound.$aud3.play();
	}
	if(rand===4){
		sound.$aud4.play();
	}
}
//ON PRESSED----------------------------------------------------
onOff=()=>{
	//when I click on count,start,strict should be active plus blue strip 	should move to the right
	if(!on){ 
			//blue strip moves to the right
		nodes.$onOffBox.style.justifyContent="flex-end";
		//count display active
    nodes.$doc.getElementById('count-display').textContent="--";
		actBtn();
		//it signals that the on off button is switched 			actLarge();
		on=true;
		}
	else if(on){
    nodes.$onOffBox.style.justifyContent="flex-start";
		inactBtn();
		nodes.$strictLed.style.background="#333333";
		//counter disp switch off
		inactLarge();
		//strict led switch off
		strictOn=false;
		nodes.$doc.getElementById('count-display').textContent="";
    defaultState();
    on=false;
	}
}
actBtn=()=>{
	showCount();
	nodes.$startBtn.style.pointerEvents="auto";
	nodes.$startBtn.style.cursor="pointer";
	nodes.$strictBtn.style.pointerEvents="auto";
	nodes.$strictBtn.style.cursor="pointer";
}
inactBtn=()=>{
	showCount();
	nodes.$startBtn.style.pointerEvents="none";
	nodes.$strictBtn.style.pointerEvents="none";
}
//SETS THE COUNTER ON OFF
showCount=()=>{
	if(!on){
		nodes.$counter.style.display="inline";
	}
	else{
		nodes.$counter.style.display="naud1";
	}
}
//---------------------------------------------------------------------------------
