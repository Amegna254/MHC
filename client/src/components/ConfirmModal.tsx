import React from "react";

interface Props {
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  title = "Confirm",
  message,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
      <div className="bg-slate-900 rounded-lg p-6 w-full max-w-sm text-left">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        <p className="text-slate-400 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-slate-800 border border-slate-700 hover:bg-slate-700"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
