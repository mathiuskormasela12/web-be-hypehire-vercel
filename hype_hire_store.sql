-- -------------------------------------------------------------
-- TablePlus 5.9.0(538)
--
-- https://tableplus.com/
--
-- Database: hype_hire_store
-- Generation Time: 2024-03-22 3:47:08.2650 AM
-- -------------------------------------------------------------


-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."_prisma_migrations" (
    "id" varchar(36) NOT NULL,
    "checksum" varchar(64) NOT NULL,
    "finished_at" timestamptz,
    "migration_name" varchar(255) NOT NULL,
    "logs" text,
    "rolled_back_at" timestamptz,
    "started_at" timestamptz NOT NULL DEFAULT now(),
    "applied_steps_count" int4 NOT NULL DEFAULT 0,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."Book" (
    "id" uuid NOT NULL,
    "title" varchar(255) NOT NULL,
    "writer" varchar(255) NOT NULL,
    "image" varchar(255) NOT NULL,
    "price" int4 NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."BookTag" (
    "id" uuid NOT NULL,
    "bookId" uuid NOT NULL,
    "tagId" uuid NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."Order" (
    "id" uuid NOT NULL,
    "status" varchar(255) NOT NULL,
    "userId" uuid NOT NULL,
    "bookId" uuid NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."Tag" (
    "id" uuid NOT NULL,
    "name" varchar(255) NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."User" (
    "id" uuid NOT NULL,
    "email" text NOT NULL,
    "password" varchar(255) NOT NULL,
    "point" int4 NOT NULL,
    "createdAt" timestamp(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" timestamp(3) NOT NULL,
    PRIMARY KEY ("id")
);

INSERT INTO "public"."_prisma_migrations" ("id", "checksum", "finished_at", "migration_name", "logs", "rolled_back_at", "started_at", "applied_steps_count") VALUES
('767ce2bb-a8cf-40d4-93a6-ed9dda1f36ff', 'ab9a30313517385cd1687ade99b3eea8a102bf6c2f8bf09572f758936def5890', '2024-03-21 10:18:11.255906+00', '20240321101811_init', NULL, NULL, '2024-03-21 10:18:11.239461+00', 1);

INSERT INTO "public"."Book" ("id", "title", "writer", "image", "price", "createdAt", "updatedAt") VALUES
('03c56845-f7e0-403c-a949-82326f9ced86', 'superderman', 'Grace Kolr', '1711052950440.jpg', 13, '2024-03-21 20:29:10.48', '2024-03-21 20:29:10.48'),
('08849af4-07cf-403f-9613-3c7fb6a327e3', 'test2', 'Grace Kolr', '1711052986863.jpg', 11, '2024-03-21 20:29:46.905', '2024-03-21 20:29:46.905'),
('14b1bdbc-020c-4238-a574-68d3ba6d86b2', 'elon musk', 'Grace Kolr', '1711052966285.jpg', 139, '2024-03-21 20:29:26.326', '2024-03-21 20:29:26.326'),
('4e5a02d4-9ee9-4598-a9de-0f3edca3547a', 'test1', 'Grace Kolr', '1711052982961.jpg', 11, '2024-03-21 20:29:43', '2024-03-21 20:29:43'),
('5ed1f791-e2ab-46e7-aa35-ab566a2d4327', 'spiderman', 'Grace Kolr', '1711052937086.jpg', 18, '2024-03-21 20:28:57.134', '2024-03-21 20:28:57.134'),
('68a84047-e2f3-4a4d-86d3-7d446ffb208a', 'naruto', 'Kishimoto', '1711052886226.jpg', 15, '2024-03-21 20:28:06.272', '2024-03-21 20:28:06.272'),
('6e38b53a-a6f4-449f-a879-b63019fbc467', 'one puch man', 'Amamoto', '1711052897959.jpg', 15, '2024-03-21 20:28:18', '2024-03-21 20:28:18'),
('e6624970-f576-4937-a98f-4b6bcf5bf85b', 'test3', 'Anies', '1711052995480.jpg', 11, '2024-03-21 20:29:55.527', '2024-03-21 20:29:55.527'),
('f94503fa-9148-4868-a1e3-fa2cc0efbdb2', 'boruto', 'Kishimoto', '1711052880892.jpg', 15, '2024-03-21 20:28:00.928', '2024-03-21 20:28:00.928');

INSERT INTO "public"."BookTag" ("id", "bookId", "tagId") VALUES
('1ead38d6-2872-49e2-ac9a-812bc4657801', 'f94503fa-9148-4868-a1e3-fa2cc0efbdb2', 'a0f3b912-db1f-4012-939e-01befcefbf40'),
('2d286182-670c-488e-871d-aae37ef8898a', '14b1bdbc-020c-4238-a574-68d3ba6d86b2', '0e17ada9-11a2-45ca-8e9f-2f0e3ffcc98f'),
('4bc3b9a5-a990-48d1-b497-60e59b7efebb', '68a84047-e2f3-4a4d-86d3-7d446ffb208a', 'a0f3b912-db1f-4012-939e-01befcefbf40'),
('52557b0d-a9ee-47b4-8234-c3c42269c743', '08849af4-07cf-403f-9613-3c7fb6a327e3', '0e17ada9-11a2-45ca-8e9f-2f0e3ffcc98f'),
('72751a59-47c2-487f-aa06-0c9eb8fbe6cc', '6e38b53a-a6f4-449f-a879-b63019fbc467', 'a0f3b912-db1f-4012-939e-01befcefbf40'),
('8f38b041-d903-470f-bd94-fd9317acb82b', '03c56845-f7e0-403c-a949-82326f9ced86', '0e17ada9-11a2-45ca-8e9f-2f0e3ffcc98f'),
('a741e3d8-7545-4d4b-a598-e01c7627d5ed', '4e5a02d4-9ee9-4598-a9de-0f3edca3547a', '0e17ada9-11a2-45ca-8e9f-2f0e3ffcc98f'),
('b16e9232-92ea-40e5-9da1-f635a5cc57b7', 'e6624970-f576-4937-a98f-4b6bcf5bf85b', '0e17ada9-11a2-45ca-8e9f-2f0e3ffcc98f'),
('ee87f03a-7e1a-4e33-9b83-19264d6d50fc', '5ed1f791-e2ab-46e7-aa35-ab566a2d4327', '0e17ada9-11a2-45ca-8e9f-2f0e3ffcc98f');

INSERT INTO "public"."Order" ("id", "status", "userId", "bookId", "createdAt", "updatedAt") VALUES
('4f7f9806-2cba-413f-afc4-c3de288d8cf4', 'CANCELED', 'ae91a1ff-136a-45e7-9acf-1e96c6523ebb', '68a84047-e2f3-4a4d-86d3-7d446ffb208a', '2024-03-21 20:35:36.75', '2024-03-21 20:35:50.117'),
('934ed37b-6589-4303-bb29-095d2c537b98', 'SUCCESS', 'ae91a1ff-136a-45e7-9acf-1e96c6523ebb', 'f94503fa-9148-4868-a1e3-fa2cc0efbdb2', '2024-03-21 20:32:52.378', '2024-03-21 20:35:52.81');

INSERT INTO "public"."Tag" ("id", "name", "createdAt", "updatedAt") VALUES
('0e17ada9-11a2-45ca-8e9f-2f0e3ffcc98f', 'sci-fi', '2024-03-21 20:27:23.847', '2024-03-21 20:27:23.847'),
('a0f3b912-db1f-4012-939e-01befcefbf40', 'anime', '2024-03-21 20:27:31.763', '2024-03-21 20:27:31.763');

INSERT INTO "public"."User" ("id", "email", "password", "point", "createdAt", "updatedAt") VALUES
('186f5949-dcb7-467f-a18e-21baa1c702d6', 'test123@gmail.com', '$2a$08$E2M7i6X6HBQMjxlc/XvNq.G74e1uyee8DzIgqIiz2uFm/jzelL9Ia', 100, '2024-03-21 12:57:39.105', '2024-03-21 12:57:39.105'),
('ab8cc6e9-efce-4187-b61d-e8f675cec759', 'mathius@gmail.com', '$2a$08$iWZsLwlGSQ4e6Q220H//ZugjM/vn9s8v/W2Ba6.IBppk3ERfo/eI2', 100, '2024-03-21 10:46:09.785', '2024-03-21 10:46:09.785'),
('ae91a1ff-136a-45e7-9acf-1e96c6523ebb', 'samdicova@gmail.com', '$2a$08$7gaOjDrjo5iWomYRiSuCiOeotvQzCENKQZdXUVlvXvUi5sPcDR3mW', 100, '2024-03-21 11:49:58.168', '2024-03-21 11:49:58.168'),
('c4a2a36f-45ff-4ae8-be38-9bd2dca61ccb', 'wise@gmail.com', '$2a$08$C1YOaPO9ikukJKMozh10bOBQarSuij.wyMuLLLREwBrsWAAuVPVx.', 100, '2024-03-21 20:37:07.33', '2024-03-21 20:37:07.33'),
('c704db63-461c-4e19-9bf4-878f165b0377', 'test@gmail.com', '$2a$08$oBaKXEqxrndu5tOBNDE37uleJUqp93i3NAcPj7/nqaj6OFSsPcpK6', 100, '2024-03-21 12:57:12.938', '2024-03-21 12:57:12.938'),
('c85d7bfb-6979-45d7-8931-f84facb05faf', 'samdi11cova@gmail.com', '$2a$08$10EPmmrroit6jeljgeZsF.AwLOyRJUjvSoEwKWIKPwHbXmN5qLpoS', 100, '2024-03-21 12:08:16.226', '2024-03-21 12:08:16.226'),
('d7ba12dd-ce16-4a1e-b1d6-fabdfed1668c', 'unsiagram@gmail.com', '$2a$08$BsPqeQRZ8IYLCAktmHlOte2veS4iYafSJXsTkbdwG.Ana.7D.Oczu', 100, '2024-03-21 12:58:18.404', '2024-03-21 12:58:18.404');

ALTER TABLE "public"."BookTag" ADD FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."BookTag" ADD FOREIGN KEY ("tagId") REFERENCES "public"."Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Order" ADD FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "public"."Order" ADD FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
