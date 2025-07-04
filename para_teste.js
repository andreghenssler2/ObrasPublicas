// iniciar o vizualizador do Sqlite npx prisma studio
/*
Criar usuario
{
  "nome": "João Silva",
  "email": "joao@email.com",
  "senha": "123456",
  "tipo": "SERVIDOR"
}
{
  "nome": "Andrei Oliveira",
  "email": "andrei@erxample.com",
  "senha": "1234567",
  "tipo": "SERVIDOR"
}

// Login usuario
{
  "email": "joao@email.com",
  "senha": "123456"
}


// Criar Obra
{
  "nome":"Construção da Escola Municipal 'Professora Maria Silva'",
  "localizacao":"Centro",
  "empresaResponsavel":"Construtora Imperial Ltda",
  "cronograma":"Dezembro 2025",
  "orcamento":2500000.00,
  "status":"EM_ANDAMENTO"
}
{
  "nome":"Reforma da Praça Guaruja",
  "localizacao":"Guaruja",
  "empresaResponsavel":"Construtora Morada Feliz",
  "cronograma":"Junho 2025 a Dezembro 2025",
  "orcamento":500000,
  "status":"EM_ANDAMENTO"
}
  
{
  "nome":"Reforma e Ampliação da UBS Centro",
  "localizacao":"Centro",
  "empresaResponsavel":"Construtora Sol Nascente Ltda",
  "cronograma":"Julho 2025 a Dezembro 2025",
  "orcamento":500000,
  "status":"EM_ANDAMENTO"
}


// Criar etapas
{
  "nome": "Telhado",
  "descricao": "Colocação do Telhado do Predio",
  "status": "NAO_INICIADA",
  "obraId": 1
}

// Mudando as Etapas do Obra

// {"status": "LICENCIAMENTO"}
// {"status": "ESTUDO"}
// {"status": "ORÇAMENTO"}
// {"status": "LICITAÇÃO"}
// {"status": "CONTRATACAO"}
// {"status": "NAO_INICIADA"}
// {"status": "EM_ANDAMENTO"}
// {"status": "CONCLUIDA"}

*/