import Image from "next/image";
import React from "react";
import Avatar from "react-avatar";
import UserImage from "../userImage";

const ProfileHeader = ({ user }) => {
  console.log("usuário", user);
  if (!user) return null;

  const personalData = {
    username: user.username,
    realName: user.realName || undefined,
    profilePictureUrl: user.profilePictureUrl,
    bio: user?.bio,
  };

  const personalMusicData = {
    hours: 350234,
    artists: 695,
    albums: 1112,
    songs: 403506,
  };

  return (
    <div className="w-full px-4 py-6 bg-neutral-100 dark:bg-neutral-800">
      <section className="flex flex-wrap items-center justify-between w-full">
        <ProfileInfo {...personalData} />
        <ProfileMusicStatus {...personalMusicData} />
      </section>
      <p className="mt-5 text-center">bio: {personalData.bio}</p>
    </div>
  );
};

type ProfileInfoProps = {
  realName: string;
  username: string;
  profilePictureUrl: string;
  bio: string;
};
const ProfileInfo = ({
  profilePictureUrl,
  realName,
  username,
}: ProfileInfoProps) => {
  return (
    <div className="flex justify-center">
      <UserImage
        profilePictureUrl={profilePictureUrl}
        name={realName || username}
      />
      <div className="flex flex-col justify-center px-5">
        <h1 className="text-3xl font-bold">{realName}</h1>
        <h1 className="text-xl">@{username}</h1>
      </div>
    </div>
  );
};

type ProfileMusicStatusProps = {
  hours: number;
  artists: number;
  albums: number;
  songs: number;
};

const ProfileMusicStatus = ({
  hours,
  artists,
  albums,
  songs,
}: ProfileMusicStatusProps) => {
  const intToAbbrev = (num: number, fixed = 1) => {
    const abbrev = ["", "K", "M", "B", "T"];
    const exp = Math.floor(Math.log(num) / Math.log(1000));
    const result = num / Math.pow(1000, exp);
    if (exp === 0) return `${result.toFixed(0)}${abbrev[exp]}`;
    return `${result.toFixed(fixed)}${abbrev[exp]}`;
  };
  return (
    <section className="justify-center mx-auto mt-5 text-center md:mx-0 md:mt-0">
      <h1 className="text-xl font-bold">
        {intToAbbrev(hours, 0)} hours listening
      </h1>
      <div className="flex mt-2 justify-evenly">
        <div className="flex flex-col items-center">
          <p className="-m-2 text-lg">{intToAbbrev(artists)}</p>
          <p className="text-sm font-light">artists</p>
        </div>
        <div className="flex flex-col">
          <p className="-m-2 text-lg">{intToAbbrev(albums)}</p>
          <p className="text-sm font-light">albums</p>
        </div>
        <div className="flex flex-col">
          <p className="-m-2 text-lg">{intToAbbrev(songs)}</p>
          <p className="text-sm font-light">songs</p>
        </div>
      </div>
    </section>
  );
};

export default ProfileHeader;
