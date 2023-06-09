
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
  CONSTRAINT `chkTIpo` CHECK ((`tipoCorneta` in ('Jogando bem','Jogando mal'))),
  CONSTRAINT `chkCompeticao` CHECK ((`competicao` in ('Libertadores','Brasileiro','Copa do Brasil')))
);
CREATE TABLE curtidaCorneta(
  idCurtida int auto_increment,
  fkUsuario int,
  fkCorneta int,
  dataCurtida DATETIME default current_timestamp,
  constraint fkUsuario foreign key(fkUsuario) references usuario(idUsuario),
  constraint fkCorneta foreign key(fkCorneta) references corneta(idCorneta),
  constraint pkCurtida primary key(idCurtida, fkUsuario, fkCorneta)
);

CREATE TABLE escalacaoIdeal(
	idEscalacaoIdeal int auto_increment,
    fkUsuario int,
    constraint fkUsuarioEscalacao foreign key(fkUsuario) references usuario(idUsuario),
    fkJogador int,
    constraint fkJogadorEscalacao foreign key(fkJogador) references jogador(idJogador),
    formacao CHAR(5),
    tatica CHAR(15),
    constraint chkTatica check(tatica in('Ofensivo', 'Neutro', 'Defensivo')),
    constraint chkEscalacao check(formacao in('4-3-3','4-5-1','4-4-2')),
    constraint pkEscalacao primary key(idEscalacaoIdeal, fkUsuario, fkJogador)
);
CREATE TABLE comentarioPerfil(
	idComentario int auto_increment,
    textoComentario TEXT,
    dtComentario DATETIME default now(),
    fkUsuarioPerfil int,
    constraint fkUsuarioPerfil foreign key(fkUsuarioPerfil) references usuario(idUsuario),
	fkUsuarioComentario int,
    constraint fkUsuarioComentario foreign key(fkUsuarioComentario) references usuario(idUsuario),
    constraint pkComentario primary key(idComentario, fkUsuarioPerfil, fkUsuarioComentario)
);

SELECT * FROM escalacaoIdeal;
TRUNCATE TABLE escalacaoIdeal;
INSERT INTO jogador(numeroJogador, posicaoJogador, nomeJogador,fotoJogador)
VALUES
(1, 'Goleiro', 'Santos', 'santos.png'),
(45, 'Goleiro', 'Hugo Souza', 'hugo.png'),
(25, 'Goleiro', 'Matheus Cunha', 'matheus.png'),

(3, 'Zagueiro', 'Rodrigo Caio', 'rodrigo.png'),
(4, 'Zagueiro', 'Léo Pereira', 'leo.png'),
(23, 'Zagueiro', 'David Luiz', 'david.png'),
(15, 'Zagueiro', 'Fabrício Bruno', 'fabricio.png'),
(30, 'Zagueiro', 'Pablo', 'pablo.png'),

(34, 'Lateral Direito',  'Matheuzinho', 'matheuszinho.png'),
(2, 'Lateral Direito', 'Varela', 'varela.png'),

(16, 'Lateral Esquerdo', 'Filipe Luís', 'filipe.png'),
(6, 'Lateral Esquerdo', 'Ayrton Lucas', 'ayrton.png'),


(32,'Volante','Arturo Vidal','vidal.png'),
(8,'Volante','Thiago Maia','thiago.png'),
(5,'Volante','Erick','pulgar.png'),
(20,'Volante','Gerson','gerson.png'),

(7,'Meia','Everton Ribeiro','ribeiro.png'),
(14,'Meia','De Arrascaeta','arrasca.png'),
(29,'Meia','Victor Hugo','victor.png'),
(42,'Meia','Matheus França','franca.png'),

(10,'Atacante','Gabi','gabi.png'),
(27,'Atacante','Bruno Henrique','bruno.png'),
(9,'Atacante','Pedro','pedro.png'),
(31,'Atacante','Marinho','marinho.png'),
(11,'Atacante','Everton','cebola.png');