CREATE DATABASE aaa;
USE aaa;
CREATE TABLE owner
(
  photo VARCHAR(300),
  first VARCHAR(50),
  last VARCHAR(50),
  building VARCHAR(50),
  street VARCHAR(50),
  city VARCHAR(50),
  state VARCHAR(50),
  zip VARCHAR(50),
  phone VARCHAR(20),
  alive VARCHAR(10),
  notes VARCHAR(300),
  link_to_pet VARCHAR(300),
  hide TINYINT(1),
  id INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);

create table pet (
	id INT NOT NULL AUTO_INCREMENT,  
	photo VARCHAR(300),
	name VARCHAR(50),	
	breed VARCHAR(50),
	species VARCHAR(50),
	dob DATE,
	shots DATE,
	licensed DATE,
	sex VARCHAR(10),
	neutered VARCHAR(10),
	alive VARCHAR(5),
	notes VARCHAR(300),
	hide TINYINT(1),
	PRIMARY KEY (id)
);

CREATE TABLE owner_pet
(
  id INT NOT NULL AUTO_INCREMENT,
  owner_id INT,
  pet_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (owner_id) REFERENCES owner(id),
  FOREIGN KEY (pet_id) REFERENCES pet(id)
);