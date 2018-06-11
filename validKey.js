var pubnub = new PubNub({
    subscribeKey: 'Enter your subscribe key here',
    publishKey: 'Enter your publish key here'
});

pubnub.addListener({
        status: function(statusEvent) {
            if (statusEvent.category === "PNConnectedCategory") {
                //publishSampleMessage();
            }
        },
        message: function(msg) {
            console.log(msg.message);
            pubnub.setAuthKey(msg.message);
        },
        presence: function(presenceEvent) {
            // handle presence
        }
    })      
    console.log("Subscribing..");
    pubnub.subscribe({
        channels: ['Raspberry'] 
    });

function unlock() {
pubnub.publish({
    message: 'Unlock',
    channel: 'RP'
}, 
function (status, response) {
    if (status.error) {
    	var elems = document.getElementsByClassName('warning');
		for (var i = 0;i < elems.length;i += 1){
  			elems[i].style.display = 'block';
		}
		document.getElementsByClassName("btn").value = "Try Again";
        // handle error
        console.log(status);
    } else {
    	document.getElementById('lockImage').src = 'Unlock.png';
        console.log("Message Published w/ timetoken", response.timetoken);
    }
});
}


