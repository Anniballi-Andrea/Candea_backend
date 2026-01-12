-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: db_candea
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'autunno'),(2,'inverno'),(3,'estate'),(4,'primavera'),(5,'dolce'),(6,'rilassante'),(7,'energizzante'),(8,'forte');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_product`
--

DROP TABLE IF EXISTS `category_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_product` (
  `category_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`category_id`,`product_id`),
  KEY `category_id_idx` (`category_id`),
  KEY `product_id_idx` (`product_id`),
  CONSTRAINT `category_product_category_id` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `category_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_product`
--

LOCK TABLES `category_product` WRITE;
/*!40000 ALTER TABLE `category_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discount_codes`
--

DROP TABLE IF EXISTS `discount_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discount_codes` (
  `id` bigint NOT NULL,
  `code` varchar(20) NOT NULL,
  `value` tinyint NOT NULL,
  `valid_from` datetime DEFAULT NULL,
  `valid_to` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discount_codes`
--

LOCK TABLES `discount_codes` WRITE;
/*!40000 ALTER TABLE `discount_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `discount_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product` (
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  `quantity` tinyint DEFAULT '1',
  PRIMARY KEY (`order_id`,`product_id`),
  KEY `order_product_product_id_idx` (`product_id`),
  CONSTRAINT `order_product_order_id` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_product_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `discount_code_id` bigint DEFAULT NULL,
  `shipment_code` varchar(20) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `total_amount` decimal(8,2) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(10) NOT NULL,
  `city` varchar(50) NOT NULL,
  `province` varchar(50) NOT NULL,
  `street` varchar(50) NOT NULL,
  `street_number` smallint DEFAULT NULL,
  `zip_code` char(5) NOT NULL,
  `free_shipping` tinyint DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `shipment_code_UNIQUE` (`shipment_code`),
  KEY `orders_discont_code_id_foreign_idx` (`discount_code_id`),
  CONSTRAINT `orders_discont_code_id_foreign` FOREIGN KEY (`discount_code_id`) REFERENCES `discount_codes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `img` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `slug` varchar(100) NOT NULL,
  `initial_price` decimal(8,2) NOT NULL,
  `actual_price` decimal(8,2) DEFAULT NULL,
  `color` varchar(100) DEFAULT NULL,
  `dimensions` varchar(100) NOT NULL,
  `scent` varchar(100) DEFAULT NULL,
  `burn_time` varchar(100) DEFAULT NULL,
  `ingredients` varchar(100) DEFAULT NULL,
  `available_quantity` smallint DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'happy bee','img/happy_bee.jpg','Lascia che il bagliore di Happy Bee ti sollevi lo spirito e illumini la giornata. Questa miscela energizzante è stata creata per accendere la gioia e risvegliare la positività, a partire dalle note di testa agrumate di arancia dolce e bergamotto, seguite da delicate note di cuore floreali di gardenia e gelsomino.','happy_bee',10.00,NULL,'arancione','11x6cm','arancia dolce, bergamotto, gardenia, gelsomino, rosa','18 ore','cera d\'api di provenienza locale, oli essenziali, piante essiccate',20,'2026-01-12 10:43:54','2026-01-12 16:05:49'),(2,'the shire – second breakfast','img/the_shire.jpg','Un cottage illuminato dal sole, un caldo tavolo di legno ed erbe aromatiche essiccate vicino alla finestra: questa miscela accogliente cattura il comfort di una mattina tranquilla. La cera d\'api versata a mano diffonde una delicata luce mielata, mentre agrumi vivaci, erbe aromatiche e spezie da cucina rendono il tuo spazio accogliente.','the_shire_second_breakfast',12.00,NULL,'verde','12x5cm','arancia dolce, cardamomo, rosmarino, cedro, chiodi di garofano','14 ore','cera d\'api di provenienza locale, oli essenziali, piante essiccate',16,'2026-01-12 11:03:18','2026-01-12 16:07:32'),(3,'fresh start','img/fresh_start.jpg','Progettato per liberare la mente dal disordine e rinfrescare il tuo spazio a ogni utilizzo. Questa miscela rinvigorente di eucalipto, menta verde e lavanda crea un\'atmosfera fresca che ti aiuta a ritrovare la concentrazione, a respirare più profondamente e ad affrontare consapevolmente nuove routine.','fresh_start',30.00,NULL,'bianco','12x5cm','eucalipto, menta verde, lavanda ','19 ore','cera d\'api di provenienza locale, oli essenziali, piante essiccate',53,'2026-01-12 11:10:43','2026-01-12 11:10:43'),(4,'eternal flame','img/eternal_flame.jpg','Accendi il tuo spirito con il potere radioso dei segni di fuoco: Ariete, Leone e Sagittario. Realizzata a mano con cera d\'api dorata e impreziosita da note di cannella, chiodi di garofano, arancia e pepe nero, questa candela arde di calore, passione ed energia intrepida. ','eternal_flame',12.00,NULL,'arancione','13x6cm','cannella, chiodi di garofano, arancia, pepe nero','14 ore','cera d\'api di provenienza locale, oli essenziali, piante essiccate',16,'2026-01-12 11:34:34','2026-01-12 11:34:34'),(5,'winter court ','img/winter_court.jpg','Respira il silenzio di una nevicata sotto le stelle. Winter Court avvolge il tuo spazio con la sua scintillante freschezza agrumata e un comfort sempreverde, come neve fresca sui rami di pino con un tocco di spezie invernali.','winter_court',16.00,NULL,'bianco e azzurro','13x8cm','menta piperita glassata, scorza di limone zuccherata, anice stellato, aghi di abete','16 ore','cera d\'api di provenienza locale, oli essenziali, piante essiccate',22,'2026-01-12 11:41:12','2026-01-12 11:41:12'),(6,'easy bee ','img/easy_bee.jpg','Lascia che il tuo cuore prenda il volo con Easy Bee, una miscela stravagante delle più gioiose essenze botaniche della natura, creata per sollevare il morale e calmare la mente. Realizzata a mano con cera d\'api completamente naturale di provenienza locale, questa candela brucia in modo pulito e luminoso.','easy_bee',12.00,NULL,'violetto','14x7cm','lavanda, salvia sclarea, gelsomino, citronella, camomilla ','15 ore','cera d\'api di provenienza locale, oli essenziali, piante essiccate',18,'2026-01-12 11:57:14','2026-01-12 11:57:14'),(7,'tidy bee','img/tidy_bee.jpg','Una miscela purificante di lino solare, eucalipto e lavanda, arricchita da tocchi di agrumi e menta. Realizzata a mano con cera d\'api locale, trasforma ogni spazio in un rifugio di luce e serenità','tidy_bee',14.00,NULL,'bianco','13x8cm','Lino fresco, cotone, limone, eucalipto, lavanda, salvia sclarea, bergamotto, menta piperita','18 ore','cera d\'api di provenienza locale',20,'2026-01-12 11:59:34','2026-01-12 11:59:34'),(8,'ocean bloom','img/ocean_bloom.jpg','Ocean Bloom ti trasporta verso spiagge baciate dal sole e calette segrete dove le sirene danzano sulla schiuma. Versato in un barattolo di vetro marino scintillante, la sua cera d\'api bianca cremosa e il setoso olio di cocco creano una tela incontaminata per una vera e propria fuga tropicale. ','ocean_bloom',16.00,NULL,'azzurro','13x8cm','lime, arancia , lavanda, eucalipto, lavanda, menta verde, cocco e vaniglia','18 ore','cera d\'api di provenienza locale',26,'2026-01-12 12:11:16','2026-01-12 12:11:16'),(9,'florida water – “waters of blessing”','img/florida_water_blessing.jpg','Purifica l\'aria, rinfresca lo spirito e risveglia la magia che scorre dentro di te. La candela Florida Water cattura l\'essenza delle acque sacre da sempre utilizzate per la purificazione, la protezione e il rinnovamento spirituale.','florida_water_blessing',12.00,NULL,'bianco','13x8cm','agrumi , lavanda, chiodi di garofano e cannella','18 ore','cera d\'api di provenienza locale',26,'2026-01-12 12:15:42','2026-01-12 12:15:42'),(10,'buzzing bee','img/buzzing_bee.jpg','Un ricco blend di caffè appena preparato, latte cremoso, nocciola tostata e vaniglia dolce. Realizzata a mano in pura cera d\'api locale, è la musa mattutina che carica lo spirito e risveglia la creatività.','buzzing_bee',12.00,NULL,'marroncino','13x8cm','Caffè, Latte, Nocciola, Vaniglia','18 ore','cera d\'api di provenienza locale',26,'2026-01-12 12:17:11','2026-01-12 12:17:11'),(11,'beauty bee','img/beauty_bee.jpg','Lascia che la tua luce risplenda con Beauty Bee, una miscela nutriente per l\'anima, creata per risvegliare la fiducia in se stessi e abbracciare l\'amore per se stessi. Infuso con il delicato romanticismo di rosa e lavanda, il cuore di questa candela sboccia con ylang-ylang, bergamotto e salvia sclarea, mentre patchouli e incenso ti radicano in una calma radiosa.','beauty_bee',12.00,NULL,'rosa','13x8cm','rosa, lavanda, bergamotto e salvia ','18 ore','cera d\'api di provenienza locale',23,'2026-01-12 12:20:42','2026-01-12 12:20:42'),(12,'moon phase','img/moon_phase.jpg','Un piccola altare lunare in pura cera d\'api con scintillio perlato. Blend celeste di lavanda calmante, bergamotto solare, gelsomino illuminante e legni terreni, per rituali di rinnovamento, chiarezza e introspezione.','moon_phase',9.00,NULL,'bianco','13x8cm','Legni teneri, Serenità al chiaro di luna','18 ore','cera d\'api di provenienza locale',18,'2026-01-12 12:21:31','2026-01-12 12:21:31'),(13,'successful bee','img/successful_bee.jpg','Entra nel tuo potere e invita il successo in ogni ambito della tua vita. Realizzata a mano con pura cera d\'api e olio di cocco, questa candela risplende di riflessi dorati e del profumo rinvigorente.','successful_bee',16.00,NULL,'giallo','13x8cm','arancia dolce, cannella, rosmarino e incenso.','16 ore','cera d\'api di provenienza locale',5,'2026-01-12 12:24:45','2026-01-12 12:24:45'),(14,'aqua tofana','img/aqua_tofana.jpg','Una candela-incantesimo che racchiude l\'essenza di un elisir lunare. Miscela eterea di ninfea, bergamotto, violetta e muschio bianco, avvolta in un\'aura di mistero floreale e botanico. Perfetta per trasformare la casa in un giardino segreto al crepuscolo.','aqua_tofana',11.00,NULL,'bianco','13x8cm','Bergamotto, Ninfea, Violetta, Muschio bianco','16 ore','cera d\'api di provenienza locale',18,'2026-01-12 12:27:28','2026-01-12 12:27:28'),(15,'golden intention','img/golden_intention.jpg','Golden Intention è una candela che trasmette energia costante e una tranquilla sicurezza. Pensata per radicare il tuo spazio, incoraggiando chiarezza e fiducia in te stesso, questa calda miscela avvolge la stanza in un\'atmosfera confortevole senza sopraffare i sensi.','golden_intention',11.00,NULL,'bianco','11x8cm','miele e vaniglia','19 ore','cera d\'api di provenienza locale',35,'2026-01-12 12:30:45','2026-01-12 12:30:45'),(16,'pene_nature','img/pene_nature.jpg','Le Candeline a Forma di Pene Nature sono un’aggiunta giocosa per rendere qualsiasi festa più divertente e fuori dagli schemi. Ogni candela ha una forma simpatica e irriverente, perfetta per compleanni, addii al nubilato o serate tra amici. La confezione include cinque candele che illuminano l’ambiente con un tocco ironico e festoso. Facili da posizionare e accendere, trasformano ogni evento in un momento indimenticabile. Ideali per chi ama sorprendere con dettagli originali.','pene_nature',5.00,NULL,'rosa','5x2cm','ylang-ylang, muschio bianco e fiori d’arancio','4 ore','cera d\'api di provenienza locale oli essenziali, piante essiccate',65,'2026-01-12 12:42:41','2026-01-12 12:42:41'),(17,'the hive','img/the_hive.jpg','Benvenuti nel Nido (Hive) d\'Api, dove potrete liberare il vostro lato più selvaggio e vivace.','the_hive',3.00,NULL,'giallo','4,3x4,6cm','miele di castagno','8 ore','cera d\'api di provenienza locale',25,'2026-01-12 12:46:07','2026-01-12 16:08:34'),(18,'goddess candle','img/goddess_candle.jpg','Questa candela mette in risalto il corpo della Divina Dea Femminile, celebrando le meraviglie dell\'essere donna e il potere delle forme femminili. Ispirando la bellezza e la potenza del corpo femminile.','goddess_candle',3.00,NULL,'beige','7x3cm','miele e vaniglia','8 ore','cera d\'api di provenienza locale',28,'2026-01-12 12:50:41','2026-01-12 12:50:41'),(19,'fairy glen','img/fairy_glen.jpg','Una candela magica che evoca il cuore di un bosco incantato. Un portale verso il mistero e la meraviglia della natura','fairy_glen',9.00,NULL,'giallo','4,3x6,6cm','Floreale, Rugiadoso, Gelsomino, Muschio di Quercia, Vaniglia','8 ore','cera d\'api di provenienza locale, oli essenziali, olio di cocco',25,'2026-01-12 16:12:24','2026-01-12 16:12:24'),(20,'Enchanted Confection','img/enchanted_confection.jpg','Una dolce celebrazione in forma di candela. Porta gioia, abbondanza e momenti di puro conforto.','enchanted_confection',11.00,NULL,'bianco','4,5x5,7cm','Arancia, Cacao, Vaniglia, Cannella, Noce moscata','25 ore','cera d\'api di provenienza locale, oli essenziali, olio di cocco',15,'2026-01-12 16:13:27','2026-01-12 16:13:27');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-12 16:23:46
