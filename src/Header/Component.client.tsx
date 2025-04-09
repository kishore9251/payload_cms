'use client'

import type { Header } from '@/payload-types'
import { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo'
import { Media } from '@/payload-types'
import Image from 'next/image'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient = ({ data }: HeaderClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  // Sort navigation links by order property if available
  const navigationLinks =
    data?.navigationLinks?.sort((a, b) => (a.order || 0) - (b.order || 0)) || []

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Get the logo and phone number from CMS data
  const logo = data?.logo as Media
  const phoneNumber = data?.phoneNumber || ''

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              {logo?.url ? (
                <Image
                  src={logo.url}
                  alt={logo.alt || 'Company Logo'}
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                />
              ) : (
                <Logo />
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((navLink, index) => (
              <Link
                key={`${navLink.label}-${index}`}
                href={navLink.link}
                className="text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium"
              >
                {navLink.label}
              </Link>
            ))}
          </nav>

          {/* Account and Phone */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/account" className="text-gray-700 hover:text-red-600 text-sm font-medium">
              Account
            </Link>
            {phoneNumber && (
              <a
                href={`tel:${phoneNumber}`}
                className="text-red-600 font-medium text-sm flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {phoneNumber}
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-md bg-white absolute w-full z-10">
          {navigationLinks.map((navLink, index) => (
            <Link
              key={`mobile-${navLink.label}-${index}`}
              href={navLink.link}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
              onClick={toggleMenu}
            >
              {navLink.label}
            </Link>
          ))}
          <Link
            href="/account"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50"
            onClick={toggleMenu}
          >
            Account
          </Link>
          {phoneNumber && (
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center px-3 py-2 rounded-md text-base font-medium text-red-600"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {phoneNumber}
            </a>
          )}
        </div>
      </div>
    </header>
  )
}
