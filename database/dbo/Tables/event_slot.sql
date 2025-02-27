CREATE TABLE [dbo].[event_slot] (
    [event_id] UNIQUEIDENTIFIER NOT NULL,
    [slot]     VARCHAR (255)    NOT NULL,
    PRIMARY KEY CLUSTERED ([event_id] ASC, [slot] ASC)
);


GO

