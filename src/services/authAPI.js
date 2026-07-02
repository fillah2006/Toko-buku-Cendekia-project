import supabase from "./supabase";

export async function signInWithSupabase({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  console.log("LOGIN DATA:", data);
  console.log("LOGIN ERROR:", error);

  if (error) {
    throw error;
  }

  return { data, error: null };
}

export async function signUpWithSupabase({
  email,
  password,
  nama,
  role = "admin",
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  if (data?.user) {
    const { error: insertError } = await supabase
      .from("users")
      .insert([
        {
          id: data.user.id,
          nama: nama,
          email: email,
          role: role,
        },
      ]);

    console.log("INSERT USER:", insertError);
  }

  return data;
}

export async function signOutWithSupabase() {
  return supabase.auth.signOut();
}

export async function getCurrentSession() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return {
    session: data.session,
    user: data.session?.user ?? null,
  };
}