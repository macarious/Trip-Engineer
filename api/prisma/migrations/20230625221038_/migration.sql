-- CreateTable
CREATE TABLE `travelNote` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `travelPlanId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `travelPlan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `location` VARCHAR(31) NOT NULL,
    `durationDays` INTEGER NOT NULL,
    `arrivalTime` VARCHAR(31) NOT NULL,
    `departureTime` VARCHAR(31) NOT NULL,
    `hasCar` BOOLEAN NOT NULL DEFAULT false,
    `schedule` JSON NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `auth0Id` VARCHAR(191) NOT NULL DEFAULT '',
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_auth0Id_key`(`auth0Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
