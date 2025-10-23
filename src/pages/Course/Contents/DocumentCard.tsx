import React, { type ChangeEvent } from 'react'
import { gridContainerVariants, gridItemVariants, tabContentVariants } from '~/pages/Course/Config.ts'
import { motion } from 'framer-motion'
import { isTutor } from '~/pages/Course/utils.ts'
import { mockUserData } from '~/pages/Course/mockData.ts'
import { Download, Eye, FileText, MoreVertical, Search, Upload } from 'lucide-react'
import { type Document } from '~/pages/Course/TypeDefinition.ts'
import { getTypeIcon } from '~/pages/Course/utils.ts'
interface DocumentProps {
  setShowUploadModal: React.Dispatch<React.SetStateAction<boolean>>
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>,
  filterCategory: string,
  setFilterCategory: React.Dispatch<React.SetStateAction<string>>,
  filteredDocuments: Document[]
}

const DocumentCard: React.FC<DocumentProps> =({ setShowUploadModal, searchTerm, setSearchTerm,
  filterCategory, setFilterCategory, filteredDocuments }) => {
  return (
    <motion.div key="documents" {...tabContentVariants} className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <motion.h2
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Tài liệu & Bài giảng
        </motion.h2>
        {isTutor(mockUserData) && (
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(99, 102, 241, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(true)}
            className="px-6 py-3 cursor-pointer bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700 flex items-center space-x-2 shadow-lg font-semibold"
          >
            <Upload className="w-5 h-5" />
            <span>Đăng tài liệu</span>
          </motion.button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400" />
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 backdrop-blur-sm transition-all"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterCategory(e.target.value)}
          className="px-5 py-3 border-2 border-indigo-100 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 backdrop-blur-sm font-medium transition-all"
        >
          <option value="all">📚 Tất cả danh mục</option>
          <option value="Bài giảng">🎓 Bài giảng</option>
          <option value="Tài liệu">📖 Tài liệu</option>
        </select>
      </div>

      {/* Documents Grid */}
      {filteredDocuments.length > 0 ? (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={gridContainerVariants}
          initial="hidden"
          animate="show"
        >
          {filteredDocuments.map(doc => (
            <motion.div
              key={doc.id}
              variants={gridItemVariants}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.12)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border-2 border-indigo-50 p-6 cursor-pointer overflow-hidden relative group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100/50 to-purple-100/50 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform duration-500" />

              <div className="flex items-start justify-between mb-4">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  className="text-5xl"
                >
                  {getTypeIcon(doc.type)}
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  className="p-2 hover:bg-indigo-50 rounded-lg transition"
                >
                  <MoreVertical className="w-5 h-5 text-gray-400" />
                </motion.button>
              </div>

              <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 h-14 text-lg">{doc.title}</h3>

              {doc.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2 h-10">{doc.description}</p>
              )}

              <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="px-3 py-1.5 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full font-bold"
                >
                  {doc.category}
                </motion.span>
                <span className="text-gray-400 font-medium">{doc.uploadDate}</span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t-2 border-indigo-50">
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span className="flex items-center space-x-1.5">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="font-semibold">{doc.views}</span>
                  </span>
                  {doc.downloads !== undefined && (
                    <span className="flex items-center space-x-1.5">
                      <Download className="w-4 h-4 text-green-500" />
                      <span className="font-semibold">{doc.downloads}</span>
                    </span>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 shadow-md"
                >
                  <Download className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center justify-center p-16 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-dashed border-indigo-200"
        >
          <FileText className="w-20 h-20 text-indigo-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-700">Không tìm thấy tài liệu</h3>
          <p className="mt-2 text-sm text-gray-500">
            {searchTerm
              ? 'Hãy thử tìm kiếm với từ khoá khác.'
              : 'Chưa có tài liệu nào trong danh mục này.'}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default DocumentCard