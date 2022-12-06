import React from "react";
import Link from "next/link";
import { useAuth } from "../../hooks/auth";
import UserImage from "../userImage";

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 w-full text-white bg-gradient-to-r from-neutral-900 to-neutral-800 opacity-90 hover:opacity-100">
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
      <div className="sticky top-0 w-full -z-50 blur"></div>
    </>
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
  const { user } = useAuth();
  const { username, realName, profilePictureUrl } = user;
  return (
    <Link href={user.username ? `/users/${username}` : "/login"}>
      <div className="flex items-center justify-center mt-2 md:mt-0">
        {/* <UserImage
          profilePictureUrl={profilePictureUrl}
          name={username}
          sizeInPixels={32}
        /> */}
        <h1 className="mx-4 font-bold text-md">
          {realName?.split(" ")[0] || username || "login"}
        </h1>
      </div>
    </Link>
  );
};
