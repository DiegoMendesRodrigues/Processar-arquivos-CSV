/**
 * Biblioteca para tratar arquivos CSV
 * 
 * Exemplo de uso:
 * node src/cli.js -a 'pessoas.csv' -p './arquivos/' -s 'pessoasTradado.csv' -d './resultados/' -sep ';' -t csv
 * node src/cli.js -a 'pessoas.csv' -p './arquivos/' -s 'pessoasTradado.xlsx' -d './resultados/' -sep ',' -t xlsx
 * @public
 * @author Diego Mendes Rodrigues
 */
import path from 'path'
import chalk from 'chalk'
import { Command } from 'commander'
import { lerArquivoCSV } from './arquivos.js'

const programa = new Command()
programa
  .version('1.0.0')
  .description('Biblioteca para tratar arquivos CSV')
  .requiredOption('-a, --arquivo <string>', 'Arquivo CSV que será processado')
  .requiredOption('-p, --pasta <string>', 'Caminho da pasta referente ao arquivo CSV que será processado')
  .requiredOption('-s, --saida <string>', 'Arquivo CSV após o processamento')
  .requiredOption('-d --destino <string>', 'Caminho da pasta onde o resultado será armazenado')
  .requiredOption('-sep --separador <string>', 'Separador de colunas utilizado no novo arquivo CSV')
  .option('-t --tipo <string>', 'Tipo do arquivo de saída, podendo ser csv ou xlsx', 'csv')
  .action((options) => {
    const { arquivo, pasta, saida, destino, separador, tipo } = options

    if (!arquivo || !pasta || !saida || !destino || !separador) {
      console.error(chalk.red('Erro: Favor inserir os seguintes parâmetros:\n- O arquivo que será processado\n- Caminho da pasta referente ao arquivo CSV que será processado\n- Arquivo CSV após o processamento\n- Caminho da pasta referente ao novo arquivo processado\n- Separador de colunas utilizado no novo arquivo CSV'))
      programa.help()
      return
    }

    if (tipo.toLowerCase() !== 'csv' && tipo.toLowerCase() !== 'xlsx') {
      console.error(chalk.red('Erro: O tipo do arquivo de saída deve ser csv ou xlsx'))
      programa.help()
      return
    }

    const arquivoCSV = path.resolve(pasta + arquivo)
    const arquivoSaida = path.resolve(destino + saida)

    try {
      console.log(chalk.green('Iniciando o processo de conversão do arquivo CSV'))

      if (tipo.toLowerCase() === 'csv') {
        lerArquivoCSV(arquivoCSV, separador, arquivoSaida, tipo.toLowerCase())
      } else {
        lerArquivoCSV(arquivoCSV, ',', arquivoSaida, tipo.toLowerCase())
      }
    } catch (erro) {
      console.error(chalk.bgRed('Ocorreu um erro no processamento', erro))
    }
  })
  .parse(process.argv)
