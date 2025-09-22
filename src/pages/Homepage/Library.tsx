import React from 'react'

const Library: React.FC = () => {
  return (
    <section className="bg-blue-600 text-white py-20 text-center">
      <div className="container mx-auto p-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">Connected with HCMUT Library.</h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Students and tutors can access and share documents, textbooks, and learning resources relevant to tutoring sessions.
        </p>
        <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors">
          Thư viện
        </button>
      </div>
    </section>
  )
}

export default Library