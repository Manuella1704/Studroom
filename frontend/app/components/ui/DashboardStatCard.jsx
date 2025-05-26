export default function DashboardStatCard({ title, value, icon, color = "blue" }) {
  return (
    <div className={`bg-white shadow rounded-lg p-6 border-l-4 border-${color}-600`}>
      <div className="flex items-center space-x-4">
        <div className={`text-${color}-600 text-3xl`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        </div>
      </div>
    </div>
  );
}