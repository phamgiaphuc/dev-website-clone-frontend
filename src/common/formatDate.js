const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const formatDate = (date) => {
  const formatDate = new Date(date);
  return `${monthNames[formatDate.getMonth()]} ${formatDate.getDate()}, ${formatDate.getFullYear()}`;
}