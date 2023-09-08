CREATE DATABASE  IF NOT EXISTS `spacefla` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spacefla`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: spacefla
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comentarioperfil`
--

DROP TABLE IF EXISTS `comentarioperfil`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentarioperfil` (
  `idComentario` int NOT NULL AUTO_INCREMENT,
  `textoComentario` text,
  `dtComentario` datetime DEFAULT CURRENT_TIMESTAMP,
  `fkUsuarioPerfil` int NOT NULL,
  `fkUsuarioComentario` int NOT NULL,
  PRIMARY KEY (`idComentario`,`fkUsuarioPerfil`,`fkUsuarioComentario`),
  KEY `fkUsuarioPerfil` (`fkUsuarioPerfil`),
  KEY `fkUsuarioComentario` (`fkUsuarioComentario`),
  CONSTRAINT `fkUsuarioComentario` FOREIGN KEY (`fkUsuarioComentario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `fkUsuarioPerfil` FOREIGN KEY (`fkUsuarioPerfil`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `corneta`
--

DROP TABLE IF EXISTS `corneta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
  CONSTRAINT `chkCompeticao` CHECK ((`competicao` in (_utf8mb4'Libertadores',_utf8mb4'Brasileiro',_utf8mb4'Copa do Brasil'))),
  CONSTRAINT `chkTIpo` CHECK ((`tipoCorneta` in (_utf8mb4'Jogando bem',_utf8mb4'Jogando mal')))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `curtidacorneta`
--

DROP TABLE IF EXISTS `curtidacorneta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curtidacorneta` (
  `idCurtida` int NOT NULL AUTO_INCREMENT,
  `fkUsuario` int NOT NULL,
  `fkCorneta` int NOT NULL,
  `dataCurtida` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idCurtida`,`fkUsuario`,`fkCorneta`),
  KEY `fkUsuario` (`fkUsuario`),
  KEY `fkCorneta` (`fkCorneta`),
  CONSTRAINT `fkCorneta` FOREIGN KEY (`fkCorneta`) REFERENCES `corneta` (`idCorneta`),
  CONSTRAINT `fkUsuario` FOREIGN KEY (`fkUsuario`) REFERENCES `usuario` (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `escalacaoideal`
--

DROP TABLE IF EXISTS `escalacaoideal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escalacaoideal` (
  `idEscalacaoIdeal` int NOT NULL AUTO_INCREMENT,
  `fkUsuario` int NOT NULL,
  `fkJogador` int NOT NULL,
  `formacao` char(5) DEFAULT NULL,
  `tatica` char(15) DEFAULT NULL,
  PRIMARY KEY (`idEscalacaoIdeal`,`fkUsuario`,`fkJogador`),
  KEY `fkUsuarioEscalacao` (`fkUsuario`),
  KEY `fkJogadorEscalacao` (`fkJogador`),
  CONSTRAINT `fkJogadorEscalacao` FOREIGN KEY (`fkJogador`) REFERENCES `jogador` (`idJogador`),
  CONSTRAINT `fkUsuarioEscalacao` FOREIGN KEY (`fkUsuario`) REFERENCES `usuario` (`idUsuario`),
  CONSTRAINT `chkEscalacao` CHECK ((`formacao` in (_utf8mb4'4-3-3',_utf8mb4'4-5-1',_utf8mb4'4-4-2'))),
  CONSTRAINT `chkTatica` CHECK ((`tatica` in (_utf8mb4'Ofensivo',_utf8mb4'Neutro',_utf8mb4'Defensivo')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `jogador`
--

DROP TABLE IF EXISTS `jogador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jogador` (
  `idJogador` int NOT NULL AUTO_INCREMENT,
  `numeroJogador` int DEFAULT NULL,
  `posicaoJogador` varchar(50) DEFAULT NULL,
  `nomeJogador` varchar(50) DEFAULT NULL,
  `fotoJogador` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`idJogador`),
  CONSTRAINT `jogador_chk_1` CHECK ((`posicaoJogador` in (_utf8mb4'Goleiro',_utf8mb4'Zagueiro',_utf8mb4'Volante',_utf8mb4'Lateral Direito',_utf8mb4'Lateral Esquerdo',_utf8mb4'Volante',_utf8mb4'Meia',_utf8mb4'Atacante')))
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUsuario` int NOT NULL AUTO_INCREMENT,
  `emailUsuario` varchar(50) DEFAULT NULL,
  `senhaUsuario` char(8) DEFAULT NULL,
  `nomeUsuario` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`idUsuario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-07 16:25:30
