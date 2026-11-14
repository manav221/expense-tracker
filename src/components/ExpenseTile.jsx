import React from 'react';
import { CATEGORY_ICON } from "../constant/app.constant";
import { Pencil, Trash2 } from 'lucide-react';
// Note: Trash2 often looks a bit cleaner than the default Trash icon

const ExpenseTile = ({ category, desc, amount, paymentMode, onEdit, onDelete }) => {
    const Icon = CATEGORY_ICON[category] || CATEGORY_ICON.other;
    
    return (
        // The Card Container: Gives it that modern mobile app feel
        <div className="flex items-center justify-between p-4 mb-3 border-b border-neutral-100 transition-transform duration-100">

            {/* LEFT: Icon & Text */}
            <div className="flex items-center gap-4 overflow-hidden">

                {/* Icon Circle */}
                <div className="flex items-center justify-center shrink-0 w-12 h-12 text-xl bg-gray-50 rounded-full">
                    <Icon size={20} />
                </div>

                {/* Description & Category */}
                <div className="flex flex-col overflow-hidden">
                    <h3 className="text-base font-semibold text-gray-900 truncate">
                        {desc}
                    </h3>
                    <p className="text-xs font-medium text-gray-500 capitalize">
                        {category}
                        <span className='uppercase px-1 bg-neutral-200 rounded-sm ml-1'>{paymentMode || ""}</span>
                    </p>
                </div>
            </div>

            {/* RIGHT: Amount & Actions */}
            <div className="flex flex-col items-end shrink-0 ml-2">

                {/* Amount (Using a mono font or bold weight for numbers looks best) */}
                <span className="text-base font-bold text-gray-900">
                    ₹{amount}
                </span>

                {/* Action Buttons */}
                <div className="flex items-center gap-1 mt-1">
                    <button
                        type="button"
                        onClick={onEdit}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors active:scale-90"
                        aria-label="Edit expense"
                    >
                        <Pencil size={16} strokeWidth={2.5} />
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors active:scale-90"
                        aria-label="Delete expense"
                    >
                        <Trash2 size={16} strokeWidth={2.5} />
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ExpenseTile;