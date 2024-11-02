-- CreateTable
CREATE TABLE `incidentes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,
    `ubicacion` VARCHAR(255) NOT NULL,
    `fecha` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `fotoName` VARCHAR(255) NOT NULL,
    `fotoUrl` TEXT NULL,
    `prioridad` VARCHAR(255) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
