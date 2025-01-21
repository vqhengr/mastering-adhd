import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../services/supabaseClient';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  CircularProgress,
  Box,
} from '@mui/material';

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
    return (
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading user details...
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleSignOut} sx={{ mt: 2 }}>
          Sign Out
        </Button>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} display="flex" justifyContent="center">
              <Avatar
                src={userDetails.profile_picture_url || 'https://via.placeholder.com/150'}
                alt="Profile"
                sx={{ width: 120, height: 120 }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" gutterBottom>
                Welcome, {userDetails.full_name}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" align="center">
                <strong>Email:</strong> {user.email}
              </Typography>
              <Typography variant="body1" align="center">
                <strong>Role:</strong> {userDetails.user_role || 'User'}
              </Typography>
              <Typography variant="body1" align="center">
                <strong>Status:</strong> {userDetails.status || 'Active'}
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button variant="contained" color="primary" onClick={handleSignOut}>
                Sign Out
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UserProfile;
