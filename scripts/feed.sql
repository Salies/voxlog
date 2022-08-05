-- inserindo usuários
do $$
    declare uid uuid;
   	declare info varchar[][] := array[
   		['salies', 'daniel.serezane@unesp.br', '2002-07-25', 'Daniel Serezane', 'oh wow!'],
   		['becelli', 'gustavo.becelli@unesp.br', '2002-03-10', 'Gustavo Becelli', 'sei la'],
   		['nozawa', 'gabriel.nozawa@unesp.br', '1999-01-01', 'Gabriel Nozawa', 'algo'],
   		['guibatalhoti', 'guilherme.batalhoti@unesp.br', '2002-01-01', 'Guilherme Batalhoti', 'algo 2'],
   		['cadusantana', 'carlos.ef.santana@unesp.br', '2000-01-01', 'Carlos Santana', 'i am the storm that is approaching sei lá'],
   		['tomusz', 'gc.tomiasi@unesp.br', '1999-01-01', 'Gulherme Tomiasi', 'algo 3']
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
	
$$;