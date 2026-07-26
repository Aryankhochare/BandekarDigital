import { client } from './client'
import { portfolioQuery } from './queries'
import { urlForImage } from './image'
import { isSanityConfigured } from '../env'
import { portfolioData as staticPortfolioData, PortfolioCategory } from '@/data/portfolioData'

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
  category?: string;
  desc?: string;
  coverImage?: SanityImageReference;
  galleryImages?: SanityImageReference[];
  tagClass?: string;
  hoverClass?: string;
  textClass?: string;
  sizeClass?: string;
  filterGroup?: string;
  filterLabel?: string;
}

export async function getPortfolioItems(): Promise<PortfolioCategory[]> {
  if (!isSanityConfigured) {
    return staticPortfolioData
  }

  try {
    const sanityItems = await client.fetch(portfolioQuery)

    if (sanityItems && sanityItems.length > 0) {
      const mappedSanityItems: PortfolioCategory[] = (sanityItems as SanityPortfolioItem[]).map((item) => {
        const coverUrl = item.coverImage ? urlForImage(item.coverImage)?.url() || '' : ''
        const galleryUrls = item.galleryImages
          ? item.galleryImages.map((img) => urlForImage(img)?.url() || '').filter(Boolean)
          : [coverUrl]

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

      // Combine Sanity items at the front with static items, avoiding duplicate titles
      const sanityTitles = new Set(mappedSanityItems.map(i => i.title.toLowerCase()))
      const filteredStatic = staticPortfolioData.filter(s => !sanityTitles.has(s.title.toLowerCase()))

      return [...mappedSanityItems, ...filteredStatic]
    }
  } catch (error) {
    console.warn('Sanity fetch skipped or failed, falling back to static data:', error)
  }

  return staticPortfolioData
}
