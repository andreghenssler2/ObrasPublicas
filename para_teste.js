
/*
Criar usuario

{ "nome": "Gustavo", "email": "gustavo@prefeitura.gov.br", "senha": "Agh@2021"}

//Login usuario
{ "email": "gustavo@prefeitura.gov.br", "senha": "Agh@2021"}

// Criar obra
{ "nome": "Praça Central", "localizacao": "centro", "empresa": "Construtora XYZ", "cronograma": "Jun - Dez 2025", "orcamento": 10000.00, "status": "Planejamento","tipo": "recuperacao"}
{ "nome": "Revitalização da Praça das Palmeiras", "localizacao": "Jardim", "empresa": "Construtora VerdeVale Engenharia Ltda.", "cronograma": "15 de julho de 2025 a 15 de março de 2026", "orcamento": 320000000, "status": "Aguardando...","tipo": "recuperacao"}
{ "nome": "Implantação da Unidade Básica de Saúde (UBS) do Bairro São Miguel", "localizacao": "São Miguel", "empresa": "Construtora Saúde Viva S/A", "cronograma": "05 de agosto de 2025 a 05 de março de 2028", "orcamento": 585000000, "status": "Aguardando...","tipo": "implementacao"}
{ "nome": "Arrumar a Rua Principal", "localizacao": "centro", "empresa": "Construtora XYZ", "cronograma": "Janeiro - Dez 2025", "orcamento": 1000000, "status": "Planejamento","tipo": "contrucao"}


// Pedido do Cidadao
{ "nome": "Carlos Oliveira", "email": "carlos@gmail.com", "mensagem": "A praça está abandonada, sem iluminação.", "tipo": "denuncia", "obraId": 1}
"nome": "Luciano", "email": "luciano@gmail.com", "mensagem": "Preciço que seja arrumado a lampada em frente a minha casa, na rua Joao.", "tipo": "sugestao"}
"nome": "Roger", "email": "roger.123@gmail.com", "mensagem": "Gostaria de expressar meu profundo reconhecimento pela nova ciclovia construída na Avenida Brasil. Ela não apenas oferece um espaço seguro para a prática de exercícios, mas também contribui para a mobilidade urbana e a qualidade do ar na nossa cidade. Agradeço a todos os envolvidos na execução desta obra, que demonstra o compromisso com o bem-estar da população de Parobé", "tipo": "elogio"}




// Consulta Pedidos Cidadao
Somente dar Send na URL que lista todos os pedidos feitos pelo cidadao
http://localhost:3000/api/melhorias/admin

// Consulta Pedidos Cidadao porData
http://localhost:3000/api/melhorias/admin?inicio=2025-06-01&fim=2025-07-30


// Acompanhar Obras
Mostrar todas as obras cadastradas 
http://localhost:3000/api/obras/acompanhar

// Criar Etapa
http://localhost:3000/api/etapas

{ "nome": "Obra", "status": "Estudo", "obraId": 1 }


//Mudar Status da Etapa
http://localhost:3000/api/etapas/1/status

{ "status": "Estudo" }
{ "status": "Licenciamento Ambiental" }
{ "status": "Alvara" }
{ "status": "Recursos" }
{ "status": "Licenciamento" }
{ "status": "execucao" }
{ "status": "Parada" }
{ "status": "Voltar a Etapa" }
{ "status": "finalizado" }

// Consultar Etapas de uma Obra usuario logado
http://localhost:3000/api/etapas/obra/1


// Consultar Etapas de uma Obra por Bairro usuario logado
http://localhost:3000/api/obras/consultar?bairro=centro


// Consultar Historico de Etapas da Obra usuario logado
http://localhost:3000/api/etapas/historico/1


// Consultar Historico de Etapas da Obra Publico (sem autenticação)
http://localhost:3000/api/public/etapas/historico/1

// consultar Obras Publico Todas (sem autenticação)
http://localhost:3000/api/public/obras/

// Consultar Obra Especifica Publico (sem autenticação)
http://localhost:3000/api/public/obras/1

// Consultar Obras por Bairro Publico (sem autenticação)
http://localhost:3000/api/public/obras/bairro/centro

// Consultar Obras por tipo de Obra (sem autenticação)
http://localhost:3000/api/public/obras/tipo/recuperacao
http://localhost:3000/api/public/obras/tipo/contrucao
*/