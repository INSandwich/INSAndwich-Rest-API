PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS Category(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Name CHAR(50) NOT NULL
);

INSERT INTO Category (Name) Values("Sandwiches");
INSERT INTO Category (Name) Values("Desserts");
INSERT INTO Category (Name) Values("Boissons");

CREATE TABLE IF NOT EXISTS Users(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  FirstName CHAR(100) NOT NULL,
  LastName CHAR(100) NOT NULL,
  Email CHAR(254) NOT NULL,
  Login CHAR(50) UNIQUE NOT NULL,
  Password CHAR(254) NOT NULL,
  Adresse CHAR(300) NOT NULL,
  Tokens INTEGER default 10,
  Role CHAR(50) default 'user'
);

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Tokens, Role)
  VALUES ("Admin", "istrateur", "admin@admin", "admin", "f71dbe52628a3f83a77ab494817525c6", "pwal", 50000, 'admin');

INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse)
  VALUES ("Alexandre", "Dufeil", "Alexandre.Dufeil@insa-lyon.fr", "noob", "9cb4afde731e9eadcda4506ef7c65fa2", "Rue ;) ;) ");


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

INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Kebab", "Le classique kebab, toujours la star des sandwicheries. Laissez vous tenter par cette douceur turque. Le terme kebab signifie « grillade », « viande grillée » et désigne différents plats à base de viande grillée dans de nombreux pays ayant généralement fait partie des mondes ottoman et perse (dont l'Inde du Nord)1,2,3. Dans son utilisation francophone, comme dans d'autres langues occidentales, le terme utilisé seul désigne spécifiquement le sandwich fourré de viande grillée à la broche ou döner kebab, ainsi que, par métonymie, le type de restaurant qui le sert. Parmi les équivalents les plus courants du terme döner kebab, le mot shawarma (et ses variantes) est utilisé au Moyen-Orient. Ces termes désignent tous, soit la viande et son mode de préparation, soit le sandwich correspondant.", 1, "http://www.goldenmoustache.com/wp-content/uploads/2016/05/2b5747be-847b-42d4-a9d0-cd919b159c9e_maxi-kebab-vip-mag-171-1.jpg", 2.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Galette Saucisse", "La Bretagne au rendez vous, quoi de mieux qu'une bonne saucisse enroulée dans sa galette pour se remémorer son beau pays?", 1, "http://tyvince.fr/wp-content/uploads/2015/02/galette-saucisse.png", 2.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Tacos", "Parlons peu, parlons bien, quel est le sandwich préféré des étudiants ? Bien evidemment le tacos ! Goutez à ce concentré d'énergie !", 1, "http://mustikebab.com/wp-content/uploads/2016/02/Tacos-poulet-musti-kebab.jpg", 3.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Triade de Triangles", "Le connu et reconnu triangle, repas des guerriers et des routiers.", 1, "https://media.meltyfood.fr/article-2201321-fb-f1399368689/les-raisons-scientifiques-du-sandwich-triangle.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Bagel Carnivore", "Du bacon, du jambon de pays, du jambon cuit.", 1, "http://bigapplebagels.com/media/1032/menu-intro_deli-sandwich.png", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Suedois", "Brrrrr, le grand froid, le saumon, les jolies blondes... Bref la suède quoi ! Et quoi de meilleur que leur sandwich suedois ?", 1, "http://www.patisseriepalanque.com/WebRoot/LaPoste2/Shops/box16474/4F29/9530/6F19/F58C/B967/0A0C/05EA/74B3/Isandwich_suedois_saumon.jpg", 2, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Churros", "Un vrai met de festival, venez apprecier nos churros faits avec amour...", 1, "https://smittenkitchendotcom.files.wordpress.com/2016/03/churros1.jpg", 1, 2);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Crêpes", "Quand il fait froid, rien de tel qu'une bonne crêpe au nutella pour se réchauffer, et satisfaire ses papilles...", 1, "https://i.ytimg.com/vi/FRDMBhBKB7M/maxresdefault.jpg", 2, 2);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Gaufres", "Un autre met d'hiver, l'incontournable gauffre. Quel enfant refuserais une gaufre ?", 1, "http://demandware.edgesuite.net/aahv_prd/on/demandware.static/-/Sites-catalog-picard/default/dw1f7dd809/produits/pains-viennoiseries/edition/000000000000043455_E2.jpg", 2.5, 2);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Glace", "Plutôt un met d'été, mais aussi agréable et apprécié en hiver, la glace ! C'est froid, mais qu'est-ce que c'est bon ! La crème glacée, ou simplement la glace, est un entremets élaboré à partir de la crème, elle-même faite à partir de lait, de sucre, de fruits et d'arômes variés ; on y ajoute parfois des jaunes d'œufs. Elle diffère du sorbet, qui se compose de sirop de sucre (50 % d'eau, 50 % de sucre) et de pulpe de fruit ou d'un arôme, un alcool ou encore de lait concentré sucré et de crème fouettée. La glace, quant à elle, est un mélange de protéines (laitières, végétales ou issues d’œufs), de matières grasses (laitières, végétales ou issues d’œufs) et de sucres. Elle prend différentes dénominations selon les ingrédients mis en œuvre : glace au lait, glace aux œufs.", 1, "http://www.newhealthadvisor.com/images/1HT02932/ice%20cream.jpg", 2.5, 2);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Glace à l'eau", "Une glace à l'eau, glace au sirop, pop glacé au Canada francophone ou encore glaçon en Belgique et par antonomase popsicle et Mr. Freeze au Québec, est un dessert glacé constitué d'un bâton d'eau glacée, l'eau étant sucrée, le plus souvent colorée et aromatisée.", 1, "https://upload.wikimedia.org/wikipedia/commons/8/86/Icepop-green.jpg", 2.5, 2);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Coca-cola", "The one and only coke. La recette est secrète, mais c'est aussi secretement bon...", 1, "https://pbs.twimg.com/profile_images/770467680012890112/kSz1jtnn.jpg", 0.5, 3);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Orangina", "Les oranges, le matin, le midi, le soir, mais surtout sous forme liquide !", 1, "http://en.wikifur.com/w/images/c/c4/Orangina_logo.JPG", 0.5, 3);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Iced-Tea", "Venez déguster notre thé glacé maison, fait avec tout le savoir faire américain.", 1, "http://s.eatthis-cdn.com/media/images/ext/675083154/sweet-iced-tea.jpg", 0.5, 3);

CREATE TABLE IF NOT EXISTS Commands(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  CreationDate TEXT,
  IsPaid INTEGER default 0,
  User_Id INTEGER NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (User_Id) REFERENCES Users(Id)
);

INSERT INTO Commands(User_id) VALUES(1);
INSERT INTO Commands(User_id) VALUES(1);
INSERT INTO Commands(User_id) VALUES(2);
INSERT INTO Commands(User_id) VALUES(3);
INSERT INTO Commands(User_id) VALUES(3);

CREATE TABLE IF NOT EXISTS Command_Lines(
  Id INTEGER PRIMARY KEY AUTOINCREMENT,
  Amount INTEGER DEFAULT 1,
  Command_Id INTEGER NOT NULL,
  Product_Id INTEGER NOT NULL,
  CONSTRAINT fk_command_id FOREIGN KEY (Command_Id) REFERENCES Commands(Id),
  CONSTRAINT fk_product_id FOREIGN KEY (Product_Id) REFERENCES Products(Id)
);

INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(2, 1, 3);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 1, 2);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(2, 2, 4);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(22, 2, 4);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(23, 2, 5);

COMMIT;
