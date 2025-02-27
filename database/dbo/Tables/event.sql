CREATE TABLE [dbo].[event] (
    [id]       UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [name]     VARCHAR (255)    NULL,
    [timezone] VARCHAR (255)    NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO

