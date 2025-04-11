/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'

// Define the specific block types and their corresponding component types
type BlockComponentsType = {
  archive: typeof ArchiveBlock
  content: typeof ContentBlock
  cta: typeof CallToActionBlock
  formBlock: typeof FormBlock
  mediaBlock: typeof MediaBlock
  // Add any other block types you have here, for example:
  // creativeBlock?: typeof CreativeBlock;
}

// Create the blockComponents object mapping blockType to Component
const blockComponents: BlockComponentsType = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  // Make sure to include all your block mappings here
  // creativeBlock: CreativeBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout']
}> = ({ blocks }) => {
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (!hasBlocks) return null

  return (
    <Fragment>
      {blocks.map((block, index) => {
        const { blockType } = block

        if (blockType && blockType in blockComponents) {
          const Block = blockComponents[blockType as keyof BlockComponentsType]
          return (
            <div className="my-16" key={index}>
              <Block {...(block as any)} disableInnerContainer />
            </div>
          )
        }
        return null
      })}
    </Fragment>
  )
}
