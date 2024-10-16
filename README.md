# VETCAREPRO

## Integrantes

[Weverton Cintra](https://github.com/WevertonCintra) | [Pedro Souza](https://github.com/iShouldz) | [Luiz Fellipe](https://github.com/Luizfdarb) | [Lucas Romeiro](https://github.com/lucas-romeiro) | [Romário Abílio](https://github.com/romarioabilio)

## Sobre o Projeto

Api do VetCarePro, aplicação Web da disciplina Projeto de Desenvolvimento de Software.

## Requisitos de execução

1. npm
2. nodejs 20.15.1
3. docker e docker-compose para rodar a imagem docker do postgresql

## Aplicação

### Dicas Docker Compose

1. docker compose up -d

### Dicas Prisma

1. npx prisma -h - (helper de comandos)
2. npx prisma init - (inicia o prisma)
3. npx prisma generate - (cria as tipagens de configurações dos models)
4. npx prisma migrate dev - (cria uma nova migration a partir das alterações nos models)
5. npx prisma migrate deploy - (só executa as migrations)
6. npx prisma studio - (interface do banco de dados no navegador)

### Dicas de execução

1. modifique o .env.example para .env
2. modo dev: npm run dev
3. modo build: npm run start

### Configurações commits

#### feat
> São adições de novas funcionalidades ou de quaisquer outras novas implantações ao código

#### fix
> Essencialmente definem o tratamento de correções de bugs

#### refactor
> Utilizado em quaisquer mudanças que sejam executados no código, porém não alterem a funcionalidade final da tarefa impactada

#### chore
> Atualização de tarefas que não ocasionam alteração no código de produção, mas mudanças de ferramentas, mudanças de configuração e bibliotecas

#### docs
> Inclusão ou alteração somente de arquivos de documentação

#### perf
> Uma alteração de código que melhora o desempenho

#### style
> Alterações referentes a formatações na apresentação do código que não afetam o significado do código, como por exemplo: espaço em branco, formatação, ponto e vírgula ausente etc

#### test
> Adicionando testes ausentes ou corrigindo testes existentes nos processos de testes automatizados (TDD)

#### build
> Alterações que afetam o sistema de construção ou dependências externas (escopos de exemplo: gulp, broccoli, npm)

#### ci
> Mudanças em nossos arquivos e scripts de configuração de CI (exemplo de escopos: Travis, Circle, BrowserStack, SauceLabs)

#### env
> Utilizado na descrição de modificações ou adições em arquivos de configuração em processos e métodos de integração contínua (CI), como parâmetros em arquivos de configuração de containers
