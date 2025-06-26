-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Obra" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "empresa" TEXT NOT NULL,
    "cronograma" TEXT NOT NULL,
    "orcamento" REAL NOT NULL,
    "status" TEXT NOT NULL,
    "tipo" TEXT,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "servidorId" INTEGER NOT NULL,
    CONSTRAINT "Obra_servidorId_fkey" FOREIGN KEY ("servidorId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Documento" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "obraId" INTEGER NOT NULL,
    CONSTRAINT "Documento_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Etapa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "obraId" INTEGER NOT NULL,
    CONSTRAINT "Etapa_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Melhoria" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT,
    "email" TEXT,
    "mensagem" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "obraId" INTEGER,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Melhoria_obraId_fkey" FOREIGN KEY ("obraId") REFERENCES "Obra" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "EtapaHistorico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "etapaId" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "alteradoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");
