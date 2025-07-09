// iniciar o vizualizador do Sqlite npx prisma studio
// https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/
/*
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/usuarios
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
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/auth/login
{
  "email": "joao@email.com",
  "senha": "123456"
}


// Criar Obra
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/obras
{ "nome":"Construção da Escola Municipal 'Professora Maria Silva'", "localizacao":"Centro", "empresaResponsavel":"Construtora Imperial Ltda", "cronograma":"Dezembro 2025", "orcamento":2500000.00, "status":"EM_ANDAMENTO"}

{ "nome":"Reforma da Praça Guaruja", "localizacao":"Guaruja", "empresaResponsavel":"Construtora Morada Feliz", "cronograma":"Junho 2025 a Dezembro 2025", "orcamento":500000.02, "status":"EM_ANDAMENTO" }
   
{ "nome":"Obra de Pavimentação Asfáltica", "localizacao":"Jardim", "empresaResponsavel":"Construtora Asfalto Forte S/A", "cronograma":"Setembro/2025 a Novembro/2025", "orcamento":350000, "status":"EM_ANDAMENTO" } 

{ "nome":"Iluminação Publica do Centro", "localizacao":"Centro", "empresaResponsavel":"Luz Total Engenharia", "cronograma":"Agosto/2025 a Setembro/2025", "orcamento":180000, "status":"EM_ANDAMENTO" }  

{ "nome":"Construção da UBS Parque Esperança", "localizacao":"Esperança", "empresaResponsavel":"Saúde & Infra Estruturas Ltda", "cronograma":"Março/2025 a Março/2027", "orcamento":2800000, "status":"EM_ANDAMENTO" }

{ "nome":"Restauração do Antigo Teatro Municipal", "localizacao":"Centro", "empresaResponsavel":"Patrimônio Vivo Restaurações Ltda.", "cronograma":"Junho/2025 a Dezembro/2026", "orcamento":1950000,, "status":"EM_ANDAMENTO" }

// Listar obras Todas
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/obras
// Listar Obras em Andamento
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/obras/andamento


// Criar etapas
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/etapas
{ "nome": "Planejamento", "descricao": "Elaboração dos projetos arquitetônicos e complementares", "status": "NAO_INICIADA", "obraId": 1 }

{ "nome": "Infraestrutura", "descricao": "Limpeza e preparação do terreno", "status": "NAO_INICIADA", "obraId": 1 }

{ "nome": "Entrega ", "descricao": "Vistoria técnica e correções finais", "status": "CONCLUIDA", "obraId": 1 }


// Mudando as Etapas do Obra
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/etapas/1/status
// {"status": "LICENCIAMENTO"}
// {"status": "ESTUDO"}
// {"status": "ORÇAMENTO"}
// {"status": "LICITAÇÃO"}
// {"status": "CONTRATACAO"}
// {"status": "NAO_INICIADA"}
// {"status": "EM_ANDAMENTO"}
// {"status": "CONCLUIDA"}

// Listar obras por Etapas
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/etapas/obra/1

// Listar obras por Bairro
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/obras/bairro?bairro=Guaruja

// Sugestao do Usuario - Nao precisa estar logado
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/sugestoes
{
  "nome": "João Carlos",
  "email": "joao@email.com",
  "mensagem": "A praça precisa de iluminação melhor.",
  "tipo": "SUGESTAO"
}
  {
  "nome": "João Carlos",
  "email": "joao@email.com",
  "mensagem": "A praça precisa de iluminação melhor.",
  "tipo": "RECLAMACAO"
}
{
  "nome": "João Carlos",
  "email": "joao@email.com",
  "mensagem": "A praça precisa de iluminação melhor.",
  "tipo": "ELOGIO"
}

// Listar sugestoes do usuario - precisa logar
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/sugestoes/listas



// Sem login consulta publicas
// Listar todas as obras
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/public/obras

// Consultar obras especifica
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/public/obras/1


// Finalizar obras
https://public-obras-gygagphgfddwared.canadacentral-01.azurewebsites.net/api/obras/5/finalizar


//
*/
