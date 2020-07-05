export enum RequestState {
  unset = 'unset',
  waiting = 'waiting',
  success = 'success',
  failure = 'failure',
}

export interface QueueSizeHistoryEntry {
  date: number;
  value: number;
  pending: number;
}

export interface ResponseDelayHistoryEntry {
  date: number;
  value: number;
}

export interface PayloadSizeHistoryEntry {
  date: number;
  value: number;
}

export interface DeadLetterQueueHistoryEntry {
  date: number;
  value: number;
}

export interface ResourceHistoryEntry {
  id: string;
  name: string;
  value: string;
  percentage: number;
}

export interface InsightHistoryEntry {
  id: string;
  name: string;
  description: string;
  timestamp: number;
}

export interface AlertHistoryEntry {
  id: string;
  name: string;
  description: string;
  timestamp: number;
}
