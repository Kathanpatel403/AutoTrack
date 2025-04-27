// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import App from "./App";
// import {
//   Dashboard,
//   Team,
//   Invoices,
//   Contacts,
//   Form,
//   Bar,
//   Line,
//   Pie,
//   FAQ,
//   Geography,
//   Calendar,
//   Stream,
// } from "./scenes";
// import HomeScreen from "./scenes/HomeScreen.jsx";
// import RealTimeFeedMonitoring from "./scenes/RealTimeFeedMonitoring.jsx";
// import UserLandingPage from "./scenes/UserLandingPage.jsx";
// import IssueRegistration from "./scenes/IssueRegistration.jsx";
// import ApplicationTracking from "./scenes/ApplicationTracking.jsx";
// import NotFound from "./scenes/NotFound.jsx";
// import Login from "./scenes/LoginScreen.jsx";
// import ContactForm from "./components/web/ContactSupport.jsx"
// import Automation from "./components/web/automation.jsx";

// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//       <Route path="/login" element={<Login />} />
//         <Route path="/" element={<App />}>
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/admin-team" element={<Team />} />
//           <Route path="/admin-contacts" element={<Contacts />} />
//           <Route path="/admin-echallan-invoices" element={<Invoices />} />
//           <Route path="/admin-form" element={<Form />} />
//           <Route path="/admin-calendar" element={<Calendar />} />
//           <Route path="/analytics-bar" element={<Bar />} />
//           <Route path="/analytics-pie" element={<Pie />} />
//           <Route path="/analytics-stream" element={<Stream />} />
//           <Route path="/analytics-line" element={<Line />} />
//           <Route path="/analytics-faq" element={<FAQ />} />
//           <Route path="/analytics-geography" element={<Geography />} />
//         </Route>
//         <Route path="/admin-home" element={<HomeScreen />} />
//         <Route path="/feed" element={<RealTimeFeedMonitoring />} />
//         <Route path='/user' element={<UserLandingPage />} />
//         <Route path='/user/issue-registration' element={<IssueRegistration />} />
//         <Route path='/user/application-tracking' element={<ApplicationTracking />} />
//         <Route path="/echallan-verification" element={<Automation/>}  />
//         <Route path="/contact" element={<ContactForm/>}/>
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;

// // // src/App.js
// // import React from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated imports
// // import Login from '../src/scenes/LoginScreen';

// // // User pages
// // const AdminPage = () => (
// //   <div className="min-h-screen flex items-center justify-center bg-gray-200">
// //     <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
// //       <h1 className="text-3xl font-semibold text-blue-600">Welcome to the Admin page</h1>
// //     </div>
// //   </div>
// // );

// // const UserPage = () => (
// //   <div className="min-h-screen flex items-center justify-center bg-gray-200">
// //     <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
// //       <h1 className="text-3xl font-semibold text-green-600">Welcome to the User page</h1>
// //     </div>
// //   </div>
// // );

// // const GuestPage = () => (
// //   <div className="min-h-screen flex items-center justify-center bg-gray-200">
// //     <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
// //       <h1 className="text-3xl font-semibold text-yellow-600">Welcome to the Guest page</h1>
// //     </div>
// //   </div>
// // );

// // function AppRouter() {
// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/" element={<Login />} />  {/* Using element instead of component */}
// //         <Route path="/admin" element={<AdminPage />} />
// //         <Route path="/user" element={<UserPage />} />
// //         <Route path="/guest" element={<GuestPage />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default AppRouter;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import App from "./App";
// import { Dashboard, Team, Invoices, Contacts, Form, Calendar } from "./scenes";
// import HomeScreen from "./scenes/HomeScreen.jsx";
// import RealTimeFeedMonitoring from "./scenes/RealTimeFeedMonitoring.jsx";
// import UserLandingPage from "./scenes/UserLandingPage.jsx";
// import IssueRegistration from "./scenes/IssueRegistration.jsx";
// import ApplicationTracking from "./scenes/ApplicationTracking.jsx";
// import NotFound from "./scenes/NotFound.jsx";
// import Login from "./scenes/LoginScreen.jsx";
// import ContactForm from "./components/web/ContactSupport.jsx";
// import Automation from "./components/web/automation.jsx";
// import EchallanDetail from "./components/web/EchallanDetail.jsx";
// import EchallanQueryVerification from "./scenes/EchallanQueryVerification.jsx";
// import ForgotPassword from "./components/web/ForgotPassword.jsx";
// const getUserRole = () => localStorage.getItem("role");

// const ProtectedRoute = ({ element, allowedRoles }) => {
//   const role = getUserRole();
//   return allowedRoles.includes(role) ? element : <Navigate to="/login" />;
// };

// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         {/* Public Route */}
//         <Route path="/login" element={<Login />} />

//         {/* Admin Routes */}
//         <Route
//           path="/"
//           element={
//             <ProtectedRoute element={<App />} allowedRoles={["ADMIN","PO"]} />
//           }
//         >
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectedRoute
//                 element={<Dashboard />}
//                 allowedRoles={["ADMIN","PO" ]}
//               />
//             }
//           />
//           <Route
//             path="/admin-team"
//             element={
//               <ProtectedRoute element={<Team />} allowedRoles={["ADMIN"]} />
//             }
//           />
//           <Route
//             path="/admin-contacts"
//             element={
//               <ProtectedRoute element={<Contacts />} allowedRoles={["ADMIN"]} />
//             }
//           />
//           <Route
//             path="/echallan"
//             element={
//               <ProtectedRoute element={<Invoices />} allowedRoles={["ADMIN","PO"]} />
//             }
//           />
//           <Route
//             path="/echallan/:id"
//             element={
//               <ProtectedRoute
//                 element={<EchallanDetail />}
//                 allowedRoles={["ADMIN","PO"]}
//               />
//             }
//           />
//           <Route
//             path="/admin-form"
//             element={
//               <ProtectedRoute element={<Form />} allowedRoles={["ADMIN"]} />
//             }
//           />
//           <Route
//             path="/profile"
//             element={
//               <ProtectedRoute element={<Calendar />} allowedRoles={["ADMIN","PO"]} />
//             }
//           />
//           <Route
//             path="/admin-echallanverification"
//             element={
//               <ProtectedRoute
//                 element={<EchallanQueryVerification />}
//                 allowedRoles={["ADMIN","PO"]}
//               />
//             }
//           />
//         </Route>

//         {/* Other Routes */}
//         <Route
//           path="/admin-home"
//           element={
//             <ProtectedRoute element={<HomeScreen />} allowedRoles={["ADMIN","PO"]} />
//           }
//         />
//         <Route
//           path="/feed"
//           element={
//             <ProtectedRoute
//               element={<RealTimeFeedMonitoring />}
//               allowedRoles={["ADMIN","PO"]}
//             />
//           }
//         />
//         <Route
//           path="/user"
//           element={
//             <ProtectedRoute
//               element={<UserLandingPage />}
//               allowedRoles={["USER"]}
//             />
//           }
//         />
//         <Route
//           path="/user/issue-registration"
//           element={
//             <ProtectedRoute
//               element={<IssueRegistration />}
//               allowedRoles={["USER"]}
//             />
//           }
//         />
//         <Route
//           path="/user/application-tracking"
//           element={
//             <ProtectedRoute
//               element={<ApplicationTracking />}
//               allowedRoles={["USER"]}
//             />
//           }
//         />
//         <Route
//           path="/echallan-verification"
//           element={
//             <ProtectedRoute
//               element={<Automation />}
//               allowedRoles={["ADMIN","PO"]}
//             />
//           }
//         />
//         <Route path="/contact" element={<ContactForm />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />

//         {/* Catch-All Route */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;



import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import App from "./App";
import { Dashboard, Team, Invoices, Contacts, Form, Calendar } from "./scenes";
import HomeScreen from "./scenes/HomeScreen.jsx";
import RealTimeFeedMonitoring from "./scenes/RealTimeFeedMonitoring.jsx";
import UserLandingPage from "./scenes/UserLandingPage.jsx";
import IssueRegistration from "./scenes/IssueRegistration.jsx";
import ApplicationTracking from "./scenes/ApplicationTracking.jsx";
import NotFound from "./scenes/NotFound.jsx";
import Login from "./scenes/LoginScreen.jsx";
import ContactForm from "./components/web/ContactSupport.jsx";
import Automation from "./components/web/automation.jsx";
import EchallanDetail from "./components/web/EchallanDetail.jsx";
import EchallanQueryVerification from "./scenes/EchallanQueryVerification.jsx";
import ForgotPassword from "./components/web/ForgotPassword.jsx";
import ProfilePage from "./components/web/ProfilePage.jsx";
import Signup from "./components/web/Signup.jsx";
// Enhanced Unauthorized component with animated popup
const Unauthorized = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Animation effect when component mounts
  useEffect(() => {
    // Small delay to allow for mount animation
    setTimeout(() => {
      setShowPopup(true);
    }, 100);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    // Wait for close animation to complete before navigating back
    setTimeout(() => {
      navigate(-1); // Go back to previous page in history
    }, 300);
  };

  return (
    <div>
      <div className="background-content" style={{
        filter: 'blur(5px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 998
      }}>
        {/* This div covers the entire screen and applies blur */}
      </div>
      
      <div className={`popup-overlay ${showPopup ? 'show' : ''}`} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
        opacity: showPopup ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}>
        <div className={`popup-content ${showPopup ? 'show' : ''}`} style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '10px',
          width: '450px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)',
          transform: showPopup ? 'translateY(0)' : 'translateY(-50px)',
          opacity: showPopup ? 1 : 0,
          transition: 'transform 0.3s ease-out, opacity 0.3s ease-in-out',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Red top accent bar */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #ff3366, #ff5733)',
          }}></div>
          
          {/* Warning Icon */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '20px' 
          }}>
            <div style={{
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              backgroundColor: '#fff4f4',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '3px solid #ffcdd2'
            }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V14M12 16V18M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                  stroke="#ff3366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          
          <h2 style={{ 
            color: '#d32f2f', 
            marginTop: 0, 
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: '600'
          }}>Access Denied</h2>
          
          <p style={{ 
            textAlign: 'center',
            color: '#555',
            fontSize: '16px',
            margin: '15px 0'
          }}>
            You don't have permission to access this page.
          </p>
          
          <p style={{ 
            textAlign: 'center',
            color: '#777',
            fontSize: '14px'
          }}>
            Please contact your administrator if you believe this is an error.
          </p>
          
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px'
          }}>
            <button 
              onClick={handleClose}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff3366',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: '500',
                boxShadow: '0 2px 5px rgba(255, 51, 102, 0.3)',
                transition: 'all 0.2s ease',
                width: '150px'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e91e63'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ff3366'}
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getUserRole = () => localStorage.getItem("role");

// Modified ProtectedRoute to use the enhanced Unauthorized component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const role = getUserRole();
  
  if (allowedRoles.includes(role)) {
    return element;
  } else {
    // Return Unauthorized component
    return <Unauthorized />;
  }
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute element={<App />} allowedRoles={["ADMIN","PO"]} />
          }
        >
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={<Dashboard />}
                allowedRoles={["ADMIN","PO" ]}
              />
            }
          />
          <Route
            path="/admin-team"
            element={
              <ProtectedRoute element={<Team />} allowedRoles={["ADMIN"]} />
            }
          />
          <Route
            path="/admin-contacts"
            element={
              <ProtectedRoute element={<Contacts />} allowedRoles={["ADMIN"]} />
            }
          />
          <Route
            path="/echallan"
            element={
              <ProtectedRoute element={<Invoices />} allowedRoles={["ADMIN","PO"]} />
            }
          />
          <Route
            path="/echallan/:id"
            element={
              <ProtectedRoute
                element={<EchallanDetail />}
                allowedRoles={["ADMIN","PO"]}
              />
            }
          />
          <Route
            path="/admin-form"
            element={
              <ProtectedRoute element={<Form />} allowedRoles={["ADMIN"]} />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute element={<Calendar />} allowedRoles={["ADMIN","PO"]} />
            }
          />
          <Route
            path="/admin-echallanverification"
            element={
              <ProtectedRoute
                element={<EchallanQueryVerification />}
                allowedRoles={["ADMIN","PO"]}
              />
            }
          />
        </Route>

        {/* Other Routes */}
        <Route
          path="/admin-home"
          element={
            <ProtectedRoute element={<HomeScreen />} allowedRoles={["ADMIN","PO"]} />
          }
        />
        <Route
          path="/feed"
          element={
            <ProtectedRoute
              element={<RealTimeFeedMonitoring />}
              allowedRoles={["ADMIN","PO"]}
            />
          }
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute
              element={<UserLandingPage />}
              allowedRoles={["USER"]}
            />
          }
        />
        <Route
          path="/user/issue-registration"
          element={
            <ProtectedRoute
              element={<IssueRegistration />}
              allowedRoles={["USER"]}
            />
          }
        />
        <Route
          path="/user/application-tracking"
          element={
            <ProtectedRoute
              element={<ApplicationTracking />}
              allowedRoles={["USER"]}
            />
          }
        />
        <Route
          path="/echallan-verification"
          element={
            <ProtectedRoute
              element={<Automation />}
              allowedRoles={["ADMIN","PO"]}
            />
          }
        />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
            path="/user-profile"
            element={
             <ProfilePage /> // Assuming you have a ProfilePage component
            }
          />
           <Route
            path="/signup"
            element={
             <Signup /> // Assuming you have a ProfilePage component
            }
          />
        {/* Catch-All Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;