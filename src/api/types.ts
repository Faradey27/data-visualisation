export enum RequestState {
  unset = 'unset',
  waiting = 'waiting',
  success = 'success',
  failure = 'failure',
}

export interface QueueSizeHistoryEntry {
  id: string;
  size: number;
  pendingIncreased: number;
  pendingResolved: number;
}

export interface ResourceHistoryEntry {
  id: string;
  name: string;
  timeUsed: string;
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
