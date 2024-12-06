# Biblioteca para tratar arquivos CSV

## Descrição
Biblioteca para limpar os espaços em banco das colunas de arquivos CSV, e posteriormente, sarvar um novo arquivo utilizando um novo separador

## Utilização

Os códigos dos arquivos que estão neste repositório foram executados utilizando o [Node.js](https://nodejs.org/pt), da sequinte forma:
```
node src/cli.js -a 'pessoas.csv' -p './arquivos/' -s 'pessoasTradado.csv' -d './resultados/' -sep ';' -t csv

node src/cli.js -a 'pessoas.csv' -p './arquivos/' -s 'pessoasTradado.xlsx' -d './resultados/' -sep ',' -t xlsx
```

## Tecnologias

- JavaScript
- Node.js
- Commander.js
- Chalk
- @aternus/csv-to-xlsx

## Acesso ao Projeto

Qualquer pessoa pode utilizar, basta possuir um navegador web, ou o Node.js instalado no computador.

**Quem pode contribuir?**

Qualquer desenvolvedor pode contribuir, sendo muito bem-vindo!

## Pessoas Desenvolvedoras

[Diego Mendes Rodrigues](mailto:diego.m.rodrigues@gmail.com)

## Licença

[MIT](LICENSE.md)