import { useEffect, useState } from "react";
import ReactLoading from 'react-loading';
import Card from "./Card";
// import Fetchdata from "./Fetch";
import { api_id,api_key,type } from "./API_AUTH_KEYS";
import { Audio } from 'react-loader-spinner';

const Home = ()=>{
    const [isloading,SetIsloading]=useState(false);
    const [searchStr,setSearchstr]= useState('');
    const [list,setList]= useState([]);
    const [searched,setSearched] = useState(false);

    const base_url= "https://api.edamam.com/api/recipes/v2";
    const auth= `app_id=${api_id}&app_key=${api_key}&type=${type}`;

    useEffect(()=>{
        console.log(searchStr,"::calling api!");

        const getData = async () => {
            try{
              let res={};
              if(searchStr !==""){
                  res = await fetch(`${base_url}?${type}&q=${searchStr}&${auth}`);
              }
              else{
                SetIsloading(false);
                return;
              }
              if (!res.ok) throw new Error("Oops! An error has occured");
              const json = await res.json();
              const data= json.hits;
      
              console.log(data);
              setSearched(true);
              setList(data);
              SetIsloading(false);

            }catch (error) {
              console.log(error,"Can't Find the recipes right now!!, try checking recipe Id or the auth_ids and Keys!!!");
            }
          };
          getData();
    },[searchStr])

    async function handleSubmit(e){
        e.preventDefault(); 
    }
    const handleButtonClick = () => {
        setSearchstr(document.getElementById('searchInput').value);
        console.log(searchStr);
        SetIsloading(true);
    }

    // function getIds(){   
    // }
    function extractRecipeID(uri) {
        const regex = /#recipe_(.*)/;
        const match = uri.match(regex);
        return match ? match[1] : null;
    }
    if(isloading){
        return( 
            <div className="px-[4vmin] py-[4vmin] flex flex-col justify-center items-center ">
                <div className="">Loading....</div>
                <Audio height="50" width="50" radius="9" color="black" ariaLabel="loading" wrapperStyle wrapperClass />
            </div>
        );
    }
    return(
        <div className="main px-[4vmin] py-[4vmin]">    
        
            <div className=''>
            {/* <p className="text-lg">What are you hungry for?</p> */}
            <form className='flex justify-center gap-1' onSubmit={(e) => handleSubmit(e) }>         
                <input id="searchInput" className='input_string rounded-lg border w-96 px-5 py-2 focus:outline-none text-black' placeholder='Discover Delight: Search Recipes for Your Favorite Flavors!' required/>
                <button className='px-5 py-2 rounded-lg bg-green-400 text-white hover:bg-grey-600 active:bg-gray-400' 
                    type='button'
                    onClick={handleButtonClick}
                >
                        Search
                </button>
            </form>

            </div>
            
            {
            list.length > 0 ?
                <div className='result_container mt-10 flex flex-wrap justify-center gap-4'>
                    {list && list.map((item)=>{
                        const key= extractRecipeID(item.recipe.uri);
                        return <Card key={key} setasID={key} item={item.recipe} />
                    })}
                </div>
                :
                searched ?
                    <div className="font-bold text-3xl text-center mt-10">
                        No result Found
                    </div>
                    :<div></div>
            }
        </div>

    );
}

export default Home;