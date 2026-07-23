import { AdminNav } from '@/components/admin/AdminNav';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

const activities = [
  { id: 1, user: 'Alex Johnson', action: 'Completed React Basics', type: 'course_completed', date: '2 hours ago', status: 'pending' },
  { id: 2, user: 'Sarah Smith', action: 'Posted Project Comment', type: 'comment', date: '4 hours ago', status: 'flagged' },
  { id: 3, user: 'Mike Chen', action: 'Published Full-Stack Project', type: 'project_published', date: '6 hours ago', status: 'approved' },
  { id: 4, user: 'Emma Wilson', action: 'Earned Web Security Badge', type: 'badge_earned', date: '8 hours ago', status: 'approved' },
  { id: 5, user: 'John Doe', action: 'Updated Profile Picture', type: 'profile_update', date: '10 hours ago', status: 'pending' },
];

export default async function AdminActivities() {
  return (
    <div className="flex h-screen bg-slate-950">
      <AdminNav />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Activity Moderation</h1>
            <p className="text-slate-400">Review and moderate user activities</p>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {['All', 'Pending Review', 'Flagged', 'Approved'].map((filter) => (
              <button
                key={filter}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === 'All'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Activity List */}
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className={`bg-slate-900 border rounded-lg p-6 hover:border-slate-600 transition-colors ${
                  activity.status === 'flagged'
                    ? 'border-red-700'
                    : activity.status === 'approved'
                    ? 'border-green-700'
                    : 'border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{activity.user}</h3>
                      <span className="inline-flex px-2 py-1 bg-slate-800 text-slate-300 rounded text-xs font-medium">
                        {activity.type}
                      </span>
                      <span
                        className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                          activity.status === 'pending'
                            ? 'bg-yellow-900 text-yellow-300'
                            : activity.status === 'flagged'
                            ? 'bg-red-900 text-red-300'
                            : 'bg-green-900 text-green-300'
                        }`}
                      >
                        {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-2">{activity.action}</p>
                    <p className="text-slate-500 text-sm">{activity.date}</p>
                  </div>

                  {activity.status === 'pending' && (
                    <div className="flex gap-2">
                      <button className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                        <XCircle className="h-5 w-5" />
                      </button>
                      <button className="p-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  )}

                  {activity.status === 'flagged' && (
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm font-medium transition-colors">
                        Review
                      </button>
                      <button className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded text-sm font-medium transition-colors">
                        Clear Flag
                      </button>
                    </div>
                  )}

                  {activity.status === 'approved' && (
                    <div className="flex gap-2">
                      <span className="text-green-400 text-sm font-medium">Approved</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Total Activities</p>
              <p className="text-3xl font-bold text-white">342</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Pending Review</p>
              <p className="text-3xl font-bold text-yellow-400">12</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Flagged</p>
              <p className="text-3xl font-bold text-red-400">3</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Approved</p>
              <p className="text-3xl font-bold text-green-400">327</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
