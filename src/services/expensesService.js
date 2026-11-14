import { supabase } from "../lib/supabase";

export async function fetchExpenses() {
    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError) {
            return { success: false, error: authError.message }
        }
        const { data, error } = await supabase.from("expenses")
            .select("*")
            .eq("user_id", user.id);

        if (error) {
            return { success: false, error: error.message }
        }

        return { success: true, data };
    } catch (error) {
        return { success: false, error: "Unexpected Error Occurred." };
    }
}

export async function updateExpense() { }
export async function deleteExpense() { }