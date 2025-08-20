import Link from "next/link";
import Image from "next/image";
import { SearchInput } from "./search-input";
export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="glex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="Nottari Logo" width={100} height={100} />
        </Link>
      </div>
      <SearchInput />
      <div /> {/**TODO: Avatar */}
    </nav>
  );
};
