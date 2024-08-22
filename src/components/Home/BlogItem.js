import React from 'react'

const BlogItem = (props) => {
    let { title, description, imageUrl, BlogUrl, author, date } = props;
    
    console.log("Rendering NewsItem with props:", props);
    // Logging to ensure props are received
    imageUrl = 'https://i.pinimg.com/originals/d6/24/41/d624412af95090ad6c3bb001ea1b6245.png'
    return ( 
        <div className="card" style={{ width: 'auto'}}>
        <img src={imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title ? title : 'Unknown'}</h5>
          <p className="card-text">{description ? description : 'Unknown'}</p>
          <p className="card-text"><small className="text-body-secondary">By {author ? author : 'Unknown'} at {new Date(date).toGMTString()}</small></p>
                <a className="link-secondary link-offset-2 link-underline-opacity-0 link-underline-opacity-25-hover" href={BlogUrl} rel="noreferrer" target="_blank">
                    <p className="card-text">Read more &rarr;</p>
                </a>
        </div>
      </div>
    );
}
 
export default BlogItem;