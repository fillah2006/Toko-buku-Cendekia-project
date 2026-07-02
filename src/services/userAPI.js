import supabase from "./supabase";

const TABLE = "users";

export async function getUsers(search = "") {
  let query = supabase.from(TABLE).select("*").order("created_at", { ascending: false });

  if (search) {
    query = query.or(`nama.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data || [];
}

export async function createUser(userData) {
  const payload = {
    id: userData.id || crypto.randomUUID(),
    nama: userData.nama || "User",
    email: userData.email,
    role: userData.role || "user",
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from(TABLE).insert(payload).select().single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateUser(id, userData) {
  const { data, error } = await supabase
    .from(TABLE)
    .update(userData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteUser(id) {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);

  if (error) {
    throw error;
  }
}
