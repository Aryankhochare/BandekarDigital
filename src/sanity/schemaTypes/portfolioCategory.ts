import { defineField, defineType } from 'sanity'

export const portfolioCategory = defineType({
  name: 'portfolioCategory',
  title: 'Portfolio Category Group',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title/Label',
      type: 'string',
      description: 'e.g. Sign Boards & Acrylic, Branding & Printing, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value (Identifier)',
      type: 'slug',
      description: 'e.g. signs, printing, etc. (Used for filtering)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
