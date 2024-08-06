import React,{useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({post}) {

  const [date,setDate] = useState('')

  useEffect(()=>{
    const dateStr = post.$createdAt;
    const date = new Date(dateStr);

    const options = { day: 'numeric', month: 'short', year: 'numeric', weekday: 'long' };

    const formattedDate = date.toLocaleDateString('en-US', options);
    setDate(formattedDate)
    },[]);
  return (
      <>
        <div className="my-4 mx-2 lg:m-8 md:m-4 sm:m-2 px-30">
          <div className='flex shadow-xl hover:shadow-slate-600 hover:shadow-lg duration-200 ease-in-out hover:scale-105 bg-neutral-50 rounded-xl max-h-28 lg:max-h-64 md:max-h-48'>
            <div className='w-2/5'
            >
              <img className='w-full h-full max-w-28 max-h-28 lg:max-h-80 lg:max-w-80 sm:max-w-52 sm:max-h-52 rounded-l-xl' src={appwriteService.getFilePreview(post.featuredImage)} alt={post.title} />
            </div>
            <div className='w-3/5 text-left xl:px-0 lg:px-4 md:px-2 py-3'
            >
              <h4 className='text-neutral-500 lg:text-xl md:text-lg sm:text-sm'>Date : {date}</h4>
              <Link to={`/post/${post.$id}`}>
                <h2 className='py-2 capitalize lg:text-4xl md:text-3xl sm:text-2xl'>{post.title}</h2>
              </Link>
              <h4 className='text-neutral-500 lg:text-xl md:text-lg sm:text-sm'>Created By : {post?.userName || "User"}</h4>
              <Link to={`/post/${post.$id}`}>
                  <Button children={"Read More"} className='mt-3'/>
              </Link>
            </div>
          </div>
        </div>
        </>
  )
}

export default PostCard
