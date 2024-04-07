# Programação de Funcionalidades - EvoFit App
## Objetivo:

Descrever a implementação das funcionalidades do aplicativo EvoFit, incluindo:

#### Sumário para facilitar nossa conferência posterior:
Requisitos funcionais e não funcionais: Detalhes sobre os requisitos atendidos por cada funcionalidade.
Artefatos: Código-fonte, estruturas de dados e instruções para acesso e verificação da implementação.
Funcionalidades: Implementação detalhada de cada funcionalidade do aplicativo.
#### Considerações:
O aplicativo será desenvolvido com tecnologias web responsivas para funcionar em smartphones e tablets.
O HTML5 Local Storage será utilizado para armazenar dados localmente no dispositivo do usuário.
O formato JSON será utilizado para troca de dados entre o aplicativo e o servidor.

## Requisitos Funcionais:

> 1. Cadastro de Usuário:
>
> Funcionalidade: Permitir que o usuário crie uma conta no EvoFit.
> - Requisitos:
> - O usuário deve fornecer nome, email, senha, data de nascimento, sexo, altura e peso.
> - A senha deve ser criptografada antes de ser armazenada.
> - O email deve ser validado antes de criar a conta.
> Artefatos:
> - Tela de cadastro de usuário (HTML, CSS, JavaScript).
> - API para criação de usuário (Python, Django ** são sugestões mas verificaremos e alteraremos no decorrer do semestre).
> - Modelo de dados de usuário (banco de dados PostgreSQL).
> - Estruturas de dados:
> - Objeto JSON com dados do usuário (nome, email, senha, etc.).
> Instruções para acesso e verificação:
> - O usuário pode acessar a tela de cadastro através do menu principal do aplicativo.
> - Após preencher os dados e clicar em "Criar conta", a API de criação de usuário será chamada.
> - Se a criação da conta for bem-sucedida, o usuário será redirecionado para a tela principal do aplicativo.

> 2. Criação de Treino:
>
> Funcionalidade: Permitir que o usuário crie um novo treino.
> - Requisitos:
> - O usuário deve escolher um tipo de treino (cardio, força, etc.), um nome, um objetivo e a duração do treino.
> - O usuário pode adicionar exercícios ao treino, definindo séries, repetições e carga para cada exercício.
> Artefatos:
> - Tela de criação de treino (HTML, CSS, JavaScript).
> - API para criação de treino (Python, Django).
> - Modelo de dados de treino (banco de dados PostgreSQL).
> - Estruturas de dados:
> - Objeto JSON com dados do treino (tipo, nome, objetivo, duração, etc.).
> - Lista de objetos JSON com dados dos exercícios do treino (nome, séries, repetições, carga).
> Instruções para acesso e verificação:
> - O usuário pode acessar a tela de criação de treino através do menu principal do aplicativo.
> - Após preencher os dados e clicar em "Criar treino", a API de criação de treino será chamada.
> - Se a criação do treino for bem-sucedida, o usuário será redirecionado para a tela de visualização do treino.

> 3. Execução de Treino:
>
> Funcionalidade: Permitir que o usuário realize um treino.
> - Requisitos:
> - O usuário deve poder visualizar os exercícios do treino, as séries, repetições e carga para cada exercício.
> - O usuário deve poder registrar o progresso do treino, informando as séries e repetições realizadas para cada exercício.
> - O aplicativo deve fornecer feedback em tempo real sobre o desempenho do usuário.
> Artefatos:
> - Tela de execução de treino (HTML, CSS, JavaScript).
> - API para registro de progresso do treino (Python, Django).
> - Modelo de dados de registro de treino (banco de dados PostgreSQL).
> Estruturas de dados:
> - Objeto JSON com dados do registro de treino (treinoId, data, séries, repetições).
> Instruções para acesso e verificação:
> - O usuário pode acessar a tela de execução de treino através da lista de treinos.
> - Ao iniciar o treino, o aplicativo irá carregar os dados do treino do servidor.
> - O usuário poderá visualizar os exercícios do treino, as séries, repetições e carga para cada exercício.
> - Para registrar o progresso do treino, o usuário deve informar as séries e repetições realizadas para cada exercício.
> - O aplicativo irá calcular o tempo de descanso entre as séries e fornecer feedback em tempo real sobre o desempenho do usuário, como o número total de repetições realizadas e o tempo total do treino.
> - Ao final do treino, o usuário poderá salvar o progresso do treino e visualizar um resumo do desempenho.

> 4. Acompanhamento de Progresso:
>
> Funcionalidade: Permitir que o usuário acompanhe seu progresso ao longo do tempo.
> - Requisitos:
> - O usuário deve poder visualizar gráficos e tabelas com seu histórico de treinos.
> - O aplicativo deve fornecer insights sobre o progresso do usuário, como a evolução da força, resistência e desempenho geral.
> Artefatos:
> - Tela de acompanhamento de progresso (HTML, CSS, JavaScript).
> - API para recuperação de histórico de treinos (Python, Django).
> - Módulo de análise de dados (Python, TensorFlow).
> Estruturas de dados:
> - Lista de objetos JSON com dados dos treinos realizados (data, tipo, duração, etc.).
> - Gráficos e tabelas com o histórico de treinos.
> Instruções para acesso e verificação:
> - O usuário pode acessar a tela de acompanhamento de progresso através do menu principal do aplicativo.
> - O aplicativo irá carregar o histórico de treinos do usuário do servidor.
> - O usuário poderá visualizar gráficos e tabelas com seu histórico de treinos, como a evolução da força, resistência e desempenho geral.
> - O aplicativo também fornecerá insights sobre o progresso do usuário, como a quantidade de calorias queimadas e o tempo total de treino.

> 5. Integração com Dispositivos Wearables:
>
> Funcionalidade: Permitir que o aplicativo se integre com dispositivos wearables para monitorar a atividade física do usuário.
> Requisitos:
> - O aplicativo deve ser capaz de se conectar com dispositivos wearables via Bluetooth.
> - O aplicativo deve ser capaz de importar dados de atividade física do dispositivo wearable, como frequência cardíaca, passos dados e distância percorrida.
> Artefatos:
> - SDK para integração com dispositivos wearables (Android, iOS).
> - API para importação de dados de atividade física (Python, Django).
> Estruturas de dados:
> - Objeto JSON com dados de atividade física (frequência cardíaca, passos dados, distância percorrida).
> - Instruções para acesso e verificação:
> - O usuário poderá configurar a integração com o dispositivo wearable nas configurações do aplicativo.
> - Após a configuração, o aplicativo irá se conectar com o dispositivo wearable e importar os dados de atividade física.
> - O usuário poderá visualizar os dados de atividade física na tela de acompanhamento de progresso.

##### Observações:

Esta lista de funcionalidades é apenas um exemplo/idealização que diz respeito ao nosso objetivo para a aplicação EvoFit. Algumas dessas funcionalidades podem ser retiradas do escopo ou alteradas e outras funcionalidades podem ser implementadas de acordo com as necessidades específicas do projeto. O código-fonte, as estruturas de dados e as instruções para acesso e verificação também, podendo ser modificados de acordo com a implementação específica do aplicativo.
