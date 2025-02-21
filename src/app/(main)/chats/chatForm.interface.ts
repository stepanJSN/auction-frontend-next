export interface IChatForm {
  name?: string;
  participants: {
    id: string;
    name: string;
    surname: string;
  }[];
}
