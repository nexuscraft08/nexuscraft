import { AdminNav } from '@/components/admin/AdminNav';
import { TrendingUp, Users, BookOpen, Trophy } from 'lucide-react';

export default async function AdminAnalytics() {
  return (
    <div className="flex h-screen bg-slate-950">
      <AdminNav />
      
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Platform Analytics</h1>
            <p className="text-slate-400">Monitor platform growth and user engagement</p>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'Total Users', value: 2847, trend: '+12.5%', icon: Users, color: 'bg-blue-500' },
              { label: 'Active Users', value: 1923, trend: '+8.2%', icon: TrendingUp, color: 'bg-green-500' },
              { label: 'Courses Completed', value: 5432, trend: '+24.1%', icon: BookOpen, color: 'bg-purple-500' },
              { label: 'Badges Earned', value: 12847, trend: '+18.9%', icon: Trophy, color: 'bg-orange-500' },
            ].map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="bg-slate-900 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-slate-400 text-sm font-medium">{metric.label}</span>
                    <div className={`${metric.color} p-2 rounded-lg`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-white mb-1">{metric.value.toLocaleString()}</p>
                  <p className="text-green-400 text-sm font-medium">{metric.trend}</p>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* User Growth Chart */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">User Growth (Last 6 Months)</h3>
              <div className="space-y-3">
                {[
                  { month: 'Jan', percentage: 35 },
                  { month: 'Feb', percentage: 45 },
                  { month: 'Mar', percentage: 52 },
                  { month: 'Apr', percentage: 68 },
                  { month: 'May', percentage: 75 },
                  { month: 'Jun', percentage: 87 },
                ].map((item) => (
                  <div key={item.month}>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300 text-sm">{item.month}</span>
                      <span className="text-slate-400 text-sm">{Math.round((2847 * item.percentage) / 100)}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Breakdown */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">User Engagement</h3>
              <div className="space-y-3">
                {[
                  { label: 'Actively Learning', value: 1923, color: 'bg-green-500' },
                  { label: 'Completed Courses', value: 854, color: 'bg-blue-500' },
                  { label: 'In Progress', value: 687, color: 'bg-yellow-500' },
                  { label: 'Inactive', value: 383, color: 'bg-slate-500' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between mb-1">
                      <span className="text-slate-300 text-sm">{item.label}</span>
                      <span className="text-slate-400 text-sm">{item.value}</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${item.color} h-full rounded-full`}
                        style={{ width: `${(item.value / 1923) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Average Session Duration</h3>
              <p className="text-4xl font-bold text-blue-400 mb-2">42 min</p>
              <p className="text-slate-400 text-sm">+5% from last month</p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Completion Rate</h3>
              <p className="text-4xl font-bold text-green-400 mb-2">78%</p>
              <p className="text-slate-400 text-sm">+3% from last month</p>
            </div>

            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">New Signups</h3>
              <p className="text-4xl font-bold text-purple-400 mb-2">342</p>
              <p className="text-slate-400 text-sm">This month</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
