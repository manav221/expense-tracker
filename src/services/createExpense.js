import { supabase } from "../lib/supabase";

const categories = ["food", "travel", "rent", "shopping", "health", "other"];

export async function createExpense({ amount, category, description, paymentMode }) {
    const numericAmount = Number(amount);
    if (isNaN(numericAmount) || amount <= 0) {
        return { success: false, error: "Invalid amount value." };
    }

    if (!category || !categories.includes(category)) {
        return { success: false, error: "Please select correct category." };
    }

    if (!description || description.trim() === "") {
        return { success: false, error: "Description is required" };
    }

    try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError || !user) {
            return { success: false, error: "Log In first." };
        }
        const { data, error } = await supabase.from("expenses").insert([
            {
                amount: numericAmount,
                category,
                description: description.trim(),
                user_id: user.id,
                payment_mode: paymentMode
            }

        ]).select();

        if (error) {
            return { success: false, error: error.message };
        }

        return { success: true, data };
    } catch (error) {
        console.log(error);
        return { success: false, error: "Unexpected error occurred." };
    }
}