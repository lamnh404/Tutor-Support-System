import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { type Book } from './BookData'

interface BookDetailModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite: (bookId: string) => void;
}

export default function BookDetailModal({ book, isOpen, onClose, onToggleFavorite }: BookDetailModalProps) {
  if (!book) {
    return null
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-2xl font-bold leading-6 text-gray-900">
                  {book.title}
                </Dialog.Title>
                <p className="text-md text-gray-500 mt-1">bởi {book.author}</p>

                <div className="mt-4">
                  <p className="text-sm text-gray-700">{book.description}</p>
                </div>

                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="font-semibold text-blue-800">
                    Được sử dụng trong {book.coursesUsingBook.length} khóa học của bạn
                  </p>
                  <ul className="list-disc list-inside text-sm text-blue-700 mt-2">
                    {book.coursesUsingBook.map(course => <li key={course}>{course}</li>)}
                  </ul>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => onToggleFavorite(book.id)}
                    className="flex-1 justify-center cursor-pointer rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none"
                  >
                    {book.isFavorited ? 'Xóa khỏi mục Yêu thích' : 'Thêm vào mục Yêu thích'}
                  </button>
                  <button type="button" className="flex-1 justify-center cursor-pointer rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
                    Đọc trực tuyến
                  </button>
                  <button type="button" className="flex-1 justify-center cursor-pointer rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none">
                    Đăng kí mượn tại thư viện
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}