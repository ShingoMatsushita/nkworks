import { createClient } from 'microcms-js-sdk'
import type { GalleryItem } from '@/types'

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN!,
  apiKey: process.env.MICROCMS_API_KEY!,
})

export async function getGalleryItems(): Promise<GalleryItem[]> {
  try {
    const data = await client.getList<GalleryItem>({
      endpoint: 'gallery',
      queries: { limit: 9, orders: '-publishedAt' },
    })
    return data.contents
  } catch {
    return []
  }
}
