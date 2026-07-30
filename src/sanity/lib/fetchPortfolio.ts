import { client } from './client'
import { portfolioQuery } from './queries'
import { urlForImage } from './image'
import { isSanityConfigured } from '../env'
import { PortfolioCategory } from '@/data/portfolioData'

interface SanityImageReference {
  asset?: {
    _id: string;
    url: string;
    metadata?: {
      lqip?: string;
    };
  };
}

interface SanityPortfolioItem {
  title: string;
  order?: number;
  category?: string;
  desc?: string;
  coverImage?: SanityImageReference;
  galleryImages?: SanityImageReference[];
  galleryVideos?: { asset?: { _id?: string; url?: string } }[];
  tagClass?: string;
  hoverClass?: string;
  textClass?: string;
  sizeClass?: string;
  filterGroup?: string;
  filterLabel?: string;
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

export async function getPortfolioItems(): Promise<PortfolioCategory[]> {
  if (!isSanityConfigured) {
    console.warn('Sanity is not configured. Returning empty portfolio items.')
    return []
  }

  try {
    const sanityItems = await client.fetch(portfolioQuery)

    if (sanityItems && sanityItems.length > 0) {
      const mappedSanityItems: PortfolioCategory[] = (sanityItems as SanityPortfolioItem[]).map((item) => {
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
          category: item.category || item.title,
          title: item.title,
          desc: item.desc || '',
          images: galleryUrls.length > 0 ? galleryUrls : [coverUrl],
          coverImage: coverUrl,
          tagClass: item.tagClass || 'tagCyan',
          hoverClass: item.hoverClass || 'cyanHover',
          textClass: item.textClass || 'cyanText',
          sizeClass: item.sizeClass !== 'standard' ? item.sizeClass : undefined,
          filterGroup: item.filterGroup || 'other',
          filterLabel: item.filterLabel || item.category || 'Specialized',
          lqip: item.coverImage?.asset?.metadata?.lqip,
        }
      })

      return mappedSanityItems
    }
  } catch (error) {
    console.error('Failed to fetch portfolio items from Sanity:', error)
  }

  return []
}
