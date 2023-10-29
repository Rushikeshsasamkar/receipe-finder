import { useEffect, useState } from "react";
import { api_id,api_key,type } from "./API_AUTH_KEYS";

const Fetchdata = (props) => {
  const [recipies, setRecipies] = useState([]);
//   const [error, setError]= useEffect();

  const base_url= "https://api.edamam.com/api/recipes/v2";
  const auth= `app_id=${api_id}&app_key=${api_key}&type=${type}`;

  useEffect(() => {
    const getData = async () => {
      try{
        let res={};
        // if(props.id !== ""){ 
        //     res = await fetch(base_url+'/'+props.id+'?'+auth);
        // }
        if(props.searchStr !==""){
            res = await fetch(`${base_url}?${type}&q=${props.searchStr}&${auth}`);
        }
        if (!res.ok) throw new Error("Oops! An error has occured");
        const json = await res.json();
        const data= json.hits;

        console.log(data);

        setRecipies(data);
      }catch (error) {
        console.log(error,"Can't Find the recipes right now!!, try checking recipe Id or the auth_ids and Keys!!!");
      }
    };
    getData();
  },[]);

  return recipies;
};

export default Fetchdata;
