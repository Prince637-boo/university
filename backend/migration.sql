CREATE TABLE alembic_version (
    version_num VARCHAR(32) NOT NULL, 
    CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num)
);

-- Running upgrade  -> a02e91ae920e

CREATE TABLE facultes (
    id VARCHAR(36) NOT NULL, 
    nom VARCHAR(155) NOT NULL, 
    description TEXT, 
    PRIMARY KEY (id)
);

CREATE INDEX ix_facultes_id ON facultes (id);

CREATE INDEX ix_facultes_nom ON facultes (nom);

CREATE TABLE semesters (
    id VARCHAR(36) NOT NULL, 
    name VARCHAR(50) NOT NULL, 
    PRIMARY KEY (id)
);

CREATE INDEX ix_semesters_id ON semesters (id);

CREATE TABLE departements (
    id VARCHAR(36) NOT NULL, 
    nom VARCHAR(155) NOT NULL, 
    description TEXT, 
    id_faculte VARCHAR(36) NOT NULL, 
    PRIMARY KEY (id), 
    FOREIGN KEY(id_faculte) REFERENCES facultes (id)
);

CREATE INDEX ix_departements_id ON departements (id);

CREATE INDEX ix_departements_nom ON departements (nom);

CREATE TABLE parcours (
    id VARCHAR(36) NOT NULL, 
    nom VARCHAR(255) NOT NULL, 
    niveau VARCHAR(255) NOT NULL, 
    duree INTEGER NOT NULL, 
    id_departement VARCHAR(36) NOT NULL, 
    PRIMARY KEY (id), 
    FOREIGN KEY(id_departement) REFERENCES departements (id)
);

CREATE INDEX ix_parcours_duree ON parcours (duree);

CREATE INDEX ix_parcours_id ON parcours (id);

CREATE INDEX ix_parcours_niveau ON parcours (niveau);

CREATE INDEX ix_parcours_nom ON parcours (nom);

CREATE TABLE teachers (
    id VARCHAR(36) NOT NULL, 
    id_teacher VARCHAR(100) NOT NULL, 
    nom VARCHAR(100) NOT NULL, 
    prenom VARCHAR(100) NOT NULL, 
    email VARCHAR(30), 
    telephone VARCHAR(30), 
    grade VARCHAR(50) NOT NULL, 
    id_departement VARCHAR(36), 
    PRIMARY KEY (id), 
    FOREIGN KEY(id_departement) REFERENCES departements (id)
);

CREATE INDEX ix_teachers_email ON teachers (email);

CREATE INDEX ix_teachers_grade ON teachers (grade);

CREATE INDEX ix_teachers_id ON teachers (id);

CREATE UNIQUE INDEX ix_teachers_id_teacher ON teachers (id_teacher);

CREATE INDEX ix_teachers_nom ON teachers (nom);

CREATE INDEX ix_teachers_prenom ON teachers (prenom);

CREATE INDEX ix_teachers_telephone ON teachers (telephone);

CREATE TABLE cours (
    id VARCHAR(36) NOT NULL, 
    code VARCHAR(155) NOT NULL, 
    titre VARCHAR(155) NOT NULL, 
    description TEXT, 
    credits INTEGER NOT NULL, 
    id_parcours VARCHAR(36) NOT NULL, 
    PRIMARY KEY (id), 
    FOREIGN KEY(id_parcours) REFERENCES parcours (id)
);

CREATE INDEX ix_cours_code ON cours (code);

CREATE INDEX ix_cours_credits ON cours (credits);

CREATE INDEX ix_cours_id ON cours (id);

CREATE INDEX ix_cours_titre ON cours (titre);

CREATE TABLE etudiants (
    id VARCHAR(36) NOT NULL, 
    id_etudiant VARCHAR(50) NOT NULL, 
    nom VARCHAR(100) NOT NULL, 
    prenom VARCHAR(100) NOT NULL, 
    date_naissance DATE NOT NULL, 
    lieu_naissance VARCHAR(100) NOT NULL, 
    sexe VARCHAR(10) NOT NULL, 
    nationalite VARCHAR(50) NOT NULL, 
    adresse VARCHAR(255), 
    email VARCHAR(120) NOT NULL, 
    telephone VARCHAR(20) NOT NULL, 
    nom_du_pere VARCHAR(100) NOT NULL, 
    nom_de_la_mere VARCHAR(100) NOT NULL, 
    addresse_du_pere VARCHAR(100) NOT NULL, 
    addresse_de_la_mere VARCHAR(100) NOT NULL, 
    nom_parent_tuteur VARCHAR(100) NOT NULL, 
    telephone_parent_tuteur VARCHAR(20) NOT NULL, 
    adresse_parent_tuteur VARCHAR(255) NOT NULL, 
    date_inscription DATE DEFAULT CURRENT_DATE, 
    statut VARCHAR(50), 
    date_creation DATETIME DEFAULT now(), 
    id_departement VARCHAR(36), 
    id_parcours VARCHAR(36), 
    PRIMARY KEY (id), 
    FOREIGN KEY(id_departement) REFERENCES departements (id), 
    FOREIGN KEY(id_parcours) REFERENCES parcours (id)
);

CREATE INDEX ix_etudiants_date_naissance ON etudiants (date_naissance);

CREATE UNIQUE INDEX ix_etudiants_email ON etudiants (email);

CREATE INDEX ix_etudiants_id ON etudiants (id);

CREATE UNIQUE INDEX ix_etudiants_id_etudiant ON etudiants (id_etudiant);

CREATE INDEX ix_etudiants_lieu_naissance ON etudiants (lieu_naissance);

CREATE INDEX ix_etudiants_nom ON etudiants (nom);

CREATE INDEX ix_etudiants_prenom ON etudiants (prenom);

CREATE INDEX ix_etudiants_sexe ON etudiants (sexe);

CREATE TABLE enrollment (
    id VARCHAR(36) NOT NULL, 
    student_id VARCHAR(36) NOT NULL, 
    course_id VARCHAR(36) NOT NULL, 
    semester_id VARCHAR(36), 
    PRIMARY KEY (id), 
    FOREIGN KEY(course_id) REFERENCES cours (id), 
    FOREIGN KEY(semester_id) REFERENCES semesters (id), 
    FOREIGN KEY(student_id) REFERENCES etudiants (id)
);

CREATE INDEX ix_enrollment_id ON enrollment (id);

CREATE TABLE grades (
    id VARCHAR(36) NOT NULL, 
    student_id VARCHAR(36) NOT NULL, 
    course_id VARCHAR(36) NOT NULL, 
    semester_id VARCHAR(36), 
    grade_value FLOAT NOT NULL, 
    grade_type VARCHAR(50) NOT NULL, 
    date_assigned DATETIME DEFAULT now(), 
    PRIMARY KEY (id), 
    FOREIGN KEY(course_id) REFERENCES cours (id), 
    FOREIGN KEY(semester_id) REFERENCES semesters (id), 
    FOREIGN KEY(student_id) REFERENCES etudiants (id)
);

CREATE INDEX ix_grades_id ON grades (id);

CREATE TABLE media (
    id VARCHAR(36) NOT NULL, 
    file_path VARCHAR(255), 
    file_type VARCHAR(50), 
    mime_type VARCHAR(50), 
    is_principal BOOL, 
    file_size INTEGER, 
    encryption_key_id VARCHAR(50), 
    checksum VARCHAR(50), 
    storage_location VARCHAR(50), 
    status VARCHAR(50), 
    created_at DATETIME, 
    updated_at DATETIME, 
    error_message TEXT, 
    student_id VARCHAR(36), 
    teacher_id VARCHAR(36), 
    PRIMARY KEY (id), 
    FOREIGN KEY(student_id) REFERENCES etudiants (id), 
    FOREIGN KEY(teacher_id) REFERENCES teachers (id)
);

CREATE INDEX ix_media_id ON media (id);

CREATE TABLE teach (
    id INTEGER NOT NULL AUTO_INCREMENT, 
    course_id VARCHAR(36) NOT NULL, 
    teacher_id VARCHAR(36) NOT NULL, 
    PRIMARY KEY (id), 
    FOREIGN KEY(course_id) REFERENCES cours (id), 
    FOREIGN KEY(teacher_id) REFERENCES teachers (id)
);

CREATE INDEX ix_teach_id ON teach (id);

CREATE TABLE users (
    id VARCHAR(36) NOT NULL, 
    username VARCHAR(50) NOT NULL, 
    full_name VARCHAR(255), 
    is_active BOOL, 
    is_superuser BOOL, 
    hashed_password VARCHAR(128) NOT NULL, 
    student_id VARCHAR(36), 
    teacher_id VARCHAR(36), 
    PRIMARY KEY (id), 
    FOREIGN KEY(student_id) REFERENCES etudiants (id), 
    FOREIGN KEY(teacher_id) REFERENCES teachers (id)
);

CREATE INDEX ix_users_full_name ON users (full_name);

CREATE INDEX ix_users_hashed_password ON users (hashed_password);

CREATE INDEX ix_users_id ON users (id);

CREATE INDEX ix_users_is_active ON users (is_active);

CREATE INDEX ix_users_is_superuser ON users (is_superuser);

CREATE INDEX ix_users_username ON users (username);

CREATE TABLE tokens (
    id VARCHAR(36) NOT NULL, 
    user_id VARCHAR(36) NOT NULL, 
    token VARCHAR(128) NOT NULL, 
    is_active BOOL, 
    created_at DATETIME, 
    expires_at DATETIME, 
    PRIMARY KEY (id), 
    FOREIGN KEY(user_id) REFERENCES users (id)
);

CREATE INDEX ix_tokens_id ON tokens (id);

CREATE UNIQUE INDEX ix_tokens_token ON tokens (token);

INSERT INTO alembic_version (version_num) VALUES ('a02e91ae920e');

