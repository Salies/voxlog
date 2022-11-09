import React from "react";

const ProfileHeader = () => {
  const personalData = {
    name: "Gustavo Becelli",
    username: "becelli",
    picture: "https://github.com/becelli.png",
    bio: "O importante é o que importa",
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
  name: string;
  username: string;
  picture: string;
  bio: string;
};
const ProfileInfo = ({ picture, name, username, bio }: ProfileInfoProps) => {
  return (
    <div className="">
      <div className="flex justify-center">
        <img src={picture} alt="avatar" className="w-32 h-32 rounded-full" />
        <div className="flex flex-col justify-center px-5">
          <h1 className="text-3xl font-bold">{name}</h1>
          <h1 className="text-xl">@{username}</h1>
        </div>
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
