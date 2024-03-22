export interface TodoItem {
  id: string,
  label: string,
  isDone: boolean
}

export enum MessageType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export interface Message {
  message: string;
  type: MessageType;
}