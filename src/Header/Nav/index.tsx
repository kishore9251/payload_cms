'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        const isActive = link.url === '/' ? true : false
        return (
          <CMSLink
            key={i}
            {...link}
            appearance="link"
            className={`
          transition-colors
          ${isActive ? 'text-red-500 underline' : 'text-gray-600'}
          hover:text-red-500 hover:underline
        `}
          />
        )
      })}
    </nav>
  )
}
