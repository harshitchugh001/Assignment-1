import React from 'react'
import Navbar from './Navbar'

export default function content() {
    return (
        <div>
           
                <div className='col-span-12 h-[3.75rem] bg-green-400 px-4 flex items-center'><Navbar></Navbar></div>

                <div className="mt-4 ml-4">
                    Content
                </div>
        </div>
    )
}
