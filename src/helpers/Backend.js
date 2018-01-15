class Backend {

	constructor(game){
		

	    //apiUrl
	    if (this.getUrlVars()["apiUrl"] != null){

	    	this.apiUrl = this.getUrlVars()["apiUrl"];
	    	
	    }else {
	    	this.apiUrl = 'https://stage-api.parade.pet/';
	    }

	    //assetUrl
	    if (this.getUrlVars()["assetUrl"] != null){

	    	this.assetUrl = this.getUrlVars()["assetUrl"];
	    	
	    }else {
	    	this.assetUrl = 'http://stage-assets.parade.pet/';
	    }	


	    //token
	   if (this.getUrlVars()["token"] != null){

	    	this.token = this.getUrlVars()["token"];
	    	
	    }else {
//	    	this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjIsImlhdCI6MTUwMDAzNjI2NX0.UGbPknQvb0B8MOjPMRuqZQP53x6cLQaK5UsD8Dp2SqA';
	    	
	    	this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjEwMjIsImlhdCI6MTUxMzYyMzEwMn0.w2eWYZLLyqvv9N4C9YcYo1cwaiYq4QubDzXvlGn_0dM'; //others
	    	//this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjM2LCJpYXQiOjE1MDc4MTMyMDd9.lcKmwQBIDqtnURCidLRbkVIyhoIwGlcEODHHj6x-gQ8';	//petwalk 
	    }	

		//console.log('from backend class')
	}


	serviceCallGetPets(caller){

		var main = this;
		$.ajax({
		    url: this.apiUrl + "minigame/getPets/",
		    type: 'get',
		    headers: {
		        Authorization: 'Bearer ' + this.token, 
		    },
		    dataType: 'json',
		    success: function (data) {
		        //console.log(data);

		        main.callBackGetPets(data, caller);
		    },error: function(error){

		    	console.log("error call " + error);
		    	main.callBackGetPets(null, caller);
		    }
		});
	}

	serviceCallEnd(caller, timeSeconds){

		var main = this;
		$.ajax({
		    url: this.apiUrl + "minigame/end/",
		    type: 'post',
		    data: {
		        score: timeSeconds
		    },
		    headers: {
		        Authorization: 'Bearer ' + this.token, 
		    },
		    dataType: 'json',
		    success: function (data) {
		        //console.log(data);
		        //console.log('p ' + parent.startTime);
		        //console.log('p' + par);
		        main.callBackEnd(data, caller);
		    },error: function(error){

		    	console.log("error call " + error);
		    	main.callBackEndError(caller);
		    }
		});
	}

	callBackGetPets(data, caller){

		//console.log('this is call back get pets ');

		caller.callBackGetPets(data);
	}

	callBackEnd(data, caller){

		//console.log('this is call back get pets ');

		caller.callBackEnd(data);
	}

	callBackEndError(caller){

		caller.callBackEndError();
	}

	getUrlVars(){

	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}



	create(game){
		this.game = game;
		this.initialized = true;
	}

	testCall(){

		console.log("pet parade test call");

			/*
			$.ajax({
			    url: 'http://api.parade.pet/pet/leaderboard',
			    type: 'get',
			    data: {
			        email: 'pseudocolor747@yahoo.com',
			        password: '922000'
			    },
			    dataType: 'json',
			    success: function (data) {
			        console.log(data);
			    }
			});
			*/
			//success!
			/*
			$.ajax({
			    url: 'http://stage-api.parade.pet/auth/login',
			    type: 'post',
			    data: {
			        email: 'adimsarkodim@gmail.com',
			        password: '922000'
			    },
			    dataType: 'json',
			    success: function (data) {
			        console.log(data);
			    }
			});

			$.ajax({
			    url: 'http://stage-api.parade.pet/pet/pets',
			    type: 'get',
			    data: {
			       
			    },
			    headers: {
			        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjEsImlhdCI6MTQ5NzkwNjIwNH0.UB-zvkIy82bNsL5GUTlUXMAuuXrZcBHbkz25TYEdxks', 
			        
			    },
			    dataType: 'json',
			    success: function (data) {
			        console.log(data);
			    }
			});
			*/
			//success!
			/*
			$.ajax({
			    url: 'http://api.parade.pet/auth/login',
			    type: 'post',
			    data: {
			        email: 'pseudocolor747@yahoo.com',
			        password: '922000'
			    },
			    dataType: 'json',
			    success: function (data) {
			        console.log(data);
			    }
			});
			*/
			
			$.ajax({
			    url: 'http://stage-api.parade.pet/minigame/getPets',
			    type: 'get',
			    headers: {
			        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOjEsImlhdCI6MTQ5NzkwNjIwNH0.UB-zvkIy82bNsL5GUTlUXMAuuXrZcBHbkz25TYEdxks', 
			        
			    },
			    dataType: 'json',
			    success: function (data) {
			        console.log(data);
			    }
			});
			
			
			

			/*
			$.post("http://api.parade.pet/minigame/start",
		    {
		        faceOffSet: "930703",
		        user: "25"
		    },
		    function(data, status){
		    	console.log("Data: " + data + "\nStatus: " + status);
		        //alert("Data: " + data + "\nStatus: " + status);
		    });
			*/
			/*
	        $.get("http://api.parade.pet/minigame/getPets",
	        function(data,status){
	            alert("Data: " + data + "\nStatus: " + status);
	            console.log("Data: " + data + "\nStatus: " + status);
	        });
			*/
			


	}

	finishCall(data){

		console.log('p22 ' + data.coinBonus.type + ": " + data.coinBonus.amount);

		this.textConsole0.text = data.coinBonus.type + ": " + data.coinBonus.amount;
	}






















}
let backend = new Backend();
export default backend;