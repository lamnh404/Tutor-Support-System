import { useState, useMemo, useEffect } from 'react'
import { initialBooks, type Book } from './BookData'
import BookCard from './BookCard'
import BookDetailModal from './BookDetailModal'

const CheckIcon = () => <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
const SquareIcon = () => <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" /></svg>

export default function LibraryPage() {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)

  const [searchTerm, setSearchTerm] = useState('')
  const [showFavorited, setShowFavorited] = useState(false)
  const [showInUse, setShowInUse] = useState(false)

  const handleToggleFavorite = (bookId: string) => {
    setBooks(currentBooks =>
      currentBooks.map(book =>
        book.id === bookId ? { ...book, isFavorited: !book.isFavorited } : book
      )
    )
    // Cập nhật cả sách đang được chọn trong modal (nếu có)
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook(prev => prev ? { ...prev, isFavorited: !prev.isFavorited } : null)
    }
  }

  const filteredAndSortedBooks = useMemo(() => {
    const filtered = books.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFavorited = !showFavorited || book.isFavorited
      const matchesInUse = !showInUse || book.isInUse

      return matchesSearch && matchesFavorited && matchesInUse
    })

    filtered.sort((a, b) => {
      const scoreA = (a.isFavorited ? 2 : 0) + (a.isInUse ? 1 : 0)
      const scoreB = (b.isFavorited ? 2 : 0) + (b.isInUse ? 1 : 0)

      if (scoreA !== scoreB) {
        return scoreB - scoreA
      }
      return a.title.localeCompare(b.title)
    })

    return filtered
  }, [searchTerm, showFavorited, showInUse, books])

  useEffect(() => {
    document.body.style.overflowY = 'scroll'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [])

  return (
    <>
      <div className="flex flex-col lg:flex-row">
        <div className="flex-grow p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {filteredAndSortedBooks.map(book => (
              <BookCard key={book.id} book={book} onViewDetails={() => setSelectedBook(book)} />
            ))}
          </div>
        </div>

        <aside className="w-full lg:w-80 flex-shrink-0 lg:border-l lg:border-gray-200 bg-gradient-to-bl from-blue-50 to to-blue-200">
          <div className="sticky top-[71px] h-[calc(100vh-71px)] overflow-y-auto p-6">
            <h3 className="text-lg font-semibold text-gray-900">Tìm kiếm & Lọc</h3>

            <div className="mt-4">
              <label htmlFor="search" className="sr-only">Tìm kiếm</label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Tìm theo tên sách, tác giả..."
                className="block w-full rounded-md border-gray-300 bg-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base p-3"
              />
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setShowFavorited(prev => !prev)}
                aria-pressed={showFavorited}
                className={`w-full flex items-center cursor-pointer justify-center gap-2 rounded-md ring-1 px-3 py-2 text-sm font-semibold transition-colors ${showFavorited ? 'bg-gradient-to-bl from-pink-300 to-pink-500 text-white shadow' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Yêu thích {showFavorited ? <CheckIcon/> : <SquareIcon/>}
              </button>

              <button
                type="button"
                onClick={() => setShowInUse(prev => !prev)}
                aria-pressed={showInUse}
                className={`w-full flex items-center cursor-pointer justify-center gap-2 rounded-md ring-1 px-3 py-2 text-sm font-semibold transition-colors ${showInUse ? 'bg-gradient-to-bl from-indigo-400 to-indigo-600 text-white shadow' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                Đang sử dụng {showInUse ? <CheckIcon/> : <SquareIcon/>}
              </button>
            </div>
          </div>
        </aside>
      </div>

      <BookDetailModal
        isOpen={selectedBook !== null}
        onClose={() => setSelectedBook(null)}
        book={selectedBook}
        onToggleFavorite={handleToggleFavorite}
      />
    </>
  )
}