CREATE TABLE user (
    usr_id INT AUTO_INCREMENT PRIMARY KEY,
    usr_username VARCHAR(255) NOT NULL,
    usr_document VARCHAR(255) NOT NULL,
    usr_document_type VARCHAR(255) NOT NULL,
    usr_password VARCHAR(255) NOT NULL,
    usr_email VARCHAR(255) NOT NULL,
    usr_status VARCHAR(50) NOT NULL,
    usr_first_name VARCHAR(255) NOT NULL,
    usr_second_name VARCHAR(255) DEFAULT NULL,
    usr_first_surname VARCHAR(255) NOT NULL,
    usr_second_surname VARCHAR(255) DEFAULT NULL,
    UNIQUE (usr_username),
    UNIQUE (usr_email)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;