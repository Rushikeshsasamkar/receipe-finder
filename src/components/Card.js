// import image from "../images/potato.png";
// import placeholder_img from "../images/....";
import { Link } from "react-router-dom";
import Fav_btn  from "./Fav_btn";


const Card= (props) => {
    const {label, image, calories, mealType, cuisineType} = props.item;

    // const handleLinkClick = (e) => {
    //     e.preventDefault();
    //     const dataId = e.target.getAttribute('data-id');
    //     window.location.to = `details/${dataId}`;
    // }
    return(  
        <div>  
            
            <div data-id={props.setasID} className="relative mt-5 flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl md:min-w-[600px] hover:bg-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                {props.showAdd!==null && <Fav_btn  dataId={props.setasID} />}
                <img className="object-cover w-full rounded-t-lg h-96 md:min-h-[190px] md:min-w-[190px] md:h-auto md:w-48 md:rounded-none md:rounded-l-lg" src={image} alt="No Image" /   >
                <div className="flex flex-col justify-between p-2 leading-normal">
                    <Link to={`details/${props.setasID}`} className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{label}</Link>

                    {/* <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Healthy cious: Curried Sweet Potato and Brown Rice Soup Recipe</h5> */}
                    {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}

                    <div className="flex flex-col gap-1 text-white"> 
                        <div className= "text-gray-900 dark:text-white ">Cuisine Type: {cuisineType}</div>
                        <div className= "text-gray-900 dark:text-white ">Meal Type: {mealType}</div>
                        <div className= "text-gray-900 dark:text-white animate-pulse">Calories: {calories.toFixed(2)} kcal/serve</div>
                    </div>    
                </div>
                
            </div>
        </div>
    );
}

export default Card;