import React from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../App';

const ListSongs = () => {
  const [data , setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    fetchSongs();
   }, []);


  const fetchSongs = async () => {
    try{
      const response = await axios.get(`${url}/api/song/list`);  
      setData(response.data.songs);
    }catch(error){
      toast.error("Error fetching songs:", error);
    }
  };


  const removeSong = async (id) => {

    if (!window.confirm('Are you sure you want to delete this song?')) return;

    setLoading(true);
    

    try{
      setData(data.filter(item => item.id !== id)); // Optimistically update UI

      const response = await axios.post(`${url}/api/song/remove`, { id:id });

      if(response.data.success){
        toast.success(response.data.message);
      } 
    }catch{
      await fetchSongs();
      toast.error("An error occurred while deleting the song.");
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className='p-8 w-full'>
     <p className='text-xl mb-4'>All Songs List</p>
     <br></br>
     <div className='flex flex-col'>
      <div className = ' sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-4 p-3 border border-gray-300 text-sm bg-gray-100'>
        <b>Image</b>
        <b>Name</b>
        <b>Description</b>
        <b>Album</b>
        <b>Duration</b>
        <b className='text-center'>Action</b>
      </div>
      {data.map((item, index) => {
        console.log(item);
        return (
          <div key={index} className='grid grid-cols-[1fr_1.5fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr_0.5fr] items-center gap-4 p-3 border-b border-l border-r border-gray-300 text-sm hover:bg-gray-50 transition-colors'>
            <img src={item.image_url} alt="" className='w-12 h-12 object-cover rounded' />
            <p className='font-medium'>{item.name}</p>
            <p className='text-gray-600 truncate'>{item.description}</p>
            <p>{item.album}</p>
            <p>{item.duration}</p>
            <div className='flex justify-center'>
              <button onClick={() => removeSong(item.id)} disabled={loading} className='bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-xs transition-all disabled:bg-red-300'
                >Delete</button>
            </div>
          </div>
        )} 
      )} 
     </div>
    </div>
  )
}

export default ListSongs;