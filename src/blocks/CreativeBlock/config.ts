import { linkGroup } from '@/fields/linkGroup'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

const CreativeBlock: Block = {
  slug: 'creativeBlock',
  interfaceName: 'CreativeBlock',
  imageURL: '/assets/Logo/lady.jpeg',
  imageAltText: 'Home Page Lady Image',
  labels: {
    singular: 'Creative Block',
    plural: 'Creative Blocks',
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
}

export default CreativeBlock
