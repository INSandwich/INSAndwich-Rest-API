PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS Category(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name CHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Roles(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name CHAR(50) NOT NULL
);

INSERT INTO Roles (Name) Values("Guest");
INSERT INTO Roles (Name) Values("Customer");
INSERT INTO Roles (Name) Values("Admin");

CREATE TABLE IF NOT EXISTS Users(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  FirstName CHAR(100) NOT NULL,
  LastName CHAR(100) NOT NULL,
  Email CHAR(254) NOT NULL,
  Login CHAR(50) UNIQUE NOT NULL,
  Password CHAR(254) NOT NULL,
  Adresse CHAR(300) NOT NULL,
  Tokens INTEGER default 0,
  Role_Id INTEGER NOT NULL default 1,
  CONSTRAINT fk_role_id FOREIGN KEY (Role_Id) REFERENCES Roles(Id)
);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li", "dolor", "rue sit", 5);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li2", "dolor", "rue sit", 2);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li3", "dolor", "rue sit", 1);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li4", "dolor", "rue sit", 822);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li5", "dolor", "rue sit", 12);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens)
  VALUES ("Lorem", "ipsum", "Lorem.ipsum@dolor", "li6", "dolor", "rue sit", 42);

CREATE TABLE IF NOT EXISTS Products(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name CHAR(80) NOT NULL,
  Description TEXT,
  Available INTEGER default 0,
  Image CHAR(60) NOT NULL,
  Price REAL NOT NULL,
  Category_Id INTEGER,
  CONSTRAINT fk_category_id FOREIGN KEY (Category_Id) REFERENCES Category(Id)
);

CREATE TABLE IF NOT EXISTS Commands(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  User_Id INTEGER NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (User_Id) REFERENCES Users(Id)
);

CREATE TABLE IF NOT EXISTS Command_Lines(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Amount INTEGER DEFAULT 1,
  Command_Id INTEGER NOT NULL,
  Product_Id INTEGER NOT NULL,
  CONSTRAINT fk_command_id FOREIGN KEY (Command_Id) REFERENCES Commands(Id),
  CONSTRAINT fk_product_id FOREIGN KEY (Product_Id) REFERENCES Products(Id)
);

COMMIT;
