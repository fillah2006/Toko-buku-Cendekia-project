import { createContext, useContext, useEffect, useMemo, useState } from "react";
import supabase from "../services/supabase";
import { getCurrentSession, signInWithSupabase, signOutWithSupabase, signUpWithSupabase } from "../services/authAPI";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { session: initialSession, user: initialUser } = await getCurrentSession();

        if (mounted) {
          setSession(initialSession);
          setUser(initialUser);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
    });

    return () => {
      mounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    const { data, error } = await signInWithSupabase({ email, password });

    if (error) {
      throw error;
    }

    setSession(data.session);
    setUser(data.user);
    return data;
  };

  const signUp = async ({ email, password, nama, role = "admin" }) => {
    const data = await signUpWithSupabase({ email, password, nama, role });
    setUser(data.user ?? null);
    return data;
  };

  const signOut = async () => {
    const { error } = await signOutWithSupabase();

    if (error) {
      throw error;
    }

    setSession(null);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, session, loading, signIn, signUp, signOut }),
    [loading, session, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
