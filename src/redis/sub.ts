import Redis from "ioredis";
import { testChannel } from "./channels";
import config from "../config/configredis";

const redis = new Redis(config.REDIS_PORT, config.REDIS_HOST);

export const subscriber = () => {
  redis.subscribe(testChannel, (err, count) => {
    if (err) {
      console.error(`💩 fallo al suscribirse`, err);
    } else {
      console.log(
        `🥳 Suscrito existosamente a ${testChannel}! Este cliente esta suscrito a ${count} canales`
      );
    }
  });

  redis.on("message", (channel, message) => {
    console.log(`🤗 mensaje recibido desde ${channel}`);
    console.log(JSON.parse(message));
  });
};
