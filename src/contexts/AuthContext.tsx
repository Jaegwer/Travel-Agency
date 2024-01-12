// AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

interface AuthContextProps {
  user: firebase.User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, gender:string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);

  const signIn = async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signUp = async (email: string, password: string, gender: string) => {
    // Create user with email and password
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

    // Access the UID of the created user
    const uid = userCredential.user?.uid;

    // Add user data to Firestore
    if (uid) {
      await firebase.firestore().collection('users').doc(uid).set({
        email: email,
        gender: gender,
        // Add other user properties as needed
      });
    }
  };

  const signOut = async () => {
    await firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((authUser) => {
      setUser(authUser);
	  if (authUser) {
        localStorage.setItem('user', JSON.stringify(authUser));
      }

    });

    // Enable session persistence
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
      .then(() => {
        // Additional setup or checks can be performed here
      })
      .catch((error) => {
        console.error('Error setting persistence', error);
      });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
