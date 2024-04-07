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

### Métodos:
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

## Tecnologias utilizadas - EvoFit
* **Linguagens de Programação:**
    * JavaScript: Linguagem principal para desenvolvimento da interface do usuário web e mobile com React Native.
    * Python: Linguagem para desenvolvimento da API e scripts de automação.

* **Frameworks e Bibliotecas:**
    * React Native: Framework JavaScript para criação de interfaces web e mobile responsivas e performantes.
    * Material UI: Biblioteca de componentes React para interfaces elegantes e consistentes.
    * TensorFlow: Biblioteca de machine learning para análise de dados e personalização de treinos.
    * OpenCV: Biblioteca de visão computacional para análise de imagens e vídeos.
* **Serviços Web e APIs:**

    * Heroku: Plataforma de nuvem como serviço (PaaS) para hospedagem da API e do website.
    * Firebase: Plataforma de backend como serviço (BaaS) para autenticação de usuários, armazenamento de dados em tempo real e integração com outros serviços.
    * Strava API: API para integração com dados de atividades físicas de outros aplicativos.
     
* **IDEs e Ferramentas:**
    * VS Code: IDE leve e versátil para desenvolvimento em JavaScript e Python.
    * GitHub Pages: Serviço para criação de websites estáticos a partir de repositórios Git.
    * Postman: Ferramenta para teste e desenvolvimento de APIs.
    *Git: Sistema de controle de versão para gerenciamento de código e colaboração.

**Arquitetura do Sistema:**
* **1. Interface do Usuário:**

Interface web e mobile desenvolvidas com React Native e Material UI.
Interação com o usuário para registro, login, criação de treinos, acompanhamento de progresso e outras funcionalidades.

* **2. API EvoFit:**

    **API RESTful desenvolvida com Python, Django e Flask, responsável por (esse é o ideal que pesquisamos):**
    * Gerenciar dados de usuários, treinos, exercícios e progresso.
    * Processar solicitações da interface do usuário.
    * Integrar com serviços de terceiros, como Firebase e Strava.
 
* **3. Banco de Dados:**
    **Banco de dados PostgreSQL armazena:**
    * Dados de usuários, treinos, exercícios e progresso.
    * Configurações do sistema.
      
* **4. Machine Learning(Acreditamos que esse modelo não será aplicável em tempo hábil para as entregas da PUC, mas é o que propomos no longo prazo para a aplicação):**
    **Modelos de machine learning em TensorFlow:**
    * Personalizam treinos de acordo com perfil e objetivos do usuário.
    * Analisam dados de atividades físicas para fornecer insights e feedback.

* **5. Armazenamento em Nuvem:**
    **Heroku armazena:**
    * Código da API.
    * Banco de dados.
    * Modelos de machine learning.

* **6. Integração com Strava:**
    **API Strava permite:**
    * Importar dados de atividades físicas de outros aplicativos.
    * Exportar dados de treinos do EvoFit para Strava.
    
* **7. Segurança e Autenticação:**
    **Firebase:**
    * Autenticação de usuários com e-mail e senha.
    * Controle de acesso a recursos do sistema.

* **8. Monitoramento e Telemetria:**
    **Ferramentas de monitoramento acompanham:**
    * Desempenho do sistema.
    * Erros e falhas.
      
* **9. Testes e Qualidade:**
    * Testes com usuários de academias garantem a qualidade do código e a funcionalidade do sistema.
 
* **10. Implementação e Manutenção:**
    * Código versionado no Git para controle de alterações e colaboração.
    * Implementação em etapas com foco em entregas contínuas e testes frequentes.
    * 
* **Benefícios das Tecnologias Escolhidas:**
    * Escalabilidade: Arquitetura robusta e escalável para atender a um grande número de usuários.
    * Segurança: Autenticação e controle de acesso garantem a segurança dos dados dos usuários.
    * Personalização: Machine learning permite personalizar treinos e oferecer uma experiência individualizada.
    * Integração: Integração com outros aplicativos e serviços aumenta a utilidade do EvoFit.
    * Facilidade de uso: Interface amigável e intuitiva para facilitar o uso do sistema.

### Conclusão:
- Nosso objetivo com a combinação dessas tecnologias é garantir que o EvoFit seja uma solução robusta, escalável, segura, amigável e inovadora para o acompanhamento de treinos e saúde.

##### Observação: Esta lista de tecnologias é o que temos como objetivo. Outras tecnologias podem ser utilizadas de acordo com as necessidades específicas do projeto.


## Hospedagem e Lançamento da Aplicação EvoFit

- Este documento tem como objetivo descrever o processo de hospedagem e lançamento da aplicação EvoFit, incluindo a infraestrutura necessária, os serviços de nuvem a serem utilizados e as etapas de lançamento.

**Considerações:**

    * A aplicação EvoFit é um aplicativo móvel desenvolvido com tecnologias web responsivas.
    * A aplicação será hospedada em um serviço de nuvem que ofereça escalabilidade, confiabilidade e segurança.
    * O código-fonte da aplicação será versionado e gerenciado em um repositório Git.
    * A equipe de desenvolvimento utilizará ferramentas de programação colaborativa para trabalhar no projeto.

**Infraestrutura:**

* **A aplicação EvoFit será hospedada na Heroku, que oferece uma plataforma como serviço (PaaS) para desenvolvimento e deployment de aplicações web. A Heroku oferece diversos recursos que serão utilizados para a hospedagem da aplicação EvoFit:**

    * Dyno: Contêiner para execução da aplicação.
    * Database: Banco de dados PostgreSQL para armazenamento de dados da aplicação.
    * Redis: Armazenamento em cache para melhorar o desempenho da aplicação.
    * Add-ons: Ferramentas adicionais para monitoramento, segurança e logs da aplicação.
    * Serviços de Nuvem:

* **A Heroku oferece diversos serviços de nuvem que serão utilizados para o desenvolvimento e operação da aplicação EvoFit:**

    * Heroku CLI: Ferramenta de linha de comando para gerenciamento da aplicação na Heroku.
    * Heroku Dashboard: Interface web para gerenciamento da aplicação na Heroku.
    * Heroku Pipelines: Ferramenta para automatizar o processo de deployment da aplicação.
    * Heroku Monitor: Ferramenta para monitorar o desempenho da aplicação.
    * Heroku Logplex: Ferramenta para visualizar os logs da aplicação.

**Etapas de Lançamento:**

* **O lançamento da aplicação EvoFit será realizado em etapas para garantir um lançamento suave e minimizar riscos:**

    * Desenvolvimento: Desenvolvimento da aplicação EvoFit, incluindo funcionalidades, interface do usuário e testes.
    * Lançamento Beta: Lançamento da aplicação para um grupo limitado de usuários para feedback e testes adicionais. Esse grupo será determinado posteriormente.
    * Lançamento oficial: Lançamento da aplicação para o público em geral.
    * Programação Colaborativa:

**Programação Colaborativa com VS Code e Github**
* **Editor de código:**

    * O VS Code é um editor de código leve e versátil que oferece diversas funcionalidades para desenvolvimento em diversas linguagens de programação.
    * O VS Code pode ser utilizado para editar o código-fonte da aplicação EvoFit, tanto localmente quanto em um repositório remoto no Github.
    * O VS Code oferece suporte a extensões que podem ser utilizadas para adicionar funcionalidades ao editor, como realce de sintaxe, autocompletar código e depuração.

* **Compartilhamento de projetos e versão de código::**

    * O Github é uma plataforma de hospedagem de código-fonte que permite o compartilhamento de projetos com outros membros da equipe.
    * O código-fonte da aplicação EvoFit será armazenado em um repositório Git no Github.
    * O Github oferece diversas ferramentas para o compartilhamento de projetos, como forks, pull requests e issues.
    * O Git é um sistema de controle de versão que permite o acompanhamento das alterações no código-fonte ao longo do tempo.
    * O Git permite reverter alterações, comparar diferentes versões do código e mergear alterações de diferentes branches.
    * O Github oferece integração com o Git, o que facilita o gerenciamento do código-fonte da aplicação EvoFit.

* **Website com GitHub Pages:**

    * Uma das possibilidades é criarmos o website da aplicação EvoFit utilizando o GitHub Pages. O GitHub Pages oferece um serviço gratuito para criação de websites estáticos a partir de repositórios Git.

### Conclusão:

Queremos garantir um ambiente escalável, confiável e seguro para o desenvolvimento e operação da aplicação. O lançamento em etapas permitirá uma constante adequação, minimizando riscos e garantindo o atendimento aos requisitos da PUC Minas. A utilização de ferramentas para programação colaborativa e website como GitHub Pages facilita o desenvolvimento e divulgação da aplicação.

###### Observação: Este documento é apenas um guia geral e pode ser adaptado de acordo com as necessidades específicas do projeto.







## Qualidade de Software

### Diretivas para Verificação da Qualidade do Software EvoFit com base na norma ISO/IEC 25010:2011:

**1. Funcionalidade:**

* **Verificação:**
    * Todos os requisitos funcionais do sistema EvoFit devem ser verificados e validados.
    * Testes de unidade, integração e sistema devem ser realizados para garantir que o software atende aos requisitos especificados.
    * Casos de teste devem ser criados para cada funcionalidade do sistema.
* **Critérios de Aceitação:**
    * O software deve executar todas as funcionalidades especificadas nos requisitos.
    * O software deve funcionar de acordo com as expectativas dos usuários.
    * Os resultados das funcionalidades devem ser precisos e confiáveis.

**2. Confiabilidade:**

* **Verificação:**
    * O software EvoFit deve ser testado para garantir sua confiabilidade e robustez.
    * Testes de carga, estresse e recuperação de falhas devem ser realizados para garantir que o software funcione corretamente em diferentes condições.
    * O software deve ser monitorado para identificar e corrigir falhas.
* **Critérios de Aceitação:**
    * O software deve ser capaz de realizar múltiplas transações sem falhas.
    * O software deve se recuperar de falhas de hardware e software sem perda de dados.
    * O software deve ser capaz de funcionar por longos períodos sem interrupções.

**3. Usabilidade:**

* **Verificação:**
    * O software EvoFit deve ser testado por usuários para garantir sua usabilidade e facilidade de uso.
    * Testes de usabilidade com usuários reais devem ser realizados para identificar e corrigir problemas de usabilidade.
    * A interface do usuário deve ser intuitiva e fácil de usar.
* **Critérios de Aceitação:**
    * O software deve ser fácil de aprender e usar.
    * As tarefas do usuário devem ser concluídas de forma eficiente.
    * O software deve ser amigável e agradável de usar.

**4. Eficiência:**

* **Verificação:**
    * O software EvoFit deve ser testado para garantir sua eficiência e desempenho.
    * Testes de desempenho devem ser realizados para identificar e corrigir gargalos de desempenho.
    * O software deve utilizar os recursos do sistema de forma eficiente.
* **Critérios de Aceitação:**
    * O software deve responder rapidamente às solicitações dos usuários.
    * O software deve ser capaz de realizar múltiplas transações sem afetar o desempenho.
    * O software deve utilizar os recursos do sistema de forma eficiente.

**5. Manutenibilidade:**

* **Verificação:**
    * O código-fonte do software EvoFit deve ser revisado para garantir sua manutenibilidade.
    * O código deve ser bem documentado, legível e modular.
    * O software deve ser fácil de modificar e atualizar.
* **Critérios de Aceitação:**
    * O código-fonte deve ser bem documentado e fácil de entender.
    * O software deve ser modular e fácil de modificar.
    * O software deve ser fácil de testar e depurar.

**6. Portabilidade:**

* **Verificação:**
    * O software EvoFit deve ser testado para garantir sua portabilidade em ambientes Android e iOs.
* **Critérios de Aceitação:**
    * O software deve ser capaz de funcionar em ambientes Android e iOs sem modificações funcionais.
    * O software deve ser capaz de se adaptar às diferentes configurações de hardware e software.

**7. Segurança:**

* **Verificação:**
    * O software EvoFit deve ser testado para garantir sua segurança contra ataques e vulnerabilidades.    
    * O software deve implementar medidas de segurança para proteger os dados dos usuários.
* **Critérios de Aceitação:**
    * O software deve proteger os dados dos usuários contra acesso não autorizado.
    * O software deve implementar medidas de segurança para garantir a confidencialidade, integridade e disponibilidade dos dados.    


