import React from 'react'
import { type Student } from '../StudentProfile/StudentData'
import { Link } from 'react-router-dom'
import {
  type DepartmentCode,
  DEPARTMENTS
} from '../TutorSearch/TutorDefinitions'

interface StudentCardProps {
  student: Student;
}

const getDepartmentColors = (departmentCode: DepartmentCode) => {
  switch (departmentCode) {
  case 'CS':
    return { tagBg: 'bg-blue-100', tagText: 'text-blue-800' }
  case 'CE':
    return { tagBg: 'bg-cyan-100', tagText: 'text-cyan-800' }
  case 'EE':
    return { tagBg: 'bg-amber-100', tagText: 'text-amber-800' }
  case 'ME':
    return { tagBg: 'bg-slate-100', tagText: 'text-slate-800' }
  case 'CH':
    return { tagBg: 'bg-teal-100', tagText: 'text-teal-800' }
  default:
    return { tagBg: 'bg-gray-100', tagText: 'text-gray-800' }
  }
}

const StudentCard: React.FC<StudentCardProps> = ({ student }) => {
  const colors = getDepartmentColors(student.department)

  const departmentName = DEPARTMENTS.find(d => d.code === student.department)?.name || student.department

  const getYearText = (year: number) => {
    switch (year) {
    case 1: return 'Năm 1'
    case 2: return 'Năm 2'
    case 3: return 'Năm 3'
    case 4: return 'Năm 4'
    default: return `Năm ${year}`
    }
  }

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.6) return 'text-yellow-600'
    if (gpa >= 3.2) return 'text-green-600'
    if (gpa >= 2.5) return 'text-blue-600'
    return 'text-orange-600'
  }

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 flex flex-col md:flex-row items-start gap-6 w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-200/50">
      <div className="flex-shrink-0 flex items-center justify-center w-full md:w-auto">
        <img
          src={student.avatarUrl}
          alt={`${student.lastName} ${student.firstName}`}
          className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gray-100 shadow-sm"
        />
      </div>

      <div className="flex-grow flex flex-col">
        <div className="flex items-center mb-2">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mr-2">
            {student.lastName} {student.firstName}
          </h2>
        </div>

        <div className="flex gap-2 mb-4">
          <span className={`inline-flex items-center px-3 py-1 text-xs font-semibold ${colors.tagBg} ${colors.tagText} rounded-full`}>
            {departmentName}
          </span>
          <span className="inline-flex items-center px-3 py-1 text-xs font-semibold bg-purple-100 text-purple-800 rounded-full">
            {getYearText(student.year)}
          </span>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <p className="font-medium">MSSV: {student.studentId}</p>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            <p className={`font-bold ${getGPAColor(student.gpa)}`}>
              GPA: {student.gpa.toFixed(2)}
            </p>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
            </svg>
            <p className="font-medium">
              Cần hỗ trợ: {student.needHelpWith.slice(0, 2).join(', ')}
              {student.needHelpWith.length > 2 && ` (+${student.needHelpWith.length - 2})`}
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-gray-500 text-xs mb-1">Mục tiêu học tập:</p>
          <p className="text-gray-600 text-sm line-clamp-2">
            {student.learningGoals[0]}
          </p>
        </div>
      </div>

      <div className="flex-shrink-0 flex flex-col justify-between w-full md:w-48 mt-4 md:mt-0">
        <div className="flex items-center justify-end md:justify-start gap-2 mb-4 w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
          <span className="font-bold text-lg text-gray-800">{student.completedCourses}</span>
          <span className="text-gray-500 text-sm">khóa học</span>
        </div>

        <div className="flex flex-col space-y-3 w-full">
          <Link
            to={`/student/${student.id}`}
            className="w-full text-center bg-white cursor-pointer text-gray-700 font-semibold py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors shadow-sm"
          >
            Xem hồ sơ
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StudentCard
