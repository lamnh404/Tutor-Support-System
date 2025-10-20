import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import TutorCard from './TutorCard'
import { initialTutors, type Tutor, sortTutors, type SortKey } from './TutorData'
import {
  DEPARTMENTS,
  EXPERTISES,
  DEPARTMENT_EXPERTISE_MAP,
  type DepartmentCode,
  type ExpertiseCode
} from './TutorDefinitions'
// import tutorSearchAPI, { type tutorSearchParams } from '~/apis/TutorSearchAPI'


// await tutorSearchAPI()
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

const TutorSearchPage: React.FC = () => {
  // useEffect(() => {
  //   const fetchTutors = async () => {
  //     try {
  //       const result = await tutorSearchAPI({
  //         department: 'CS',
  //         expertise: 'MOBILE_DEVELOPMENT',
  //         sort: 'rating-descending',
  //         page: 1,
  //         pageSize: 10
  //       })
  //       console.log(result) // ✅ see actual result
  //     } catch (err) {
  //       console.error('Error fetching tutors:', err)
  //     }
  //   }
  //
  //   fetchTutors()
  // }, [])


  const PAGE_SIZE = 10
  const [searchParams, setSearchParams] = useSearchParams()

  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentCode | 'All'>(
    () => (searchParams.get('department') as DepartmentCode) || 'All'
  )
  const [selectedExpertise, setSelectedExpertise] = useState<ExpertiseCode | 'All'>(
    () => (searchParams.get('expertise') as ExpertiseCode) || 'All'
  )
  const [sortOption, setSortOption] = useState(
    () => searchParams.get('sort') || 'rating_avg-desc'
  )

  const [filteredTutors, setFilteredTutors] = useState<Tutor[]>([])
  const [displayedTutors, setDisplayedTutors] = useState<Tutor[]>([])
  const [hasMore, setHasMore] = useState(true)

  // SỬA 1: Khai báo kiểu dữ liệu đúng cho state
  const [availableExpertise, setAvailableExpertise] = useState<{ code: ExpertiseCode; name: string }[]>(EXPERTISES)

  // SỬA 2: Lấy danh sách khoa từ mảng DEPARTMENTS đã import
  const uniqueDepartments = ['All', ...DEPARTMENTS.map(d => d.code)]

  useEffect(() => {
    if (selectedDepartment === 'All') {
      setAvailableExpertise(EXPERTISES)
    } else {
      const relevantExpertiseCodes = DEPARTMENT_EXPERTISE_MAP[selectedDepartment]
      const relevantExpertises = EXPERTISES.filter(exp => relevantExpertiseCodes.includes(exp.code))
      setAvailableExpertise(relevantExpertises)
    }

    if (
      selectedExpertise !== 'All' &&
      selectedDepartment !== 'All' &&
      !DEPARTMENT_EXPERTISE_MAP[selectedDepartment].includes(selectedExpertise as ExpertiseCode) // Thêm ép kiểu an toàn
    ) {
      setSelectedExpertise('All')
    }
  }, [selectedDepartment, selectedExpertise])

  useEffect(() => {
    const departmentFromUrl: DepartmentCode | 'All' = (searchParams.get('department') as DepartmentCode) || 'All'
    const expertiseFromUrl: ExpertiseCode | 'All' = (searchParams.get('expertise') as ExpertiseCode) || 'All'
    const sortFromUrl = searchParams.get('sort') || 'rating_avg-desc'

    let updatedTutors = [...initialTutors]

    if (departmentFromUrl !== 'All') {
      updatedTutors = updatedTutors.filter(tutor => tutor.department === departmentFromUrl)
    }
    if (expertiseFromUrl !== 'All') {
      updatedTutors = updatedTutors.filter(tutor => tutor.expertise.includes(expertiseFromUrl as ExpertiseCode)) // Thêm ép kiểu an toàn
    }

    const [key, order] = sortFromUrl.split('-') as [SortKey, 'asc', 'desc']
    updatedTutors = sortTutors(updatedTutors, key, order)

    setFilteredTutors(updatedTutors)
    setDisplayedTutors(updatedTutors.slice(0, PAGE_SIZE))
    setHasMore(updatedTutors.length > PAGE_SIZE)
  }, [searchParams])

  const handleSearch = () => {
    const params: { [key: string]: string } = {}

    if (selectedDepartment !== 'All') params.department = selectedDepartment
    if (selectedExpertise !== 'All') params.expertise = selectedExpertise
    if (sortOption !== 'rating_avg-desc') params.sort = sortOption

    setSearchParams(params, { replace: true })
  }

  const fetchMoreData = () => {
    if (displayedTutors.length >= filteredTutors.length) {
      setHasMore(false)
      return
    }
    const nextTutors = filteredTutors.slice(displayedTutors.length, displayedTutors.length + PAGE_SIZE)
    setDisplayedTutors(prevTutors => [...prevTutors, ...nextTutors])
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="sticky top-[71px] z-10 bg-gray-50 py-4 mb-8">
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
                id="expertise"
                label="Lọc theo chuyên môn"
                value={selectedExpertise}
                onChange={(e) => setSelectedExpertise(e.target.value as ExpertiseCode | 'All')}
                options={['All', ...availableExpertise.map(e => e.code)]}
                getOptionLabel={(code) =>
                  code === 'All' ? 'Tất cả chuyên môn' : EXPERTISES.find(e => e.code === code)?.name || ''
                }
              />
              <CustomDropdown
                id="sort"
                label="Sắp xếp theo"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                options={['rating_avg-desc', 'rating_avg-asc', 'firstName-asc', 'firstName-desc']}
                getOptionLabel={(opt) => {
                  switch (opt) {
                  case 'rating_avg-desc': return 'Đánh giá (Cao-Thấp)'
                  case 'rating_avg-asc': return 'Đánh giá (Thấp-Cao)'
                  case 'firstName-asc': return 'Tên (A-Z)'
                  case 'firstName-desc': return 'Tên (Z-A)'
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

        <InfiniteScroll
          dataLength={displayedTutors.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<Spinner />}
          endMessage={
            filteredTutors.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">Bạn đã xem hết tất cả kết quả.</p>
              </div>
            )
          }
          className="space-y-6"
        >
          {displayedTutors.map((tutor) => (
            <TutorCard key={tutor.id} tutor={tutor} />
          ))}
        </InfiniteScroll>

        {filteredTutors.length === 0 && !hasMore && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700">Không tìm thấy kết quả</h3>
            <p className="text-gray-500 mt-2">Vui lòng thử lại với bộ lọc khác.</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default TutorSearchPage