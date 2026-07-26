import { defineField, defineType } from 'sanity'

export const portfolioItem = defineType({
  name: 'portfolioItem',
  title: 'Portfolio Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category Name',
      type: 'string',
      description: 'e.g. Acrylic Signs & Logos, Custom Badges, etc.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'filterGroup',
      title: 'Filter Category Group',
      type: 'reference',
      to: [{ type: 'portfolioCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'filterLabel',
      title: 'Filter Badge Label',
      type: 'string',
      description: 'Text shown on tag badge (Legacy/Optional - automatically fetched from category group if referencing one)',
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
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'sizeClass',
      title: 'Grid Layout Size',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Wide (2 columns)', value: 'bentoWide' },
          { title: 'Tall (2 rows)', value: 'bentoTall' },
          { title: 'Large (2x2)', value: 'bentoLarge' },
        ],
      },
      initialValue: 'standard',
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
      initialValue: 'tagCyan',
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
      initialValue: 'cyanHover',
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
      initialValue: 'cyanText',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
