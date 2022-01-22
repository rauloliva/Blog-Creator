-- Function to set the unknown user as the author of the blogs belong to the user that will get deleted
CREATE OR REPLACE FUNCTION set_unkown_user()
	RETURNS TRIGGER
	LANGUAGE PLPGSQL
	AS
$$
BEGIN
	UPDATE public."Blogs" SET blog_user_id = 1 WHERE blog_user_id = OLD.user_id;
	RETURN NEW;
ENoD;
$$

-- Before removing the user, pass their blogs to unknown user

CREATE TRIGGER set_unknown_as_creator
BEFORE DELETE ON public."Users"
FOR EACH ROW EXECUTE PROCEDURE set_unkown_user();
