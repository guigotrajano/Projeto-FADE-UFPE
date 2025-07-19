# Dashboard de Livros - OpenLibrary

## Visão Geral
Este é um dashboard de livros que consome a API pública da OpenLibrary para listar, pesquisar e visualizar detalhes de obras literárias. A aplicação oferece uma interface responsiva e moderna para explorar livros de forma intuitiva.

## Funcionalidades
- **Listagem de Livros**: Exibe livros em cards organizados em grid responsivo
- **Pesquisa Dinâmica**: Busca por título, autor ou termo geral com debounce de 500ms
- **Paginação**: Navegação entre páginas com informações de resultados
- **Detalhes do Livro**: Modal com informações completas do livro selecionado
- **Estados da Aplicação**: Loading, erro, vazio e sucesso com feedback visual
- **Interface Responsiva**: Design adaptável para diferentes tamanhos de tela

## Tecnologias
- **React 19.1.0** - Biblioteca principal para interface
- **Material-UI 7.2.0** - Componentes de UI
- **Tailwind CSS 4.0.0** - Utilitários de estilização
- **Axios 1.10.0** - Cliente HTTP para requisições
- **Vite 7.0.4** - Build tool e dev server
- **Jest + React Testing Library** - Testes unitários
- **pnpm** - Gerenciador de pacotes

## Instalação

```bash
# Clone o repositório
git clone <url-do-repositorio>
cd book-dashboard

# Instale as dependências
pnpm install

# Execute o projeto em modo desenvolvimento
pnpm dev
```

## Scripts Disponíveis

- `pnpm dev`: Inicia o servidor de desenvolvimento
- `pnpm build`: Gera build de produção
- `pnpm test`: Executa os testes unitários
- `pnpm test:watch`: Executa testes em modo watch
- `pnpm lint`: Executa o linter
- `pnpm preview`: Visualiza o build de produção

## Estrutura do Projeto

```
src/
├── components/
│   ├── BookCard/          # Card individual do livro
│   ├── BookModal/         # Modal de detalhes do livro
│   ├── SearchBar/         # Barra de pesquisa
│   ├── Loading/           # Componentes de loading
│   └── Pagination/        # Componente de paginação
├── services/
│   └── openLibraryAPI.js  # Serviços de API
├── hooks/
│   ├── useBooks.js        # Hook para gerenciar livros
│   └── useDebounce.js     # Hook para debounce
├── utils/
│   └── helpers.js         # Funções utilitárias
└── App.jsx                # Componente principal
```

## Decisões Técnicas

### Arquitetura
- **Componentização**: Componentes reutilizáveis e bem estruturados
- **Hooks Customizados**: Lógica de negócio separada em hooks
- **Serviços**: Camada de abstração para APIs externas
- **Estado Local**: Uso de useState e useEffect para gerenciamento de estado

### Padrões Utilizados
- **Container/Presentational**: Separação entre lógica e apresentação
- **Custom Hooks**: Reutilização de lógica entre componentes
- **Error Boundaries**: Tratamento de erros em componentes
- **Loading States**: Estados de carregamento para melhor UX

### API Integration
- **OpenLibrary API**: Consumo da API pública para dados de livros
- **Error Handling**: Tratamento robusto de erros de rede
- **Debouncing**: Otimização de performance na busca
- **Pagination**: Navegação eficiente entre resultados

## Próximos Passos

### Funcionalidades Futuras
- [ ] Sistema de favoritos com localStorage
- [ ] Filtros avançados por ano e idioma
- [ ] Histórico de buscas recentes
- [ ] Visualizações de dados com gráficos
- [ ] Testes de integração
- [ ] Storybook para documentação de componentes

### Melhorias Técnicas
- [ ] Implementação de React Query para cache
- [ ] Otimização de performance com React.memo
- [ ] Implementação de PWA
- [ ] Internacionalização (i18n)
- [ ] Acessibilidade (ARIA labels)

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
