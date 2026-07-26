import { type SchemaTypeDefinition } from 'sanity'
import { portfolioItem } from './portfolioItem'
import { eventItem } from './eventItem'
import { portfolioCategory } from './portfolioCategory'
import { eventCategory } from './eventCategory'
import { mediaAsset } from './mediaAsset'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [portfolioItem, eventItem, portfolioCategory, eventCategory, mediaAsset],
}


