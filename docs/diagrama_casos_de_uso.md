# Diagrama de Casos de Uso (UML)

Este diagrama representa as interações dos dois atores principais da aplicação (Aluno e Administrador) com as funcionalidades disponibilizadas pelo sistema Simulador de Phishing.

```mermaid
flowchart LR
    %% Atores
    Aluno(["👤 Aluno"])
    Admin(["👔 Administrador"])

    %% Fronteira do Sistema
    subgraph Simulador ["Simulador de Phishing"]
        direction TB
        
        %% Casos de Uso Comuns
        UC_Login("Fazer Login")
        UC_Logout("Fazer Logout")
        
        %% Casos de Uso do Aluno
        UC_Registro("Cadastrar na Plataforma")
        UC_DashUser("Visualizar Dashboard Pessoal")
        UC_Modulos("Realizar Módulos de Treinamento (1, 2 e 3)")
        
        %% Casos de Uso do Admin
        UC_DashAdmin("Visualizar Dashboard Administrativo")
        UC_Acompanhar("Filtrar/Acompanhar Progresso da Turma")
        UC_Exportar("Exportar Relatórios (CSV / PDF)")
        UC_Resetar("Visualizar Detalhes e Resetar Progresso")
    end

    %% Associações do Aluno
    Aluno --> UC_Registro
    Aluno --> UC_Login
    Aluno --> UC_DashUser
    Aluno --> UC_Modulos
    Aluno --> UC_Logout

    %% Associações do Administrador
    Admin --> UC_Login
    Admin --> UC_DashAdmin
    Admin --> UC_Acompanhar
    Admin --> UC_Exportar
    Admin --> UC_Resetar
    Admin --> UC_Logout
```

### Atores
- **Aluno**: Usuário regular focado em realizar os módulos de prevenção contra ataques.
- **Administrador**: Usuário com privilégios (`is_staff` / `is_superuser`), focado na extração de métricas de engajamento e risco da empresa.
