export type Artist = {
  artistId: string;
  name: string;
  artUrl: string | null;
};

export type Album = {
  albumId: string;
  title: string;
  coverArtUrl: string | null;
  fromArtist: Artist;
};

export type Song = {
  songId: string;
  title: string;
  coverArtUrl: string | null;
  durationInSeconds: number;
  album: {
    albumId: string;
    title: string;
    coverArtUrl: string | null;
  };
  artist: Artist;
};


