'use client'

import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Page } from '@/payload-types'

export const HighImpactHero: React.FC<NonNullable<Page['hero']>> = ({ highImpact }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('light')
  }, [setHeaderTheme])

  if (!highImpact) {
    return null
  }

  const { heading, backgroundImage, description, links } = highImpact

  return (
    <div className="relative py-16 md:py-24 lg:py-32 bg-white text-black">
      {backgroundImage && (
        <div className="absolute inset-0 overflow-hidden">
          <Media fill className="object-cover object-center" priority resource={backgroundImage} />
          <div className="absolute inset-0"></div>
        </div>
      )}
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          {heading && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{heading}</h1>
          )}
          {description && <RichText className="mb-8" data={description} enableGutter={false} />}
          {Array.isArray(links) && links.length > 0 && (
            <ul className="flex justify-center gap-4">
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink
                    className="px-6 py-3 rounded-md bg-black text-white hover:bg-gray-800 transition-colors"
                    {...link}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
