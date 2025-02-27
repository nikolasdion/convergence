CREATE TABLE [dbo].[attendee] (
    [id]       UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [event_id] UNIQUEIDENTIFIER NULL,
    [name]     VARCHAR (255)    NULL,
    [timezone] VARCHAR (255)    NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);


GO

