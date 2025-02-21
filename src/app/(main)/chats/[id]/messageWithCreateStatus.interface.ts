import { MutationStatusEnum } from "@/enums/mutationStatus";
import { IMessage } from "@/interfaces/message.interfaces";

export interface IMessageWithCreateStatus extends IMessage {
  creationStatus: MutationStatusEnum;
}
