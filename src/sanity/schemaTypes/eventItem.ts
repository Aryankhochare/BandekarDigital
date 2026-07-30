import { defineField, defineType } from 'sanity'

export const eventItem = defineType({
  name: 'eventItem',
  title: 'Event Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order Position',
      type: 'number',
      description: 'Optional: Use numbers (e.g. 1, 2, 3) to manually control the display order. Lower numbers appear first.',
    }),
    defineField({
      name: 'categoryGroup',
      title: 'Event Category Group',
      type: 'reference',
      to: [{ type: 'eventCategory' }],
      description: 'Choose a category group for this event (used for filters).',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'date',
      title: 'Event Date / Year',
      type: 'string',
      description: 'e.g. Dec 2025 or February 2026',
    }),
    defineField({
      name: 'location',
      title: 'Event Location',
      type: 'string',
      description: 'e.g. Vagator, Goa or Grand Hyatt Goa',
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images (Modal)',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'galleryVideos',
      title: 'Gallery Videos (Modal)',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
    }),
    defineField({
      name: 'tagClass',
      title: 'Tag Color Style',
      type: 'string',
      options: {
        list: [
          { title: 'Cyan', value: 'tagCyan' },
          { title: 'Orange', value: 'tagOrange' },
          { title: 'Purple', value: 'tagPurple' },
        ],
      },
      initialValue: 'tagPurple',
    }),
    defineField({
      name: 'hoverClass',
      title: 'Hover Glow Effect',
      type: 'string',
      options: {
        list: [
          { title: 'Cyan Hover', value: 'cyanHover' },
          { title: 'Orange Hover', value: 'orangeHover' },
          { title: 'Purple Hover', value: 'purpleHover' },
        ],
      },
      initialValue: 'purpleHover',
    }),
    defineField({
      name: 'textClass',
      title: 'Text Accent Color',
      type: 'string',
      options: {
        list: [
          { title: 'Cyan Text', value: 'cyanText' },
          { title: 'Orange Text', value: 'orangeText' },
          { title: 'Purple Text', value: 'purpleText' },
        ],
      },
      initialValue: 'purpleText',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'client',
      media: 'coverImage',
    },
  },
})
