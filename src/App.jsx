import React, { useCallback, useEffect, useRef, useState } from 'react';
import {Form } from 'react-bootstrap';
import './index.css';
import axios from 'axios';
import img from '../src/image/chrismi.jpeg'

const App = () => {
   const searchInput = useRef(null);
   const[images, SetImages]= useState([]);
   const[totalpage, SetTotalpage] =useState(0);
   const[page, Setpage] =useState(1);
   const[errormsg, SetErrormsg] = useState("");

   const base_url = 'https://api.unsplash.com/search/photos';

   const fetchImages= useCallback(async()=>{
    

  
    
    try {
   
      if(searchInput.current.value){
        SetErrormsg('')
        const {data} = await axios.get(`${base_url}?query=${searchInput.current.value}&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${import.meta.env.VITE_API_KEY}`)
    
        if (data.results.length === 0) {
          // Check if no images were found
          SetErrormsg('Image was not found');
        } 
        else {
          SetImages(data.results);
          SetTotalpage(data.total_pages);
        }
      }
   

    } catch (error) {
      SetErrormsg("No internet connection, Please try again later")
      console.log(error);
    }
 },[page]); 
 console.log(page)



   useEffect(()=>{
    fetchImages()
   },[fetchImages])


   function resetSearch(){
    fetchImages();
    Setpage(1);
   }
   function handleSearch(event) {
    event.preventDefault();
  
    const searchTerm = searchInput.current.value;
  
    if (!searchTerm) {
      // Check if the search input is empty
      SetErrormsg('Please input the image you want to search.');
    } else {
      // Clear any previous error message
      SetErrormsg('');
  
      // Perform the search
      resetSearch();
    }
  }
   function handleSelection(selection){
      searchInput.current.value= selection;
      resetSearch();
   }
   const IMAGES_PER_PAGE= 20;
  //  console.log(import.meta.env.VITE_API_KEY);




  return (
    <div className='containe'>
      <div className='top-sect'>
          <div className='profile'>
            <h1>DESIGNED BY CHRISMI</h1>
            <div className='chrismi'> 
                <img src={img} alt="" />
            </div>
          </div>
          <h1 className='title'>Breathtaking, copyright-free images and stock photos without royalty fees</h1>
          <p className='content'>Explore a vast collection of over 4.2 million high-quality stock images, videos, and music, all contributed by our talented community.</p>
          {errormsg && <p className='error-msg'>{errormsg}</p> }
          <div className='search-section'>
            <Form onSubmit={handleSearch}>
              <Form.Control
                type='search'
                placeholder='Type something to search...'
                className='search-input'
                ref={searchInput}
              />
            </Form>
          </div>
          <div className='filter'>
            <button onClick={()=>handleSelection('Nature')}>Nature</button>
            <button onClick={()=>handleSelection('Birds')}> Birds</button>
            <button onClick={()=>handleSelection('Cat')}>Cat</button>
            <button onClick={()=>handleSelection('Shoes')}>Shoes</button>
          </div>
      </div>
       
      <div className='nextbtn'>
        {page > 1 && <button onClick={()=>Setpage(page -1)}>Previous</button> }
        {page < totalpage && <button onClick={()=>Setpage(page +1)}>Next</button> }
      </div> 
      <div className='imgcontainer'>
          <div className='imgborder'>
            {images.map(image=>(
              <img 
              src={image.urls.small} 
              key={image.id} 
              alt={Image.alt_description} 
              className='SearchImg'
              />
            ))}
          </div>
      </div>
      <div className='footer1'>
        <h1>Stock Photos Without Royalty Fees</h1>
        <h4>How I Designed It?</h4>
        <p>I developed this user-friendly 
          image search web application using 
          Vite and React. Leveraging the power 
          of the Unsplash API, this dynamic 
          platform allows users to effortlessly 
          discover and view a plethora of 
          stunning pictures. What sets it 
          apart is its responsiveness, 
          ensuring a seamless experience 
          across various devices. Explore 
          the world of images with ease through 
          this well-crafted web app!</p>
      </div>
      <footer>
        <p>This is site was developed by 
          chrismi and it is for practical purpose</p>
      </footer>
      
    </div>
  );
};

export default App;