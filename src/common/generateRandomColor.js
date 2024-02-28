export const generateRandomColor = () => {
  const colors = ['#f291cb','#e2ccff','#fff3aa','#ffccd7','#9b7bfc','#cfffaa','#ffccba','#ffb7c1','#f76f73','#ffe57f','#a5f99d','#b1f77b'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const randomColors = {
  '#f291cb': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#f291cb] hover:text-black cursor-pointer',
  '#e2ccff': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#e2ccff] hover:text-black cursor-pointer',
  '#fff3aa': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#fff3aa] hover:text-black cursor-pointer',
  '#ffccd7': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#ffccd7] hover:text-black cursor-pointer',
  '#9b7bfc': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#9b7bfc] hover:text-black cursor-pointer',
  '#cfffaa': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#cfffaa] hover:text-black cursor-pointer',
  '#ffccba': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#ffccba] hover:text-black cursor-pointer',
  '#ffb7c1': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#ffb7c1] hover:text-black cursor-pointer',
  '#f76f73': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#f76f73] hover:text-black cursor-pointer',
  '#ffe57f': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#ffe57f] hover:text-black cursor-pointer',
  '#a5f99d': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#a5f99d] hover:text-black cursor-pointer',
  '#b1f77b': 'px-1 py-0.5 font-light flex items-center text-gray-600 rounded-md hover:ring-gray-400 hover:ring-1 hover:bg-[#b1f77b] hover:text-black cursor-pointer',
};
