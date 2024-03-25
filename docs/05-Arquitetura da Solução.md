# Arquitetura da Solução

A arquitetura da EvoFit é composta por três camadas principais:

### 1. Camada de Apresentação (Front-end):

- Desenvolvida em React Native, utilizando componentes reutilizáveis para garantir uma interface intuitiva e consistente em diferentes plataformas (Android e iOS).
- Arquitetura de componentes modular para facilitar a manutenção e o desenvolvimento futuro.
- Estilos personalizados para garantir uma identidade visual única e profissional.
- Integração com bibliotecas de terceiros para funcionalidades específicas, como geolocalização e notificações push.

### 2. Camada de Lógica (Back-end):

- Servidor Node.js com API RESTful para comunicação com o front-end.
- Banco de dados NoSQL (Firebase Cloud Firestore) para armazenar dados de forma escalável e segura.
- Autenticação e autorização de usuários via Firebase Authentication.
- Implementação de lógica de negócio para processamento de dados e regras de validação.
- Armazenamento de imagens e vídeos na nuvem (Firebase Storage).

### 3. Camada de Infraestrutura:

- Hospedagem da aplicação front-end na Expo (serviço de nuvem para React Native).
- Hospedagem do back-end na Google Cloud Platform (GCP).
- Monitoramento de desempenho e logs de erros para garantir a estabilidade da aplicação.
- Segurança da informação e proteção de dados dos usuários.

## Diagrama de Classes

Esse é o diagrama de classes da aplicação EvoFit conforme concebido incialmente. Está sujeito a alterações para adequação às necessidades dos stakeholders.

<img src ="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t3-pmv-ads-2023-1-e3-proj-mov-t3-evofit/blob/ee2ec096ae3b31ce053d388976399362fdeb5604/docs/img/diagramaDeClassesEvoFit.png">

### Explicação detalhada do diagrama de classess - atributos e métodos:

#### Classe Usuário:

##### Atributos:
- id: Identificador único do usuário.
- nome: Nome completo do usuário.
- email: Endereço de email do usuário.
- senha: Senha do usuário para autenticação.
- dataNascimento: Data de nascimento do usuário.
- sexo: Sexo do usuário (masculino, feminino ou outro).
- altura: Altura do usuário em metros.
- peso: Peso do usuário em quilogramas.
- nívelAtividade: Nível de atividade física do usuário (sedentário, moderado ou ativo).
- objetivo: Objetivo do usuário com a prática de musculação (ganhar massa muscular, perder peso, etc.).
- fotoPerfil: Foto de perfil do usuário.

##### Métodos:
- cadastrar(): Cria um novo usuário no sistema.
- editar(): Edita os dados de um usuário existente.
- excluir(): Exclui um usuário do sistema.
- autenticar(): Autentica o usuário no sistema com base em seu email e senha.
- getTreinos(): Obtém todos os treinos do usuário.
- getExercicios(): Obtém todos os exercícios do usuário.
- registrarTreino(): Registra um novo treino para o usuário.
- acompanharProgresso(): Acompanha o progresso do usuário ao longo do tempo.

#### Classe Treino:

##### Atributos:
- id: Identificador único do treino.
- nome: Nome do treino.
- data: Data em que o treino foi realizado.
- tipo: Tipo de treino (treino de força, treino de hipertrofia, etc.).
- objetivo: Objetivo do treino (ganhar massa muscular, perder peso, etc.).
- nível: Nível de dificuldade do treino (iniciante, intermediário ou avançado).
- duração: Duração do treino em minutos.
- listaExercicios: Lista de exercícios que compõem o treino.

##### Métodos:
- criar(): Cria um novo treino.
- editar(): Edita os dados de um treino existente.
- excluir(): Exclui um treino do sistema.
- iniciar(): Inicia a execução do treino.
- finalizar(): Finaliza a execução do treino.
- getExercicios(): Obtém todos os exercícios do treino.
- registrarTreino(): Registra o treino no sistema.

#### Classe Exercicio:

##### Atributos:
- id: Identificador único do exercício.
- nome: Nome do exercício.
- descrição: Descrição detalhada do exercício.
- grupoMuscular: Grupo muscular que o exercício trabalha.
- tipo: Tipo de exercício (isolamento, composto, aeróbico, etc.).
- séries: Número de séries do exercício.
- repetições: Número de repetições do exercício em cada série.
- carga: Carga utilizada no exercício (peso, resistência, etc.).
- imagem: Imagem ilustrativa do exercício.

##### Métodos:
- criar(): Cria um novo exercício.
- editar(): Edita os dados de um exercício existente.
- excluir(): Exclui um exercício do sistema.
- adicionarTreino(): Adiciona o exercício a um treino.
- removerTreino(): Remove o exercício de um treino.

#### Classe RegistroTreino:

##### Atributos:
- id: Identificador único do registro de treino.
- treinoId: Identificador do treino ao qual o registro pertence.
- data: Data em que o registro foi realizado.
- séries: Número de séries realizadas do exercício.
- repetições: Número de repetições realizadas do exercício em cada série.
- carga: Carga utilizada no exercício.
- observações: Observações sobre o exercício.

###Métodos:
- criar(): Cria um novo registro de treino.
- editar(): Edita os dados de um registro de treino existente.
- excluir(): Exclui um registro de treino do sistema.


### Explicação dos Relacionamentos no Diagrama de Classes

O diagrama de classes da aplicação EvoFit apresenta os seguintes relacionamentos entre as classes:

#### 1. Usuário:

- Possui vários treinos: Um usuário pode ter vários treinos associados a ele. Esse relacionamento é do tipo um para muitos (1:N), pois um usuário pode ter diversos treinos, mas cada treino só pode estar associado a um único usuário.
- Registra vários treinos: Um usuário pode registrar vários treinos ao longo do tempo. Esse relacionamento também é do tipo um para muitos (1:N), pois um usuário pode registrar diversos treinos, mas cada registro de treino só pode estar associado a um único usuário.
- Tem um progresso: Cada usuário tem um único registro de progresso associado a ele. Esse relacionamento é do tipo um para um (1:1), pois cada usuário só pode ter um único registro de progresso e vice-versa.

#### 2. Treino:

- Pertence a um usuário: Cada treino está associado a um único usuário. Esse relacionamento é do tipo muitos para um (N:1), pois um treino só pode estar associado a um único usuário, mas um usuário pode ter diversos treinos.
- Possui vários exercícios: Um treino pode ter vários exercícios associados a ele. Esse relacionamento é do tipo muitos para muitos (N:N), pois um treino pode ter diversos exercícios e um exercício pode estar presente em diversos treinos.

#### 3. Exercicio:

- Pertence a um ou mais treinos: Um exercício pode estar presente em um ou mais treinos. Esse relacionamento é do tipo muitos para muitos (N:N), pois um exercício pode estar presente em diversos treinos e um treino pode ter diversos exercícios.

#### 4. RegistroTreino:

- Pertence a um treino: Cada registro de treino está associado a um único treino. Esse relacionamento é do tipo muitos para um (N:1), pois um registro de treino só pode estar associado a um único treino, mas um treino pode ter diversos registros de treino.

#### 5. Progresso:

- Pertence a um usuário: Cada registro de progresso está associado a um único usuário. Esse relacionamento é do tipo um para um (1:1), pois cada registro de progresso só pode estar associado a um único usuário e vice-versa.

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão a equipe avaliar os objetos de interesse.

> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
