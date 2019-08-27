CREATE USER '<YOUR_NAME>'@'%' IDENTIFIED BY '<YOUR_NAME>';
GRANT ALL PRIVILEGES ON *.* TO '<YOUR_NAME>'@'%' WITH GRANT OPTION;

use mysql;
update user set authentication_string='<YOUR_NAME>', plugin='mysql_native_password' where user='<YOUR_NAME>';
ALTER USER '<YOUR_NAME>'@'%' IDENTIFIED WITH mysql_native_password BY '<YOUR_NAME>';
FLUSH PRIVILEGES;

// SCHEMAS //
CREATE TABLE STUDENT (
    id varchar(200),
    first_name varchar(200),
    last_name varchar(200)
);

CREATE TABLE CLASS (
    id varchar(200)
);

CREATE TABLE ATTENDANCE (
    student_id varchar(200),
    class_id varchar(200)
)

// DATA //
INSERT INTO STUDENT(FIRST_NAME, LAST_NAME) VALUES ('Ian', 'Chan');

