
export const getCurrentUserFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('hydrosenseUser') ?? '{}');
}