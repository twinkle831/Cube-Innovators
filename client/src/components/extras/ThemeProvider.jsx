// import { useSelector } from 'react-redux';

// export default function ThemeProvider({ children }) {
//   const { theme } = useSelector((state) => state.theme);
//   return (
//     <div className={theme}>
//       <div className='bg-white text-gray-700 dark:text-gray-200 dark:bg-[rgb(16,23,42)] min-h-screen'>
//         {children}
//       </div>
//     </div>
//   );
// }


import { useSelector } from 'react-redux';
export default function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.theme);

  // Default to 'light' theme if theme is not set
  const currentTheme = theme || 'light';

  return (
    <div className={currentTheme}>
      <div
        className={`${currentTheme === 'dark' ? 'bg-[rgb(16,23,42)] text-gray-200' : 'bg-white text-gray-700'} min-h-screen`}
      >
        {children}
      </div>
    </div>
  );
}