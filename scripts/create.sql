-- criando tabelas no banco: usuários
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY key default gen_random_uuid(),
    username VARCHAR(16) NOT NULL UNIQUE,
    date_created DATE NOT NULL,
    email VARCHAR(320) NOT NULL,
    birthdate DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS real_names (
    user_id uuid PRIMARY KEY,
    real_name VARCHAR(64) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS bios (
    user_id uuid PRIMARY KEY,
    text VARCHAR (160) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- criando tabelas no banco: artistas -> álbuns -> músicas -> scrobbles (músicas ouvidas por um usuário)
CREATE TABLE IF NOT EXISTS artists (
	id uuid PRIMARY key default gen_random_uuid(),
    name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS mb_artists (
	artist_id uuid PRIMARY KEY,
    mb_artist_id uuid NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artists(id)
);

CREATE TABLE IF NOT EXISTS albums (
	id uuid PRIMARY key default gen_random_uuid(),
    title VARCHAR(128) NOT NULL,
    album_artist_id uuid NOT NULL,
    FOREIGN KEY (album_artist_id) REFERENCES artists(id)
);

CREATE TABLE IF NOT EXISTS mb_release (
	album_id uuid PRIMARY KEY,
    mb_release_id uuid NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(id)
);

CREATE TABLE IF NOT EXISTS songs (
	id uuid PRIMARY key default gen_random_uuid(),
    title VARCHAR(256) NOT NULL,
    duration INTEGER not null check (duration >= 0),
    album_id uuid NOT NULL,
    FOREIGN KEY (album_id) REFERENCES albums(id)
);

CREATE TABLE IF NOT EXISTS mb_recording (
	song_id uuid PRIMARY KEY,
    mb_recording_id uuid NOT NULL,
    FOREIGN KEY (song_id) REFERENCES songs(id)
);

CREATE TABLE IF NOT EXISTS scrobbles (
	user_id uuid,
    time_finished timestamp with time zone,
    song_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (song_id) REFERENCES songs(id),
    primary key (user_id, time_finished)
);
