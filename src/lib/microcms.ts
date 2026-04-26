import { createClient } from 'microcms-js-sdk';

// モジュール評価時ではなく、初回使用時に生成するレイジー初期化
let _client: ReturnType<typeof createClient> | null = null;

export function getMicroCMSClient() {
  if (_client) return _client;
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;
  if (!serviceDomain || !apiKey) return null;
  _client = createClient({ serviceDomain, apiKey });
  return _client;
}

// 後方互換: 既存コードが client.get() を使っている箇所向け
export const client = new Proxy({} as ReturnType<typeof createClient>, {
  get(_, prop: string) {
    const c = getMicroCMSClient();
    if (!c) return async () => { throw new Error('MicroCMS env vars not set'); };
    return (c as Record<string, unknown>)[prop];
  },
});
