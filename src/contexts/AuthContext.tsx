import React, {createContext, useReducer, useContext, ReactNode} from 'react';

// Define the shape of the state
interface AuthState {
  isAuthenticated: boolean;
  userInfo: {name: string} | null;
  token: string | null;
}

// Define action types
type AuthAction =
  | {type: 'LOGIN'; payload: {userInfo: {name: string}; token: string}}
  | {type: 'LOGOUT'};

// Initial state
const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: null,
  token: null,
};

// Create context
const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

// Reducer function
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        userInfo: action.payload.userInfo,
        token: action.payload.token,
      };
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};

// Provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
