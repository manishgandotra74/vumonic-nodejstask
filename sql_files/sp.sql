-- Add articles
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_articles`(_title character varying(200), _topic integer, 
_content character varying(200), _isFeatured boolean , _image character varying(200))
BEGIN
	if exists (select id from tb_topic where id = _topic) THEN 
    BEGIN 
insert into tb_articles (title  , topic, content, isFeatured ,image) values  (_title  , _topic, _content, _isFeatured ,_image);	
	select "Article added successfully" as message;
    END ; 
    ELSE 
    BEGIN 
    select "Please enter valid topic" as message;
    END;
    END IF ;
END
-- Add topic
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_topic`(_name  character varying (50), _image character varying (200) )
BEGIN
	If Not exists(select * from tb_topic where name = _name) THEN
    BEGIN 
   insert into tb_topic	(	name ,image ) values  ( _name , _image);
    Select "Topic Inserted Successfully" as message;
    END; 
    ELSE 
    BEGIN 
    Select "Topic Already Exists" as message;
    END ; 
    END IF ;
    END
    -- Add user 
    CREATE DEFINER=`root`@`localhost` PROCEDURE `add_user`(_email character varying(50),_password character varying(50),
_role character varying(50), _name character varying(50))
BEGIN
	If Not exists(select * from tb_users where email = _email ) THEN
    BEGIN 
   insert into tb_users (email  , password  , name , role ) values  (_email , _password , _name , _role );
    Select "User Inserted Successfully" as message;
    END; 
    ELSE 
    BEGIN 
    Select "User Already Exists" as message;
    END ; 
    END IF ;
END
-- _- Auth user 
CREATE DEFINER=`root`@`localhost` PROCEDURE `authenticate`(_email character varying(200),_password character varying(200))
BEGIN
	IF EXISTS(select email from tb_users where email = _email and password = _password) THEN 
    BEGIN 
    select "Success" as message,email , name , role from tb_users where email = _email;
    END;
    ELSE 
    BEGIN
    Select "Invalid" as message;
    END;
    END IF;
END
-- get Articles
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_Articles`(type integer)
BEGIN
IF (type = 1) THEN 
BEGIN 
select * from  tb_articles order by title asc;
END ; 
ELSE IF (type = 2) THEN 
BEGIN 
select * from  tb_articles order by title desc;
END ; 
ELSE  
BEGIN 
select * from  tb_articles ;
END ; 

END IF;
END IF ;
END
-- get Articles by Id 
CREATE DEFINER=`root`@`localhost` PROCEDURE `getArticlebyid`(_id integer)
BEGIN
    update tb_articles  set countviews = countviews+1 where id = _id;
	select * from tb_articles where id =_id;
END
-- update articles
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_articles`(articleid integer, _title character varying(200), _topic integer, 
_content character varying(200), _isFeatured boolean, _image character varying(200) )
BEGIN
	IF EXISTS (select * from tb_articles where id = articleid)THEN 
    BEGIN
    update tb_articles set isFeatured = _isFeatured  , topic = _topic , title = _title , 
    content = _content , image = _image  where id = articleid ;
    select 'Article Updated Successfully' as message ;
    END ;
    ELSE 
    BEGIN
    select 'Select Valid Article Id' as message ;
    END;
    END IF ;
END