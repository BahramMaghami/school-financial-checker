/*
  Warnings:

  - The values [SALARY,MAINTENANCE,EQUIPMENT,TUITION,UTILITIES,SUPPLIES,OTHER] on the enum `Category` will be removed. If these variants are still used in the database, this will fail.
  - The values [INCOME,EXPENSE] on the enum `TransactionType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Category_new" AS ENUM ('حقوق', 'تعمیرات', 'تجهیزات', 'شهریه', 'مصرفی', 'ملزومات', 'سایر');
ALTER TABLE "Transaction" ALTER COLUMN "category" TYPE "Category_new" USING ("category"::text::"Category_new");
ALTER TYPE "Category" RENAME TO "Category_old";
ALTER TYPE "Category_new" RENAME TO "Category";
DROP TYPE "public"."Category_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionType_new" AS ENUM ('هزینه', 'درامد');
ALTER TABLE "Transaction" ALTER COLUMN "type" TYPE "TransactionType_new" USING ("type"::text::"TransactionType_new");
ALTER TYPE "TransactionType" RENAME TO "TransactionType_old";
ALTER TYPE "TransactionType_new" RENAME TO "TransactionType";
DROP TYPE "public"."TransactionType_old";
COMMIT;
