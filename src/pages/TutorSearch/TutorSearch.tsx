// TutorSearch.tsx
import React, { useState, useEffect } from 'react'
import TutorCard from './TutorCard'
import { initialTutors, type Tutor, sortTutors, getUniqueFaculties, type SortKey } from './TutorData'

const TutorSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedFaculty, setSelectedFaculty] = useState('All')
  const [sortOption, setSortOption] = useState('rating-desc')
  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([])

  const uniqueFaculties = ['All', ...getUniqueFaculties(initialTutors)]

  useEffect(() => {
    let updatedTutors = [...initialTutors]

    if (searchTerm) {
      updatedTutors = updatedTutors.filter(
        (tutor) =>
          tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tutor.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedFaculty !== 'All') {
      updatedTutors = updatedTutors.filter(
        (tutor) => tutor.faculty === selectedFaculty
      )
    }

    const [key, order] = sortOption.split('-') as [SortKey, 'asc' | 'desc']
    updatedTutors = sortTutors(updatedTutors, key, order)

    setFilteredTutors(updatedTutors)
  }, [searchTerm, selectedFaculty, sortOption])

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* === PHẦN TÌM KIẾM VÀ BỘ LỌC ĐÃ ĐƯỢC THIẾT KẾ LẠI === */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4">

            {/* Search Input with Icon */}
            <div className="relative flex-grow">
              <label htmlFor="search" className="sr-only">Tìm kiếm</label>
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                placeholder="Tìm kiếm theo tên, mô tả..."
                className="block w-full rounded-lg border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filters Group */}
            <div className="flex flex-col sm:flex-row gap-4 md:flex-shrink-0">
              {/* Faculty Dropdown */}
              <div className="flex-grow sm:w-48">
                <label htmlFor="faculty" className="sr-only">Khoa</label>
                <select
                  id="faculty"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  aria-label="Lọc theo khoa"
                >
                  {uniqueFaculties.map((faculty) => (
                    <option key={faculty} value={faculty}>{faculty === 'All' ? 'Tất cả các khoa' : faculty}</option>
                  ))}
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex-grow sm:w-56">
                <label htmlFor="sort" className="sr-only">Sắp xếp theo</label>
                <select
                  id="sort"
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2.5"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  aria-label="Sắp xếp kết quả"
                >
                  <option value="rating-desc">Đánh giá (Cao đến thấp)</option>
                  <option value="rating-asc">Đánh giá (Thấp đến cao)</option>
                  <option value="name-asc">Tên (A-Z)</option>
                  <option value="name-desc">Tên (Z-A)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* === KẾT THÚC PHẦN THIẾT KẾ LẠI === */}

        {/* Results Info */}
        <div className="mb-6 px-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                Tìm thấy {filteredTutors.length} gia sư
          </h2>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <h3 className="text-2xl font-semibold text-gray-700">Không tìm thấy kết quả</h3>
              <p className="text-gray-500 mt-2">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default TutorSearchPage