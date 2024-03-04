const MainSkeletonCard = () => {
  return (
    <div className="bg-white rounded-md border flex flex-col overflow-hidden animate-pulse">
      {/* Image */}
      <div className="h-[250px] bg-gray-400"></div>
      <div className="flex flex-col p-4">
        <div className="h-10 flex items-center">
          <div className="bg-gray-400 w-10 h-10 rounded-full mr-2"></div>
          <div className="flex justify-between flex-col gap-3">
            <div className="w-28 h-2 rounded-md bg-gray-400"></div>
            <div className="w-36 h-2 rounded-md bg-gray-400"></div>
          </div>
        </div>
        <div className="ml-12 flex flex-col gap-3 mt-4">
          <div className="h-2 w-full rounded-md bg-gray-400"></div>
          <div className="h-2 w-full rounded-md bg-gray-400"></div>
        </div>
      </div>
    </div>
  )
}

export default MainSkeletonCard