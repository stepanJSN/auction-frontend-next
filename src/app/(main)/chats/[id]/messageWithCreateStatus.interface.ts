import { MutationStatusEnum } from "@/enums/mutationStatus";
import { IMessage } from "@/interfaces/message.interfaces";

export interface IMessageWithCreateStatus {
  id: string;
  created_at?: string;
  message: string;
  sender: Partial<IMessage["sender"]>;
  creationStatus: MutationStatusEnum;
}
