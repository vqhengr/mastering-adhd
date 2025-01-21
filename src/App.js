import React, { useState, useEffect, Fragment } from 'react'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn/SignIn';
import UserProfile from './components/SignIn/UserProfile'; 
import supabase from './services/supabaseClient'; // Import supabase client 
const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if a user is already signed in when the app loads
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    fetchUser();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  return (
    <Fragment>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Fragment>
                  <UserProfile user={user} />  
                </Fragment>
              ) : (
                <SignIn onSignIn={setUser} />
              )
            }
          />
        </Routes>
      </Router> 
    </Fragment>
  );
};

export default App;
