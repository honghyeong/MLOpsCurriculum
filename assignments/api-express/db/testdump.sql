
create table users(
	id SERIAL PRIMARY KEY,  
	name varchar UNIQUE NOT NULL,
    age int 
);



insert into users(name,age) values('sm1',30);
insert into users(name,age) values('sm2',30);
insert into users(name,age) values('sm3',30);
insert into users(name,age) values('sm4',30);
insert into users(name,age) values('sm5',30);
insert into users(name,age) values('sm6',30);
