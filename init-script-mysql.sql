use smart_glasses;

CREATE TABLE models (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30),
    PRIMARY KEY (id)
);

create table glasses_requests (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255),
    name varchar(100),
    id_model int,
    date_time datetime,
    PRIMARY KEY (id),
    FOREIGN KEY (id_model) REFERENCES models(id)
);

INSERT INTO
    models (name)
VALUES
    ('Aviador');

INSERT INTO
    models (name)
VALUES
    ('Mariposa');

INSERT INTO
    models (name)
VALUES
    ('Ojo de gato');

INSERT INTO
    models (name)
VALUES
    ('Redondeado');