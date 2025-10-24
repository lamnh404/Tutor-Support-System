import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import StudentCard from './StudentCard'
import { initialStudents, type Student } from '../StudentProfile/StudentData'
import {
  DEPARTMENTS,
  type DepartmentCode
} from '../TutorSearch/TutorDefinitions'

const Spinner = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
  </div>
)

interface CustomDropdownProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  getOptionLabel?: (option: string) => string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ id, label, value, onChange, options, getOptionLabel }) => (
  <div className="relative">
    <label htmlFor={id} className="sr-only">{label}</label>
    <select
      id={id}
      className="block w-full appearance-none rounded-lg border-gray-300 bg-white py-2.5 pl-3 pr-10 text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
      value={value}
      onChange={onChange}
    >
      {options.map(option => (
        <option key={option} value={option}>
          {getOptionLabel ? getOptionLabel(option) : option}
        </option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
)

const StudentSearchPage: React.FC = () => {
  const PAGE_SIZE = 10
  const [searchParams, setSearchParams] = useSearchParams()

  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentCode | 'All'>(
    () => (searchParams.get('department') as DepartmentCode) || 'All'
  )
  const [selectedYear, setSelectedYear] = useState<string>(
    () => searchParams.get('year') || 'All'
  )

  const [currentPage, setCurrentPage] = useState(1)
  const [loadingMore, setLoadingMore] = useState(false)
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [sortOption, setSortOption] = useState(
    () => searchParams.get('sort') || 'gpa-descending'
  )

  const [displayedStudents, setDisplayedStudents] = useState<Student[]>([])
  const [hasMore, setHasMore] = useState(true)

  const uniqueDepartments = ['All', ...DEPARTMENTS.map(d => d.code)]
  const years = ['All', '1', '2', '3', '4']

  // Effect for initial data fetch and refetch on search param change
  useEffect(() => {
    const departmentFromUrl: DepartmentCode | 'All' =
      (searchParams.get('department') as DepartmentCode | null) ?? 'All'
    const yearFromUrl = searchParams.get('year') || 'All'
    const sortFromUrl = searchParams.get('sort') || 'gpa-descending'

    const fetchData = async () => {
      setIsInitialLoading(true)
      setLoadingMore(false)
      setCurrentPage(1)
      setDisplayedStudents([])
      setHasMore(true)

      // Filter students
      let filtered = [...initialStudents]
      
      if (departmentFromUrl !== 'All') {
        filtered = filtered.filter(s => s.department === departmentFromUrl)
      }
      
      if (yearFromUrl !== 'All') {
        filtered = filtered.filter(s => s.year === parseInt(yearFromUrl))
      }

      // Sort students
      filtered.sort((a, b) => {
        switch (sortFromUrl) {
          case 'gpa-descending':
            return b.gpa - a.gpa
          case 'gpa-ascending':
            return a.gpa - b.gpa
          case 'firstName-ascending':
            return a.firstName.localeCompare(b.firstName)
          case 'firstName-descending':
            return b.firstName.localeCompare(a.firstName)
          default:
            return 0
        }
      })

      const data = filtered.slice(0, PAGE_SIZE)
      setDisplayedStudents(data)
      setHasMore(filtered.length > PAGE_SIZE)
      setCurrentPage(2)
      setIsInitialLoading(false)
    }

    fetchData()
  }, [searchParams])

  const handleSearch = () => {
    const params: { [key: string]: string } = {}

    if (selectedDepartment !== 'All') params.department = selectedDepartment
    if (selectedYear !== 'All') params.year = selectedYear
    if (sortOption !== 'gpa-descending') params.sort = sortOption
    setSearchParams(params, { replace: true })
  }

  const fetchMoreData = async () => {
    if (loadingMore || !hasMore) {
      return
    }
    setLoadingMore(true)

    // Filter students
    let filtered = [...initialStudents]
    
    if (selectedDepartment !== 'All') {
      filtered = filtered.filter(s => s.department === selectedDepartment)
    }
    
    if (selectedYear !== 'All') {
      filtered = filtered.filter(s => s.year === parseInt(selectedYear))
    }

    // Sort students
    filtered.sort((a, b) => {
      switch (sortOption) {
        case 'gpa-descending':
          return b.gpa - a.gpa
        case 'gpa-ascending':
          return a.gpa - b.gpa
        case 'firstName-ascending':
          return a.firstName.localeCompare(b.firstName)
        case 'firstName-descending':
          return b.firstName.localeCompare(a.firstName)
        default:
          return 0
      }
    })

    const newData = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    setDisplayedStudents(prevStudents => {
      const existingIds = new Set(prevStudents.map(student => student.id))
      const uniqueNewData = newData ? newData.filter(student => !existingIds.has(student.id)) : []
      return [...prevStudents, ...uniqueNewData]
    })
    setCurrentPage(prevPage => prevPage + 1)
    setHasMore(filtered.length > currentPage * PAGE_SIZE)
    setLoadingMore(false)
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="top-[71px] z-10 bg-gray-50 py-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <CustomDropdown
                id="department"
                label="Lọc theo khoa"
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value as DepartmentCode | 'All')}
                options={uniqueDepartments}
                getOptionLabel={(code) =>
                  code === 'All' ? 'Tất cả các khoa' : DEPARTMENTS.find(d => d.code === code)?.name || ''
                }
              />
              <CustomDropdown
                id="year"
                label="Lọc theo năm học"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                options={years}
                getOptionLabel={(year) =>
                  year === 'All' ? 'Tất cả năm học' : `Năm ${year}`
                }
              />
              <CustomDropdown
                id="sort"
                label="Sắp xếp theo"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                options={['gpa-descending', 'gpa-ascending', 'firstName-ascending', 'firstName-descending']}
                getOptionLabel={(opt) => {
                  switch (opt) {
                  case 'gpa-descending': return 'GPA (Cao-Thấp)'
                  case 'gpa-ascending': return 'GPA (Thấp-Cao)'
                  case 'firstName-ascending': return 'Tên (A-Z)'
                  case 'firstName-descending': return 'Tên (Z-A)'
                  default: return ''
                  }
                }}
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleSearch}
                className="w-full bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {isInitialLoading ? (
          <Spinner />
        ) : displayedStudents.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-500 mt-2">
              Vui lòng thử lại với bộ lọc khác.
            </p>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={displayedStudents.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Spinner />}
            endMessage={
              <div className="text-center py-8 text-gray-500">
                Bạn đã xem hết tất cả kết quả.
              </div>
            }
            className="space-y-6"
          >
            {displayedStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </InfiniteScroll>
        )}

      </main>
    </div>
  )
}

export default StudentSearchPage
