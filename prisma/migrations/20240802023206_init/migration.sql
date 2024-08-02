/*
  Warnings:

  - You are about to drop the column `timestamps` on the `discussion` table. All the data in the column will be lost.
  - You are about to drop the column `timestamps` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `discussion` DROP COLUMN `timestamps`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `message` DROP COLUMN `timestamps`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
