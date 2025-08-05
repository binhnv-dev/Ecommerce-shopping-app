import React, {useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {User} from '../Account/reducer';
import actions from '../../actions';

interface ProfileProps {
  user: User;
  authenticated: boolean;
  fetchProfile: () => void;
  signOut: () => void;
}

const Profile: React.FC<ProfileProps> = ({
  user,
  authenticated,
  fetchProfile,
  signOut,
}) => {
  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    navigation.navigate(screen as never);
  };

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <View style={styles.container}>
      {!authenticated ? (
        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => handleNavigation('Login')}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.linkItem}
            onPress={() => handleNavigation('Register')}>
            <Text style={styles.linkText}>Register</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.card}>
            <Text style={styles.userName}>
              {user.firstName} {user.firstName}
            </Text>
            <Text style={styles.userEmail}>
              {user.email} {user?.phoneNumber && `- ${user.phoneNumber}`}
            </Text>
          </View>
          <View style={styles.linksContainer}>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => handleNavigation('UpdatePassword')}>
              <Text style={styles.linkText}>Update Password</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => handleNavigation('WishList')}>
              <Text style={styles.linkText}>WishList</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => handleNavigation('Address')}>
              <Text style={styles.linkText}>Address</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.linkItem}
              onPress={() => handleNavigation('Orders')}>
              <Text style={styles.linkText}>Orders</Text>
            </TouchableOpacity>
          </View>
          <View style={{...styles.linksContainer, justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={{...styles.linkItem, display: 'flex', justifyContent: 'center'}}
              onPress={() => signOut()}>
              <Text style={{fontSize: 16,color: "red"}}>Logout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.account.user,
    authenticated: state.authentication.authenticated,
    fetchProfile: state.account.fetchProfile,
    signOut: state.login.signOut,
  };
};

export default connect(mapStateToProps, actions)(Profile);

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 16,
    color: '#888',
  },
  linksContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  linkItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  linkText: {
    fontSize: 16,
    color: '#007bff',
  },
});
