import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const storedToken = Cookies.get('token');
  console.log('Token in useEffect:', storedToken);
  // setToken(storedToken);

  return storedToken ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
// other
// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import axios from 'axios';
// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const [token, setToken] = useState(null);
//   const handleCookie = async () => {
//     const t = await axios
//       .get(
//         'http://localhost:5000/api/protected'
//         // , { withCredentials: true }
//       )
//       .then((response) => {
//         console.log('value ', response.data);
//       })
//       .catch((error) => {
//         console.error('Error  22:', error);
//       });
//   };
//   useEffect(() => {
//     // let storedToken = Cookies.get('token');
//     // console.log('Token from js-cookie:', storedToken);

//     // if (!storedToken) {
//     //   const allCookies = document.cookie;
//     //   storedToken = allCookies
//     //     .split('; ')
//     //     .find((row) => row.startsWith('token='))
//     //     ?.split('=')[1];
//     //   console.log('Token from document.cookie:', storedToken);
//     // }

//     // setToken(storedToken);
//     try {
//       handleCookie();
//     } catch (e) {
//       console.error(e);
//     }
//   }, []);

//   return token ? <Element {...rest} /> : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
