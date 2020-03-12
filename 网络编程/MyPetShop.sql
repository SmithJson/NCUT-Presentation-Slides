USE master;
GO
/*建立空的MyPetShop数据库*/
/*请根据实际环境更改数据库文件和日志文件的存放路径*/
CREATE DATABASE MyPetShop
GO
USE MyPetShop
/*分别建立Category、Supplier、Product、Order、OrderItem等数据表的结构*/
CREATE TABLE [Category] ([CategoryId] int identity PRIMARY KEY, [Name] varchar(80) NULL, [Descn] varchar(255) NULL)
CREATE TABLE [Supplier] ([SuppId] int identity PRIMARY KEY,
  [Name] varchar(80) NULL, [Addr1] varchar(80) NULL, [Addr2] varchar(80) NULL,
  [City] varchar(80) NULL, [State] varchar(80) NULL, [Zip] varchar(6) NULL,
  [Phone] varchar(40) NULL)
CREATE TABLE [Product] ([ProductId] int identity PRIMARY KEY,
  [CategoryId] int NOT NULL REFERENCES [Category]([CategoryId]),
  [ListPrice] decimal(10, 2) NULL, [UnitCost] decimal(10, 2) NULL,
  [SuppId] int NULL REFERENCES [Supplier]([SuppId]), [Name] varchar(80) NULL,
  [Descn] varchar(255) NULL, [Image] varchar(80) NULL, [Qty] int NOT NULL)
CREATE TABLE [Order] ([OrderId] int identity PRIMARY KEY,
  [UserName] varchar(80) NOT NULL, [OrderDate] datetime NOT NULL,
  [Addr1] varchar(80) NULL, [Addr2] varchar(80) NULL, [City] varchar(80) NULL,
  [State] varchar(80) NULL, [Zip] varchar(6) NULL, [Phone] varchar(40) NULL,
  [Status] varchar(10) NULL)
CREATE TABLE [OrderItem]([ItemId] int identity PRIMARY KEY,
  [OrderId] int NOT NULL REFERENCES [Order]([OrderId]), [ProName] varchar(80),
  [ListPrice] decimal(10, 2) NULL, [Qty] int NOT NULL, [TotalPrice] decimal(10, 2) NULL)
/*在Category表中插入示例数据*/
INSERT INTO [Category] VALUES ('Fish', 'Fish')
INSERT INTO [Category] VALUES ('Backyard', 'Backyard')
INSERT INTO [Category] VALUES ('Birds', 'Birds')
INSERT INTO [Category] VALUES ('Bugs', 'Bugs')
INSERT INTO [Category] VALUES ('Endangered', 'Endangered')
/*在Supplier表中插入示例数据*/
INSERT INTO [Supplier] VALUES ('XYZ Pets', '600 Avon Way', '', 'Los Angeles', 'CA', '94024', '212-947-0797')
INSERT INTO [Supplier] VALUES ('ABC Pets', '700 Abalone Way', '', 'San Francisco', 'CA', '94024', '415-947-0797')
/*在Product表中插入示例数据*/
INSERT INTO [Product] VALUES (1, 12.1, 11.4, 1, 'Meno', 'Meno', '~/Prod_Images/Fish/meno.gif', 100)
INSERT INTO [Product] VALUES (1, 28.5, 25.5, 1, 'Eucalyptus', 'Eucalyptus', '~/Prod_Images/Fish/eucalyptus.gif', 100)
INSERT INTO [Product] VALUES (2, 23.4, 11.4, 1, 'Ant', 'Ant', '~/Prod_Images/Bugs/ant.gif', 100)
INSERT INTO [Product] VALUES (2, 24.7, 22.2, 1, 'Butterfly', 'Butterfly', '~/Prod_Images/Bugs/butterfly.gif', 100)
INSERT INTO [Product] VALUES (3, 38.5, 37.2, 1, 'Cat', 'Cat', '~/Prod_Images/Backyard/cat.gif', 100)
INSERT INTO [Product] VALUES (3, 40.4, 38.7, 1, 'Zebra', 'Zebra', '~/Prod_Images/Backyard/zebra.gif', 100)
INSERT INTO [Product] VALUES (4, 45.5, 44.2, 1, 'Domestic', 'Domestic', '~/Prod_Images/Birds/domestic.gif', 100)
INSERT INTO [Product] VALUES (4, 25.2, 23.5, 1, 'Flowerloving', 'Flowerloving', '~/Prod_Images/Birds/flowerloving.gif', 100)
INSERT INTO [Product] VALUES (5, 47.7, 45.5, 1, 'Panda', 'Panda', '~/Prod_Images/Endangered/panda.gif', 100)
INSERT INTO [Product] VALUES (5, 35.5, 33.5, 1, 'Pointy', 'Pointy', '~/Prod_Images/Endangered/pointy.gif', 100)
GO
/*创建CategoryInsert存储过程*/
CREATE PROCEDURE dbo.CategoryInsert
	(
	@Name varchar(80),
	@Descn varchar(255)
	)
AS
	INSERT INTO Category(Name,Descn) VALUES (@Name,@Descn);
	RETURN
GO
USE master;
GO