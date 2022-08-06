-- calcular quantos segundos de música o usuário ouviu
-- o artista mais ouvido da plataforma
-- obter dados completos de um usuário
-- obter todos os artistas que estarão em um evento
-- obter todas as pessoas que vão num evento

-- Calcular quantos segundos de música um usuário ouviu, no total.
SELECT SUM(songs.duration) FROM scrobbles INNER JOIN songs ON (scrobbles.song_id = songs.id and scrobbles.user_id = '00a964c6-7979-4ed3-8543-880ef6ce0672') group by songs.duration;

-- O artista mais ouvido da plataforma (em tempo ouvido).
select s.id, s.name, s.total_time from
(select artists.id, artists.name as name, sum(songs.duration) as total_time from scrobbles 
inner join songs on (scrobbles.song_id = songs.id)
inner join albums on (songs.album_id = albums.id)
inner join artists on (albums.album_artist_id = artists.id)
group by artists.id, songs.duration) as s
order by total_time desc limit 1;

-- Obter dados completos de um usuário.
select * from users natural join real_names natural join bios;