# Como o Django lida com a Orientação a Objetos (OOP)

O framework Django faz um uso massivo do paradigma da Orientação a Objetos. Praticamente todos os seus elementos fundamentais baseiam-se nos conceitos da OOP para fornecer reutilização, organização e escalabilidade em aplicações Python. Abaixo está a explicação de como o Django implementa cada um destes conceitos:

## Classes e Objetos
No Django, todas as principais estruturas, desde modelos de banco de dados e formulários a serializadores e visualizações, são estruturadas como **Classes**. Quando se está manipulando um registro, tem-se a instância (um **Objeto**) dessa classe.
- **Exemplo**: Ao acessar `UserProgress.objects.get(id=1)`, o `UserProgress` é a Classe (molde de tabela) e o resultado dessa busca é um Objeto com dados inseridos (ex: O progresso do usuário "João").

## Herança (quando aplicável)
A Herança é um dos conceitos mais utilizados no ambiente Django, permitindo evitar repetição e aplicar funcionalidades essenciais a novos componentes.
- **No Banco de dados**: Toda tabela é gerada herdando de uma classe master. Ex: `class UserProgress(models.Model):` herda todos os poderes de buscar, deletar e salvar no banco fornecidos pela superclasse `Model`.
- **Nos Formulários**: Em `accounts/forms.py`, as classes `CustomUserCreationForm(UserCreationForm)` herdam o comportamento pré-pronto de criação de senhas e usuários do próprio framework, alterando apenas pequenos detalhes cosméticos.
- **Nas Views baseadas em Classes (CBVs)**: No Django é comum usar herança para telas, ex: herdar da classe `ListView` ou `DetailView` que já sabe gerenciar paginações ou buscar no banco um objeto com um ID, simplificando o código.

## Encapsulamento
O Django promove o Encapsulamento de duas maneiras principais:
1. Ao nível arquitetural, adotando o conceito de *Apps* plugáveis onde as lógicas e banco de dados de `treinamento` ficam separadas da lógica de `accounts`.
2. Em código prático, as regras de negócio relativas a um objeto normalmente habitam no seu próprio Model. No projeto, as funções `calcular_progresso()` e `calcular_status()` existem *dentro* do arquivo models do app treinamento e pertencem ao model de progresso. Ou seja, ao invés da view tentar calcular na mão as estatísticas (quebrando o encapsulamento), a view apenas pede ao objeto: `progress.calcular_status()`, protegendo as regras lógicas e garantindo consistência.

## Polimorfismo (quando aplicável)
Embora a tipagem dinâmica do Python muitas vezes abranja o uso prático de polimorfismo, no Django este conceito é explícito, especialmente ao se interagir com as funções que respondem a métodos HTTP.
- **Nas CBVs (Class-Based Views)**: Diferentes classes e componentes que herdam das views base podem sobrescrever a função `get_context_data()`. O sistema, ao despachar a view, sabe que pode chamar essa função indiscriminadamente porque ela faz parte da base polimórfica de renderização das páginas.
- **Sobrescrita do método save()**: Outro uso de polimorfismo notório é a alteração do comportamento padrão do método `.save()` nas models. Um dev pode mudar como a model salva, sabendo que a aplicação de interface de administração (Django Admin) e as views irão chamar `.save()` indiferentemente da sua regra customizada criada ali dentro.

## Métodos e Atributos
- **Atributos**: Servem como definição estrutural. Na camada de modelo, os atributos (ex: `modulo1_concluido = models.BooleanField(default=False)`) representam o mapeamento (ORM) exato para as colunas das tabelas do banco de dados (SQLite, Postgres, etc).
- **Métodos**: São funções integradas à classe, seja para executar ações padrão de banco (ex: `.save()`, `.delete()`), seja para executar operações da regra do sistema implementadas pelo desenvolvedor (ex: `calcular_progresso()`). No final do dia, esses métodos agrupam a inteligência pertencente única e exclusivamente aos dados do seu objeto em instância.
