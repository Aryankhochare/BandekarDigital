import { defineField, defineType } from 'sanity'

export const eventCategory = defineType({
  name: 'eventCategory',
  title: 'Event Category Group',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title/Label',
      type: 'string',
      description: 'e.g. Festivals & Concerts, Corporate & summits, Culture & Exhibitions, Sports Events',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value (Identifier)',
      type: 'slug',
      description: 'e.g. festivals, corporate, culture, sports (Used for filtering)',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
})
