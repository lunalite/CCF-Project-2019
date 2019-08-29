CREATE USER '<YOUR_NAME>'@'%' IDENTIFIED BY '<YOUR_NAME>';
GRANT ALL PRIVILEGES ON *.* TO '<YOUR_NAME>'@'%' WITH GRANT OPTION;

use mysql;
update user set authentication_string='<YOUR_NAME>', plugin='mysql_native_password' where user='<YOUR_NAME>';
ALTER USER '<YOUR_NAME>'@'%' IDENTIFIED WITH mysql_native_password BY '<YOUR_NAME>';
FLUSH PRIVILEGES;

// SCHEMAS //
CREATE TABLE STUDENT (
    ID int AUTO_INCREMENT,
    name varchar(200),
    PRIMARY KEY (ID)
);

CREATE TABLE ATTENDANCE (
    student_id int NOT NULL,
    class_name varchar(200),
    attended int DEFAULT 0,
    CONSTRAINT class_attendance PRIMARY KEY (student_id, class_name),
    FOREIGN KEY (student_id) REFERENCES student(ID)
);

// DATA //
INSERT INTO STUDENT(name) VALUES ('Ian Chan');

// NOT REQUIRED //
CREATE TABLE CLASS (
    ID int NOT NULL,
    date_time_desc varchar(200),
    PRIMARY KEY (ID)
);