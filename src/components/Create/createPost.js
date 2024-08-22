import React, {useContext, useEffect, useState} from "react";
import Navbar from "../Home/Navbar/Navbar";
import { IoIosAddCircle } from "react-icons/io";
import { DataContext } from "../../context/DataProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../../service/api";



const initialPost = {
    title: '',
    description: '',
    picture: '',
    username: '',
    categories: '',
    createdDate: new Date()
}

const CreatePost = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    const { account } = useContext(DataContext);

    const url = post.picture ? post.picture : "https://wallpapertag.com/wallpaper/full/6/9/f/814637-vertical-cool-backgrounds-for-laptop-2560x1600-notebook.jpg"

    useEffect(() => {
        const getImage = async () => { 
            if(file) {
                console.log(file,"this is file inside");

                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);

                for (let [key, value] of data.entries()) {
                    console.log(key, value);
                }
                
                let response = await API.uploadFile(data);
                post.picture = response.data;  
                
                console.log(post.picture, "this is posting picture");
                 
            }
        }
        getImage();
        post.categories = location.search?.split('=')[1] || 'All';
        post.username = account.username;
        // eslint-disable-next-line 
    }, [file])

    const handleChange = (e) => {
        console.log({ ...post, [e.target.name]: e.target.value });
        setPost({ ...post, [e.target.name]: e.target.value });
    }

    const savePost = async() => {
        let response = await API.createPost(post);
        console.log(response , 'this is response');
        if(response.isSuccess){
            navigate('/Home');
        }
    }
    console.log(file,"this is file outside");
    return (
        
        <>  
        <Navbar Filter = {'filter'}/>
            <div className="container mt-2">
            <div className="card" style={{ border: 'none' }}>
            <img src= {url} className="card-img-top" 
            style={{
                width: '100%',
                height: '50vh',
                objectFit: 'cover'
            }} alt="..."/>


            <div className="card-body">


                <div className="d-flex">
                <label htmlFor="fileInput" >
                    <IoIosAddCircle size={30}/>
                </label>
                <input type="file" 
                id="fileInput" 
                style={{display : 'none'}}
                onChange={(e) => setFile(e.target.files[0])}/>


                <div className="input-group ">
                    <input type="text" 
                        className="form-control mb-3" 
                        aria-label="Sizing example input" 
                        aria-describedby="inputGroup-sizing-default" 
                        placeholder="Title"
                        style={{margin : '0 15px' ,  border: 'none' }}
                        onChange={(e) => handleChange(e)}
                        name = 'title'/>
                </div>


                <button type="button" className="btn btn-success mb-3" onClick={savePost}>Publish</button>
                </div>
                
                <div className="form-floating">
                    <textarea className="form-control" 
                    placeholder="Leave a comment here" 
                    id="floatingTextarea2"
                    style={{height: '189px' , width: '100%' }}
                    onChange={(e) => handleChange(e)}
                    name = 'description'
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Comments</label>
                </div>
            </div>
            </div>
        </div>
        </>
    );
}
 
export default CreatePost;