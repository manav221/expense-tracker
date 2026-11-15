import { supabase } from "../lib/supabase";

export async function signIn({ email, password }) {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: "An unexpected error occurred." };
    }
}

export async function signOut() {
    try {
        const { error } = await supabase.auth.signOut();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true }
    } catch (error) {
        return { success: false, error: "Unexpected Error Occurred." }
    }
}