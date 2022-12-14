-- Calcular quantos segundos de música um usuário ouviu, no total.
SELECT SUM(song.duration) FROM scrobble INNER JOIN song ON (scrobble.song_id = song.song_id and scrobble.user_id = 'c491e9ae-e235-4818-9a46-379e5d3b3eb6') group by song.duration;

-- O artista mais ouvido da plataforma (em tempo ouvido).
select s.artist_id, s.name, s.total_time from
(select artist.artist_id, artist.name as name, sum(song.duration) as total_time from scrobble 
natural join song
natural join album
natural join artist
group by artist.artist_id, song.duration) as s
order by total_time desc limit 1;

-- Obter dados completos de um usuário.
select * from "user" natural join real_name natural join bio;

-- Obter todos os artistas que estarão em um evento.
select artist.artist_id, artist."name" from artist inner join lineup on (artist.artist_id = lineup.artist_id and lineup.event_id = 'f702d752-6229-4ae4-b4ac-f56446697ec6');

-- Obter todas as pessoas que estarão em um evento.
select "user".user_id, "user".username from "user" inner join attendance on ("user".user_id = attendance.user_id and attendance.event_id = 'f702d752-6229-4ae4-b4ac-f56446697ec6');