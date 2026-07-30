import { client } from './client'
import { eventsQuery } from './queries'
import { urlForImage } from './image'
import { isSanityConfigured } from '../env'
import { eventData as staticEventData, EventItem } from '@/data/eventData'

interface SanityImageReference {
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
    };
  };
}

interface SanityEventItem {
  title: string;
  client?: string;
  date?: string;
  location?: string;
  desc?: string;
  coverImage?: SanityImageReference;
  galleryImages?: SanityImageReference[];
  galleryVideos?: { asset?: { _id?: string; url?: string } }[];
  tagClass?: string;
  hoverClass?: string;
  textClass?: string;
  categoryGroup?: string;
  categoryLabel?: string;
}

function isValidImageAsset(img: unknown): boolean {
  if (!img || typeof img !== 'object') return false
  const asset = (img as { asset?: { _ref?: string; _id?: string } }).asset
  if (!asset) return false
  const ref = asset._ref || asset._id || ''
  if (!ref) return false
  if (ref.startsWith('file-') || ref.includes('.mp4') || ref.includes('.mov') || ref.includes('.webm')) {
    return false
  }
  return ref.startsWith('image-')
}

export async function getEventItems(): Promise<EventItem[]> {
  if (!isSanityConfigured) {
    return staticEventData
  }

  try {
    const sanityItems = await client.fetch(eventsQuery)

    if (sanityItems && sanityItems.length > 0) {
      const mappedSanityItems: EventItem[] = (sanityItems as SanityEventItem[]).map((item) => {
        const coverUrl = item.coverImage ? urlForImage(item.coverImage)?.url() || '' : ''
        
        const photoUrls = item.galleryImages
          ? item.galleryImages.map((img) => {
              if (isValidImageAsset(img)) {
                return urlForImage(img)?.url() || ''
              }
              return img.asset?.url || ''
            }).filter(Boolean)
          : []

        const videoUrls = item.galleryVideos
          ? item.galleryVideos.map((vid) => vid.asset?.url || '').filter(Boolean)
          : []

        const galleryUrls = [...photoUrls, ...videoUrls]

        return {
          title: item.title,
          client: item.client || '',
          date: item.date || '',
          location: item.location || '',
          desc: item.desc || '',
          images: galleryUrls.length > 0 ? galleryUrls : [coverUrl],
          coverImage: coverUrl,
          tagClass: item.tagClass || 'tagPurple',
          hoverClass: item.hoverClass || 'purpleHover',
          textClass: item.textClass || 'purpleText',
          categoryGroup: item.categoryGroup || 'other',
          categoryLabel: item.categoryLabel || 'Other Events',
          lqip: item.coverImage?.asset?.metadata?.lqip,
        }
      })

      // Combine Sanity items at the front with static items, avoiding duplicates
      const sanityTitles = new Set(mappedSanityItems.map(i => i.title.toLowerCase()))
      const filteredStatic = staticEventData.filter(s => !sanityTitles.has(s.title.toLowerCase()))

      return [...mappedSanityItems, ...filteredStatic]
    }
  } catch (error) {
    console.warn('Sanity events fetch failed, falling back to static data:', error)
  }

  return staticEventData
}
