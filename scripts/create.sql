-- criando tabelas no banco: usuários
CREATE TABLE IF NOT EXISTS "user" (
    user_id uuid PRIMARY key default gen_random_uuid(),
    username VARCHAR(16) NOT NULL UNIQUE,
    date_created DATE NOT null  default current_date,
    email VARCHAR(320) NOT NULL,
    birthdate DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS real_name (
    user_id uuid PRIMARY KEY,
    real_name VARCHAR(64) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

CREATE TABLE IF NOT EXISTS bio (
    user_id uuid PRIMARY KEY,
    text VARCHAR (160) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id)
);

-- criando tabelas no banco: artistas -> álbuns -> músicas -> scrobbles (músicas ouvidas por um usuário)
CREATE TABLE IF NOT EXISTS artist (
	artist_id uuid PRIMARY key default gen_random_uuid(),
    name VARCHAR(128) NOT NULL
);

CREATE TABLE IF NOT EXISTS mb_artist (
	artist_id uuid PRIMARY KEY,
    mb_artist_id uuid NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);

CREATE TABLE IF NOT EXISTS album (
	album_id uuid PRIMARY key default gen_random_uuid(),
    album_title VARCHAR(128) NOT NULL,
    artist_id uuid NOT NULL,
    FOREIGN KEY (artist_id) REFERENCES artist(artist_id)
);

CREATE TABLE IF NOT EXISTS mb_release (
	album_id uuid PRIMARY KEY,
    mb_release_id uuid NOT NULL,
    FOREIGN KEY (album_id) REFERENCES album(album_id)
);

CREATE TABLE IF NOT EXISTS song (
	song_id uuid PRIMARY key default gen_random_uuid(),
    song_title VARCHAR(256) NOT NULL,
    duration INTEGER not null check (duration >= 0),
    album_id uuid NOT NULL,
    FOREIGN KEY (album_id) REFERENCES album(album_id)
);

CREATE TABLE IF NOT EXISTS mb_recording (
	song_id uuid PRIMARY KEY,
    mb_recording_id uuid NOT NULL,
    FOREIGN KEY (song_id) REFERENCES song(song_id)
);

CREATE TABLE IF NOT EXISTS scrobble (
	user_id uuid,
    time_finished timestamp with time zone,
    song_id uuid NOT NULL,
    FOREIGN KEY (user_id) REFERENCES "user"(user_id),
    FOREIGN KEY (song_id) REFERENCES song(song_id),
    primary key (user_id, time_finished)
);

create table if not exists "event" (
	event_id uuid primary key default gen_random_uuid(),
	name varchar(256) not null,
	description varchar(512) NOT null,
	url varchar(2048) NOT null,
	datetime_begin TIMESTAMP WITH TIME ZONE NOT null,
	datetime_end TIMESTAMP WITH TIME ZONE NOT null,
	plus_code varchar(20) NOT null,
	created_by uuid not null,
	foreign key (created_by) references "user"(user_id)
);

create table if not exists attendance (
	user_id uuid,
	event_id uuid,
	foreign key (user_id) references "user"(user_id),
	foreign key (event_id) references "event"(event_id),
	primary key (user_id, event_id)
);

create table if not exists lineup (
	artist_id uuid,
	event_id uuid,
	foreign key (artist_id) references artist(artist_id),
	foreign key (event_id) references "event"(event_id),
	primary key (artist_id, event_id)
);
