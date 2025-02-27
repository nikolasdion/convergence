CREATE TABLE [dbo].[attendee_slot] (
    [event_id]    UNIQUEIDENTIFIER NOT NULL,
    [attendee_id] UNIQUEIDENTIFIER NOT NULL,
    [slot]        VARCHAR (255)    NOT NULL,
    PRIMARY KEY CLUSTERED ([event_id] ASC, [attendee_id] ASC, [slot] ASC)
);


GO

