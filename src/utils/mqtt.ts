import mqtt from "mqtt";

class MQTT {
  private client: mqtt.MqttClient;

  constructor() {
    if (!process.env.MQTT_URI) {
      console.log("Cannot find MQTT_URI on env! Exiting...");
      process.exit(1);
    }

    this.client = mqtt.connect(process.env.MQTT_URI);

    this.client.on("connect", () => {
      console.log("Successfully connected to MQTT.");
    });

    this.client.on("error", (err) => {
      console.error("MQTT connection error: ", err);
    });
  }

  public publish(topic: string, message: string) {
    this.client.publish(topic, message);
  }
}

export default MQTT;
