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
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Galette Saucisse", "La Bretagne au rendez vous, quoi de mieux qu'une bonne saucisse enroulée dans sa galette pour se remémorer son beau pays?", 1, "http://cache.cuisineetvinsdefrance.com/data/photo/w350_h350_c18/4h/galettesaucisse.jpg", 2.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Tacos", "Parlons peu, parlons bien, quel est le sandwich préféré des étudiants ? Bien evidemment le tacos ! Goutez à ce concentré d'énergie !", 1, "http://mustikebab.com/wp-content/uploads/2016/02/Tacos-poulet-musti-kebab.jpg", 3.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Triade de Triangles", "Le connu et reconnu triangle, repas des guerriers et des routiers.", 1, "https://media.meltyfood.fr/article-2201321-fb-f1399368689/les-raisons-scientifiques-du-sandwich-triangle.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Bagel Carnivore", "Du bacon, du jambon de pays, du jambon cuit.", 1, "http://bigapplebagels.com/media/1032/menu-intro_deli-sandwich.png", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Panini", "Un sandwich connu, grillé délicatement par nos soins. Voici un des sandwiches les plus convoités par les plus jeunes.", 1, "http://lba-inc.com/newsite/wp-content/uploads/2014/04/panini.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("BLT", "Le sandwich BLT est un type de sandwich très populaire aux États-Unis. Il est composé traditionnellement de trois[réf. nécessaire] tranches de bacon, de feuilles de laitue (généralement iceberg ou romaine), et de tranches de tomate, d'où le nom BLT pour Bacon, Lettuce (laitue), Tomato (tomate).", 1, "https://www.dairyqueen.com/Global/DQBakes/FOOD_DQBakes_Turkey-BLT_940x500.png", 1.65, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Big Moc", "Big Mac (lancé dans la ville américaine de Pittsburgh en 1967 et dans tous les États-Unis en 1968) est une marque commerciale1 attachée à un hamburger commercialisé par McDonald’s, une chaîne de restauration rapide américaine étendue dans le monde. Il s’agit d'un des produits phares de l’enseigne. Il est composé de deux rondelles de 45,4 g de viande hachée de bœuf, de fromage américain, de « Sauce Spéciale » (une variante de la sauce Thousand Island Dressing), de laitue, de cornichons et d’oignons, le tout entre trois tranches de pain au sésame. Il est vendu dans 119 pays2.", 1, "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Big_Mac_hamburger_-_Croatia.jpg/290px-Big_Mac_hamburger_-_Croatia.jpg", 4.36, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Hot Diggidy Dog", "Un hot-dog est un type de sandwich composé d'un pain allongé (souvent brioché), grillé ou chauffé à la vapeur, fourré d’une saucisse cuite. On l’accompagne de moutarde, de ketchup, de relish, d’oignons, de choucroute ou de sauce mayonnaise. Partout, aux États-Unis, on retrouve un chili-dog (aussi nommé Coney Island hot dog ou simplement coney, dans la région de Détroit), garni de Sauce chili, oignons, et moutarde.", 1, "https://i.ytimg.com/vi/qtCQCgWqglo/maxresdefault.jpg", 1.85, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("PB & Jelly", "Le sandwich au beurre de cacahuète et à la confiture, connu dans les pays d'Amérique du Nord sous le nom de peanut butter and jelly sandwich, communément abrégé en PBJ, PB&J ou P&J, est un sandwich très populaire aux États-Unis et au Canada.", 1, "http://www.todayifoundout.com/wp-content/uploads/2014/02/peanut-butter-and-jelly.jpg", 1.05, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Calzone", "Le terme italien peut se traduire par « chausson » ; il s'agit en effet d'une pizza retournée fourrée généralement de mozzarella et de tomates, et avec du jambon (éventuellement). Les Italiens la consomment pendant les repas en antipasto (assortiment d'entrées), en plat de résistance ou en en-cas dans l'après-midi.", 1, "http://static.cuisineaz.com/680x357/i110270-recettes-calzone.jpg", 3.2, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Croque-Monsieur", "Un croque-monsieur ou croquemonsieur, appelé familièrement croque, est une sorte de sandwich chaud, au pain de mie, au jambon et au fromage (le plus souvent de l'emmental), grillé à la poêle, au four ou dans un appareil spécialisé.", 1, "http://img.cac.pmdstatic.net/fit/http.3A.2F.2Fwww.2Ecuisineactuelle.2Efr.2Fvar.2Fcui.2Fstorage.2Fimages.2Frecettes-de-cuisine.2Frecettes-pour-tous.2Fenfant.2Fcroque-monsieur-9768.2F121747-10-fre-FR.2Fcroque-monsieur.2Ejpg/1200x600/crop-from/center/croque-monsieur.jpg", 1.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Wrap", "Une wrap (du verbe anglais To wrap signifiant « envelopper ») ou roulé au Canada francophone est une sorte de sandwich fait d'une galette fine enroulée autour d'une garniture. Traditionnellement, les galettes sont des tortillas à base de farine de maïs (mais on les trouve plus facilement à base de blé), des lavash, ou des pita. La garniture se compose généralement de viande froide, de volaille en tranches, ou de poisson, accompagnée de laitue, de tomates en dés ou pico de gallo, de guacamole, de champignons sautés, de bacon, d'oignons grillés, de fromage, et d'une sauce (sauce tomate, mayonnaise, etc.)", 1, "http://www.earlofsandwich.fr/media/301334/buffalo-chicken-wrap.jpg", 2.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Burrito", "Un burrito est une préparation culinaire remontant à la fin du XIXe siècle originaire du Mexique. D'invention récente, le burrito n'est pas un plat de la cuisine traditionnelle mexicaine. Il se compose d'une tortilla de farine de blé garnie de divers ingrédients tels que de la viande de bœuf, des haricots, des tomates, des épices, du piment, de l'oignon, de la salade, etc. On ne frit pas la tortilla, elle ne sert que d'enveloppe à son contenu. S'il était frit, le burrito deviendrait une chimichanga.", 1, "https://tacobueno-live-iglusjax.stackpathdns.com/assets/food/burritos/Burrito_BOB_990x725.jpg", 4.5, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Taco Mexicain", "Un taco est un antojito (en-cas) de la cuisine mexicaine qui se compose d'une tortilla repliée ou enroulée sur elle-même contenant presque toujours une garniture, le plus souvent à base de viande et de sauce1.", 1, "http://www.tacotime.com/assets/images/menu/tacos/crisp-lg.png", 3.75, 1);
INSERT INTO Products(Name, Description, Available, Image, Price, Category_Id) Values("Tramezzino", "Un tramezzino (diminutif de tramezzo, littéralement : « petit entre demi » en italien) est un en-cas italien composé de deux tranches de pain de mie triangulaires, renfermant une garniture de viande, fromage, champignons cuits, crudités, fruits de mer ou, plus rarement, poisson.", 1, "http://www.giallozafferano.it/images/ricette/20/2043/foto_hd/hd650x433_wm.jpg", 1.5, 1);
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
  Creation_Date TEXT NOT NULL,
  Is_Paid INTEGER default 0,
  User_Id INTEGER NOT NULL,
  CONSTRAINT fk_user_id FOREIGN KEY (User_Id) REFERENCES Users(Id)
);

INSERT INTO Commands(User_id, Creation_Date) VALUES(1, "10/05/2017");
INSERT INTO Commands(User_id, Creation_Date) VALUES(2, "11/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "10/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "9/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "8/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "7/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "6/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "5/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "4/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "3/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "2/05/2017");
INSERT INTO Commands(User_id, Is_Paid, Creation_Date) VALUES(2, 1, "2/05/2017");

-- INSERT INTO Commands(User_id) VALUES(1);
-- INSERT INTO Commands(User_id) VALUES(2);
-- INSERT INTO Commands(User_id) VALUES(3);
-- INSERT INTO Commands(User_id) VALUES(3);

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
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(2, 3, 4);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(5, 3, 6);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(23, 2, 5);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(12, 3, 5);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(21, 3, 5);

INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(12, 4, 5);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(21, 5, 10);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 5, 12);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 4, 8);

INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 6, 8);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 7, 9);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 8, 3);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 9, 4);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 10, 10);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 11, 7);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(1, 12, 7);
INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(8, 12, 8);


COMMIT;
