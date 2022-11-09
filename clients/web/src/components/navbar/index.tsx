import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="text-white bg-black">
      <div className="container py-3 mx-auto">
        <div className="items-center justify-between text-center md:flex">
          <Link href="/">
            <span className="font-mono text-3xl font-black">voxlog</span>
          </Link>
          <div className="flex items-center">
            <NavItems />
          </div>
          <Account />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

const NavItems = () => {
  const navItems = [
    ["songs", "/songs"],
    ["albums", "/albums"],
    ["artists", "/artists"],
    ["events", "/events"],
    ["members", "/members"],
  ];
  return (
    <>
      <div className="flex flex-wrap items-center justify-center mx-auto">
        {navItems.map(([name, href]) => (
          <Item key={name} name={name} href={href} />
        ))}
      </div>
    </>
  );
};

type ItemProps = {
  name: string;
  href: string;
};

const Item = ({ name, href }: ItemProps) => {
  return (
    <Link href={href}>
      <span className="px-4 text-xl font-semibold">{name}</span>
    </Link>
  );
};

const Account = () => {
  return (
    <Link href="/profile">
      <div className="flex items-center justify-center mt-2 md:mt-0">
        <img
          src="https://github.com/becelli.png"
          alt="avatar"
          className="w-8 h-8 rounded-full"
        />
        <h1 className="mx-4 text-md">Gustavo</h1>
      </div>
    </Link>
  );
};
