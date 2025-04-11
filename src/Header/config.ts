import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'account',
      type: 'text',
      label: 'Account',
      defaultValue: 'Account',
    },
    {
      name: 'phonenumber',
      type: 'number',
      label: 'phone number',
      defaultValue: '+6578383900',
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
