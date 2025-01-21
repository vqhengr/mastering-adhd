import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabaseClient';

const FocusAppProfile = ({ user }) => {
  const [accountDetails, setAccountDetails] = useState(null);
  const navigate = useNavigate();

  // Function to fetch or create a user in the 'focus_app.users' table
  const fetchOrCreateAccount = async () => {
    try {
      // Fetch account details along with account type
      const { data: existingAccount, error: fetchError } = await supabase
        .from('focus_app.users') // Adjust schema here if needed
        .select(`
          *,
          account_type: account_type_id (account_type_name, description)
        `)
        .eq('user_id', user.id)
        .single();

      if (fetchError && fetchError.code === 'PGRST116') {
        // If account doesn't exist, create a new account
        const { data: newAccount, error: insertError } = await supabase
          .from('focus_app.users') // Adjust schema here if needed
          .insert({
            user_id: user.id,
            account_type_id: 1, // Default to 'basic'
            preferences: {}, // Default to empty preferences
          })
          .select(`
            *,
            account_type: account_type_id (account_type_name, description)
          `)
          .single();

        if (insertError) {
          console.error('Error creating account:', insertError);
          return;
        }

        setAccountDetails(newAccount);
      } else if (fetchError) {
        console.error('Error fetching account details:', fetchError);
      } else {
        // If account exists, set account details
        setAccountDetails(existingAccount);
      }
    } catch (error) {
      console.error('Error in fetchOrCreateAccount:', error);
    }
  };

  // Fetch or create the user account when the component mounts
  useEffect(() => {
    if (user) {
      fetchOrCreateAccount();
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

  if (!accountDetails) {
    return (
      <div>
        <p>Loading account details...</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Welcome to FocusApp!</h2>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Account Type:</strong> {accountDetails.account_type.account_type_name} -{' '}
        {accountDetails.account_type.description}
      </p>
      <p>
        <strong>Status:</strong> {accountDetails.status || 'Active'}
      </p>
      <p>
        <strong>Preferences:</strong>{' '}
        {accountDetails.preferences ? JSON.stringify(accountDetails.preferences) : 'None'}
      </p>

      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default FocusAppProfile;
