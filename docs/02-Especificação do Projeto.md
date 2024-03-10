# Especificações do Projeto

A definição exata do problema e os pontos mais relevantes a serem tratados neste projeto foi consolidada com a participação dos usuários em um trabalho de imersão feita pelos membros da equipe a partir da observação dos usuários em seu local natural e por meio de entrevistas. Os detalhes levantados nesse processo foram consolidados na forma de personas e histórias de usuários. 

## Personas

As personas levantadas durante o processo de entendimento do problema são apresentadas na Figuras que se seguem.

|<img src ="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t3-pmv-ads-2023-1-e3-proj-mov-t3-evofit/blob/57093d372069775188ee7a3656428954a085c42d/docs/img/Ana%20-%20A%20atarefada.png"> |  Ana - A atarefada   |             |
|--------------------|------------------------------------|----------------------------------------|
|**Idade:** 41<br>**Ocupação:** gerente de vendas, é uma profissional ocupada que trabalha em tempo integral. |**Motivações:** Manter-se saudável apesar da rotina agitada, encontrar maneiras eficientes de se exercitar e melhorar sua qualidade de vida.<br>**Frustrações:** Falta de tempo para se dedicar a atividades físicas, dificuldade em conciliar trabalho e vida pessoal e necessidade de encontrar uma solução flexível para sua rotina de exercícios.<br>**Hobbies:** Gosta de ler notícias e artigos sobre diversos assuntos no Flipboard e tem interesse em encontrar formas criativas de integrar o exercício físico à sua rotina diária. |**Principais aplicativos que utiliza:** <br>Instagram;<br>Youtube;<br>Flipboard.|

|<img src ="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t3-pmv-ads-2023-1-e3-proj-mov-t3-evofit/blob/57093d372069775188ee7a3656428954a085c42d/docs/img/Pedro%20-%20O%20iniciante%20motivado.png"> | Pedro, o Iniciante Motivado    |             |
|--------------------|------------------------------------|----------------------------------------|
|**Idade:** 26<br>**Ocupação:** Estudante universitário em período integral. |**Motivações:** Melhorar sua saúde e condicionamento físico, adotar um estilo de vida mais ativo e sentir-se mais confiante e energizado.<br>**Frustrações:** Falta de experiência em exercícios físicos, dificuldade em encontrar um programa de treinamento adequado para iniciantes e falta de orientação e apoio.<br>**Hobbies:** Cuidar da sua saúde praticando exercícios regularmente, assistir vídeos motivacionais e tutoriais de exercícios e relatar seu dia a dia como estudante universitário nas redes sociais. |**Principais aplicativos que utiliza:** <br>Instagram;<br>Youtube;<br>Facebook;<br>TikTok.|

|<img src ="https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e3-proj-mov-t3-pmv-ads-2023-1-e3-proj-mov-t3-evofit/blob/57093d372069775188ee7a3656428954a085c42d/docs/img/Luiza%20-%20A%20entusiasta%20fitness.png"> | Luíza, a Entusiasta do Fitness  |             |
|--------------------|------------------------------------|----------------------------------------|
|**Idade:** 30<br>**Ocupação:** gerente de vendas, é uma profissional ocupada que trabalha em tempo integral. |**Motivações:** Desafiar seus limites físicos, melhorar constantemente seu desempenho, inspirar e ajudar outras pessoas a alcançarem seus objetivos fitness<br>**Frustrações:** Estagnação nos resultados, falta de variedade em sua rotina de treinamento e dificuldade em conciliar sua própria rotina de exercícios com sua agenda profissional.<br>**Hobbies:** compartilhar sua jornada fitness nas redes sociais e oferecer dicas e conselhos para seus seguidores  |**Principais aplicativos que utiliza:** <br>Instagram;<br>Strava;<br>MyFitnessPal.|


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Ana, a atarefada  | Desejo registrar meus treinos rapidamente.| Para conseguir manter uma rotina de exercícios mesmo com minha agenda lotada. Porque quero cuidar da minha saúde e manter-me em forma, mas tenho pouco tempo disponível devido ao meu trabalho como gerente de vendas em tempo integral.  |
|Pedro, o iniciante motivado | Quero ter acesso gratuito a fichas de exercícios pré-montadas para iniciantes. | Para começar minha jornada fitness com orientação adequada. Porque recentemente decidi melhorar minha saúde e condicionamento físico, mas não tenho muita experiência com exercícios. |
|Luíza, a entusiasta do fitness|Desejo personalizar minhas próprias fichas de treino.| Para continuar desafiando meus limites e melhorar meu desempenho. Porque frequento a academia regularmente há anos e gosto de ter controle sobre meus treinos para alcançar meus objetivos de fitness.|

## Requisitos

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-01| O aplicativo deve permitir que os usuários visualizem sua rotina de exercícios na página inicial.| Alta | 
|RF-02| O aplicativo deve exibir imagens ilustrativas para cada exercício listado na rotina do usuário.  | Média |
|RF-03| O aplicativo deve possibilitar a visualização detalhada de cada exercício, incluindo instruções e dicas de execução.  | Média |
|RF-04| O aplicativo deve oferecer opções para os usuários personalizarem suas rotinas de treino de acordo com suas preferências.  | Média |
|RF-05| O aplicativo deve possibilitar que os usuários salvem seus exercícios favoritos para fácil acesso posterior.  | Alta |
|RF-06| O aplicativo deve permitir que os usuários compartilhem suas conquistas e progresso em redes sociais.| Média |
|RF-07| O aplicativo deve oferecer uma seção para os usuários verificarem seus exercícios salvos. | Baixa |
|RF-08| O aplicativo deve indicar a assiduidade aos treinos.   | Alta|
|RF-09| O aplicativo deve fornecer vídeos demonstrativos dos exercícios   | Alta |
|RF-10| O aplicativo deve gerar um relatório de evolução do usuário. | Alta |
|RF-11| O aplicativo deve ser capaz de registrar fotografias da evolução física dos usuários.   | Média |

### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-01| O aplicativo EvoFit deve ser hospedado nas plataformas de download de dispositivos móveis.|Alta| 
|RNF-02| O aplicativo EvoFit deve ser responsivo, proporcionando uma experiência de usuário adequada em dispositivos móveis. |  Alta | 
|RNF-03| O aplicativo EvoFit deve apresentar uma boa legibilidade e contraste para garantir a acessibilidade a todos os usuários.  |  Média | 
|RNF-04| O aplicativo EvoFit deve ser compatível com os principais empresas de aparelhos móveis. |  Alta | 

## Restrições

O projeto está restrito pelos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|RE-01| O projeto EvoFit deve ser concluído até o final do semestre letivo, não podendo ultrapassar a data estabelecida pela PUC Minas. |
|RE-02| Baixo número de desenvolvedores envolvidos no projeto.|
|RE-03| A equipe não pode subcontratar o desenvolvimento do trabalho. |

## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 


## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
