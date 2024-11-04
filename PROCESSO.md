# Processo de pensamento

Primeiro eu Criei o arquivo [TODO.md](TODO.md) para listar as tecnologias do cliente e servidor, para depois separar e adicionar o máximo de detalhes que pude pensar antes de iniciar o código.

Meu primeiro passo foi iniciar o back-end, criar o servidor express e todas as suas rotas.

Seguindo tutoriais, criei um servidor do zero e fui desenvolvendo arquivos para servidor teste com nodemon e typescript.

Na criação do banco de dados acabei utilizando MySQL e fui desenvolvendo as entidades conforme o que pude extrair dos prints.

Logo após fui testar a build e seus respectivos arquivos, logo após fui criar minha primeira rota para utiliza-la como padrão e estabelecer a conexão com o banco de dados.

Após ter minha primeira rota rodando e sendo testada com postman, parti para a criação das rotas dos clients, onde listo, busco resultado unitário, crio uma rota para cada uma das rotas de edição e de deletar, e de edição e de deletar.

Agora que meu back-end está minimamente configurado para o primário do teste, posso começar o desenvolvimento do front-end.

Para esse projeto eu decidi utiliza next.js, sei que é uma tecnologia poderosa, mas a irei usar mais focado na sua simplicidade de configurações, performance e segurança.

Iniciei a configuração e instalação do next.js e suas dependências focando em entregar as funcionalidades básicas da aplicação.

Instalei e configurei meu app buscando recursos da uol, como a font, cores, favicon e svgs.

Na criação da tela inicial, comecei imaginando uma versão onde se encaixaria em mobile-first, tendo que pensar primeiramente na aplicação com 280px até chegar na altura da imagem de exemplo (cerca de 1536px).

Durante a integração do back, tive problemas com o CORS onde tive que configurar o back para aceitar o CORS na rota teste do client(localhost:3000).

Após criar boa parte do que seria padrão das rotas, como header, body title e boa parte dos designs seguindo uma relação muito lógica e bem organizada. Segui para a página de de criação/edição onde pude reaproveitar boa parte dos designs e otimizar grande parte da tela para ser server component oferecendo mais performance.

Na criação dos inputs optei por usar o [react-hook-form](https://react-hook-form.com/) para facilitar a criação de formulários e otimizar o uso de validações, junto com [yup](https://github.com/jquense/yup) para validações mais complexas.

Agora que o principal está concluído, irei partir para a atualização do dos clientes.

Para validar números no front utilizei essa função como referência em validação de números telefónicos no Brasil.

Utilizei a tela de criação para a edição também, como também melhorei a manipulação das queries revalidando e deletando elas quando não utilizadas pelo usuário.

As máscaras de inputs que criei são adicionadas quando o usuário edita um dado mas são deletadas quando enviadas pelo back para seguir a padronização sem caracteres especiais.
