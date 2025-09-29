-- Criar o banco
CREATE DATABASE IF NOT EXISTS acolitossjo;
USE acolitossjo;

-- Tabela principal dos acólitos
DROP TABLE IF EXISTS dataAcolitos;
CREATE TABLE dataAcolitos (
  idAcolitos INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(200) NOT NULL,
  sexo ENUM('MAS', 'FEM') NOT NULL,
  dataNascimento DATE NOT NULL,
  telefone VARCHAR(50) NOT NULL,
  tamTunica ENUM('P', 'M', 'G', '42') NOT NULL,
  comentario VARCHAR(100) NULL,
  cerimonialista BOOLEAN NOT NULL DEFAULT 0, -- campo boolean corrigido
  PRIMARY KEY (idAcolitos)
);

-- Tabela de comunidades
DROP TABLE IF EXISTS comunidades;
CREATE TABLE comunidades (
  idComunidade INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100) NOT NULL,
  PRIMARY KEY (idComunidade)
);

-- Inserir comunidades
INSERT INTO comunidades (nome) VALUES
('Matriz'),
('São Miguel Arcanjo'),
('São João Batista'),
('Nossa Senhora de Fátima'),
('Santa Paulina'),
('São Domingos Sávio'),
('Nossa Senhora Aparecida');

-- Relação N:N Acólitos x Comunidades
DROP TABLE IF EXISTS acolitos_comunidades;
CREATE TABLE acolitos_comunidades (
  idAcolito INT NOT NULL,
  idComunidade INT NOT NULL,
  PRIMARY KEY (idAcolito, idComunidade),
  FOREIGN KEY (idAcolito) REFERENCES dataAcolitos(idAcolitos) ON DELETE CASCADE,
  FOREIGN KEY (idComunidade) REFERENCES comunidades(idComunidade) ON DELETE CASCADE
);

-- Tabela de missas
DROP TABLE IF EXISTS missas;
CREATE TABLE missas (
  idMissa INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(50) NOT NULL,
  PRIMARY KEY (idMissa)
);

-- Inserir missas
INSERT INTO missas (nome) VALUES
('Sábado'),
('Domingo 8h'),
('Domingo 18h'),
('Quartas'),
('Somente Comunidade');

-- Relação N:N Acólitos x Missas
DROP TABLE IF EXISTS acolitos_missas;
CREATE TABLE acolitos_missas (
  idAcolito INT NOT NULL,
  idMissa INT NOT NULL,
  PRIMARY KEY (idAcolito, idMissa),
  FOREIGN KEY (idAcolito) REFERENCES dataAcolitos(idAcolitos) ON DELETE CASCADE,
  FOREIGN KEY (idMissa) REFERENCES missas(idMissa) ON DELETE CASCADE
);

use acolitossjo;
select * from dataAcolitos;
select * from missas;
select * from comunidades;
select * from acolitos_comunidades;
select * from acolitos_missas;

-- Script completo para a tabela dataAcolitos (garanta que este rode sem erros)
INSERT INTO dataAcolitos (nome, sexo, dataNascimento, telefone, tamTunica, comentario, cerimonialista) VALUES
('Ana Sarah Ribeiro da Cruz', 'FEM', '2009-09-21', '47984445120', 'P', NULL, 0),
('André Luiz Ullrich Valverde', 'MAS', '2007-04-30', '47999367825', 'M', NULL, 0),
('Alan Jacinto', 'MAS', '2004-03-24', '47997138277', 'M', NULL, 1),
('Alesson Gabriel Sulczinski', 'MAS', '2007-04-11', '47991759681', 'M', 'Serve na comunidade', 0),
('Brayan Eduardo da Silva', 'MAS', '2010-03-08', '47992609630', 'M', NULL, 0),
('Brenda Arnoldo', 'FEM', '2010-11-17', '47992155298', 'M', NULL, 0),
('Bruno Henrique Brandl', 'MAS', '2004-08-24', '47984424263', 'G', 'Serve nas Quartas', 0),
('Cauê da Cruz Pedroso', 'MAS', '2010-11-09', '47997250519', 'G', NULL, 0),
('Caroline Izadora Ferreira', 'FEM', '2004-04-15', '47992328142', 'P', NULL, 0),
('Cibele Savino André', 'FEM', '2001-10-04', '47991309914', '42', NULL, 0),
('Claudio Strohoecker Junior', 'MAS', '2005-12-17', '47999748253', 'M', NULL, 1),
('Cristian Gustavo de Jesus Cassol', 'MAS', '2008-02-21', '47992694385', 'M', 'serve na comunidade', 0),
('Daniel Belusso Cardoso', 'MAS', '2011-09-20', '47988376561', 'M', 'serve na comunidade', 0),
('Davi Nathan Hames', 'MAS', '2008-01-31', '47997881182', 'M', 'serve na comunidade', 0),
('Diego Antonio da Costa', 'MAS', '1998-09-15', '47992446933', 'P', 'Está voltando a servir, ele pode servir em qualquer comunidade segundo ele', 0),
('Diogo José Bosing', 'MAS', '2009-03-21', '47996273489', 'M', NULL, 0),
('Eloá Ferreira Haut', 'FEM', '2011-11-09', '47992820432', 'P', 'Serve na Comunidade, mas consegue servir uma vez mensal na paróquia', 0),
('Fabricio Ribeiro de Lima', 'MAS', '2010-08-20', '47996050691', 'M', 'Serve na comunidade', 0),
('Felipe Cabral de Oliveira Cordeiro', 'MAS', '2001-02-27', '47991143421', 'M', NULL, 1),
('Felipe Miguel Caglioni Bennertz', 'MAS', '2009-10-18', '47984181694', 'G', NULL, 0),
('Flaviane Antunes de Farias', 'FEM', '2009-04-13', '47984046906', 'P', 'E quartas tmb', 0),
('Gabriel da Cruz Rohweder', 'MAS', '2008-09-16', '47992479123', 'M', 'Serve na comunidade', 0),
('Gabriela Scheleider Marcon', 'FEM', '2010-09-24', '47996195581', 'P', 'Serve na comunidade', 0),
('Gabrielly Caroliny de A. Steinheuser', 'FEM', '2007-09-11', '47989082577', 'M', 'serve na comunidade', 0),
('Giovana Moinho Barsch', 'FEM', '2009-08-07', '47996129861', 'M', NULL, 0),
('Isabela Matuchaki', 'FEM', '2009-11-08', '47999173963', 'P', NULL, 0),
('Isabelle Jacoby', 'FEM', '2012-08-14', '999381375', '42', 'serve na comunidade', 0),
('Isadora Freitas da Cruz', 'FEM', '2011-06-06', '47991335559', 'P', NULL, 0),
('Jenifer Warmling dos Santos', 'FEM', '1999-12-21', '47992500698', 'M', 'Serve na comunidade', 0),
('João Gabriel Cardoso', 'MAS', '2005-07-18', '47988172920', 'M', NULL, 1),
('Kauã Asssunção Madruga', 'MAS', '2009-06-27', '47992550871', 'G', 'Serve na comunidade, e tem disponibilidade nas quartas', 0),
('Kleifer Defacci Oliveira', 'MAS', '1999-03-21', '4799153570', 'P', NULL, 0),
('Letícia Sadzinski', 'FEM', '2006-04-10', '47997002846', 'P', 'serve na comunidade', 0),
('Lucas Dubas', 'MAS', '2006-09-23', '47991326712', 'G', NULL, 1),
('Lucas Mazurek', 'MAS', '2002-03-28', '47998531153', 'G', NULL, 0),
('Lucas Gabriel Caglioni Bennertz', 'MAS', '2008-01-31', '47984489480', 'M', NULL, 0),
('Luiz Henrique Pasin Laikovski', 'MAS', '2008-01-16', '47988729248', 'G', NULL, 1),
('Marcos Fernando Chiodini Filho', 'MAS', '2012-08-05', '47996286074', 'P', 'Serve na comunidade', 0),
('Marcos Vinicius Gruski da Fonseca', 'MAS', '2011-09-20', '47996374969', 'P', NULL, 0),
('Marenise reiter jorge', 'FEM', '2004-02-08', '47988946299', 'P', NULL, 0),
('Maria Eduarda da Silva', 'FEM', '2011-02-24', '47999491280', '42', 'Serve na comunidade', 1),
('Miguel Zuelow Reiter', 'MAS', '2006-08-08', '47991644868', 'G', 'colocou que serve na comunidade', 0),
('Milena Schug', 'FEM', '2005-04-25', '47997945150', 'P', 'Serve na Comunidade', 0),
('Natally Beatriz de A. Steinheuser', 'FEM', '2009-07-30', '47984161303', 'M', 'serve na comunidade', 0),
('Nathan Wermuth', 'MAS', '2000-12-16', '47991905887', 'M', NULL, 0),
('Riana Lima da Silva', 'FEM', '2009-03-30', '47996366408', 'M', NULL, 0),
('Ronaldo Mazurek Júnior', 'MAS', '2009-04-03', '47992050178', 'M', NULL, 0),
('Sabrina Dagostin Kedrowski', 'FEM', '2008-06-18', '47997732761', 'P', 'Serve na comunidade', 0),
('Samantha Cecília Philipi', 'FEM', '2009-01-18', '47992781075', 'M', 'Serve na comunidade', 0),
('Sinara Lorena Hasckel', 'FEM', '2008-12-01', '47988554374', 'M', 'Quartas e comunidade', 0),
('Sofia Viana Alves', 'FEM', '2011-04-27', '47992449987', 'P', 'Serve na comunidade', 0),
('Stefany Luzia Schatz', 'FEM', '2007-08-08', '4799433377', 'P', 'serve na comunidade', 0),
('Thuani Maria Gorski Vargas', 'FEM', '2008-09-17', '47992531452', 'M', NULL, 0),
('Vinicius Gabriel Schramm', 'MAS', '2010-05-10', '47992694881', 'M', 'Serve na comunidade', 0),
('Vitor da Silva Bastos', 'MAS', '2005-06-15', '47991193731', 'P', 'Só vai nas quartas', 0),
('Victor Heitor Zeferino', 'MAS', '2009-01-12', '47991231765', 'M', NULL, 0),
('Wesley Do Amaral Jorge', 'MAS', '2003-10-09', '47992915167', 'G', NULL, 1),
('William Matheus Mangoni', 'MAS', '2002-06-16', '47992915167', 'M', NULL, 0),
('Maria Eduarda Salatino Belloni', 'FEM', '2010-02-23', '47984954442', 'P', 'FILHA DA CARLA E ZAIAS', 0);



-- Script para acolitos_comunidades (agora deve funcionar)
INSERT INTO acolitos_comunidades (idAcolito, idComunidade) VALUES
(1, 1), (2, 1), (3, 1), (4, 7), (5, 4), (6, 1), (7, 1), (8, 1), (9, 1), (10, 1),
(11, 1), (12, 4), (13, 6), (14, 2), (15, 1), (16, 1), (17, 6), (18, 5), (19, 1), (20, 1),
(21, 1), (22, 2), (23, 2), (24, 6), (25, 1), (26, 1), (27, 6), (28, 1), (29, 4), (30, 1),
(31, 7), (32, 1), (33, 2), (34, 1), (35, 1), (36, 1), (37, 1), (38, 2), (39, 1), (40, 1),
(41, 3), (42, 3), (43, 5), (44, 6), (45, 1), (46, 1), (47, 1), (48, 2), (49, 2), (50, 5),
(51, 6), (52, 4), (53, 1), (54, 4), (55, 6), (56, 1), (57, 1), (58, 1), (59, 1);

-- Script corrigido para acolitos_missas (agora deve funcionar)
INSERT INTO acolitos_missas (idAcolito, idMissa) VALUES 
(2, 3), (3, 2), (4, 5), (5, 2), (6, 2), (6, 3), (7, 4), (8, 2), (8, 3), (11, 2), 
(12, 5), (13, 5), (14, 5), (16, 3), (17, 5), (18, 5), (19, 2), (20, 2), (21, 4), 
(22, 5), (23, 5), (24, 5), (25, 2), (27, 5), (28, 2), (29, 5), (30, 2), (31, 4), 
(31, 5), (32, 2), (33, 5), (34, 2), (35, 3), (37, 2), (38, 5), (39, 2), (40, 2), 
(40, 3), (41, 5), (42, 5), (43, 5), (44, 5), (47, 3), (48, 5), (49, 5), (50, 2), 
(50, 4), (51, 5), (52, 5), (54, 5), (55, 4), (57, 2), (57, 3), (58, 2), (59, 3);

 select * from viewAcolitos;
 describe viewAcolitos;
-- Desativa verificações de chave estrangeira
SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE acolitos_comunidades;
TRUNCATE TABLE acolitos_missas;
TRUNCATE TABLE dataAcolitos;
TRUNCATE TABLE comunidades;
TRUNCATE TABLE missas;

-- Reativa verificações
SET FOREIGN_KEY_CHECKS = 1;