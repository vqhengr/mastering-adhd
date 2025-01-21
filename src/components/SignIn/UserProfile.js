import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabaseClient';

const UserProfile = ({ user }) => {
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  // Function to fetch or create a user in the 'focus_app.users' table
  const fetchOrCreateUser = async () => {
    try {
      // Fetch user details from the focus_app.users table
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code === 'PGRST116') {
        // If user doesn't exist, create a new user
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({
            user_id: user.id,
            full_name: user.user_metadata.full_name || user.email,
            profile_picture_url: user.user_metadata.avatar_url, 
          })
          .single();

        if (insertError) {
          console.error('Error creating user:', insertError);
          return;
        }

        setUserDetails(newUser);
      } else if (fetchError) {
        console.error('Error fetching user details:', fetchError);
      } else {
        // If user exists, set user details
        setUserDetails(existingUser);
      }
    } catch (error) {
      console.error('Error in fetchOrCreateUser:', error);
    }
  };

  // Fetch or create the user when the component mounts
  useEffect(() => {
    if (user) {
      fetchOrCreateUser();
    }
  }, [user]);

  // Sign out function
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      navigate('/'); // Redirect to the home/sign-in page
    }
  };

  if (!userDetails) {
    return <div><p>Loading user details...</p>  <button onClick={handleSignOut}>Sign Out</button></div>;
  }

  return (
    <div>
      <h2>Welcome, {userDetails.full_name}</h2>
      <img
        src={userDetails.profile_picture_url || 'https://via.placeholder.com/150'}
        alt="Profile"
      />
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Role:</strong> {userDetails.user_role}
      </p>
      <p>
        <strong>Status:</strong> {userDetails.status || 'Active'}
      </p>

      <button onClick={handleSignOut}>Sign Out</button>   
    </div>
  );
};

export default UserProfile;
