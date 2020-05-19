import { Connection } from "modesl";
import { FREESWITCH_COMMAND } from "../constants/command";
import { IChannel, EChannelEventType } from "../interfaces/IChannel";
import parseChannel from "../helpers/parseChannel";
import { EFSState } from "../interfaces/ESFState";
import { ISubscription } from "../interfaces/ISubscription";
import log from "../utils/log";

export const sendCommand = (conn: ReturnType<Connection>, cmd: string) =>
  conn.api("originate", cmd, (res) => {
    console.log("originate: ", res.body);
  });

export const getOnEvent = (channels: IChannel[], uuids: ISubscription[]) => (
  event,
) => {
  if (!event || !event.type || event.type.indexOf("CHANNEL") === -1) {
    return;
  }

  const channel: IChannel = parseChannel(event);

  switch (event.type as EChannelEventType) {
    case EChannelEventType.CHANNEL_CREATE:
      channels.push(channel);
      const sidx1 = uuids.findIndex((_) => _.uuid === channel.uuid);
      if (sidx1 >= 0) {
        uuids[sidx1].state = EFSState.connected;
        log.info(`channel created: ${channel.uuid}`);
      }
      break;

    case EChannelEventType.CHANNEL_DESTROY:
      const idx = channels.findIndex((_) => _.uuid === channel.uuid);
      if (idx) {
        const sidx2 = uuids.findIndex((_) => _.uuid === channel.uuid);
        if (sidx2 >= 0) {
          uuids[sidx2].state = EFSState.disconnected;
          log.debug({
            func: "Freeswitch.onEvent",
            message: `channel deleted: ${channel.uuid}`,
          });
        }
        channels.splice(idx, 1);
      }
      break;
  }
};

export const getOnConnected = (conn, setConnectedHandler) => () => {
  log.info({
    func: "Freeswitch.onConnected",
    message: `Connected to Freeswitch service`,
  });
  setConnectedHandler(true);
  setTimeout(() => {
    sendCommand(conn, FREESWITCH_COMMAND);
  }, 20000);
};

export const getOnDisconnected = (setConnectedHandler) => () => {
  log.warn({
    func: "Freeswitch.onDisconnected",
    message: "freeswitch disconnected",
  });
  setConnectedHandler(false);
};

export const onError = (err) => {
  log.crit("Freeswitch Error: " + err.message);
};
