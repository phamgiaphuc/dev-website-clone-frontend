const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const formatDate = (date) => {
  const formatDate = new Date(date);
  return `${monthNames[formatDate.getMonth()]} ${formatDate.getDate()}, ${formatDate.getFullYear()}`;
}

export const compareDate = (date) => {
  const blogDate = new Date(date);
  const newDate = new Date();
  return blogDate.getFullYear() === newDate.getFullYear() && blogDate.getMonth() === newDate.getMonth() && blogDate.getDate() === newDate.getDate();
}