import React from 'react'
import {assets} from '../assets/admin-assets/assets';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='bg-[#333847] min-h-screen w-62 pl-4'>
        <img src={assets.logo} alt="" className="w-32 hidden sm:block mt-5" />
        <img src={assets.logo_small} alt="" className="w-32 block sm:hidden mt-5" />

        <div className='flex flex-col mt-10 gap-6 pl-6'>
            <NavLink to = "/addsongs" className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#8c8f91] text-sm font-medium'>
                <img src={assets.add_song} alt="" className='w-5' />
                <p className='hidden sm:block'>Add Song</p>

            </NavLink>
            <NavLink to = "/listsongs" className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#8c8f91] text-sm font-medium'>
                <img src={assets.song_icon} alt="" className='w-5' />
                <p className='hidden sm:block'>List Songs</p>

            </NavLink>
            <NavLink to = "/addalbums" className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#8c8f91] text-sm font-medium'>
                <img src={assets.add_album} alt="" className='w-5' />
                <p className='hidden sm:block'>Add Album</p>

            </NavLink>
            <NavLink to = "/listalbums" className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-2 pr-[max(8vw, 10px)] drop-shadow-[-4px_4px_#8c8f91] text-sm font-medium'>
                <img src={assets.album_icon} alt="" className='w-5' />
                <p className='hidden sm:block'>List Albums</p>

            </NavLink>
        </div>
    
    </div>
  )
}

export default Sidebar