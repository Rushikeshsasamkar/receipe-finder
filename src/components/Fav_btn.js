import React, { useEffect, useState } from 'react';

function Fav_btn(props) {
  const dataId = props.dataId;
  const [list, setList] = useState([]); 
  const [isFavorite, setIsFavorite] = useState(false);


    useEffect(()=>{
        const data = localStorage.getItem('recipes');
        
        if(data){
            setList( JSON.parse(data) );
        }
    },[list]);

  const toggleFavorite = () => {
        addToLocaStorage();
        setIsFavorite(true);
  };

  function addToLocaStorage(){
        if(list.includes(dataId)){
            return;
        }   
        list.push(dataId);
        localStorage.setItem('recipes', JSON.stringify(list));
        setList("");
        setIsFavorite(true);
  }

//   function removeFromLocaStorage(){
//                 const filteredList = list.filter(id => id !== dataId);
//                 localStorage.setItem('recipes', JSON.stringify(filteredList));
//                 setList("");
//                 setIsFavorite(false);  
//   }
    if(!isFavorite){
            return (
                <button style={{backgroundColor:'green'}} onClick={toggleFavorite} className={isFavorite ? 'favorite absolute top-0 right-0 text-white' : 'notfavorite absolute top-0 right-0 px-4 py-1 text-white'}   >
                Add To favorites
                </button>
            );
       }
    }

export default Fav_btn;