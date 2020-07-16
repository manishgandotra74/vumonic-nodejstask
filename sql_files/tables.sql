create table tb_articles (
    id serial primary key , 
    title character varying(50) ,
    topic int ,
    content character varying(500) ,
    image character varying(500) ,
    isFeatured Boolean, 
    countviews integer
)

create table tb_articles (
    id serial primary key , 
    name character varying(50) ,
    image character varying(200) ,
)

create table tb_users (
    id serial primary key , 
    name character varying(50), 
    email character varying(50) ,
    password character varying(50), 
    role character varying(10)
)