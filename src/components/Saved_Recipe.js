import { useEffect, useState } from "react";
import Card from "./Card";
import { api_id,api_key,type } from "./API_AUTH_KEYS";
import { Audio } from 'react-loader-spinner';



const Saved_Recipe = ()=>{
    const [isloading,SetIsloading]=useState(true);
    const storedIds = JSON.parse(localStorage.getItem('recipes')) || [];
    const [list, setList] = useState([]);
    const base_url= "https://api.edamam.com/api/recipes/v2";
    const auth= `app_id=${api_id}&app_key=${api_key}&type=${type}`;

    useEffect(() => {
        const apiPromises = storedIds.map(id =>
            fetch(`${base_url}/${id}?${auth}`)
              .then(response => response.json())
              .catch(error => console.error(`Error fetching data for ID ${id}:`, error))
        );
        Promise.all(apiPromises)
        .then(data => {
                // data is an array of responses from the API requests
            console.log('All API requests successful', data);
            setList(data);
            SetIsloading(false);
                // Update state or do further processing with the data
        })
        .catch(error => {
            console.error('Error with one or more API requests:', error);
        });

        
    }, []);

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
        )
    }
    return(
        <div className="px-[4vmin] py-[4vmin]">
            {
            list.length > 0 ?
                <div className='result_container mt-10 flex flex-wrap justify-center gap-4'>
                    {list && list.map((item)=>{
                        const key= extractRecipeID(item.recipe.uri);
                        // console.log(key);
                        return <Card key={key} setasID={key} item={item.recipe} showAdd={null}/>
                    })}
                </div>
                :
                <div className="font-bold text-3xl text-center mt-10">
                    No recipies Saved yet.
                </div>
            }
        </div>
    );
}

export default Saved_Recipe;