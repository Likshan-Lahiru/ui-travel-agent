import React from 'react'
import { useSelector } from 'react-redux'
import { ChevronDownIcon } from 'lucide-react'
import { RootState } from "../../redux/store";


export const Header = () => {
    const user = useSelector((state: RootState) => state.user)
    return (
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
                <img
                    src={user.avatar}
                    alt="User avatar"
                    className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex items-center">
                    <span className="font-medium">Travel Inspiration</span>
                    <ChevronDownIcon className="w-4 h-4 ml-1" />
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-gray-100 rounded-md text-sm font-medium">
                    {user.currency}
                </div>
                <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-300">
                    <img
                        src="https://flagcdn.com/us.svg"
                        alt="US flag"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
        </header>
    )
}
