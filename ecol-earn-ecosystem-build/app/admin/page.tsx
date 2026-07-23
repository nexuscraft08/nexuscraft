import { AdminNav } from '@/components/admin/AdminNav';
import { fetchAllUsers } from '@/lib/data';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

export default async function AdminDashboard() {
  const users = await fetchAllUsers();
  const totalUsers = users.length || 1;

  const stats = [
    {
      label: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      label: 'Active Courses',
      value: 24,
      icon: BookOpen,
      color: 'bg-purple-500',
    },
    {
      label: 'Total Badges',
      value: 156,
      icon: Award,
      color: 'bg-green-500',
    },
    {
      label: 'Growth Rate',
      value: '+12%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="flex h-screen bg-slate-950">
      <AdminNav />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400 mb-8">Welcome to the ECOLearn administration panel</p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-slate-400 text-sm font-medium">{stat.label}</h3>
                    <div className={`${stat.color} p-2 rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Recent Activities</h2>
              <div className="space-y-3">
                {[
                  { user: 'Alex Johnson', action: 'Completed React Course', time: '2 hours ago' },
                  { user: 'Sarah Smith', action: 'Earned Certificate', time: '4 hours ago' },
                  { user: 'Mike Chen', action: 'Published Project', time: '6 hours ago' },
                  { user: 'Emma Wilson', action: 'Joined Platform', time: 'Yesterday' },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-slate-700 last:border-0">
                    <div>
                      <p className="text-white font-medium text-sm">{item.user}</p>
                      <p className="text-slate-400 text-xs">{item.action}</p>
                    </div>
                    <span className="text-slate-500 text-xs">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Quick Links</h2>
              <div className="space-y-2">
                <a href="/admin/users" className="block p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors">
                  Manage Users →
                </a>
                <a href="/admin/content" className="block p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors">
                  Edit Content →
                </a>
                <a href="/admin/activities" className="block p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors">
                  Moderate Activities →
                </a>
                <a href="/admin/analytics" className="block p-3 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors">
                  View Analytics →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
