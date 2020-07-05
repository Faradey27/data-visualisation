import { homepage } from '../../package.json';
import {
  AlertHistoryEntry,
  InsightHistoryEntry,
  PayloadSizeHistoryEntry,
  QueueSizeHistoryEntry,
  ResourceHistoryEntry,
  ResponseDelayHistoryEntry,
} from './types';

export * from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const emulateServer = (items: any[]) => ({ total: items.length, items });

export default {
  async request(method: string, { path }: { path: string }) {
    const url = `${process.env.REACT_APP_API_URL || homepage}${path}`;

    const params = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    const rawResponse = await fetch(url, params);
    const response = await rawResponse.json();

    if (!rawResponse.ok) {
      throw response;
    }

    return response;
  },

  get(path: string) {
    return this.request('GET', { path });
  },

  async fetchQueueSizeHistory(): Promise<{
    total: number;
    items: QueueSizeHistoryEntry[];
  }> {
    await delay(1000);
    const res = await this.get('/history/queueSize.json');
    return emulateServer(res);
  },

  async fetchResponseDelayHistory(): Promise<{
    total: number;
    items: ResponseDelayHistoryEntry[];
  }> {
    await delay(1000);
    const res = await this.get('/history/responseDelay.json');
    return emulateServer(res);
  },

  async fetchPayloadSizeHistory(): Promise<{
    total: number;
    items: PayloadSizeHistoryEntry[];
  }> {
    await delay(1000);
    const res = await this.get('/history/payloadSize.json');
    return emulateServer(res);
  },

  async fetchDeadLetterQueueHistory(): Promise<{
    total: number;
    items: PayloadSizeHistoryEntry[];
  }> {
    await delay(1000);
    const res = await this.get('/history/deadLetterQueue.json');
    return emulateServer(res);
  },

  async fetchResourcesHistory(): Promise<{
    total: number;
    items: ResourceHistoryEntry[];
  }> {
    await delay(1000);
    const res = await this.get('/history/resources.json');
    return emulateServer(res);
  },

  async fetchAlertsHistory(): Promise<{
    total: number;
    items: AlertHistoryEntry[];
  }> {
    await delay(1000);
    const res = await this.get('/history/alerts.json');
    return emulateServer(res);
  },

  async fetchInsightsHistory(): Promise<{
    total: number;
    items: InsightHistoryEntry[];
  }> {
    await delay(1000);
    const res = await this.get('/history/insights.json');
    return emulateServer(res);
  },
};
