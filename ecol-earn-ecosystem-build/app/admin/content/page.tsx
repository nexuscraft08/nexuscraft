import { AdminNav } from '@/components/admin/AdminNav';
import { Plus, Edit, Trash2 } from 'lucide-react';

const contentItems = [
  { id: 1, title: 'React Basics Course', type: 'Course', author: 'Alex Johnson', status: 'Published', updated: '2 days ago' },
  { id: 2, title: 'TypeScript Advanced', type: 'Course', author: 'Sarah Smith', status: 'Draft', updated: '1 day ago' },
  { id: 3, title: 'Web Security 101', type: 'Course', author: 'Mike Chen', status: 'Published', updated: '5 days ago' },
  { id: 4, title: 'Full-Stack Development', type: 'Course', author: 'Emma Wilson', status: 'Published', updated: '3 days ago' },
];

export default async function AdminContent() {
  return (
    <div className="flex h-screen bg-slate-950">
      <AdminNav />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Content Management</h1>
              <p className="text-slate-400">Create and manage courses, skills, and projects</p>
            </div>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Create Content
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-slate-700">
            {['All', 'Courses', 'Skills', 'Projects'].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                  tab === 'All'
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Table */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Type</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Author</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Updated</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {contentItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800 transition-colors">
                      <td className="px-6 py-4 text-white font-medium">{item.title}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex px-2 py-1 bg-slate-800 text-slate-300 rounded text-sm font-medium">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-300 text-sm">{item.author}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded text-sm font-medium ${
                            item.status === 'Published'
                              ? 'bg-green-900 text-green-300'
                              : 'bg-yellow-900 text-yellow-300'
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-sm">{item.updated}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex gap-2 justify-end">
                          <button className="p-1 text-blue-400 hover:text-blue-300 transition-colors">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button className="p-1 text-red-400 hover:text-red-300 transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Content Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Total Courses</p>
              <p className="text-3xl font-bold text-white">24</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Published</p>
              <p className="text-3xl font-bold text-green-400">18</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Drafts</p>
              <p className="text-3xl font-bold text-yellow-400">6</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Total Enrollments</p>
              <p className="text-3xl font-bold text-blue-400">342</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
