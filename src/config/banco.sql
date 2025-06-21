SELECT * FROM public."Obra";
SELECT * FROM public."User";
SELECT * FROM public."Documento";
INSERT INTO public."Etapa"( nome, descricao, "dataInicio", "dataFim", status, "obraId") VALUES ('Inicio da Obra','Nesta data a obra começa, com o tempo de 2 meses','2025-05-09 08:30:00','2025-06-08 18:00','em_andamento',1);
SELECT * FROM public."Etapa";
INSERT INTO public."Interacao"(tipo, mensagem, "usuarioId", "obraId", "createdAt") VALUES ('solicitacao','Preciso que seja arrumado a lampada da rua em frente a minha casa',2,1,'2025-05-10 07:59:55');
SELECT * FROM public."Interacao";
