/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { cn } from '~/lib/utils'

interface Props {
  className?: string
  codeClassName?: string
  children: string
}
export default function MarkdownRenderer({ className, codeClassName, children, ...rest }: Props) {
  return (
    <Markdown
      className={cn('prose text-primary', className)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // @ts-ignore
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')

          return !inline && match ? (
            // @ts-ignore
            <SyntaxHighlighter style={dracula} PreTag='div' language={match[1]} {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={cn('before:hidden after:hidden', codeClassName)} {...props}>
              {children}
            </code>
          )
        }
      }}
      {...rest}
    >
      {children}
    </Markdown>
  )
}
