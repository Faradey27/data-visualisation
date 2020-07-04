import { homepage } from '../../package.json';
import {
  AlertHistoryEntry,
  InsightHistoryEntry,
  QueueSizeHistoryEntry,
  ResourceHistoryEntry,
} from './types';

export * from './types';

export default {
  async request(method: string, { path }: { path: string }) {
    const url = `${homepage}${path}`;

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

  fetchQueueSizeHistory(): Promise<{
    total: number;
    items: QueueSizeHistoryEntry[];
  }> {
    return this.get('/history/queueSize');
  },

  fetchResourcesHistory(): Promise<{
    total: number;
    items: ResourceHistoryEntry[];
  }> {
    return this.get('/history/resources');
  },

  fetchAlertsHistory(): Promise<{ total: number; items: AlertHistoryEntry[] }> {
    return this.get('/history/alerts');
  },

  fetchInsightsHistory(): Promise<{
    total: number;
    items: InsightHistoryEntry[];
  }> {
    return this.get('/history/insights');
  },
};
