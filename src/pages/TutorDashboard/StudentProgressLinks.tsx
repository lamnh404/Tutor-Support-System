// src/pages/TutorDashboard/StudentProgressLinks.tsx
import React from 'react';
import { type CurrentStudent } from './TutorDashboardData';
import { Link } from 'react-router-dom';
import { EditOutlined, ArrowRightOutlined } from '@ant-design/icons';

interface StudentProgressLinksProps {
  students: CurrentStudent[];
  limit?: number; // Số lượng hiển thị
}

const StudentProgressLinks: React.FC<StudentProgressLinksProps> = ({ students, limit = 4 }) => {
  const limitedStudents = students.slice(0, limit);

   if (!students || students.length === 0) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
          Học sinh của tôi
        </h2>
        <p className="text-gray-500 italic">Bạn chưa có học sinh nào.</p>
      </div>
    );
  }

  return (
     <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Học sinh của tôi
        </h2>
        {students.length > limit && (
          <a href="/my-connections?view=myMentees" className="text-sm font-medium text-purple-600 hover:underline flex items-center gap-1">
            Xem tất cả <ArrowRightOutlined />
          </a>
        )}
      </div>
       <ul className="space-y-3">
         {limitedStudents.map((student) => (
           <li key={student.id} className="border border-purple-100 rounded-xl p-3 flex items-center justify-between gap-3 bg-gradient-to-r from-purple-50/50 to-indigo-50/50">
             <div className="flex items-center gap-3 min-w-0">
               <img src={student.studentAvatar} alt={student.studentName} className="w-10 h-10 rounded-full object-cover"/>
               <div className="min-w-0">
                 <p className="font-medium text-gray-800 truncate">{student.studentName}</p>
                 <p className="text-xs text-purple-700 font-semibold truncate">{student.subject}</p>
               </div>
             </div>
             <Link to={`/student-progress/${student.id}`}>
               <button
                 className="flex-shrink-0 text-purple-600 hover:text-purple-800 p-2 rounded-full hover:bg-purple-100 transition-colors focus:outline-none focus:ring-1 focus:ring-purple-400"
                 aria-label={`Cập nhật tiến độ cho ${student.studentName}`}
                >
                  <EditOutlined />
               </button>
             </Link>
           </li>
         ))}
       </ul>
     </div>
  );
};

export default StudentProgressLinks;