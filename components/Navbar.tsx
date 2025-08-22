import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";

const Navbar = async () => {
  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="flex items-center gap-5 text-black">
          <Link href="/admin">
            <Button className="bg-blue-500 text-white hover:bg-blue-600">
              Admin Panel
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
