/**
 * Trabalhar com arquivos CSV
 * @public
 * @author Diego Mendes Rodrigues
 */
import fs from 'fs'
import chalk from 'chalk'
import {convertCsvToXlsx} from '@aternus/csv-to-xlsx'
import { extrairLinhas, criarLinhaDeSaida } from './tratarInformacoes.js'

/**
 * Ler o arquivo CSV do computador
 * @param {*} caminhoDoarquivo 
 * @param {*} separador 
 * @param {*} caminhoSaida 
 */
function lerArquivoCSV(caminhoDoarquivo, separador, caminhoSaida, tipoDeSaida) {
  console.log(chalk.green('Lendo o arquivo CSV'))
  fs.readFile(caminhoDoarquivo, 'utf-8', (erro, texto) => {
    try {
      if (erro) {
        throw erro
      }

      const informacoes = extrairLinhas(texto)
      const linhasSaida = criarLinhaDeSaida(informacoes, separador)
      console.log(chalk.green('Geradas as informações de saída'))
      
      escreverArquivoSaida(caminhoSaida, linhasSaida, tipoDeSaida)
    } catch (erro) {
      console.error(chalk.red('Ocorreu um erro no processamento, detalhes abaixo,\n', erro))
    }
  })
}

/**
 * Escrever a nova versão do arquivo CSV no computador
 * @param {*} caminhoArquivo 
 * @param {*} informacoes 
 */
async function escreverArquivoSaida(caminhoArquivo, informacoes, tipoDeSaida) {
  let arquivoCSV = caminhoArquivo
  const arquivoXlsx = caminhoArquivo

  if (tipoDeSaida === 'csv') {
    console.log(chalk.green('Escrevendo o arquivo CSV de saída'))
    try {
      await fs.promises.writeFile(arquivoCSV, informacoes)
      console.log(chalk.green('Arquivo CSV escrito'))
    } catch (erro) {
      throw erro
    }
  } else {
    arquivoCSV = caminhoArquivo.replaceAll('xlsx', 'tmp')
    console.log(chalk.magenta('Escrevendo o arquivo temporário de saída'))
    try {
      await fs.promises.writeFile(arquivoCSV, informacoes)
      console.log(chalk.magenta('Arquivo temporário criado'))
      apagarArquivo(arquivoXlsx)
      console.log(chalk.green('Escrevendo o arquivo XLSX de saída'))
      convertCsvToXlsx(arquivoCSV, arquivoXlsx);
      console.log(chalk.green('Arquivo XLSX escrito'))
      apagarArquivo(arquivoCSV)
      console.log(chalk.magenta('Arquivo temporário excuído'))
    } catch (erro) {
      throw erro
    }
  }
  console.log(chalk.green('Operação finalizada!'))
}

/**
 * Apagar um arquivo do sistema
 * @param {*} caminhoArquivo 
 */
function apagarArquivo(caminhoArquivo) {
  if (fs.existsSync(caminhoArquivo)) {
    fs.unlink(caminhoArquivo, function (erro) {
      if (erro) {
        console.error(chalk.red('Falha ao excluir o arquivo'))
        throw erro
      }
    })
  }
}

export { lerArquivoCSV }