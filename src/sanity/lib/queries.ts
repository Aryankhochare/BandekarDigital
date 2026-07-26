import { groq } from 'next-sanity'

export const portfolioQuery = groq`
  *[_type == "portfolioItem"] | order(_createdAt desc) {
    _id,
    title,
    category,
    desc,
    "filterGroup": coalesce(filterGroup->value.current, filterGroup, "other"),
    "filterLabel": coalesce(filterGroup->title, filterLabel, "Specialized Work"),
    sizeClass,
    tagClass,
    hoverClass,
    textClass,
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      }
    },
    galleryImages[] {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      }
    }
  }
`

export const eventsQuery = groq`
  *[_type == "eventItem"] | order(_createdAt desc) {
    _id,
    title,
    client,
    date,
    location,
    desc,
    tagClass,
    hoverClass,
    textClass,
    "categoryGroup": coalesce(categoryGroup->value.current, "other"),
    "categoryLabel": coalesce(categoryGroup->title, "Other Events"),
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      }
    },
    galleryImages[] {
      asset-> {
        _id,
        url,
        metadata {
          lqip
        }
      }
    }
  }
`

