CREATE TABLE privilege (
    prv_id INT AUTO_INCREMENT PRIMARY KEY,
    prv_role VARCHAR(255) NOT NULL,
    usr_id INT NOT NULL,
    FOREIGN KEY (usr_id) REFERENCES user(usr_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;