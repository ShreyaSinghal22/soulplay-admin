import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import  {url}  from '../App';

const ListAlbums = () => {

  const [data , setData] = React.useState([]);
  const fetchAlbums = async () => {
    try{
      const response = await axios.get(`${url}/api/album/list`);  
      if (response.data.success){
        setData(response.data.albums);
      } 
    } catch (error){
      toast.error("Error fetching albums:", error);
    }
  }

  const removeAlbum = async (id) => {
    if (!window.confirm("Are you sure you want to delete this album?")) return;

    try {
      // Change from URL parameter to a Request Body object
      setData(data.filter(item => item.id !== id));

      const response = await axios.post(`${url}/api/album/remove`, { id });

      if (response.data.success) {
        toast.success("Album deleted successfully!");
        // Optimistic UI update (optional but faster)
      } 
    } catch { // Revert to actual data on error
      toast.error("An error occurred while deleting the album.");
    }
  };

  React.useEffect(() => {
      fetchAlbums();
  }, []);

  return (
    <div className="className='p-8 w-full'">
      <p className="text-xl mb-4">All Albums List</p>
      <br></br>
      <div className='flex flex-col'>
        <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm bg-gray-100'>
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Color</b>
          <b className='text-center'>Action</b>
        </div>
        {data.map((item,index) => {
          return (
            <div key={index} className='grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-4 p-3 border border-gray-300 text-sm '>
              <img src={item.image_url} alt="" className='w-12  h-12 object-cover rounded' />
              <p className='font-medium'>{item.name}</p>
              <p>{item.description}</p>
              <input type="color" value={item.background_color} />
              <div className='flex justify-center'>
               <button onClick={() => removeAlbum(item.id)} className='cursor-pointer m-2 bg-red-700 text-white py-1 px-2 rounded'>Delete</button>
              </div>
            </div>
          )
        })} 
      </div>
    </div>
  )
}

export default ListAlbums;