/*
  Warnings:

  - Added the required column `user` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "user" TEXT NOT NULL;
