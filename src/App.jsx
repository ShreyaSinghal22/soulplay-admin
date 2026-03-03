import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Routes,Route} from 'react-router-dom';
import ListAlbums  from './pages/ListAlbums';
import  ListSongs  from './pages/ListSongs';
import  AddAlbum from './pages/AddAlbum';
import  AddSongs from './pages/AddSongs';
import Sidebar from './components/sidebar';
import Navbar from './components/Navbar';

export const url= "http://localhost:5173";
const App = () => {
  return (
    <div className ="flex items-start min-h-screen">
      <ToastContainer />
      <Sidebar />
      <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
        <Navbar />
        <div className = 'pt-8 pl-5 sm:pt-12 sm:pl-12'>
          <Routes>
            <Route path = "/listalbums" element = {<ListAlbums />} />
            <Route path = "/listsongs" element = {<ListSongs />} />
            <Route path = "/addalbum" element = {<AddAlbum />} />
            <Route path = "/addsongs" element = {<AddSongs />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App;

