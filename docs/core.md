# Módulo: core

## Visão Geral
O módulo `core` é o núcleo centralizado de controle da aplicação. Ele é responsável por orquestrar a visualização do painel do usuário e do painel de administração (dashboard), além de gerenciar a emissão e geração de relatórios de progresso em formatos PDF e CSV.

## Lógica Interna
A lógica baseia-se em identificar o nível de permissão do usuário logado. Se for um administrador (`is_staff` ou `is_superuser`), a view exibe um painel completo com listagem, filtragem de métricas (riscos, em andamento, não iniciados) e recursos de gerenciamento. Se for um aluno comum, a view fornece o dashboard simples focado em mostrar os próximos passos de treinamento. As funcionalidades de exportação realizam extrações diretas dos registros em banco, construindo documentos dinamicamente em tempo de resposta.

## Componentes Principais
- **views.py**:
  - `dashboard`: View inteligente que retorna templates distintos com base na permissão e calcula índices da turma.
  - `exportar_csv`: Função que converte as estatísticas do banco de dados num relatório numérico delimitado.
  - `exportar_pdf`: Função que utiliza a biblioteca `reportlab` para desenhar dinamicamente um arquivo PDF com os dados de desempenho.
  - `resetar_progresso_usuario` e `detalhe_usuario`: Endpoints administrativos para acompanhamento individual de alunos.

## Sinergias e Dependências
- Depende massivamente do aplicativo `treinamento`, importando a model `UserProgress` para recuperar os dados e o histórico de cada aluno, a fim de exibi-los no painel.
- Depende de pacotes Python específicos como `reportlab` e da biblioteca embutida `csv`.
- Sinergia com o app `accounts` para validar os acessos administrativos baseados no objeto `User`.

## Exemplos de Uso
- O administrador da segurança da informação acessa o sistema para filtrar os usuários e identificar quais obtiveram o status de "Alto risco" no simulador de phishing, baixando um relatório em PDF para análise e acompanhamento.
- Um usuário pede para resetar seu progresso para refazer o treinamento, o que é executado por um admin através de sua view.
