import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import CardDetail from './CardDetail';
import axios from "axios";
import { AddRounded, AddToPhotosRounded } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// For CSS i have used styled component library.
const Cardcontainer = styled.div`
    width:80%;
    margin: 10px auto;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-around;
    flex-wrap: wrap;
    /* margin-top: 10px; */
`;

const Card = styled.div`
    
    box-shadow: rgb(117, 117, 117) 1px 1px 8px 10px;
    width:18%;
    height: 250px;
    border:1px solid black;
    border-radius:10px;
    background-image: linear-gradient(to right, #8360c3, #2ebf91);
    margin: 20px 20px;

`;
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
const AddAlbum = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
`;

const Myalbums = () => {
    const [albumdetail,setAlbumdetail]=useState({});//This is used for storing json data.
    const [openAdd,setOpenAdd]=useState(false);// This is used for adding a new entry.
    const[addtitlevalue,setAddtitlevalue]=useState("");// This is used for storing a new entry .

    // API call for get all details
    useEffect(()=>{

        const getAlbum =async ()=>{
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/albums");
                // const albums = res.data;
                const albumdata={};
                res.data.forEach(item => {
                    const {userId}=item;
                    if(!albumdata[userId]){
                        albumdata[userId] = [];
                    }
                    albumdata[userId].push(item)
                    
                });
  
            setAlbumdetail(albumdata);
            } catch (error) {
                
            }
        }

        getAlbum();
    },[]);

    // Adding new Album entry.
    const handAddAlbum = async ()=>{
        let lastuserid = Object.keys(albumdetail).pop();
        if(lastuserid){
            lastuserid=String(parseInt(lastuserid) + 1);
        }else{
            lastuserid = '1';
        }
        const newAlbum={
            userId:lastuserid,
            title:addtitlevalue,
        };

        try {
            const res = await axios.post("https://jsonplaceholder.typicode.com/albums",newAlbum)
            // console.log(res.data);
            const createdAlbum = res.data;

           

            setAlbumdetail(prevAlbumdetail=>{
                const updatedAlbumdetail = {...prevAlbumdetail};
                if (!updatedAlbumdetail[lastuserid]) {
                    updatedAlbumdetail[lastuserid] = [];
                }
                updatedAlbumdetail[lastuserid].push(createdAlbum);
                return updatedAlbumdetail;

            });
            toast.success('Successfully Added!!!!');
        } catch (error) {
            toast.error('Something error to add!!!');
        }
            setAddtitlevalue('');
            setOpenAdd(false);
    }
    
  return (
    <>
        <Cardcontainer>
            {Object.keys(albumdetail).map((userid)=>
                <Card key={userid}>
                    <CardDetail albumData={albumdetail[userid]}/>    
                </Card>
            )}
            <Card>
                {!openAdd && <>
                    <AddAlbum>
                    <AddToPhotosRounded style={{width:"90%", height:"50%"}} ></AddToPhotosRounded>
                    <Button variant='contained' onClick={()=>setOpenAdd(true)} >Add</Button>
                </AddAlbum>
                <ToastContainer />
                </>}
                

                {openAdd && <>
                        <Album> Enter Title </Album>
                        <input 
                            type="text" 
                            
                            style={{height:"50px",width:"92%"}}
                            onChange={(e)=>setAddtitlevalue(e.target.value)}
                        />
                        <Buttondiv>
                        <Button variant="contained" onClick={handAddAlbum} >Submit</Button>
                        <Button variant="contained" onClick={()=>setOpenAdd(false)}>Close</Button>
                    </Buttondiv>
                        </> }
                
            </Card>
        </Cardcontainer>
    </>
    
  )
}

export default Myalbums
