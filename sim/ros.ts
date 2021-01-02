/// <reference path="../libs/core/enums.d.ts"/>
/// <reference types="roslib" />

namespace pxsim {

  type responses = {
    [key: string]: Messages.PlainObj
  }

  export class ROSClient {
        
    private bridgeUrl: string;
    private ros: ROSLIB.Ros ;
    private responses: responses = {};
    private connected: boolean = false;
    constructor() {
      this.ros = new ROSLIB.Ros(null)
    }

    public connect(url: string) {
      this.ros.on('connection', function() {
        this.connected = true
        logMsg('Connected to websocket server.')
      })
    
      this.ros.on('error', function() {
        logMsg('Error connecting to websocket server: ')
      })
    
      this.ros.on('close', function() {
        logMsg('Connection to websocket server closed.')
      })
      if (!this.connected){
        this.ros.connect(url)
        this.bridgeUrl = url
      }

    }
    public close(){
      this.ros.close()
    }
    public publish(topic: string, message: Messages.RosMessage){
      const publisher = new ROSLIB.Topic({
        ros: this.ros,
        name: topic,
        messageType: message.messageType
      })
      console.log(JSON.stringify(message.data) + JSON.stringify(message.messageType))

      const publishedMessage = new ROSLIB.Message(message.data)

      publisher.publish(publishedMessage);
    }
    public subscribe(topic: string, messageType: SubscribableTypes, callback: (message: object)=> void){
      const msg = Messages.createMessage(messageType.valueOf())
      const listener = new ROSLIB.Topic({
        ros : this.ros,
        name : topic,
        messageType : msg.messageType
      });
      const callbackWrapper = (message: Messages.PlainObj) => {
        this.responses[topic] = message
        callback(message)
      }
      listener.subscribe(callbackWrapper)
    }
    public getResponse(topic: string): Messages.PlainObj{
      return this.responses[topic]
    }
  }
}
    
namespace pxsim.ROS {
  /**
     * Connect to ROSBridge
     * @param url the websocket URL to connect, eg:ws://localhost:9090
     */
    //% weight=85
    //% blockId=rosConnect block="connect to %url"
  export function connect(url: string){
    const b = board()
    //TODO: Check if ros is already connected. If not, then connect
    b.ros.connect(url)
  }

  /**
   * Publish a message
   * @param topic
   * @param message 
   */
  //% blockId=publishMessage block="publish %message to %topic"
  export function publish( message: Messages.RosMessage, topic: string){
    const b = board()
    b.ros.publish(topic, message);
  }

  /**
   * Subscribe to a topic
   * @param topic
   * @param response
   * @param body 
   */
  //% blockId=subscribeMessage block="Subscribe to topic: $topic as type: $type"
  export function subscribe(topic: string, type: SubscribableTypes, handler: RefAction){
    const b = board()
    b.ros.subscribe(topic, type, (data: object)=>{
      const stringifiedVal = JSON.stringify(data)
      b.bus.queue(type, topic, stringifiedVal)
    })
    b.bus.listen(type, topic, handler)
  }
}
