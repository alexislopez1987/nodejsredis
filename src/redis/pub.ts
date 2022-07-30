import Redis from "ioredis";
import { testChannel } from "./channels";
import config from "../config/configredis";
import { setTimeout } from "timers/promises";

const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

export const publisher = async () => {
  console.log("setTimeout - inicio");
  await setTimeout(2000, "resolved");
  const msg = {
    message: `sending message at ${new Date().toLocaleString()}`,
  };
  await sendMessage(testChannel, msg);
  console.log("setTimeout - despues de mensaje");

  publisher();
};

const sendMessage = async (channel: string, message: object) => {
  try {
    console.log(`mensaje a enviar: ${JSON.stringify(message, null, 2)}`);
    const publishMsg = await redis.publish(channel, JSON.stringify(message));
    console.log("mensaje publicado ✍️...", publishMsg);
  } catch (error) {
    console.error("💩 error al publicar", error);
  }
};
