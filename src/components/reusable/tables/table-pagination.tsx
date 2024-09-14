'use client'

import { type Dispatch, type HTMLAttributes, type SetStateAction } from 'react'
import {
  Pagination,
  PaginationButton,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationNext,
  PaginationPrevious
} from '~/components/ui/pagination'
import { cn } from '~/lib/utils'
import { type Params } from '~/types/common/Params'
import { type Metadata } from '~/types/common/Response'

interface Props extends HTMLAttributes<HTMLDivElement> {
  metadata: Metadata
  params: Params
  setparams: Dispatch<SetStateAction<Params>>
  className?: string
}

export default function TablePagination({ metadata, params, setparams, className }: Props) {
  const { totalDocuments, currentPage, totalPage } = { ...metadata }

  const generatePageNumbers = () => {
    const pages = []
    if (totalPage <= 5) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i)
      }
    } else if (totalPage >= 10) {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 'ellipsis', totalPage - 2, totalPage - 1, totalPage)
      } else if (currentPage >= totalPage - 2) {
        pages.push(1, 2, 3, 'ellipsis', totalPage - 2, totalPage - 1, totalPage)
      } else {
        pages.push(
          1,
          2,
          'ellipsis',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          'ellipsis',
          totalPage - 1,
          totalPage
        )
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 'ellipsis', totalPage - 2, totalPage - 1, totalPage)
      } else if (currentPage >= totalPage - 2) {
        pages.push(1, 'ellipsis', totalPage - 3, totalPage - 2, totalPage - 1, totalPage)
      } else {
        pages.push(
          1,
          'ellipsis',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          'ellipsis',
          totalPage - 2,
          totalPage - 1,
          totalPage
        )
      }
    }
    return pages
  }

  const pageNumbers = generatePageNumbers()

  return totalDocuments ? (
    <div className={cn('mt-6 flex w-full flex-wrap items-center justify-between gap-2 bg-foreground p-3', className)}>
      <p className='text-sm font-medium'>
        Showing {Math.max((currentPage - 1) * params.limit + 1, 1)} -{' '}
        {Math.min(currentPage * params.limit, totalDocuments)} of {totalDocuments}
      </p>

      <Pagination className='w-auto'>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setparams({ ...params, page: currentPage - 1 })}
              disabled={currentPage === 1}
            />
          </PaginationItem>
          {pageNumbers.map((page, index) =>
            page === 'ellipsis' ? (
              <PaginationItem key={index}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationButton
                  isActive={currentPage === page}
                  onClick={() => setparams({ ...params, page: page as number })}
                >
                  {page}
                </PaginationButton>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              disabled={currentPage === totalPage}
              onClick={() => setparams({ ...params, page: currentPage + 1 })}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ) : null
}
