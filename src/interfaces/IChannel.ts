export enum EChannelEventType {
  CHANNEL_CREATE = "CHANNEL_CREATE",
  CHANNEL_CALLSTATE = "CHANNEL_CALLSTATE",
  CHANNEL_STATE = "CHANNEL_STATE",
  CHANNEL_EXECUTE = "CHANNEL_EXECUTE",
  CHANNEL_EXECUTE_COMPLETE = "CHANNEL_EXECUTE_COMPLETE",
  CHANNEL_DESTROY = "CHANNEL_DESTROY",
}

export enum ECallState {
  ACTIVE = "ACTIVE",
  DOWN = "DOWN",
}

export enum EChannelState {
  CS_INIT = "CS_INIT",
}

export interface IChannel {
  uuid: string;
  callstate: ECallState;
  state: EChannelState;
  created: Date;
  created_epoch: number;
  cid_name: string;
  cid_num: string;
  name: string;
  direction: string;

  ip_addr?: string;
  dest?: string;
  application?: string;
  application_data?: string;
  dialplan?: string;
  context?: string;
  read_codec?: string;
  read_rate?: string;
  read_bit_rate?: string;
  write_codec?: string;
  write_rate?: string;
  write_bit_rate?: string;
  secure?: string;
  hostname?: string;
  presence_id?: string;
  presence_data?: string;
  callee_name?: string;
  callee_num?: string;
  callee_direction?: string;
  call_uuid?: string;
  sent_callee_name?: string;
  sent_callee_num?: string;
}
