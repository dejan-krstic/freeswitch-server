import { ECallState, EChannelState, IChannel } from "../interfaces/IChannel";

export default (obj) => {
  const headers: any = {};
  obj.headers.forEach((_) => (headers[_.name] = _.value));
  const channel: IChannel = {
    callstate: headers["Channel-Call-State"] as ECallState,
    state: headers["Channel-State"] as EChannelState,

    uuid: headers["Unique-ID"],
    direction: headers["Call-Direction"],
    name: headers["Channel-Name"],
    ip_addr: headers["Caller-Callee-ID-Number"],
    dest: headers["Caller-Destination-Number"],
    context: headers["Caller-Context"],
    hostname: headers["FreeSWITCH-Hostname"],
    callee_name: headers["Caller-Callee-ID-Name"],
    callee_num: headers["Caller-Callee-ID-Number"],
    call_uuid: headers["Channel-Call-UUID"],
    created: new Date(headers["Event-Date-Local"]),
    created_epoch: Math.floor(headers["Event-Date-Timestamp"] / 1e6),
    cid_name:
      headers["Caller-Callee-ID-Name"] || headers["Caller-Caller-ID-Name"],
    cid_num:
      headers["Caller-Callee-ID-Number"] || headers["Caller-Caller-ID-Number"],
    callee_direction:
      headers["Call-Direction"] ||
      headers["Caller-Direction"] ||
      headers.variable_direction,
  };

  return channel;
};
