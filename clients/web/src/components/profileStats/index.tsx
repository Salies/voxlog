import React from "react";
import Link from "next/link";

const ProfileStats = () => {
  return (
    <div className="flex flex-wrap items-center justify-center w-full">
      <TopArtists />
      <TopAlbums />
      <RecentTracks />
    </div>
  );
};

const TopArtists = () => {
  const artists = [
    [
      "Metallica",
      "https://i.scdn.co/image/ab6761610000e5eb8101d13bdd630b0889acd2fd",
      "/artists/metallica",
    ],
    [
      "Hayley Williams",
      "https://i.scdn.co/image/ab6761610000e5ebca3aa12c1b46ff911ad53104",
      "/artists/hayley-williams",
    ],
    [
      "Milton Nascimento",
      "https://i.scdn.co/image/ab67706c0000da84bfff8bb61ae0e83a2878df1e",
      "/artists/milton-nascimento",
    ],
    [
      "Novos Baianos",
      "https://i.scdn.co/image/ab6761610000e5eb6f2aa6bffd27b505bc2e5b8c",
      "/artists/novos-baianos",
    ],
  ];

  return <ListingView title="Top Artists" items={artists} />;
};
const TopAlbums = () => {
  const albums = [
    [
      "Metallica - Master of Puppets",
      "https://i.scdn.co/image/ab67616d0000b273668e3aca3167e6e569a9aa20",
      "/albums/xyz",
    ],
    [
      "Hayley Williams - Petals for Armor",
      "https://i.scdn.co/image/ab67616d0000b273896e2483613a566bcb00d324",
      "/albums/xyz",
    ],
    [
      "Milton Nascimento - Clube da Esquina",
      "https://i.scdn.co/image/ab67616d0000b273bfbfbf3201ecd4d56ac3c155",
      "/albums/xyz",
    ],
    [
      "Novos Baianos - Acabou Chorare",
      "https://i.scdn.co/image/ab67616d0000b27327968fcceb7e9541fb2c9d76",
      "/albums/xyz",
    ],
  ];

  return <ListingView title="Top Albums" items={albums} />;
};
type ListingViewProps = {
  title: string;
  items: Array<Array<string>>;
};

const ListingView = ({ title, items }: ListingViewProps) => {
  return (
    <section className="flex flex-col justify-between w-full my-1">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-center md:text-left">{title}</h1>
        <Link
          href="#"
          className="text-xs font-semibold text-neutral-500 hover:text-black dark:text-neutral-400 hover:dark:text-white"
        >
          <h6 className="text-sm font-thin">All Time ⭣</h6>
        </Link>
      </div>
      <div className="flex mx-auto md:mx-0">
        {items.map((item) => {
          const [title, image, link] = item;
          return <Card key={title} title={title} image={image} link={link} />;
        })}
      </div>
    </section>
  );
};

type CardProps = {
  title: string;
  image: string;
  link: string;
};
const Card = ({ title, image, link }: CardProps) => {
  return (
    <div className="flex items-center justify-center mx-0 md:mx-1">
      <Link href={link}>
        <img
          src={image}
          alt={title}
          className="w-32 transition-all duration-200 ease-in-out rounded-none md:rounded-sm hover:scale-125"
        />
      </Link>
    </div>
  );
};

const RecentTracks = () => {
  const tracks = [
    [
      "Adoniran Barbosa",
      "Saudosa Maloca",
      "https://i.scdn.co/image/ab67616d0000b2732253c41bfeac02997def39e2",
      "Feb 25",
      "/song/xyz",
    ],
    [
      "Metallica",
      "Master of Puppets",
      "https://i.scdn.co/image/ab67616d0000b273668e3aca3167e6e569a9aa20",
      "Feb 25",
      "/song/xyz",
    ],
    [
      "System of a Down",
      "B.Y.O.B.",
      "https://i.scdn.co/image/ab67616d0000b273c65f8d04502eeddbdd61fa71",
      "Feb 25",
      "/song/xyz",
    ],
    [
      "Tears for Fears",
      "Everybody Wants To Rule The World",
      "https://i.scdn.co/image/ab67616d0000b27322463d6939fec9e17b2a6235",
      "Jan 25",
      "/song/xyz",
    ],
    [
      "Tears for Fears",
      "Advice For The Young At Heart",
      "https://i.scdn.co/image/ab67706c0000bebbfb6bc56011b623687d4b1913",
      "Jan 25",
      "/song/xyz",
    ],
    [
      "Raça Negra",
      "Preciso Ter Alguém",
      "https://lastfm.freetls.fastly.net/i/u/500x500/3602273ef0e19ee8f567ca79da6cf3df.jpg",
      "Jan 25",
      "/song/xyz",
    ],
    [
      "Djavan",
      "Linha do Equador",
      "https://lastfm.freetls.fastly.net/i/u/500x500/5c6cf4bc2d15d9723e16c1fc2c709fc5.jpg",
      "Jan 25",
      "/song/xyz",
    ],
  ];
  return <RecentTracksListing title="Recent Tracks" items={tracks} />;
};

type RecentTracksListingProps = {
  title: string;
  items: Array<Array<string>>;
};
const RecentTracksListing = ({ title, items }: RecentTracksListingProps) => {
  let counter = 0;
  return (
    <section className="flex flex-col justify-between w-full">
      <h1 className="text-3xl font-bold text-center md:text-left">{title}</h1>
      <div className="mx-1">
        {items.map((item) => {
          const [artist, title, cover, date, link] = item;

          return (
            <ScrobbleInstance
              key={counter++}
              cover={cover}
              title={title}
              artist={artist}
              date={date}
              link={link}
            />
          );
        })}
      </div>
    </section>
  );
};

type ScrobbleInstanceProps = {
  cover: string;
  title: string;
  artist: string;
  date: string;
  link: string;
};
const ScrobbleInstance = ({
  cover,
  title,
  artist,
  date,
  link,
}: ScrobbleInstanceProps) => {
  return (
    <div className="flex items-center w-full p-2 mt-2 transition-all duration-200 ease-in-out md:mt-1 hover:scale-105 hover:shadow-md hover:shadow-neutral-200 hover:dark:shadow-black">
      <div className="flex items-center justify-between w-full">
        <img
          src={cover}
          alt={title}
          className="w-10 transition-all ease-in-out rounded-sm hover:scale-150 duration-50 "
        />
        <Link href={link}>
          <div className="flex flex-col text-center">
            <span className="font-semibold text-md">{title}</span>
            <span className="text-sm font-thin">{artist}</span>
          </div>
        </Link>
        <span className="hidden text-xs font-semibold md:block">{date}</span>
        <span className="block text-xs font-semibold md:hidden"></span>
      </div>
    </div>
  );
};

export default ProfileStats;
