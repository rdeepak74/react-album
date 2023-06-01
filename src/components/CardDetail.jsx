import React, { useState } from 'react'
import styled from "styled-components"
import { Button, TextField } from '@material-ui/core';
import { ChevronLeftOutlined, ChevronRightOutlined, KeyboardArrowRightOutlined } from '@material-ui/icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For CSS i have used styled component library.
const AlbumContainer=styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
const Album = styled.h1``;
const Span = styled.span``;
const Title = styled.p``;
const Buttondiv = styled.div`
    margin: 10px 0px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
`;
const Arrow = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;
const CardDetail = ({albumData}) => {

    const [album,setAlbum]=useState(albumData);//Store albumdata to album.
    const [albumItem,setAlbumItem]=useState(0);//This is used of geting proper data on 0th posistion.
    const [openEdit,setOpenEdit]=useState(false);// This is used for flag for opening a edit section.
    const [upadatevalueView, setupadatevalueView]=useState("");// This is used for store edit value.
    // console.log(albumData[albumItem]);

     //This function is used for get particular back data
     const handleBack = ()=>{
        setAlbumItem(albumItem===0?album.length-1:(prev)=>prev-1);
    }
    //This function is used for get particular next data
    const handleNext = ()=>{
        setAlbumItem(albumItem===album.length-1?0:(prev)=>prev+1);
    }

    // Handling for edit click
    const handleEdit =(data)=>{
        setupadatevalueView(data);
        setOpenEdit(true);
    }
    
    // Storing a data on onchange function of edit tools
    const handleTextFieldChange = (e) => {
        setupadatevalueView(e.target.value);
      };
    
    
    //Update call to API
      const handleEditSubmit=async (id)=>{
        try {
            const updatedAlbum ={

                ...album[albumItem],
                title:upadatevalueView,
            };

            const res = await axios.put(`https://jsonplaceholder.typicode.com/albums/${id}`,updatedAlbum);
            console.log(res.data);

            setAlbum((prevAlbum)=>{
                const updateAlbums=[...prevAlbum];
                updateAlbums[albumItem]=res.data;
                return updateAlbums;
            });
            toast.success('Successfully Updated!!!!!'); // This is used for notify a user
            setOpenEdit(false);
        } catch (error) {
            console.log(error);
            toast.error('Something error to update!!!')
        }
        
      }

      // Delete call api handleDelete
      const handleDelete= async (id)=>{
        ;
        try {
          const res=  await axios.delete(`https://jsonplaceholder.typicode.com/albums/${id}`);
          setAlbum((prevAlbum)=>
            prevAlbum.filter((album)=>album.id!==id)
          );
          toast.success('Successfully Deleted!!!!');
        } catch (error) {
            toast.error('Something error to delete!!!');
        }

      }
  return (
    <div>
        <AlbumContainer>
            {!openEdit && <>
                <Album>Album {album[albumItem].userId}</Album>
                    <Span>ID {album[albumItem].id}</Span>
                    <Title style={{padding:"0px 25px", height:"90px"}}>{album[albumItem].title}</Title>

                    {album.length> 1 && <>
                        <Buttondiv>
                        <Button variant="contained"  onClick={()=>handleEdit(album[albumItem].title)}  >Edit</Button>
                        <Button variant="contained" onClick={()=>handleDelete(album[albumItem].id)}>Delete</Button>
                        <ToastContainer />
                    </Buttondiv>
                    
                    <Arrow>
                        <ChevronLeftOutlined style={{cursor:"pointer"}}  onClick={handleBack}/>
                        <ChevronRightOutlined style={{cursor:"pointer"}} onClick={handleNext}/>
                    </Arrow>
                    </>}
                    
            </> }
                    
                    {openEdit && <>
                        <Album> Edit </Album>
                        <input 
                            type="text" 
                            value={upadatevalueView} 
                            onChange={handleTextFieldChange}
                            style={{height:"50px",width:"92%"}}
                        />
                        <Buttondiv>
                        <Button variant="contained" id={album[albumItem].id} onClick={()=>handleEditSubmit(album[albumItem].id)} >Submit</Button>
                        <Button variant="contained" onClick={()=>setOpenEdit(false)}>Close</Button>
                    </Buttondiv>
                        </> }
        </AlbumContainer>
    </div>
  )
}

export default CardDetail
