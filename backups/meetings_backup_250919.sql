-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: meetings
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `agenda_comments`
--

DROP TABLE IF EXISTS `agenda_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agenda_item_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `idx_agenda_comments` (`agenda_item_id`,`created_at`),
  CONSTRAINT `agenda_comments_ibfk_1` FOREIGN KEY (`agenda_item_id`) REFERENCES `agenda_items` (`id`) ON DELETE CASCADE,
  CONSTRAINT `agenda_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_comments`
--

LOCK TABLES `agenda_comments` WRITE;
/*!40000 ALTER TABLE `agenda_comments` DISABLE KEYS */;
INSERT INTO `agenda_comments` VALUES (1,1,1,'Θα πρέπει να εξετάσουμε προσεκτικότερα τον κονδύλιο για τις παιδικές χαρές.','2025-09-18 14:32:02','2025-09-18 14:32:02');
/*!40000 ALTER TABLE `agenda_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agenda_items`
--

DROP TABLE IF EXISTS `agenda_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agenda_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meeting_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `category` varchar(100) DEFAULT NULL,
  `presenter` varchar(200) DEFAULT NULL,
  `estimated_duration` int DEFAULT NULL COMMENT 'Duration in minutes',
  `status` enum('pending','in_progress','completed','deferred') DEFAULT 'pending',
  `introduction_file` varchar(500) DEFAULT NULL,
  `decision_file` varchar(500) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_index` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_meeting_order` (`meeting_id`,`order_index`),
  CONSTRAINT `agenda_items_ibfk_1` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`),
  CONSTRAINT `fk_agenda_meeting` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agenda_items`
--

LOCK TABLES `agenda_items` WRITE;
/*!40000 ALTER TABLE `agenda_items` DISABLE KEYS */;
INSERT INTO `agenda_items` VALUES (1,1,'Welcome','Intro by Alice',NULL,NULL,NULL,'pending',NULL,NULL,'2025-09-18 14:30:01','2025-09-18 14:30:01',1),(2,1,'Tech Roadmap','Discuss plans',NULL,NULL,NULL,'pending',NULL,NULL,'2025-09-18 14:30:01','2025-09-18 14:30:01',2),(3,2,'Budget','Review budget',NULL,NULL,NULL,'pending',NULL,NULL,'2025-09-18 14:30:01','2025-09-18 14:30:01',1),(4,1,'Έγκριση Προϋπολογισμού 2025','Συζήτηση και έγκριση του προϋπολογισμού για το επόμενο έτος','Οικονομικά','Αντιδήμαρχος Οικονομικών',45,'completed','eisigisi_proypologismos_2025.pdf','apofasi_proypologismos_2025.pdf','2025-09-18 14:31:25','2025-09-18 14:31:25',1),(5,1,'Αδειοδότηση Νέου Καταστήματος','Εξέταση αίτησης για άδεια λειτουργίας καταστήματος εστίασης','Αδειοδοτήσεις','Προϊστάμενος Τμήματος',20,'in_progress','aitisi_adeias_estiasis.pdf',NULL,'2025-09-18 14:31:25','2025-09-18 14:31:25',2),(6,1,'Κυκλοφοριακές Ρυθμίσεις Κέντρου','Προτάσεις για βελτίωση της κυκλοφορίας στο ιστορικό κέντρο','Κυκλοφορία','Τμήμα Κυκλοφορίας',30,'pending','meleti_kykloforias.pdf',NULL,'2025-09-18 14:31:25','2025-09-18 14:31:25',3);
/*!40000 ALTER TABLE `agenda_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `announcements`
--

DROP TABLE IF EXISTS `announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meeting_id` int DEFAULT NULL,
  `message` text,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `meeting_id` (`meeting_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `announcements_ibfk_1` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`),
  CONSTRAINT `announcements_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcements`
--

LOCK TABLES `announcements` WRITE;
/*!40000 ALTER TABLE `announcements` DISABLE KEYS */;
INSERT INTO `announcements` VALUES (1,1,'Welcome to the tech committee!',1,'2025-09-18 13:03:30'),(2,2,'Finance meeting starts soon.',3,'2025-09-18 13:03:30'),(3,1,'Welcome to the technology committee! Please bring your laptops.',1,'2025-09-18 13:33:30'),(4,2,'Finance meeting will include budget presentation.',3,'2025-09-18 13:33:30');
/*!40000 ALTER TABLE `announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meeting_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `status` enum('present','absent','excused') DEFAULT 'present',
  `checked_in_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `meeting_id` (`meeting_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`),
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,1,1,'present',NULL),(2,1,2,'present',NULL),(3,2,3,'present',NULL);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meeting_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `message` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `meeting_id` (`meeting_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`),
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,2,'Looking forward to this!','2025-09-18 13:04:10'),(2,2,3,'Budget looks good.','2025-09-18 13:04:10'),(3,1,2,'Looking forward to this technology discussion!','2025-09-18 13:33:30'),(4,2,3,'The budget numbers look good for this quarter.','2025-09-18 13:33:30');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `committee_members`
--

DROP TABLE IF EXISTS `committee_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `committee_members` (
  `committee_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`committee_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `committee_members_ibfk_1` FOREIGN KEY (`committee_id`) REFERENCES `committees` (`id`),
  CONSTRAINT `committee_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `committee_members`
--

LOCK TABLES `committee_members` WRITE;
/*!40000 ALTER TABLE `committee_members` DISABLE KEYS */;
INSERT INTO `committee_members` VALUES (1,1),(1,2),(2,3),(1,4),(3,4),(1,5),(2,6),(3,6);
/*!40000 ALTER TABLE `committee_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `committees`
--

DROP TABLE IF EXISTS `committees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `committees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `committees`
--

LOCK TABLES `committees` WRITE;
/*!40000 ALTER TABLE `committees` DISABLE KEYS */;
INSERT INTO `committees` VALUES (1,'Tech Committee','Handles all tech stuff'),(2,'Finance Committee','Manages finances'),(3,'Planning Committee','Strategic planning and development'),(4,'Test Committee','Created from React'),(5,'Νέα Επιτροπή','Δημιουργήθηκε από το interface');
/*!40000 ALTER TABLE `committees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meeting_id` int DEFAULT NULL,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) DEFAULT NULL,
  `url` varchar(255) NOT NULL,
  `file_path` varchar(500) DEFAULT NULL,
  `uploaded_by` int NOT NULL,
  `uploaded_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `size` int DEFAULT NULL,
  `file_type` varchar(100) DEFAULT NULL,
  `description` text,
  `category` varchar(50) DEFAULT 'general',
  `tags` text,
  `download_count` int DEFAULT '0',
  `is_public` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `idx_files_category` (`category`),
  KEY `idx_files_uploaded_by` (`uploaded_by`),
  KEY `idx_files_meeting_id` (`meeting_id`),
  KEY `idx_files_is_public` (`is_public`),
  CONSTRAINT `files_ibfk_1` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`),
  CONSTRAINT `files_ibfk_2` FOREIGN KEY (`uploaded_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (1,NULL,'sample_meeting_minutes.pdf','Πρακτικά Συνεδρίασης Σεπτεμβρίου 2025.pdf','/uploads/sample_meeting_minutes.pdf',NULL,1,'2025-09-19 09:26:01',2485760,'application/pdf','Πρακτικά της τακτικής συνεδρίασης του Διοικητικού Συμβουλίου','meetings','[\"πρακτικά\", \"συνεδρίαση\", \"διοικητικό\"]',23,1),(2,NULL,'annual_report_2024.docx','Ετήσια Έκθεση 2024.docx','/uploads/annual_report_2024.docx',NULL,1,'2025-09-19 09:26:01',5242880,'application/vnd.openxmlformats-officedocument.wordprocessingml.document','Αναλυτική ετήσια έκθεση δραστηριοτήτων και οικονομικών στοιχείων','reports','[\"έκθεση\", \"ετήσια\", \"οικονομικά\"]',45,1),(3,NULL,'budget_proposal_2026.xlsx','Πρόταση Προϋπολογισμού 2026.xlsx','/uploads/budget_proposal_2026.xlsx',NULL,1,'2025-09-19 09:26:01',1048576,'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','Προτεινόμενος προϋπολογισμός για το έτος 2026','documents','[\"προϋπολογισμός\", \"2026\", \"οικονομικά\"]',12,0),(4,NULL,'committee_photo_2025.jpg','Φωτογραφία Επιτροπής 2025.jpg','/uploads/committee_photo_2025.jpg',NULL,1,'2025-09-19 09:26:01',3145728,'image/jpeg','Ομαδική φωτογραφία των μελών της επιτροπής','images','[\"φωτογραφία\", \"επιτροπή\", \"μέλη\"]',8,1),(5,NULL,'training_video.mp4','Εκπαιδευτικό Βίντεο Διαδικασιών.mp4','/uploads/training_video.mp4',NULL,1,'2025-09-19 09:26:01',52428800,'video/mp4','Εκπαιδευτικό βίντεο για τις νέες διαδικασίες','videos','[\"εκπαίδευση\", \"διαδικασίες\", \"βίντεο\"]',15,1);
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meetings`
--

DROP TABLE IF EXISTS `meetings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `committee_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `scheduled_at` datetime DEFAULT NULL,
  `created_by` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `location` varchar(255) DEFAULT 'Αίθουσα Δημοτικού Συμβουλίου',
  `status` enum('scheduled','in_progress','completed','cancelled') DEFAULT 'scheduled',
  PRIMARY KEY (`id`),
  KEY `committee_id` (`committee_id`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `meetings_ibfk_1` FOREIGN KEY (`committee_id`) REFERENCES `committees` (`id`),
  CONSTRAINT `meetings_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meetings`
--

LOCK TABLES `meetings` WRITE;
/*!40000 ALTER TABLE `meetings` DISABLE KEYS */;
INSERT INTO `meetings` VALUES (1,1,'Tech Kickoff','First tech meeting','2025-09-20 10:00:00',1,'2025-09-18 13:01:16','Αίθουσα Δημοτικού Συμβουλίου','scheduled'),(2,2,'Finance Review','Quarterly review','2025-09-21 14:00:00',3,'2025-09-18 13:01:16','Αίθουσα Δημοτικού Συμβουλίου','scheduled'),(3,1,'Tech Kickoff Meeting','First technology committee meeting','2025-09-25 10:00:00',1,'2025-09-18 13:33:30','Αίθουσα Δημοτικού Συμβουλίου','scheduled'),(4,2,'Finance Review Q3','Quarterly financial review','2025-09-26 14:00:00',3,'2025-09-18 13:33:30','Αίθουσα Δημοτικού Συμβουλίου','scheduled'),(5,3,'Strategic Planning Session','Annual planning meeting','2025-09-27 09:00:00',1,'2025-09-18 13:33:30','Αίθουσα Δημοτικού Συμβουλίου','scheduled');
/*!40000 ALTER TABLE `meetings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(3,'guest'),(2,'member');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meeting_id` int DEFAULT NULL,
  `assigned_to` int DEFAULT NULL,
  `description` text,
  `status` enum('pending','in_progress','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `meeting_id` (`meeting_id`),
  KEY `assigned_to` (`assigned_to`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`),
  CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (1,1,2,'Prepare slides','pending','2025-09-18 13:04:24'),(2,2,3,'Send budget report','in_progress','2025-09-18 13:04:24'),(3,1,2,'Prepare technology roadmap presentation','pending','2025-09-18 13:33:30'),(4,2,3,'Send quarterly budget report to all members','in_progress','2025-09-18 13:33:30'),(5,3,1,'Draft strategic plan outline','pending','2025-09-18 13:33:30');
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_roles`
--

DROP TABLE IF EXISTS `user_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_roles` (
  `user_id` int NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_roles_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_roles_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_roles`
--

LOCK TABLES `user_roles` WRITE;
/*!40000 ALTER TABLE `user_roles` DISABLE KEYS */;
INSERT INTO `user_roles` VALUES (1,1),(4,1),(5,1),(2,2),(3,2),(6,2);
/*!40000 ALTER TABLE `user_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'alice@example.com','hashed_pw1','Alice','2025-09-18 13:01:16'),(2,'bob@example.com','hashed_pw2','Bob','2025-09-18 13:01:16'),(3,'carol@example.com','hashed_pw3','Carol','2025-09-18 13:01:16'),(4,'ada@demo.gr','hashed_pw1','Ada','2025-09-18 13:31:13'),(5,'admin@demo.gr','hashed_admin','Admin User','2025-09-18 13:31:13'),(6,'member@demo.gr','hashed_member','Member User','2025-09-18 13:31:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote_results`
--

DROP TABLE IF EXISTS `vote_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vote_results` (
  `id` int NOT NULL AUTO_INCREMENT,
  `agenda_item_id` int NOT NULL,
  `votes_for` int DEFAULT '0',
  `votes_against` int DEFAULT '0',
  `votes_abstain` int DEFAULT '0',
  `total_votes` int DEFAULT '0',
  `result` enum('approved','rejected','no_quorum') COLLATE utf8mb4_unicode_ci NOT NULL,
  `voted_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_agenda_vote` (`agenda_item_id`),
  CONSTRAINT `vote_results_ibfk_1` FOREIGN KEY (`agenda_item_id`) REFERENCES `agenda_items` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote_results`
--

LOCK TABLES `vote_results` WRITE;
/*!40000 ALTER TABLE `vote_results` DISABLE KEYS */;
INSERT INTO `vote_results` VALUES (1,1,12,3,2,17,'approved','2025-09-18 14:31:47');
/*!40000 ALTER TABLE `vote_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `votes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `meeting_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `Opt` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `meeting_id` (`meeting_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`meeting_id`) REFERENCES `meetings` (`id`),
  CONSTRAINT `votes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
INSERT INTO `votes` VALUES (1,1,1,'yes','2025-09-18 13:02:48'),(2,1,2,'no','2025-09-18 13:02:48'),(3,2,3,'yes','2025-09-18 13:02:48'),(4,1,1,'yes','2025-09-18 13:33:30'),(5,1,2,'no','2025-09-18 13:33:30'),(6,2,3,'yes','2025-09-18 13:33:30');
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-19 12:41:01
