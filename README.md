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
