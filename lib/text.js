import Markdown from 'react-markdown'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

export function formatTitle(title) {
  return (
    <Markdown components={{p: 'span'}} source={title} />
  )
}

export function richText(content) {
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ENTRY]: (node) => {
        const { id } = node.data.target.sys.contentType.sys;
        if (id === "media") {
          return <Reference {...node.data.target.fields} />
        }
        return <div />
      },
      [INLINES.EMBEDDED_ENTRY]: (node) => {
        const { id } = node.data.target.sys.contentType.sys;
        if (id === "media") {
          return <Reference {...node.data.target.fields} i={figures.findIndex(f => f.content.some(k => k.data?.target?.sys?.id === node.data.target.sys.id))} anchor />
        }
        return <div />
      }
    }
  };

  return documentToReactComponents(content, options)
}
