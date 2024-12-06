/**
 * Tratar as linhas e as colunas dos arquivos CSV
 * @public
 * @author Diego Mendes Rodrigues
 */

/**
 * Extrair os linhas do arquivo
 * @param {*} informacoes 
 * @returns 
 */
function extrairLinhas(informacoes) {
  const linhas = informacoes.split('\n')
  let linhasSemEspacos = []

  linhas.forEach((linhaOriginal) => {
    let colunas = linhaOriginal.split(',')
    linhasSemEspacos.push(limparEspacos(colunas))
  })

  return linhasSemEspacos
}

/**
 * Limpar os espaços em branco desnecessários de cada coluna
 * @param {*} linha 
 * @returns 
 */
function limparEspacos(linha) {
  let resultado = []
  linha.forEach(function (informacao) {
    resultado.push(informacao.trim())
  })
  return resultado + '\n'
}

function criarLinhaDeSaida(linha, separador) {
  return linha.join('').replaceAll(',', separador)
}

export { extrairLinhas, criarLinhaDeSaida }