// Auto-generated from simulator. Do not edit.
declare namespace loops {
    /**
     * Repeats the code forever in the background. On each iteration, allows other code to run.
     * @param body the code to repeat
     */
    //% help=functions/forever weight=55 blockGap=8
    //% blockId=device_forever block="forever"
    //% shim=loops::forever
    function forever(body: () => void): void;

    /**
     * Pause for the specified time in milliseconds
     * @param ms how long to pause for, eg: 100, 200, 500, 1000, 2000
     */
    //% help=functions/pause weight=54
    //% block="pause (ms) %pause" blockId=device_pause
    //% shim=loops::pauseAsync promise
    function pause(ms: number): void;

}
declare namespace console {
    /**
     * Print out message
     */
    //% block
    //% shim=console::log
    function log(msg: string): void;

}
declare namespace Messages {
    /**
     * A Typical ROS Message
     */
    //%
    class RosMessage {
        /**
         * Message Data
         */
        //%
        //% shim=.data
        public data: object;

        /**
         * Message Type
         */
        //%
        //% shim=.messageType
        public messageType: string;

        /**
         * Get Data
         */
        //%
        //% shim=.getData
        public getData(): object;

    }
    //% blockSetVariable=message
    //% blockId="createmessage"
    //% shim=Messages::createMessage
    function createMessage(types: MessageTypes): Messages.RosMessage;

    /**
     * Gets a response value
     * @param type the message type
     * @param topic the topic to get message from
     */
    //% weight=85
    //% blockId=getResponse block="response type: %msgType from topic: %topic"
    //% shim=Messages::getResponse
    function getResponse(msgType: SubscribableTypes, topic: string): string | number | boolean;

    /**
     * Creates a Twist Message
     * @param speed the forward speed
     * @param angle the angular speed
     */
    //% weight=85
    //% blockId=twistMessage block="Movement - Forward speed %speed, Angular speed %angle"
    //% shim=Messages::twistMessage
    function twistMessage(speed: number, angle: number): Messages.RosMessage;

    /**
     * Creates a String Message
     * @param string the string
     */
    //% weight=85
    //% blockId=stringMessage block="String: %text"
    //% shim=Messages::stringMessage
    function stringMessage(text: string): Messages.RosMessage;

    /**
     * Creates a Number Message
     * @param number the number
     */
    //% weight=85
    //% blockId=numberMessage block="Number: %num"
    //% shim=Messages::numberMessage
    function numberMessage(num: number): Messages.RosMessage;

    /**
     * Creates a Boolean Message
     * @param bool the boolean
     */
    //% weight=85
    //% blockId=booleanMessage block="Bool: %bool"
    //% shim=Messages::booleanMessage
    function booleanMessage(bool: boolean): Messages.RosMessage;

}
declare namespace ROS {
    /**
     * Connect to ROSBridge
     * @param url the websocket URL to connect, eg:ws://localhost:9090
     */
    //% weight=85
    //% blockId=rosConnect block="connect to %url"
    //% shim=ROS::connectAsync promise
    function connect(url: string): void;

    /**
     * Publish a message
     * @param topic
     * @param message 
     */
    //% blockId=publishMessage block="publish %message to %topic"
    //% shim=ROS::publish
    function publish(message: Messages.RosMessage, topic: string): void;

    /**
     * Subscribe to a topic
     * @param topic
     * @param response
     * @param body 
     */
    //% blockId=subscribeMessage block="Subscribe to topic: $topic as type: $type"
    //% shim=ROS::subscribe
    function subscribe(topic: string, type: SubscribableTypes, handler: () => void): void;

    /**
     * Move robot
     * @param type
     * @param speed
     */
    //% blockId=move block="Move $type with speed: $speed for $duration seconds"
    //% shim=ROS::moveAsync promise
    function move(type: MovementTypes, speed: SpeedTypes, duration: number): void;

}

// Auto-generated. Do not edit. Really.
