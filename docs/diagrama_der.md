# Diagrama de Entidade e Relacionamento (DER)

Este diagrama modela a estrutura principal do banco de dados relacional. 
A arquitetura de dados neste simulador foca na extensão da tabela nativa de `User` do Django, agregando a ela as propriedades da tabela `UserProgress` através de um relacionamento **Um-para-Um (One-to-One)**.

```mermaid
erDiagram
    %% Tabela nativa de Usuários do Django (Auth)
    AUTH_USER ||--|| USER_PROGRESS : "possui (1:1)"
    
    AUTH_USER {
        int id PK "Chave Primária"
        string username "Nome de usuário único"
        string password "Hash da senha"
        string first_name "Primeiro nome"
        string last_name "Último nome"
        string email "Endereço de email"
        boolean is_staff "É administrador/staff?"
        boolean is_superuser "É superusuário?"
        datetime date_joined "Data de entrada"
    }
    
    %% Tabela de acompanhamento de treinamento do App
    USER_PROGRESS {
        int id PK "Chave Primária"
        int user_id FK "Chave Estrangeira (referência a AUTH_USER)"
        boolean modulo1_concluido "Status do Módulo 1 (Teórico)"
        boolean modulo2_concluido "Status do Módulo 2 (Prático)"
        int modulo2_score "Acertos no Módulo 2"
        int modulo2_total "Total de questões do Módulo 2"
        boolean modulo3_concluido "Status do Módulo 3 (Risco)"
        string modulo3_risco "Grau de risco (Baixo, Médio, Alto)"
        int modulo3_pontos_risco "Score interno de vulnerabilidade"
        int total_score "Soma geral de pontuações"
        datetime criado_em "Registro inserido em"
        datetime atualizado_em "Registro atualizado em"
    }
```

### Explicação do Relacionamento
- Cada usuário (`AUTH_USER`) cadastrado na plataforma possui **apenas um** registro correspondente em `USER_PROGRESS`.
- O Django gerencia essa associação em nível de banco criando uma constraint de `UNIQUE` na chave estrangeira (`user_id`).
- Caso o usuário venha a ser deletado, o comportamento `on_delete=models.CASCADE` configurado no código deleta automaticamente o registro em `USER_PROGRESS`, mantendo a integridade referencial.
