import React from 'react'
import { signout } from './helper';

export default function logoutButton() {
    const handleLogout = () => {
        signout(() => {
          window.location.href = '/';
        });
      };
    return (
        <div>
            <div className="flex items-center">
            <button
                className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded mt-4"
                onClick={handleLogout}
            >
                Log out
            </button>
        </div>
        </div>
    )
}
