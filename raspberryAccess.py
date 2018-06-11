from pubnub.callbacks import SubscribeCallback
from pubnub.enums import PNStatusCategory
from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
import uuid
 
pnconfig = PNConfiguration()
 
pnconfig.subscribe_key = 'Enter your subscribe key here'
pnconfig.publish_key = 'Enter your publish key here'
pnconfig.secret_key = 'Enter your secret key here'
 
pubnub = PubNub(pnconfig)
 
 
def my_publish_callback(envelope, status):
    if not status.is_error():
        pass
    else:
        pass
 
 
class MySubscribeCallback(SubscribeCallback):
    def presence(self, pubnub, presence):
        pass
 
    def status(self, pubnub, status):
        if status.category == PNStatusCategory.PNUnexpectedDisconnectCategory:
            pass
        if status.category == PNStatusCategory.PNConnectedCategory:
            u = str(uuid.uuid4())
            pubnub.grant().read(True).write(True).channels('RP').auth_keys(u).ttl(2).sync()
            pubnub.publish().channel('Raspberry').message(u).async(my_publish_callback)
        if status.category == PNStatusCategory.PNReconnectedCategory:
            pass
        if status.category == PNStatusCategory.PNDecryptionErrorCategory:
            pass
 
    def message(self, pubnub, message):
        pass
 
 
pubnub.add_listener(MySubscribeCallback())
pubnub.subscribe().channels('Raspberry').execute()
