const DashboardCards = () => {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-6 rounded-md border border-gray-200 flex flex-col bg-white">
        <span className="text-3xl font-semibold">1</span>
        <span className="text-gray-600">Total number of posts</span>
      </div>
      <div className="p-6 rounded-md border border-gray-200 flex flex-col bg-white">
        <span className="text-3xl font-semibold">1</span>
        <span className="text-gray-600">Total number of reactions</span>
      </div>
      <div className="p-6 rounded-md border border-gray-200 flex flex-col bg-white">
        <span className="text-3xl font-semibold">1</span>
        <span className="text-gray-600">Total number of comments</span>
      </div>
    </div>
  )
}

export default DashboardCards