const fs = require("fs");
const ini = require("ini");
import { Connection } from "modesl";
import { IChannel, EChannelEventType } from "./interfaces/IChannel";
import log from "./utils/log";
import {
  getOnConnected,
  getOnDisconnected,
  getOnEvent,
  onError,
} from "./helpers/freeswitch";

import { ISubscription } from "./interfaces/ISubscription";

let config;

try {
  config = ini.parse(
    fs.readFileSync(process.env.CONFIGFILE || "./config.ini", "utf-8"),
  );
} catch (err) {
  console.error("ERROR: ", err.message);
}

log.info(config);

log.info(`Connecting to FreeSwitch...`);
let conn;
let eslConnected = false;
const channels: IChannel[] = [];
const uuids: ISubscription[] = [];
const onEvent = getOnEvent(channels, uuids);
const { hostname, port, credentials } = config.FREESWITCHSOCKETS;

const setIsConnected = (status: boolean) => {
  eslConnected = status;
};

try {
  conn = new Connection(hostname, port, credentials, () => {
    log.info(`FreeSwitch connected.`);

    // don't actually know which subscriptions are needed
    conn.subscribe(
      [
        EChannelEventType.CHANNEL_CREATE,
        EChannelEventType.CHANNEL_CALLSTATE,
        EChannelEventType.CHANNEL_STATE,
        EChannelEventType.CHANNEL_EXECUTE,
        EChannelEventType.CHANNEL_EXECUTE_COMPLETE,
        EChannelEventType.CHANNEL_DESTROY,
      ],
      () => {
        conn.on("esl::event::**", onEvent);
      },
    );
    eslConnected = true;
  });
  const onConnected = getOnConnected(conn, setIsConnected);
  const onDisconnected = getOnDisconnected(setIsConnected);
  conn.on("esl::ready", onConnected);
  conn.on("esl::end", onDisconnected);
  conn.on("error", onError);
} catch (err) {
  log.crit("index.ts", err.message);
}
log.info("Is connected:", eslConnected);
