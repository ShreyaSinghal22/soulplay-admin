import React from 'react'
import { assets } from '../assets/admin-assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../App';

const AddSongs = () => {

  const [image, setImage] = React.useState(false);
  const [song, setSong] = React.useState(false);
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [album, setAlbum] = React.useState("none");
  const [loading, setLoading] = React.useState(false);
  const [albumData, setAlbumData] = React.useState([]);


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{

      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("audio", song);
      formData.append("image", image);
      formData.append("album", album);
      
      const response = await axios.post(`${url}/api/song/add`, formData); 
          if(response.data.success){
            toast.success("song added successfully");
            setName("");
            setDesc("");
            setAlbum("none");
            setImage(false);
            setSong(false);
          } else {
            toast.error("Failed to add song. Please try again.");
          }                                                                                                                                                                                                                                                                                                                            
    } catch{
      toast.error("An error occurred while adding the song.");
    }

    setLoading(false);
  }

  const loadAlbumData = async () => {
    try{
      const response = await axios.get(`${url}/api/albums/listalbums`);
      if(response.data.success){
        setAlbumData(response.data.albums);
      }
      else{
        toast.error("Failed to load album data. Please try again.");
      }
    } catch(error){
      toast.error("Error loading album data:", error);
    }
  }

  React.useEffect(() => {
    loadAlbumData();
  }, []);

  return loading ? (
    <div className = 'grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-blue-800 rounded-full animate-spin'></div>
    </div>
  ) : (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start text-gray-600 gap-8'>
      <div className='flex gap-8'>
        <div className='flex flex-col gap-4'>
          <p>Upload Songs</p>
          <input onChange={(e) => setSong(e.target.files[0])} type="file" className='hidden' accept='audio/*' id="song" />
          <label htmlFor="song">
            <img src={song ? assets.upload_added : assets.upload_song} className='w-24 cursor-pointer' alt="" />
          </label>
        </div>
        <div className='flex flex-col gap-4'>
          <p>Upload Image</p>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" className='hidden' accept='image/*' id="image" />
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer' alt="" />
          </label>
        </div>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='bg-transparent outline-blue-900 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Song Description</p>
        <input onChange={(e)=>setDesc(e.target.value)} value={desc} type="text" className='bg-transparent outline-blue-900 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album</p>
        <select onChange={(e)=>setAlbum(e.target.value)} value={album} className='bg-transparent outline-blue-900 border-2 border-gray-400 p-2.5 w-37.5'>
          <option value="none">None</option>
          {albumData.map((item,index)=>(<option key={index} value={item.name}>{item.name}</option>))}
        </select>
      </div>
      <button type='submit' className='bg-black text-white px-6 py-2.5 mt-4 rounded-lg'>Add Song</button>
    </form>
  )
}

export default AddSongs;