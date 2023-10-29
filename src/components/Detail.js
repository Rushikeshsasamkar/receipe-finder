import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api_id,api_key,type } from "./API_AUTH_KEYS";
import { Audio } from 'react-loader-spinner';

const Details = ()=>{
    const routeParams= useParams();
    const [data,setData] = useState(null);
    // console.log(routeParams.id);

    const base_url= "https://api.edamam.com/api/recipes/v2";
    const auth= `app_id=${api_id}&app_key=${api_key}&type=${type}`;

    useEffect(()=>{
        const getData = async () => {
            try{
              const  res = await fetch(`${base_url}/${routeParams.id}?${type}&${auth}`);
              if (!res.ok) throw new Error("Oops! An error has occured");
              const json = await res.json();
      
              console.log(json);
              setData(json);

            }catch (error) {
              console.log(error,"Can't Find the recipes right now!!, try checking recipe Id or the auth_ids and Keys!!!");
            }
          };
          getData();
    },[]);

    if(data === null){
        return( 
            <div className="px-[4vmin] py-[4vmin] flex flex-col justify-center items-center ">
                <div className="">Loading....</div>
                <Audio height="50" width="50" radius="9" color="black" ariaLabel="loading" wrapperStyle wrapperClass />
            </div>
        )
    }
    return(
        <div className="details px-[4vmin] py-[4vmin]">
            <div className="container min-w-full h-auto  ">
                        <div className="row flex ">
                            <img className="object-cover w-full  md:min-h-[190px] md:min-w-[490px] md:h-auto md:w-56 border border-gray-400 "  alt="Recipe Img" 
                                src={data.recipe.image} alt="N/A"
                            />
                            <div className="flex flex-col gap-4 px-4">
                                <p className=" py-2 text-2xl font-semibold">{data.recipe.label}</p>
                                <p className="font-bold">Health Benefits</p>
                                <ul className="flex flex-wrap gap-2">
                                    {
                                        data.recipe.healthLabels.map(element => {
                                            return <li className="mx-1">{element} |</li>
                                        })
                                    }
                                </ul>
                                <div className="flex">
                                    <p className="text-xl mr-2">Cuisine Type: {data.recipe.cuisineType} </p>
                                    <p className="text-xl mr-2">Meal Type: {data.recipe.mealType} </p>
                                    <p className="text-xl mr-2">Calories: {data.recipe.calories.toFixed(2)}</p>
                                </div>
                                <div className="">
                                    <p className="text-2xl">List of ingredients</p>
                                        <ul className="ml-4">
                                            {
                                                data.recipe.ingredientLines.map(element => {
                                                    return <li className=" list-disc mx-1">{element} </li>
                                                })
                                            }
                                        </ul>
                                </div>
                            </div>

                        </div>
            </div>
        </div>
    );
}

export default Details;