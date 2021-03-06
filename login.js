 var googleUser = {};
  var valid = false;
  var startApp = function() {
    gapi.load('auth2', function(){
      auth2 = gapi.auth2.init({
        client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      attachSignin(document.getElementById('customBtn'));
    });
  };

  function attachSignin(element) {
    console.log(element.id);
    auth2.attachClickHandler(element, {},
        function(googleUser) {
          document.getElementById('name').innerText = "Signed in: " +
              	googleUser.getBasicProfile().getName()+" "+googleUser.getBasicProfile().getId()+" "+googleUser.getAuthResponse().id_token;
              	var id_token = googleUser.getAuthResponse().id_token;
              	var xhr = new XMLHttpRequest();
				xhr.open('POST', 'https://www.googleapis.com/oauth2/v3/tokeninfo');
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
				xhr.onload = function() {
  					document.getElementById('name').innerText = googleUser.getBasicProfile().getName();  
          var element = document.createElement("input");
          var label = document.createElement("Label");
          var btn = document.createElement("button");
          var text = document.createTextNode("DONE");
          btn.appendChild(text);
          btn.setAttribute("id","done");
          document.body.appendChild(btn);
          label.innerHTML = "Enter your one-time password:";    
          label.setAttribute("id","passwordlabel"); 
          element.setAttribute("type", "text");
          // element.setAttribute("value", "");
          element.setAttribute("name", "password");
          element.setAttribute("id", "password");
          element.setAttribute("style", "width:200px");
          label.setAttribute("style", "font-weight:normal");
          var foo = document.getElementById("pwd");
          foo.appendChild(label);
          foo.appendChild(element); 
          foo.appendChild(btn);

          document.getElementById("done").addEventListener("click", validatePassword);
				function validatePassword() {	

					var xhr1 = new XMLHttpRequest();
					var url ='COPY_YOUR_URL';
					xhr1.open('POST', url);
					xhr1.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
					xhr1.onload = function() {
						var pubnub = new PubNub({
    						subscribeKey: 'Enter your subscribe key here',
    						publishKey: 'Enter your publish key here',
    						secretKey: 'Enter your secret key here'
  						});
						pubnub.grant({
        					channels: ["Raspberry"],
        					read: true,
        					write: true,
        					ttl: 5
    					},
    					function (status) {
        					// handle state setting response
    					});
  						document.getElementById('name').innerText = xhr1.responseText;
  						if(xhr1.responseText.trim() == "ACCOUNT EXISTS")	
  							window.open('/validkey.html','_self');
  						else if(xhr1.responseText.trim() == "ACCOUNT DOES NOT EXIST")
  							window.open('/invalidkey.html','_self');
					};
					xhr1.send('id='+googleUser.getBasicProfile().getId()+'&password='+document.getElementById('password').value);
		          	 document.getElementById('done').style.display = "none";
		             document.getElementById('password').style.display = "none";
		             document.getElementById('passwordlabel').style.display = "none";
				}
				};
				xhr.send('id_token=' + id_token);
        }, function(error) {
          alert(JSON.stringify(error, undefined, 2));
        });

  }
