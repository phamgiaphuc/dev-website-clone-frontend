const SubSkeletonCard = () => {
  return (
    <div className="flex flex-col p-4 bg-white rounded-md border border-gray-200 animate-pulse">
      <div className="h-10 flex items-center">
        <div className="bg-gray-400 w-10 h-10 rounded-full mr-2"></div>
        <div className="flex justify-between flex-col gap-3">
          <div className="w-28 h-2 rounded-md bg-gray-400"></div>
          <div className="w-36 h-2 rounded-md bg-gray-400"></div>
        </div>
      </div>
      <div className="ml-12 mt-4 flex flex-col gap-3">
        <div className="h-2 w-full rounded-md bg-gray-400"></div>
        <div className="h-2 w-full rounded-md bg-gray-400"></div>
      </div>
    </div>
  )
}

export default SubSkeletonCard