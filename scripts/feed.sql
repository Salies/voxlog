-- inserindo usuários
do $$
    declare uid uuid;
   	declare info varchar[][] := array[
   		['salies', 'daniel.serezane@unesp.br', '2002-07-25', 'Daniel Serezane', 'oh wow!'],
   		['becelli', 'gustavo.becelli@unesp.br', '2002-01-01', 'Gustavo Becelli', 'sei la'],
   		['cadusantana', 'carlos.ef.santana@unesp.br', '2000-01-01', 'Carlos Santana', 'i am the storm that is approaching sei lá'],
   		['tomusz', 'gc.tomiasi@unesp.br', '1999-01-01', 'Gulherme Tomiasi', 'algo 3'],
   		['nozawa', 'gabriel.nozawa@unesp.br', '1999-01-01', 'Gabriel Nozawa', 'algo'],
   		['guibatalhoti', 'guilherme.batalhoti@unesp.br', '2002-01-01', 'Guilherme Batalhoti', 'algo 2']
   	];
    begin
        for i in 1..6 loop
            insert into users (username, date_created, email, birthdate) 
            values ((select info[i][1]), current_date, (select info[i][2]), (select to_date(info[i][3], 'YYYY-MM-DD')))
            returning id into uid;
            insert into real_names (user_id, real_name) values (uid, (select info[i][4]));
           	insert into bios (user_id, bio_text) values (uid, (select info[i][5]));
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
	declare usuarios uuid[5] := array(select id from users limit 5);
	declare ret uuid;
	begin
		for i in 1..5 loop
			insert into artists(name) values((select artistas[i])) returning id into ret;
			insert into mb_artists(artist_id, mb_artist_id) values (ret, (select mb_artistas[i]));
			insert into albums(title, album_artist_id) values ((select albuns[i]), ret) returning id into ret;
			insert into mb_release(album_id, mb_release_id) values (ret, (select mb_release_arr[i]));
			insert into songs(album_id, duration, title) values (ret, (select m_dur[i]), (select musicas[i])) returning id into ret;
			insert into mb_recording(song_id, mb_recording_id) values (ret, (select mb_recording_arr[i]));
			insert into scrobbles(user_id, time_finished, song_id) values ((select usuarios[i]), now(), ret);
		end loop;
	end;
$$;