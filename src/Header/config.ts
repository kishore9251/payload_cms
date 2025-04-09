import { linkGroup } from '@/fields/linkGroup'
import type { GlobalConfig } from 'payload'

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
        linkGroup({
          appearances: false,
        }),
      ],
    },
    {
      name: 'account',
      type: 'text',
      defaultValue: 'Account',
    },
    {
      name: 'phonenumber',
      type: 'number',
      defaultValue: '+23467899980',
      label: 'Phone Number',
    },
  ],
}
