-- Function to update the user_blogs_counter field from Blogs table

CREATE OR REPLACE FUNCTION update_blogs_counter() 
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS
$$
BEGIN
	UPDATE public."Users" AS u SET user_blogs_counter = u.user_blogs_counter + 1  WHERE user_id = NEW.blog_user_id;
	
	RETURN NEW;
END;
$$
	
-- Create trigger to execute the function above when a new blog is created

CREATE TRIGGER update_user_blogs_counter
AFTER INSERT ON public."Blogs" 
FOR EACH ROW EXECUTE PROCEDURE update_blogs_counter();


