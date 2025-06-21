-- CreateTable
CREATE TABLE "Melhoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "email" TEXT,
    "mensagem" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "obraId" INTEGER,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Melhoria_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Melhoria" ADD CONSTRAINT "Melhoria_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra"("id") ON DELETE SET NULL ON UPDATE CASCADE;
