/// <reference path="../libs/core/enums.d.ts"/>

namespace pxsim.Messages {
  /**
   * A Typical ROS Message
   */
  //%
  export abstract class RosMessage {
    /**
     * Message Data
     */
    //%
    public abstract data: object;
    /**
     * Message Type
     */
    //%
    readonly abstract messageType: string;
    /**
     * Get Data
     */
    //%
    getData(){
      return this.data;
    }
  }

  export interface PlainObj {
    data: boolean|string|number
  }

  export class PlainMessage extends RosMessage {
    public data: PlainObj;
    readonly messageType: string = null;
    constructor(){
      super()
    }
  }

  export interface TwistObj {
    linear: {
      x: number,
      y: number,
      z: number
    },
    angular: {
      x: number,
      y: number,
      z: number
    }
  }

  export class Twist extends RosMessage {
    public data: TwistObj = {
      linear: {
        x: 0,
        y: 0,
        z: 0
      },
      angular: {
        x: 0,
        y: 0,
        z: 0
      }
    };
    readonly messageType: string = 'geometry_msgs/Twist';
    constructor(data ?: TwistObj){
      super()
      if (data){
        this.data = data
      }
    }
  }

  export interface StringObj {
    data: string
  }

  export class ROSString extends RosMessage {
    public data: StringObj = {
      data: ""
    };
    readonly messageType: string = 'std_msgs/String';
    constructor(str ?: string){
      super()
      this.data.data = str;
    }
  }


  export interface NumberObj {
    data: number
  }

  export class ROSNumber extends RosMessage {
    public data: NumberObj = {
      data: 0
    };
    readonly messageType: string = 'std_msgs/Int32';
    constructor(num ?: number){
      super()
      this.data.data = num
      if (num % 1 !== 0){
        this.messageType = 'std_msgs/Float32'
      }
    }
  }

  export interface BoolObj {
    data: boolean
  }

  export class ROSBool extends RosMessage {
    public data: BoolObj = {
      data: false
    };
    readonly messageType: string = 'std_msgs/Bool';
    constructor(bool ?: boolean){
      super()
      this.data.data = bool
    }
  }

  //% blockSetVariable=message
  //% blockId="createmessage"
  export function createMessage(types: MessageTypes): RosMessage {
    switch(types){
      case MessageTypes.Twist: return new Twist();
      case MessageTypes.String: return new ROSString();
      case MessageTypes.Bool: return new ROSBool();
      case MessageTypes.Number: return new ROSNumber();
      default: return new PlainMessage();
    }
  }

  export function getMessageTypes(types: SubscribableTypes): string {
    switch(types){
      case SubscribableTypes.String: return "string";
      case SubscribableTypes.Bool: return "boolean";
      case SubscribableTypes.Number: return "number";
      default: return "none";
    }
  }

    /**
     * Gets a response value
     * @param type the message type
     * @param topic the topic to get message from
     */
    //% weight=85
    //% blockId=getResponse block="response type: %msgType from topic: %topic"
  export function getResponse(msgType: SubscribableTypes, topic: string): string|boolean|number {
    const b = board()
    const message = b.ros.getResponse(topic).data
    const _type = getMessageTypes(msgType)
    if (typeof message !== _type){
      throw Error("wrong message type!")
    }
    return message
  }
    /**
     * Creates a Twist Message
     * @param speed the forward speed
     * @param angle the angular speed
     */
    //% weight=85
    //% blockId=twistMessage block="Movement - Forward speed %speed, Angular speed %angle"
  export function twistMessage(speed: number, angle: number): RosMessage {
      const msg: Twist = new Twist();
      msg.data.linear.x = speed;
      msg.data.angular.z = angle;
      return msg;
  }
    /**
     * Creates a String Message
     * @param string the string
     */
    //% weight=85
    //% blockId=stringMessage block="String: %text"
    export function stringMessage(text: string): RosMessage {
      return new ROSString(text);
  }
    /**
     * Creates a Number Message
     * @param number the number
     */
    //% weight=85
    //% blockId=numberMessage block="Number: %num"
    export function numberMessage(num: number): RosMessage {
      return new ROSNumber(num);
  }
    /**
     * Creates a Boolean Message
     * @param bool the boolean
     */
    //% weight=85
    //% blockId=booleanMessage block="Bool: %bool"
    export function booleanMessage(bool: boolean): RosMessage {
      return new ROSBool(bool);
  }
}