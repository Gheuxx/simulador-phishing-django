# Módulo: treinamento

## Visão Geral
O módulo `treinamento` é a espinha dorsal de negócios do sistema de aprendizado. Ele tem como propósito a execução, persistência e acompanhamento das etapas (módulos) do treinamento contra campanhas de phishing e riscos em e-mails. 

## Lógica Interna
O app gerencia uma entidade central de dados, `UserProgress`, atrelada um-para-um (One-to-One) ao usuário. Durante a interação nas telas do treinamento, requisições tradicionais e disparos de API (via JSON) são despachados para informar à view sobre as respostas dadas nos módulos práticos de phishing. As views verificam o estado atual, atribuem pontuações em backend, geram a aprovação (necessidade de acertos mínimos, ex: 70% no módulo 2) e calculam o risco do colaborador.

## Componentes Principais
- **models.py**: Define o modelo relacional `UserProgress`, contendo campos que salvam os scores individuais (modulo2_score), conclusões e atributos booleanos para as aprovações. Possui métodos orientados a objetos (`calcular_progresso`, `calcular_status`) encapsulados na classe.
- **views.py**: Gerencia tanto visualizações de páginas (`modulo1`, `modulo2`, `modulo3`, `conclusao`) impedindo usuários de pularem etapas, quanto a comunicação com o front-end via AJAX/JSON nas funções `salvar_modulo2` e `salvar_modulo3`.

## Sinergias e Dependências
- Fortemente vinculado ao modelo principal de usuários (`User`).
- Sua tabela `UserProgress` age como a base de extração de dados vital de acompanhamento para o módulo `core` gerar os dashboards administrativos.

## Exemplos de Uso
- O aluno termina de assistir o conteúdo do módulo 1 e clica em prosseguir. A requisição aciona a view `concluir_modulo1`, definindo a flag de sucesso para verdadeira, somando 100 pontos ao placar total e redirecionando a página do aluno para o início do Módulo 2.
- No Módulo 2 prático, a conclusão de um teste envia o score (ex: 12 acertos de 15) em JSON para o servidor. A API interna calcula se o percentual atinge a zona de aprovação e salva o perfil atualizado do funcionário, retornando um indicativo para o JavaScript de interface reagir.
