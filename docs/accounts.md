# Módulo: accounts

## Visão Geral
O módulo `accounts` é responsável pelo controle de acesso ao Simulador de Phishing. Ele cuida do fluxo de autenticação, englobando o registro de novos usuários, o processo de login e o de logout.

## Lógica Interna
O app aproveita as ferramentas de autenticação internas do próprio Django (`django.contrib.auth`), garantindo que o gerenciamento de senhas (hash de segurança) e as sessões sejam feitos de forma segura. A lógica de views recebe os formulários preenchidos, os valida e interage com o framework para autenticar os usuários no sistema, redirecionando-os ao dashboard apropriado após o sucesso na operação.

## Componentes Principais
- **views.py**: Contém as funções `register_view`, `login_view` e `logout_view`. Cada uma manipula as requisições HTTP correspondentes às ações de entrada e saída, utilizando a biblioteca de mensagens (`messages`) para apresentar alertas ao usuário.
- **forms.py**: Contém as classes `CustomUserCreationForm` e `CustomAuthenticationForm`, que herdam os formulários padrão do Django adicionando a eles propriedades estéticas (como `placeholder`) para o front-end.

## Sinergias e Dependências
- Depende do modelo interno de usuários do Django (`User`).
- Possui forte sinergia com o app `core`, uma vez que, após login e registro, os usuários são redirecionados automaticamente para a view `dashboard` localizada no núcleo da plataforma.

## Exemplos de Uso
- Um colaborador acessa a página inicial e se cadastra no simulador de phishing.
- O colaborador acessa com suas credenciais e, utilizando o `CustomAuthenticationForm`, é validado e autenticado, recebendo uma mensagem de sucesso antes de ir ao dashboard.
