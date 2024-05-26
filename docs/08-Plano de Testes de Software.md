# Plano de Testes de Software

Os requisitos para realização dos testes de software são:

⦁	Site publicado na Internet

⦁	Navegador da Internet - Chrome, Firefox ou Edge

⦁	Conectividade de Internet para acesso às plataformas (APISs)

Os testes funcionais a serem realizados no aplicativo são descritos a seguir:
 
 <br>
 
| **Caso de Teste** 	| **CT-01 – Logar na aplicação** 	|
|:---:	|:---:	|
|	Requisitos Associados 	| RF-01 - A aplicação deve possuir login do usuário conforme perfil: inserindo email, e inserindo senha. |
| Objetivo do Teste 	| Verificar se a aplicação faz distinção dos perfis de usuário |
| Passos 	| 1) Acessar a aplicação <br> 2) Inserir email  <br> 3) inserir senha <br> 4) Submeter matrícula e senha no formulário de login |
|Critério de Êxito | ⦁	O sistema deve verificar se o email e senha inseridos está associado ao perfil selecionado. <br> ⦁	Em caso de incompatibilidade dos dados de login, deve ser exibida uma mensagem informando que precisa criar uma conta. |
|  	|  	|
| Caso de Teste 	| **CT-02 – Inserir, atualizar e deletar usuários**	|
|Requisitos Associados | RF-02	- A aplicação deve apresentar em tela única todos os campos de entradas de registro do usuario com algumas opções  pré-definidas. <br> RF-08 - A aplicação deve fornecer ao usuario a possibilidade de inserir, atualizar e deletar usuários e também a opção de consulta-los. |
| Objetivo do Teste 	| Verificar se a aplicação apresenta um sistema que permite cadastrar, atualizar e deletar usuários |
| Passos 	| 1) Acessar o Aplicativo <br> 2) Inserir o email <br> 3) Inserir a senha <br> 4) Clicar em uma das três opções: Novo usuário, Atualizar dados de usuário e deletar usuários|
|Critério de Êxito | ⦁	A página deve apresentar a opção Criar conta apenas na primeira tela <br> ⦁	Ao clicar em Nova conta, o sistema deve apresentar campos para preenchimento referentes ao nome, endereço, idade, sexo, telefone, e-mail. <br> ⦁	A opção de estado e sexo devem ser apresentadas em campos select.|
|  	|  	|
| Caso de Teste 	| **CT-03 – Verificar dados de treino**	|
|Requisito Associado | RF-04	-A aplicação deve permitir a verificação de dados dos treinos feitos pelos usuarios. |
| Objetivo do Teste 	| Verificar se a aplicação permite verificar de dados de treino do usuario. |
| Passos 	| 1) Acessar o Aplicativo <br> 2) Inserir o email <br> 3) Inserir a senha <br>4) Logar utilizando o perfil <br> 4) ir em configurações <br> 5) ir em relatorio de desempenho |
|Critério de Êxito | ⦁	O sistema deve apresentar dados sobre o usuario,com foto, conquistas, bioimpendacia,frequencia de treino,dias de treino. <br> ⦁	A aplicação deve exibir todos os dados de maneira dinamica e pratica. |
 |   |  	|
| Caso de Teste 	| **CT-04 – Editar treino**	|
|Requisito Associado | RF-07	- A aplicação deve fornecer ao usuario a possibilidade de criar, alterar e consultar seus treinos. |
| Objetivo do Teste 	| Verificar se a aplicação permite inserir um novo treino. |
| Passos 	|  1) Acessar a aplicação <br> 2) Inserir o email e senha <br> 3) Ir em configurações <br> 4) Buscar por editar treino <br> 5) Escolher entre treino A,B,C. <br> 6) Clicar em editar <br> 7) Inserir novo tipo de treino <br>|
|Critério de Êxito | ⦁	O sistema deve apresentar campos para inserção dos dados de novo treino. <br> ⦁	A aplicação salvar com exito 3 tipos de treino diferentes. |
 |  	|  	|
| Caso de Teste 	| **CT-05 – Consultar evolução do treino**	|
|Requisito Associado | RF-07	- A aplicação deve fornecer ao usuario a possibilidade de  consultar  seus treinos. |
| Objetivo do Teste 	| Verificar se a aplicação permite consultar seus treinos mes a mes. |
| Passos 	|  1) Acessar a aplicação <br> 2) Inserir o email e senha <br> 4) Buscar o mes escolhido na parte superior da aplicação <br> 5) Clicar no mes <br> |
|Critério de Êxito | ⦁	A aplicação deve exibir com êxito os dados do mes como, treino perdido, treino realizado, qual treino feito, A,B,C. |
 |  	|  	|

 
