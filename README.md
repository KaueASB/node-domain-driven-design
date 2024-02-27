# DDD (Domain-drive Design)

Design dirigido à domínio

## Domínio

- Domain Experts
  - Conversa
- Linguagem ubíqua

- Usuário
  - Client
  - Fornecedor
  - Atendente
  - Barman

- Agregados
- Value Objects
- Eventos de domínio
- Subdomínios (Bounded Contexts)
- Entidades
- Casos de uso

## Conceito de Aggregate e WatchedList

- **Aggregate:**

  - Em Domain-Driven Design (DDD), um Aggregate é um objeto que representa um grupo de entidades relacionadas que são tratadas como uma única unidade de consistência. Isso significa que as operações em um Aggregate só podem ser feitas de forma consistente, garantindo a integridade dos dados.

  - **Características:**

    - **Identidade única:** Um Aggregate é identificado por um único identificador, que o distingue de outros Aggregates.

    - **Limites de consistência:** As operações em um Aggregate são encapsuladas e só podem ser feitas de forma consistente. Isso significa que, se uma operação em um Aggregate falhar, todo o Aggregate estará em um estado inconsistente.

    - **Raiz do Aggregate:** Um Aggregate possui uma única entidade raiz, que é responsável por gerenciar as outras entidades dentro do Aggregate.
  
  - **Exemplos:**

    - **Pergunta do Fórum:**

      - Identidade única: ID da pergunta
      - **Limites de consistência:**
        - Os comentários só podem ser adicionadas as perguntas por usuários autenticados.
        - As perguntas só podem ser editadas ou excluídas por seus autores.
      - **Raiz do Aggregate:** Entidade Pergunta

    - **Resposta do Fórum:**

      - Identidade única: ID da resposta
      - **Limites de consistência:**
        - As respostas só podem ser editadas ou excluídas por seus autores.
      - **Raiz do Aggregate:** Entidade Resposta

- **WatchedList:**

  - Uma **WatchedList** é um padrão de design que permite que um objeto observe as mudanças em outro objeto. No contexto de DDD, uma WatchedList pode ser usada para rastrear as mudanças em um Aggregate.
  
  - **Características:**

    - A WatchedList é um objeto que armazena uma lista de objetos que está observando.
    - Quando um objeto observado muda, a WatchedList é notificada.
    - A WatchedList pode então tomar alguma ação em resposta à mudança, como atualizar sua própria lista de objetos ou notificar outros objetos.

  - **Exemplos:**

    - **Lista de Tópicos Seguidos:**

      - Observa as perguntas/tópicos que um usuário está seguindo.
      - Quando uma nova perguntas/tópico é criado ou quando um tópico seguido é atualizado, a lista é notificada.
      - A lista pode então atualizar a interface do usuário para mostrar os novos tópicos ou as atualizações.

    - **Notificações de Novas Respostas:**

      - Observa as respostas em um tópico específico.
      - Quando uma nova resposta é adicionada ao tópico, a lista é notificada.
      - A lista pode então enviar uma notificação para o usuário que está seguindo o tópico.

## Subdomínios

Em Domain-Driven Design (DDD), um subdomínio é uma parte autônoma de um domínio maior que possui suas próprias regras, entidades e comportamentos. No contexto de um fórum, os subdomínios podem ser usados para organizar o código e o design da aplicação de forma modular e coesa.

- **Core:** O que dá dinheiro
- **Supporting:** Dá suporte para o core funcionar
- **Generic:** Você pode precisa, porém, não é tão importante

### Exemplos de subdomínios em um fórum

- **Autenticação e Autorização:**
  - Gerenciamento de usuários, login, registro, permissões de acesso
  - Regras de autenticação e autorização para diferentes seções do fórum

- **Gerenciamento de Tópicos:**
  - Criação, edição, exclusão de tópicos
  - Categorização de tópicos, organização por tags
  - Moderação de tópicos, gerenciamento de conteúdo impróprio

- **Gerenciamento de Respostas:**
  - Criação, edição, exclusão de respostas
  - Notificações de novas respostas
  - Moderação de respostas, gerenciamento de conteúdo impróprio

- **Votação e Reputação:**
  - Sistema de votação para tópicos e respostas
  - Sistema de reputação para usuários

- **Pesquisa e Notificações:**
  - Mecanismo de busca para tópicos e respostas
  - Sistema de notificações para novos tópicos, respostas e respostas

### Benefícios de usar subdomínios

- **Modularidade:** O código fica mais organizado e fácil de entender
- **Coesão:** Cada subdomínio possui um foco único e bem definido
- **Reusabilidade:** Subdomínios podem ser reutilizados em outras aplicações
- **Manutenibilidade:** O código fica mais fácil de manter e atualizar

<!-- TODO: add event question comment & add event answer comment -->