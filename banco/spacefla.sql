
CREATE DATABASE spacefla;
USE spacefla;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `emailUsuario` varchar(50) DEFAULT NULL,
  `senhaUsuario` char(8) DEFAULT NULL,
  `nomeUsuario` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
);
CREATE TABLE jogador(
  idJogador int primary key auto_increment,
  numeroJogador int, 
  posicaoJogador varchar(50),
  CONSTRAINT CHECK(posicaoJogador IN (
    'Goleiro', 'Zagueiro', 'Volante', 'Lateral Direito', 'Lateral Esquerdo'
    ,'Volante', 'Meia', 'Atacante'
  )),
  nomeJogador VARCHAR(50),
  fotoJogador VARCHAR(500)
);
CREATE TABLE `corneta` (
  `idCorneta` int NOT NULL AUTO_INCREMENT,
  `tipoCorneta` varchar(30) DEFAULT NULL,
  `comentarioCorneta` varchar(400) DEFAULT NULL,
  `dataCorneta` datetime DEFAULT CURRENT_TIMESTAMP,
  `competicao` varchar(50) DEFAULT NULL,
  `fkJogador` int NOT NULL,
  `fkUsuario` int NOT NULL,
  PRIMARY KEY (`idCorneta`,`fkJogador`,`fkUsuario`),
  KEY `fkJogador` (`fkJogador`),
  KEY `fkUsuario` (`fkUsuario`),
  CONSTRAINT `corneta_ibfk_1` FOREIGN KEY (`fkJogador`) REFERENCES `jogador` (`idJogador`),
  CONSTRAINT `corneta_ibfk_2` FOREIGN KEY (`fkUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `corneta_chk_1` CHECK ((`tipoCorneta` in ('Positiva','Negativa'))),
  CONSTRAINT `corneta_chk_2` CHECK ((`competicao` in ('Carioca','Libertadores,','Brasileiro','Copa do Brasil')))
);

INSERT INTO jogador(numeroJogador, posicaoJogador, nomeJogador,fotoJogador)
VALUES
(1, 'Goleiro', 'Santos', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/1/1681793652.jpg'),
(45, 'Goleiro', 'Hugo Souza', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/1/1681794035.jpg'),
(25, 'Goleiro', 'Matheus Cunha', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/1/1681793679.jpg'),

(3, 'Zagueiro', 'Rodrigo Caio', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/2/1681793122.jpg'),
(4, 'Zagueiro', 'Léo Pereira', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/2/1681792369.jpg'),
(23, 'Zagueiro', 'David Luiz', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/2/1681792790.jpg'),
(15, 'Zagueiro', 'Fabrício Bruno', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/2/1681793171.jpg'),
(30, 'Zagueiro', 'Pablo', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/2/1681793342.jpg'),

(34, 'Lateral Direito',  'Matheuzinho', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/3/1676389656.png'),
(2, 'Lateral Direito', 'Varela', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/3/1681793440.jpg'),

(16, 'Lateral Esquerdo', 'Filipe Luís', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/4/1681792841.jpg'),
(6, 'Lateral Esquerdo', 'Ayrton Lucas', 'https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/4/1681792936.jpg'),


(32,'Volante','Arturo Vidal','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/5/1681794051.jpg'),
(8,'Volante','Thiago Maia','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/5/1681793036.jpg'),
(5,'Volante','Erick','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/5/1681793372.jpg'),
(20,'Volante','Gerson','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/5/1681792999.jpg'),

(7,'Meia','Everton Ribeiro','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/6/1681792746.jpg'),
(14,'Meia','De Arrascaeta','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/6/1681793931.jpg'),
(29,'Meia','Victor Hugo','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/6/1681793516.jpg'),
(42,'Meia','Matheus França','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/6/1681793484.jpg'),

(10,'Atacante','Gabi','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/7/1681792471.jpg'),
(27,'Atacante','Bruno Henrique','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/7/1681793086.jpg'),
(9,'Atacante','Pedro','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/7/1681792684.jpg'),
(31,'Atacante','Marinho','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/7/1681793410.jpg'),
(11,'Atacante','Everton','https://fla-bucket-s3-us.s3.amazonaws.com/public/images/players/7/1681792900.jpg');