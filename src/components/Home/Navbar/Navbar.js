import React from 'react'
import { BiDuplicate } from "react-icons/bi";
import { FaBell,FaStar } from "react-icons/fa";
import { MdFilterList } from "react-icons/md";
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../../constants/data';
import './style.css'
const Navbar = (props) => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category')

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-light ">
            <div className="container-fluid">
            <a className="navbar-brand me-auto" href="/Home">Logo</a>  
            <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Offcanvas</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                    {props.Post && 
                    <li className="nav-item">
                        <Link className="nav-link active" aria-current="page" to={`/create?category=${category || ' '}`} >
                                <BiDuplicate className='p-2' size={35}/>Posts
                        </Link>
                    </li>}
                    <li className="nav-item">
                    <a className="nav-link" href="/"><FaBell className='p-2' size={35}/>Alerts</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="/"><FaStar className='p-2' size={35}/>Favourites</a>
                    </li>
                    {props.Filter && <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample"><MdFilterList className='p-2' size={35}/>Filter</a>
                    </li>}
                </ul>
                </div>
            </div>
                {props.Login && <a className="login-button" href="/">Login</a>}
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            </div>
            
        </nav>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
        <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasExampleLabel">Filter By Categories</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
            <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
            </div>
            <div className="dropdown mt-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                Categories
            </button>
            <ul className="dropdown-menu">
                {categories.map(category => (
                    <li key={category.id}><Link className = 'dropdown-item' to = {`/create?category=${category.type}`}>{category.type}</Link></li>
                ))}
            </ul>
            </div>
        </div>
        </div>
        </div>
     );
}
 
export default Navbar;