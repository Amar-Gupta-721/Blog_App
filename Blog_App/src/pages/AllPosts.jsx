import React, { useState, useEffect } from 'react';
import appwriteService from '../appwrite/config';
import auth from '../appwrite/auth'
import { Container, PostCard } from '../components';

function AllPosts() {
    const [activePosts, setActivePosts] = useState([]);
    const [inactivePosts, setInactivePosts] = useState([]);
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        auth.getCurrentUser().then((user) => {
            setCurrentUser(user);
        });

        appwriteService.getPosts().then((posts) => {
            if (posts && currentUser) {
                const active = posts.documents.filter(post => post.status=='active' && post.userId === currentUser.$id);
                const inactive = posts.documents.filter(post => post.status=='inactive' && post.userId === currentUser.$id);
                setActivePosts(active);
                setInactivePosts(inactive);
            }
            setLoading(false);
        }).catch(() => {
            setLoading(false);
        });

        
    }, [currentUser]);

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex justify-center mb-4">
                    <button
                        className="mr-4 px-4 py-2 rounded hover:bg-red-800 focus:bg-orange-400"
                        onClick={() => setPosts(activePosts)}
                    >
                        Active Posts
                    </button>
                    <button
                        className="px-4 py-2 rounded hover:bg-green-800 focus:bg-green-300"
                        onClick={() => setPosts(inactivePosts)}
                    >
                        Inactive Posts
                    </button>
                </div>
                <div className="flex flex-wrap">
                    
                    {posts && (
                        posts.map((post) => (
                            <div key={post.$id} className="p-2 w-full">
                                <PostCard post={post} />
                            </div>
                        ))
                    )}
                </div>
            </Container>
        </div>
    );
}

export default AllPosts;
