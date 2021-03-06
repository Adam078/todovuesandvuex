CREATE TABLE IF NOT EXISTS todos(
   id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
   title VARCHAR(100) NOT NULL,
   description TEXT NOT NULL,
   priority INT NOT NULL,
   completed BOOLEAN DEFAULT false,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   update_at TIMESTAMP NULL DEFAULT NULL
) ENGINE=INNODB;