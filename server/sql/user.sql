CREATE TABLE "user"(
   ID INT PRIMARY KEY     NOT NULL,
   USERNAME           varchar    NOT NULL,
   FULL_NAME varchar,
   PROFILE_PICTURE varchar,
   BIO varchar,
   WEBSITE varchar,
   ACCESS_TOKEN varchar NOT NULL
);
