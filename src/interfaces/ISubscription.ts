import { EFSState } from "./ESFState";

export interface ISubscription {
  uuid: string;
  state: EFSState;
}
