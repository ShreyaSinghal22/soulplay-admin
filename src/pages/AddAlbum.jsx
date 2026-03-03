import React from 'react'
import { assets } from '../assets/admin-assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../App';

const AddAlbum = () => {

  const [image, setImage] = React.useState(false);
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [Color, setColor] = React.useState("#ffffff");
  const [loading, setLoading] = React.useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const formData = new FormData();
      formData.append("name", name);
      formData.append("desc", desc);
      formData.append("color", Color);
      formData.append("image", image);

      const response = await axios.post(`${url}/api/album/add`, formData);

      if(response.data.success){
        toast.success("Album added successfully");
        setName("");
        setDesc("");
        setColor("#ffffff");
        setImage(false);
      } else {
        toast.error("Failed to add album. Please try again.");
      }
    } catch{
        toast.error("An error occurred while adding the album.");
    }
    setLoading(false);
  }

  return loading ? (
    <div className = 'grid place-items-center min-h-[80vh]'>
      <div className='w-16 h-16 place-self-center border-4 border-gray-400 border-t-blue-800 rounded-full animate-spin'></div>
    </div>
  ): (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-start gap-8 text-gray-600'>
      <div className='flex flex-col gap-4'>
        <p>Upload Image</p>
        <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' accept='image/*' hidden/>
        <label htmlFor='image'>
          <img src={image ? URL.createObjectURL(image) : assets.upload_area} className='w-24 cursor-pointer' alt="" />
        </label>
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album Name</p>
        <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className='bg-transparent outline-blue-900 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Album Description</p>
        <input onChange={(e)=>setDesc(e.target.value)} value={desc} type="text" className='bg-transparent outline-blue-900 border-2 border-gray-400 p-2.5 w-[max(40vw,250px)]' placeholder='Type Here' required />
      </div>
      <div className='flex flex-col gap-2.5'>
        <p>Background Colour</p>
        <input onChange={(e)=>setColor(e.target.value)} value={Color} type="color" className='w-24 h-10 cursor-pointer' />
      </div>
      <button type='submit' className='bg-black text-white px-6 py-2.5 rounded-lg'>Add Album</button>
    </form>
  )
}

export default AddAlbum