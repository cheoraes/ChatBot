// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RUSvMxxm_Jo
var database;
var canvas;
var drawing = [];

var goals ;


// var playing = false;
// var fingers;
// // var button;
// function toggleVid() {
//   if (playing) {
//     fingers.pause();
//     button.html('play');
//   } else {
//     fingers.loop();
//     button.html('pause');
//   }
//   playing = !playing;
// }
 function setup() {

	// fingers = createVideo(['videos/hablando.mp4']);
  //  button = createButton('play');
  //  button.mousePressed(toggleVid); // attach button listener


		//CANVAS
	  canvas = createCanvas(200, 200);
		// UI
		/*const txtEmail = select('#txtEmail');
		const txtPassword = select('#txtPassword');
		const btnLogIn = select('#btnLogIn');
		const btnLogOut = select('#btnLogOut');
		const btnSignUp = select('#btnSignUp');*/

		//FIREBASE
		var config = {
	    apiKey: "AIzaSyCbph7UizXm0Q90VqsIzaeF11HdIagbOPQ",
	    authDomain: "login-5e273.firebaseapp.com",
	    databaseURL: "https://login-5e273.firebaseio.com",
	    projectId: "login-5e273",
	    storageBucket: "login-5e273.appspot.com",
	    messagingSenderId: "314551064700"
  };
	  firebase.initializeApp(config);
		console.log(firebase);
	  database = firebase.database();

		function mp(){
			/*const email = txtEmail.value();
			const psw =	txtPassword.value();
			const auth = firebase.auth();
			auth.signInWithEmailAndPassword(email,psw);
			promise.catch*/
		}

		/*var ref = database.ref('scores');
		var data = {
			name:"Jordi",
			edad:40
		}
		ref.push(data);*/

	// -------------
	// SPEECH RECOGNITION
	let speechRec = new p5.SpeechRec('es-ES',gotSpeech);
	let continuous = false;
	let interim = false;
	startListening();

	function startListening(){
		background(0, 255, 0);
		speechRec.start(continuous,interim);
	}

	function gotSpeech(){
		console.log(speechRec);
		if(speechRec.resultValue){
			let input = limpiar_caracteres_especiales(speechRec.resultString);
			let reply = brain.reply("local-user", input).split('(comandos)');
			console.log(reply[0])
			// Hablar Texto
			frases = reply[0].split('.');

			speech.speak(frases.shift());


			ejecutar(reply[1])
			console.log(input);

		}
	}





	 goals = {	saludo:{status:0},
	 					};
	function ejecutar(comandos){
		let cmd = comandos.split(' ');
		console.log(cmd[0])
		switch(cmd[0]){
			case 'update':
				goals[cmd[1]].status=cmd[3]
		}
	}



	function limpiar_caracteres_especiales(input){
		input = input.replace('á','a');
		input = input.replace('é','e');
		input = input.replace('í','i');
		input = input.replace('ó','o');
		input = input.replace('ú','u');
		console.log(input);
		return input
	}

	// -------------
	// brain
	let brain = new RiveScript();




	brain.loadFile("brain/begin.rive", null, brainError);

	brain.loadFile("brain/saludo.rive", saludo, brainError);
	 function saludo() {
		 brain.sortReplies();
	//  		console.log('Modulo de Saludo ON');
	// 		brain.sortReplies();
	// 		let reply = brain.reply('local-user',input)
	// 		console.log(reply)
	 	}

	//brain.loadFile("brain/identidad.rive", identidad, brainError);

	// function identidad() {
	// 		console.log('Modulo de identidad ON');
	// 		brain.sortReplies();
	// 		let bot_name ="Linguo";
	// 		let input = "set botname " + bot_name;
	// 				console.log(input);
	// 		let reply = brain.reply('local-user',input)
	// 		console.log(reply)
	// 	}*

		function brainError() {
		    console.log('Chatbot error!')
		}


// SPEECH
		speech = new p5.Speech(); // speech synthesis object
		  speech.onLoad = voiceReady;

		  speech.started(startSpeaking);
		  speech.ended(endSpeaking);

		  function startSpeaking() {
				console.log('startSpeaking')
		  	background( 0,0, 0);
		  }
		  function endSpeaking() {
				if (frases.length>0){
					speech.speak(frases.shift());
				}
					else{
									startListening();
				}

		  }

		  function voiceReady() {
		    console.log('voiceReady');
					speech.setVoice(7);
		  }
			canvas.mousePressed(startListening);

}





/*function draw(){
	background(0);
	if(mouseIsPressed){
		var point ={
			x:mouseX,
			y:mouseY
		}
		drawing.push(point);
		console.log('pressed');
	}
	beginShape();
	stroke(255);
	strokeWeight(4);
	noFill();
	for(var i=0; i < drawing.length;  i++){
			vertex(drawing[i].x,drawing[i].y);

	}
	endShape();


}*/





// var database;
//
// var drawing = [];
// var currentPath = [];
// var isDrawing = false;
//
// function setup() {
//   canvas = createCanvas(200, 200);
//
//
//
//   canvas.mousePressed(startPath);
//   canvas.parent('canvascontainer');
//   canvas.mouseReleased(endPath);
//
//   var saveButton = select('#saveButton');
//   saveButton.mousePressed(saveDrawing);
//
//   var clearButton = select('#clearButton');
//   clearButton.mousePressed(clearDrawing);
//
//
//
//
// 	var config = {
//     apiKey: "AIzaSyDZ8Na6cTMcQ1cH-dVCArDbdpLpXLzv81k",
//     authDomain: "drawings-to-firebase.firebaseapp.com",
//     databaseURL: "https://drawings-to-firebase.firebaseio.com",
//     projectId: "drawings-to-firebase",
//     storageBucket: "drawings-to-firebase.appspot.com",
//     messagingSenderId: "1091105692743"
//   };
//   firebase.initializeApp(config);
//   database = firebase.database();
//
//   var params = getURLParams();
//   console.log(params);
//   if (params.id) {
//     console.log(params.id);
//     showDrawing(params.id);
//   }
//
//
//   var ref = database.ref('drawings');
//   ref.on('value', gotData, errData);
// }
//
// function startPath() {
//   isDrawing = true;
//   currentPath = [];
//   drawing.push(currentPath);
// }
//
// function endPath() {
//   isDrawing = false;
// }
//
// function draw() {
//   background(0);
//
//   if (isDrawing) {
//     var point = {
//       x: mouseX,
//       y: mouseY
//     }
//     currentPath.push(point);
//   }
//
//   stroke(255);
//   strokeWeight(4);
//   noFill();
//   for (var i = 0; i < drawing.length; i++) {
//     var path = drawing[i];
//     beginShape();
//     for (var j = 0; j < path.length; j++) {
//       vertex(path[j].x, path[j].y)
//     }
//     endShape();
//   }
//
//
// }
//
//
// function saveDrawing() {
//   var ref = database.ref('drawings');
//   var data = {
//     name: "Dan",
//     drawing: drawing
//   }
//   var result = ref.push(data, dataSent);
//   console.log(result.key);
//
//   function dataSent(err, status) {
//     console.log(status);
//   }
// }
//
// function gotData(data) {
//
//   // clear the listing
//   var elts = selectAll('.listing');
//   for (var i = 0; i < elts.length; i++) {
//     elts[i].remove();
//   }
//
//   var drawings = data.val();
//   var keys = Object.keys(drawings);
//   for (var i = 0; i < keys.length; i++) {
//     var key = keys[i];
//     //console.log(key);
//     var li = createElement('li', '');
//     li.class('listing');
//     var ahref = createA('#', key);
//     ahref.mousePressed(showDrawing);
//     ahref.parent(li);
//
//     var perma = createA('?id=' + key, 'permalink');
//     perma.parent(li);
//     perma.style('padding', '4px');
//
//     li.parent('drawinglist');
//   }
// }
//
// function errData(err) {
//   console.log(err);
// }
//
// function showDrawing(key) {
//   //console.log(arguments);
//   if (key instanceof MouseEvent) {
//     key = this.html();
//   }
//
//   var ref = database.ref('drawings/' + key);
//   ref.once('value', oneDrawing, errData);
//
//   function oneDrawing(data) {
//     var dbdrawing = data.val();
//     drawing = dbdrawing.drawing;
//     //console.log(drawing);
//   }
//
// }
//
//
// function clearDrawing() {
//   drawing = [];
// }
