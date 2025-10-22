import { type Book } from './BookData'

interface BookCardProps {
  book: Book;
  onViewDetails: () => void;
}

const HeartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
const BookmarkIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>

export default function BookCard({ book, onViewDetails }: BookCardProps) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:shadow-lg">
      <div className="relative w-full" style={{ paddingTop: '133.33%' }}>
        <img
          src={book.coverImage}
          alt={book.title}
          className="absolute top-0 left-0 h-full w-full object-cover"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          {book.isFavorited && <div className="rounded-full bg-white/80 p-1.5 backdrop-blur-sm"><HeartIcon /></div>}
          {book.isInUse && <div className="rounded-full bg-white/80 p-1.5 backdrop-blur-sm"><BookmarkIcon /></div>}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex-1">
          <h3 className="text-md font-bold text-gray-900 line-clamp-2" style={{ minHeight: '2.5rem' }}>
            {book.title}
          </h3>
          <p className="text-sm text-gray-500 mt-1 truncate">{book.author}</p>
        </div>

        <button
          onClick={onViewDetails}
          className="mt-4 w-full rounded-md bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 cursor-pointer"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  )
}