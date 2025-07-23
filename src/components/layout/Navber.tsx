
import { GiSpellBook } from "react-icons/gi";
import { Link } from "react-router";
import { Button } from "../ui/button";

const Navber = () => {
    return (
        <nav className='w-11/12  mx-auto flex items-center justify-between  gap-3  py-5'>
            <div className='flex items-center text-5xl'>
            <span className="flex items-center"><GiSpellBook  className="text-5xl"/>BookSelf</span>
            </div>
           <div className="flex gap-5 font-normal text-md">
             <Link to={"/book"}>Book</Link>
            <Link to={"/about-us"}>About Us</Link>
            <Link to={"/"}>Publication</Link>
            <Link to={"/"}>Writes</Link>
           </div>
            <div>
              <Button>LOG IN</Button>
            </div>
        </nav>
    );
};

export default Navber;