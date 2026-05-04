/* Minimal Lexical (Payload) renderer — handles common nodes for blog content. */
import React from 'react'

type LexicalNode = {
  type: string
  tag?: string
  format?: number | string
  text?: string
  children?: LexicalNode[]
  url?: string
  listType?: 'bullet' | 'number'
  fields?: Record<string, unknown>
}

type LexicalRoot = {
  root?: { children?: LexicalNode[] }
}

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 1 << 1
const FORMAT_UNDERLINE = 1 << 3
const FORMAT_CODE = 1 << 4

function renderText(node: LexicalNode, key: number): React.ReactNode {
  if (typeof node.text !== 'string') return null
  let el: React.ReactNode = node.text
  const fmt = typeof node.format === 'number' ? node.format : 0
  if (fmt & FORMAT_BOLD) el = <strong key={`b${key}`}>{el}</strong>
  if (fmt & FORMAT_ITALIC) el = <em key={`i${key}`}>{el}</em>
  if (fmt & FORMAT_UNDERLINE) el = <u key={`u${key}`}>{el}</u>
  if (fmt & FORMAT_CODE) el = <code key={`c${key}`}>{el}</code>
  return <React.Fragment key={key}>{el}</React.Fragment>
}

function renderChildren(children?: LexicalNode[]): React.ReactNode[] {
  return (children || []).map((child, i) => renderNode(child, i))
}

function renderNode(node: LexicalNode, key: number): React.ReactNode {
  switch (node.type) {
    case 'text':
      return renderText(node, key)
    case 'paragraph':
      return <p key={key}>{renderChildren(node.children)}</p>
    case 'heading': {
      const Tag = (node.tag as keyof JSX.IntrinsicElements) || 'h2'
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }
    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={key}>{renderChildren(node.children)}</Tag>
    }
    case 'listitem':
      return <li key={key}>{renderChildren(node.children)}</li>
    case 'quote':
      return <blockquote key={key}>{renderChildren(node.children)}</blockquote>
    case 'link':
      return (
        <a
          key={key}
          href={node.url || (node.fields as { url?: string })?.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderChildren(node.children)}
        </a>
      )
    case 'linebreak':
      return <br key={key} />
    default:
      return <React.Fragment key={key}>{renderChildren(node.children)}</React.Fragment>
  }
}

export function RichText({ data }: { data: LexicalRoot | null | undefined }) {
  const children = data?.root?.children || []
  return (
    <div className="prose prose-slate max-w-none prose-headings:tracking-tight prose-a:text-brand-700">
      {children.map((c, i) => renderNode(c, i))}
    </div>
  )
}
