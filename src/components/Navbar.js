import { Link } from "react-router-dom";

const Navbar=()=>{
    return(
        <div className="navbar px-[4vmin] h-20 flex items-center justify-between shadow-md">
            <Link to="/" className="logo flex gap-2 items-center"> 
                <p className=" border-black pr-2 text-4xl font-bold">RECEIPE FINDER APP</p>
            </Link>
            <Link to="saved_recipies" className="btn-danger my-3" >FAVORITES</Link>
        </div>
    );
}

export default Navbar;