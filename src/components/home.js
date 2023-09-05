import React from 'react'
import Aside from './aside'
import Content from './content'

export default function home() {
    return (
        <div className='grid grid-cols-12 gap-4 md:gap-20 w-full h-full bg-gray-100'>
            <div className="col-span-12 md:col-span-8 bg-blue-300 border-gray-200 h-[calc(100vh-3.75rem)] p-4 md:mt-4 md:ml-4">
                <Content></Content>
            </div>
            <aside className='col-span-12 md:col-span-4 bg-orange-300 p-4 md:mt-4 md:mr-7'>
                <Aside></Aside>
            </aside>
        </div>

    )
}
