export const baseApiURL = () => {
  return import.meta.env.VITE_APILINK || 'http://localhost:5000/api';
};