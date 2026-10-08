import Image from "next/image";


const Navbar = () => {
    return (
        <div className="flex justify-center">
          <Image src={'/public/logo.png'} alt="Logo" width={100} height={100} />
        </div>
        <div>
            <h1>Bazar Dor</h1>
        
        
        </div>
    );
};

export default Navbar;