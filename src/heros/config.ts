import type { Field } from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'highImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
      ],
      required: true,
    },
    {
      type: 'group',
      name: 'highImpact',
      admin: {
        condition: (_, { type } = {}) => type === 'highImpact',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ defaultFeatures }) => {
              return [
                ...defaultFeatures,
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
              ]
            },
          }),
        },
        linkGroup({
          appearances: ['default', 'outline'],
          overrides: {
            maxRows: 2,
          },
        }),
      ],
    },
  ],
  label: false,
}
