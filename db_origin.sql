USE [DataControl]
GO
/****** Object:  Table [dbo].[DataPackages]    Script Date: 2016/10/20 12:48:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DataPackages](
	[dataPackageId] [int] IDENTITY(1,1) NOT NULL,
	[description] [varchar](255) NOT NULL,
	[sizeBytes] [int] NOT NULL,
 CONSTRAINT [PK_DataPackages] PRIMARY KEY CLUSTERED 
(
	[dataPackageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Devices]    Script Date: 2016/10/20 12:48:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Devices](
	[deviceId] [varchar](50) NOT NULL,
	[appDeviceId] [nchar](10) NULL,
	[description] [varcharvarchar](255) NOT NULL,
 CONSTRAINT [PK_Devices] PRIMARY KEY CLUSTERED 
(
	[deviceId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DeviceSimCards]    Script Date: 2016/10/20 12:48:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DeviceSimCards](
	[deviceId] [varchar](50) NOT NULL,
	[iccid] [varchar](25) NOT NULL
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Requests]    Script Date: 2016/10/20 12:48:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Requests](
	[requestId] [int] IDENTITY(1,1) NOT NULL,
	[iccid] [varchar](25) NOT NULL,
	[dataPackageId] [int] NOT NULL,
	[timestamp] [datetime] NOT NULL,
	[approved] [bit] NOT NULL,
	[comments] [varchar](max) NULL,
 CONSTRAINT [PK_Requests] PRIMARY KEY CLUSTERED 
(
	[requestId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SimCardDataPackages]    Script Date: 2016/10/20 12:48:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SimCardDataPackages](
	[simCardDataPackageId] [int] IDENTITY(1,1) NOT NULL,
	[dateFrom] [datetime] NOT NULL,
	[dateTo] [datetime] NOT NULL,
	[active] [bit] NOT NULL,
	[requestId] [int] NOT NULL,
 CONSTRAINT [PK_SimCardDataPackages] PRIMARY KEY CLUSTERED 
(
	[simCardDataPackageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SimCards]    Script Date: 2016/10/20 12:48:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SimCards](
	[iccid] [varchar](25) NOT NULL,
	[msisdn] [varchar](15) NULL,
	[imei] [varchar](50) NULL,
	[network] [varchar](50) NULL,
	[active] [bit] NULL,
	[dateAdded] [datetime] NOT NULL,
 CONSTRAINT [PK_SimCards] PRIMARY KEY CLUSTERED 
(
	[iccid] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SMS]    Script Date: 2016/10/20 12:48:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[SMS](
	[smsId] [int] IDENTITY(1,1) NOT NULL,
	[iccid] [varchar](25) NOT NULL,
	[message] [varchar](max) NULL,
	[fromNumber] [varchar](20) NULL,
	[timestamp] [datetime] NULL,
 CONSTRAINT [PK_SMS] PRIMARY KEY CLUSTERED 
(
	[smsId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Usage]    Script Date: 2016/10/20 12:48:14 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usage](
	[usageId] [int] IDENTITY(1,1) NOT NULL,
	[simCardDataPackageId] [int] NOT NULL,
	[timestamp] [datetime] NOT NULL,
	[sent] [int] NOT NULL,
	[received] [int] NOT NULL,
	[total]  AS ([sent]+[received]),
 CONSTRAINT [PK_Usage] PRIMARY KEY CLUSTERED 
(
	[usageId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[DeviceSimCards]  WITH CHECK ADD  CONSTRAINT [FK_DeviceSimCards_Devices] FOREIGN KEY([deviceId])
REFERENCES [dbo].[Devices] ([deviceId])
GO
ALTER TABLE [dbo].[DeviceSimCards] CHECK CONSTRAINT [FK_DeviceSimCards_Devices]
GO
ALTER TABLE [dbo].[DeviceSimCards]  WITH CHECK ADD  CONSTRAINT [FK_DeviceSimCards_SimCards] FOREIGN KEY([iccid])
REFERENCES [dbo].[SimCards] ([iccid])
GO
ALTER TABLE [dbo].[DeviceSimCards] CHECK CONSTRAINT [FK_DeviceSimCards_SimCards]
GO
ALTER TABLE [dbo].[Requests]  WITH CHECK ADD  CONSTRAINT [FK_Requests_DataPackages] FOREIGN KEY([dataPackageId])
REFERENCES [dbo].[DataPackages] ([dataPackageId])
GO
ALTER TABLE [dbo].[Requests] CHECK CONSTRAINT [FK_Requests_DataPackages]
GO
ALTER TABLE [dbo].[Requests]  WITH CHECK ADD  CONSTRAINT [FK_Requests_SimCards] FOREIGN KEY([iccid])
REFERENCES [dbo].[SimCards] ([iccid])
GO
ALTER TABLE [dbo].[Requests] CHECK CONSTRAINT [FK_Requests_SimCards]
GO
ALTER TABLE [dbo].[SimCardDataPackages]  WITH CHECK ADD  CONSTRAINT [FK_SimCardDataPackages_Requests] FOREIGN KEY([requestId])
REFERENCES [dbo].[Requests] ([requestId])
GO
ALTER TABLE [dbo].[SimCardDataPackages] CHECK CONSTRAINT [FK_SimCardDataPackages_Requests]
GO
ALTER TABLE [dbo].[SMS]  WITH CHECK ADD  CONSTRAINT [FK_SMS_SimCards] FOREIGN KEY([iccid])
REFERENCES [dbo].[SimCards] ([iccid])
GO
ALTER TABLE [dbo].[SMS] CHECK CONSTRAINT [FK_SMS_SimCards]
GO
ALTER TABLE [dbo].[Usage]  WITH CHECK ADD  CONSTRAINT [FK_Usage_SimCardDataPackages] FOREIGN KEY([simCardDataPackageId])
REFERENCES [dbo].[SimCardDataPackages] ([simCardDataPackageId])
GO
ALTER TABLE [dbo].[Usage] CHECK CONSTRAINT [FK_Usage_SimCardDataPackages]
GO
