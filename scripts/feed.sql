-- inserindo usuários
do $$
    declare uid uuid;
   	declare info varchar[5][5] := array[
   		['salies', 'daniel.serezane@unesp.br', '2002-07-25', 'Daniel Serezane', 'oh wow!'],
   		['becelli', 'gustavo.becelli@unesp.br', '2002-01-01', 'Gustavo Becelli', 'o importante é o que importa.'],
   		['cadusantana', 'carlos.ef.santana@unesp.br', '2000-01-01', 'Carlos Santana', 'i am the storm that is approaching sei lá'],
   		['tomusz', 'gc.tomiasi@unesp.br', '1999-01-01', 'Gulherme Tomiasi', 'algo 3'],
   		['nozawa', 'gabriel.nozawa@unesp.br', '1999-01-01', 'Gabriel Nozawa', 'algo'],
   		['guibatalhoti', 'guilherme.batalhoti@unesp.br', '2002-01-01', 'Guilherme Batalhoti', 'algo 2']
   	];
    begin
        for i in 1..6 loop
            insert into "user" (username, email, birthdate) 
            values ((select info[i][1]), (select info[i][2]), (select to_date(info[i][3], 'YYYY-MM-DD')))
            returning user_id into uid;
            insert into real_name (user_id, real_name) values (uid, (select info[i][4]));
           	insert into bio (user_id, text) values (uid, (select info[i][5]));
        end loop;
    end;
$$;

-- inserindo artistas, álbuns e músicas
do $$
	declare artistas varchar(128)[5] := array['Ok Goodnight', 'Raça Negra', 'Metallica', 'Milton Nascimento', 'Hayley Williams'];
	declare mb_artistas uuid[5] := array['8f6f75d2-5db8-48d2-a878-c55d4398a7c2', '1bc73091-5d48-45ba-a929-56b852dbd1ae', '65f4f0c5-ef9e-490c-aee3-909e7ae6b2ab', '1bfa27e3-0376-4206-a772-4586e25a64f5', 'b4b5b5a7-feff-47d0-9458-83d0d135a692'];
	declare albuns varchar(128)[5] := array['Limbo', 'Raça Negra - Vol. 01', 'Kill ’Em All', 'Clube da Esquina 2', 'Petals for Armor'];
	declare mb_release_arr uuid[5] := array['8f6f75d2-5db8-48d2-a878-c55d4398a7c2', 'c01a6aa0-6367-4423-96b5-eeec8723617b', '0d099294-ec29-4d0b-821d-202a32c85a14', '59e2c74d-3411-4270-a1d5-e1fbf9e30353', 'b05e3d2c-9f9b-4363-9a61-dced2f7bf0f0'];
	declare musicas varchar(256)[5] := array['Free Fall', 'Tamborim Mensageiro', 'Seek & Destroy', 'Maria, Maria', 'Sugar on the Rim'];
	declare m_dur integer[5] := array[221, 224, 416, 184, 254];
	declare mb_recording_arr uuid[5] := array['c7f9a115-de61-43a9-834d-a4c4ba9f8357', '9f2aa91c-4daf-4062-99a9-0f20ecd34285', 'f2c2fbbd-a7a9-4cc9-840a-a527cd413528', '1d55ff8b-c5e3-4a9e-8205-c081e5797d23', 'c1e56dd1-f956-4d21-b96e-1d888404ed1f'];
	declare usuarios uuid[5] := array(select user_id from "user" limit 5);
	declare ret uuid;
	declare n uuid;
	begin
		for i in 1..5 loop
			insert into artist(name) values((select artistas[i])) returning artist_id into ret;
			insert into mb_artist(artist_id, mb_artist_id) values (ret, (select mb_artistas[i]));
			insert into album(album_title, artist_id) values ((select albuns[i]), ret) returning album_id into ret;
			insert into mb_release(album_id, mb_release_id) values (ret, (select mb_release_arr[i]));
			insert into song(album_id, duration, song_title) values (ret, (select m_dur[i]), (select musicas[i])) returning song_id into ret;
			insert into mb_recording(song_id, mb_recording_id) values (ret, (select mb_recording_arr[i]));
			insert into scrobble(user_id, time_finished, song_id) values ((select usuarios[i]), clock_timestamp(), ret);
		end loop;
		-- criando um "outlier" pra ter um artista com mais de um scrobble
		-- e também para ter um usuário com duas músicais ouvidas
		select user_id into n from "user" where username = 'nozawa';
		insert into scrobble(user_id, time_finished, song_id) values (n, clock_timestamp(), ret);
	end;
$$;

-- inserindo eventos
do $$
	declare s uuid;
	declare info varchar[5][4] := array[
		['Hayley Williams Tiny Desk Concert', 'Hayley Williams Concert from home!', 'https://www.hayleywilliams.com/', '9C3XGV94+HC'],
		['Metallica Stadium Concert', 'Metallica in a huge conert!', 'https://www.metallica.com/', '588MF8CC+XH'],
		['Milton Nascimento Acústico', 'Milton Nascimento -- show aconchegante.', 'https://www.miltonnascimento.com.br/', '588M976H+MW'],
		['Ok Goodnight Concert', 'Show in a small venue.', 'https://okgoodnight.com', '87JC8WW6+84'],
		['Showzasso do Raça Negra', 'Raça Negra botando pra quebrar.', 'https://racanegra.com.br', '589CVHHP+PC']
	];
	declare time_en timestamp with time zone[5] := array['2022-01-01 01:01:01+03', '2022-01-02 01:01:01+03', '2022-01-03 01:01:01+03', '2022-01-04 01:01:01+03', '2022-01-05 01:01:01+03'];
	declare time_sa timestamp with time zone[5] := array['2022-01-01 02:01:01+03', '2022-01-02 02:01:01+03', '2022-01-03 02:01:01+03', '2022-01-04 02:01:01+03', '2022-01-05 02:01:01+03'];
	declare usuarios uuid[5] := array(select user_id from "user" limit 5); -- vai vir em qualquer ordem, mas pouco importa, isso é apenas para demonstrar a funcionalidade dos usuários irem a eventos
	declare artistas uuid[5] := array(select artist_id from artist order by name);
	declare aux uuid;
	begin
		select user_id into s from "user" where username = 'salies';
		for i in 1..5 loop
			insert into "event"(name, description, url, datetime_begin, datetime_end, plus_code, created_by)
			values (info[i][1], info[i][2], info[i][3], time_en[i], time_sa[i], info[i][4], s) returning event_id into aux;
			insert into lineup(artist_id, event_id) values (artistas[i], aux);
			insert into attendance(user_id, event_id) values (usuarios[i], aux);
		end loop;
	end;
$$;
