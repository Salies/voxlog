-- Calcular quantos segundos de música um usuário ouviu, no total.
SELECT SUM(song.duration) FROM scrobble INNER JOIN song ON (scrobble.song_id = song.song_id and scrobble.user_id = '0d258e07-92d0-4559-8c5a-f250fc7d3924') group by song.duration;

-- O artista mais ouvido da plataforma (em tempo ouvido).
select s.artist_id, s.name, s.total_time from
(select artist.artist_id, artist.name as name, sum(song.duration) as total_time from scrobble 
natural join song
inner join album on (song.album_id = album.album_id)
inner join artist on (album.album_artist_id = artist.artist_id)
group by artist.artist_id, song.duration) as s
order by total_time desc limit 1;

-- Obter dados completos de um usuário.
select * from "user" natural join real_name natural join bio;

-- Obter todos os artistas que estarão em um evento.
select artist.artist_id, artist."name" from artist inner join lineup on (artist.artist_id = lineup.artist_id and lineup.event_id = '1c731f89-faad-4a9d-b0eb-6f1252755adf');

-- Obter todas as pessoas que estarão em um evento.
select "user".user_id, "user".username from "user" inner join attendance on ("user".user_id = attendance.user_id and attendance.event_id = '1c731f89-faad-4a9d-b0eb-6f1252755adf');