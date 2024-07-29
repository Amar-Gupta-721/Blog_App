import React, {useState, useEffect} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'       
import { useNavigate } from 'react-router-dom'  

function Home() {
    const userData = useSelector(state=>state.auth.userData)    
    const navigate = useNavigate()
    const [posts, setPosts] = useState([])
    
    useEffect(()=>{
        if(userData){       
            appwriteService.getPosts().then((posts)=>{
                if(posts){
                    setPosts(posts.documents)
                }
            })
            navigate("/")
        }
        else{
            navigate("/login")      
        }   
    },[])

  if(posts.length === 0){
    return (
        <div className="w-full py-8 mt-4 text-center">
            <Container>
                <div className="flex flex-wrap">
                    <div className="p-2 w-full">
                        <h1 className="text-2xl font-bold hover:text-gray-500">
                            Login to read posts
                        </h1>
                    </div>
                </div>
            </Container>
        </div>
    )
  }
  return (
    <div className="w-full py-8">
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post)=>(
                    <div key={post.$id} className="p-2 w-1/4">
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default Home
