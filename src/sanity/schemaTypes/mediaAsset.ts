import { defineField, defineType } from 'sanity'
import { projectId, dataset } from '../env'
import React from 'react'
import { useFormValue } from 'sanity'

function AssetUrlComponent() {
  const file = useFormValue(['file']) as { asset?: { _ref?: string } } | undefined
  const ref = file?.asset?._ref

  if (!ref) {
    return React.createElement(
      'div',
      {
        style: {
          padding: '12px',
          background: '#fff9e6',
          border: '1px solid #ffeeba',
          borderRadius: '4px',
          color: '#856404',
          fontSize: '13px',
        },
      },
      'Please upload a file or image above first, then wait a few seconds for the CDN link to be generated.'
    )
  }

  // Ref format: file-assetId-extension or image-assetId-dimensions-extension
  // Let's decode it:
  // e.g. file-8a6c8e3...-mp4 -> https://cdn.sanity.io/files/<projectId>/<dataset>/8a6c8e3....mp4
  const parts = ref.split('-')
  const type = parts[0] // "file" or "image"
  const id = parts[1]

  let cdnUrl = ''
  if (type === 'image') {
    // parts: ["image", "id", "widthxheight", "extension"]
    const ext = parts[3]
    cdnUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${parts[2]}.${ext}`
  } else {
    // parts: ["file", "id", "extension"]
    const ext = parts[2]
    cdnUrl = `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${ext}`
  }

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault()
    navigator.clipboard.writeText(cdnUrl)
    alert('Link copied to clipboard!')
  }

  return React.createElement(
    'div',
    {
      style: {
        marginTop: '10px',
        padding: '15px',
        border: '1px solid #ddd',
        borderRadius: '6px',
        background: '#f9f9f9',
      },
    },
    React.createElement(
      'div',
      {
        style: {
          marginBottom: '8px',
          fontWeight: 'bold',
          fontSize: '13px',
          color: '#333',
        },
      },
      'Generated CDN Link:'
    ),
    React.createElement(
      'div',
      {
        style: {
          wordBreak: 'break-all',
          fontFamily: 'monospace',
          fontSize: '12px',
          background: '#fff',
          padding: '10px',
          border: '1px solid #eee',
          borderRadius: '4px',
          marginBottom: '10px',
          color: '#555',
        },
      },
      cdnUrl
    ),
    React.createElement(
      'button',
      {
        onClick: handleCopy,
        style: {
          background: '#0070f3',
          color: '#fff',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '12px',
        },
      },
      'Copy Link'
    )
  )
}

export const mediaAsset = defineType({
  name: 'mediaAsset',
  title: 'Media Asset (Get Direct Link)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Asset Title/Description',
      type: 'string',
      description: 'e.g. Hero Background Video, Logo SVG',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'file',
      title: 'Upload File (Video/Image/PDF)',
      type: 'file',
      options: {
        accept: 'video/*,image/*,application/pdf'
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cdnUrl',
      title: 'Published CDN Link',
      type: 'string',
      components: {
        input: AssetUrlComponent
      },
      readOnly: true,
    })
  ]
})
