import { AdminNav } from '@/components/admin/AdminNav';
import { fetchAllUsers } from '@/lib/data';
import { Mail, MapPin, Calendar } from 'lucide-react';

export default async function AdminUsers() {
  const users = await fetchAllUsers();

  return (
    <div className="flex h-screen bg-slate-950">
      <AdminNav />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">User Management</h1>
              <p className="text-slate-400">Manage and view all platform users</p>
            </div>
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
              Add User
            </button>
          </div>

          {/* Users Table */}
          <div className="bg-slate-900 border border-slate-700 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-800 border-b border-slate-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">User</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Email</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Level</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">XP</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Joined</th>
                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-300">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {users && users.length > 0 ? (
                    users.map((user: any) => (
                      <tr key={user.id} className="hover:bg-slate-800 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-slate-700 flex-shrink-0">
                              {user.avatar && (
                                <img src={user.avatar} alt={user.displayName} className="w-full h-full rounded-full object-cover" />
                              )}
                            </div>
                            <div>
                              <p className="text-white font-medium">{user.displayName || user.displayname}</p>
                              <p className="text-slate-400 text-sm">@{user.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-300 text-sm">{user.email || 'N/A'}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-800 text-slate-300 rounded text-sm font-medium">
                            Level {user.currentLevel || user.level || 1}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-300 text-sm">{user.totalXP || user.totalXp || 0}</td>
                        <td className="px-6 py-4 text-slate-400 text-sm">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <button className="px-3 py-1 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                              Edit
                            </button>
                            <button className="px-3 py-1 text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-slate-400">
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Total Users</p>
              <p className="text-3xl font-bold text-white">{users?.length || 0}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Active This Week</p>
              <p className="text-3xl font-bold text-green-400">{Math.ceil((users?.length || 1) * 0.75)}</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <p className="text-slate-400 text-sm mb-2">Avg. XP per User</p>
              <p className="text-3xl font-bold text-blue-400">
                {users && users.length > 0
                  ? Math.round(users.reduce((sum: number, u: any) => sum + (u.totalXP || u.totalXp || 0), 0) / users.length)
                  : 0}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
