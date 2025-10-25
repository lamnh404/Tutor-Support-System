import React, { type ChangeEvent } from 'react'
import { modalBackdropVariants, modalPanelVariants } from '~/pages/Course/Config.ts'
import { motion } from 'framer-motion'
import type { NewDocumentState } from '~/pages/Course/TypeDefinition.ts'

interface UploadDocumentProps {
  newDocument: NewDocumentState,
  handleNewDocChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void,
  handleNewDocSelectChange: (e: ChangeEvent<HTMLSelectElement>) => void,
  handleFileUpload: (e:React.ChangeEvent<HTMLInputElement>) => void,
  handleUploadDocument: () => void,
  setShowUploadModal: React.Dispatch<React.SetStateAction<boolean>>
}
const UploadDocument: React.FC<UploadDocumentProps>= (
  { newDocument, handleNewDocChange, handleNewDocSelectChange, handleFileUpload, handleUploadDocument, setShowUploadModal }) => {
  return (
    <motion.div
      variants={modalBackdropVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        variants={modalPanelVariants}
        className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-md p-6 border-2 border-indigo-100"
      >
        <h3 className="text-xl font-bold mb-5 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          🚀 Đăng tài liệu mới
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Tiêu đề"
            name="title"
            value={newDocument.title}
            onChange={handleNewDocChange}
            className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
          />
          <select
            name="type"
            value={newDocument.type}
            onChange={handleNewDocSelectChange}
            className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
          >
            <option value="pdf">📄 PDF</option>
            <option value="video">🎥 Video</option>
            <option value="document">📝 Tài liệu khác</option>
            <option value="link">🔗 Đường dẫn</option>
          </select>
          <select
            name="category"
            value={newDocument.category}
            onChange={handleNewDocSelectChange}
            className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
          >
            <option value="Tài liệu">📖 Tài liệu</option>
            <option value="Bài giảng">🎓 Bài giảng</option>
            <option value="Thông báo">📢 Thông báo</option>
          </select>

          {/* File Upload Section */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tải lên tệp tin
            </label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileUpload}
                accept={
                  newDocument.type === 'pdf' ? '.pdf' :
                    newDocument.type === 'video' ? 'video/*' :
                      newDocument.type === 'document' ? '.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx' :
                        '*'
                }
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center w-full border-2 border-dashed border-indigo-300 rounded-xl px-4 py-6 cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/50 transition-all bg-white/80"
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">📁</div>
                  <p className="text-sm text-gray-600">
                    {newDocument.file ? (
                      <span className="text-indigo-600 font-medium">
                      ✓ {newDocument.file.name}
                      </span>
                    ) : (
                      <>
                        <span className="text-indigo-600 font-medium">Chọn tệp</span> hoặc kéo thả vào đây
                      </>
                    )}
                  </p>
                  {newDocument.file && (
                    <p className="text-xs text-gray-500 mt-1">
                      {(newDocument.file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* URL input for link type */}
          {newDocument.type === 'link' && (
            <input
              type="url"
              placeholder="Đường dẫn URL"
              name="url"
              value={newDocument.url || ''}
              onChange={handleNewDocChange}
              className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
            />
          )}

          <textarea
            placeholder="Mô tả (tuỳ chọn)"
            name="description"
            value={newDocument.description}
            onChange={handleNewDocChange}
            rows={3}
            className="w-full border-2 border-indigo-100 rounded-xl px-4 py-3 focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 bg-white/80 outline-none transition-all"
          />
        </div>
        <div className="flex justify-end space-x-3 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUploadModal(false)}
            className="px-5 py-2 rounded-xl border-2 border-gray-300 hover:bg-gray-50 transition font-medium"
          >
            Hủy
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(99, 102, 241, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleUploadDocument}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 shadow-md font-semibold"
          >
            Đăng
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UploadDocument