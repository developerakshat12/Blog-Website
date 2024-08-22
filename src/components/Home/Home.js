import React from 'react';
import BlogItem from './BlogItem';
import Navbar from './Navbar/Navbar';

const Home = () => {
    return (
        <div>
        <div>
            <Navbar Post = {true} Filter = {true} Login = {true}/>
        </div>
        <div className="container p-3 ">
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-3 g-lg-3">
              <div className='col'><BlogItem/></div>
              <div className='col'><BlogItem/></div>
              <div className='col'><BlogItem/></div>
              <div className='col'><BlogItem/></div>
              <div className='col'><BlogItem/></div>
              <div className='col'><BlogItem/></div>
              <div className='col'><BlogItem/></div>
              <div className='col'><BlogItem/></div>    
            </div>
        </div>
        </div>
    );
}
 
export default Home;