import Image from "next/image";
import Link from "next/link";

const Navbar = async() => {
  "use cache";
    const data = new Date().toLocaleDateString('bn-BD',{
        dateStyle: 'full',
    })
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories")
   const categories = await res.json()
   console.log(categories)
   
   
    return (
    
         <header className="border-b border-gray-200 bg-green-50/40">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between ml-20">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo"
            width={44}
            height={44}
            className="rounded-xl"
          />
          <div>
            <h1 className="text-lg font-bold leading-tight">Bazar Dor</h1>
            <p>{data}</p>
          </div>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/signin"
            className="text-sm font-medium text-gray-700 hover:text-green-700"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <nav className="border-t border-gray-200">
        <ul className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-6 overflow-x-auto text-sm">
          {categories.map((cat) => (
            <li key={cat.id} className="shrink-0">
              <Link
                href={`/category/${cat.slug}`}
                className="flex items-center gap-2 text-gray-700 hover:text-green-700"
              >
                <span>{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
        
    );
};

export default Navbar;