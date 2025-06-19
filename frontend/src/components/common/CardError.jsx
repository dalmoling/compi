import { Link } from "react-router-dom";

const CardError = ({ message, errorType, errorDetails }) => {
  // Função para exibir sugestões com base no tipo de erro
  const getSuggestion = (errorType) => {
    switch (errorType) {
      case "key_error":
        return "Verifique se todos os símbolos na sua entrada estão definidos na gramática. Cada símbolo usado na entrada deve aparecer no lado direito de alguma produção.";
      case "parser_error":
        return "Verifique se a gramática está formatada corretamente. Cada produção deve terminar com um ponto. Exemplo correto: 'S->A|B.' (com ponto no final).";
      case "value_error":
        return "Verifique se os valores fornecidos estão no formato correto. A gramática deve seguir o formato 'NT->T.' onde NT é um não-terminal e T são terminais ou não-terminais.";
      case "empty_input":
        return "A entrada e a gramática não podem estar vazias. Preencha ambos os campos antes de analisar.";
      case "connection_error":
        return "Não foi possível conectar ao servidor. Verifique sua conexão com a internet ou tente novamente mais tarde.";
      case "format_error":
        return "A gramática precisa terminar com um ponto final após cada produção. Por exemplo: 'S->A.' em vez de 'S->A'";
      case "syntax_error":
        return "A gramática contém erros de sintaxe. Verifique se está usando os símbolos corretos e se a estrutura das produções está correta.";
      case "reserved_symbol":
        return "Você está usando símbolos reservados que têm significado especial no sistema. Substitua-os por outros símbolos.";
      default:
        return "Tente simplificar sua gramática ou entrada e tentar novamente. Gramáticas muito complexas podem causar problemas de processamento.";
    }
  };

  // Função para fornecer exemplos de correção
  const getExample = (errorType) => {
    switch (errorType) {
      case "key_error":
        return (
          <>
            <p><strong>Exemplo correto:</strong></p>
            <p>Gramática: <code>S->a|b.</code></p>
            <p>Entrada: <code>a</code> ou <code>b</code> (apenas símbolos definidos na gramática)</p>
          </>
        );
      case "parser_error":
        return (
          <>
            <p><strong>Exemplo correto:</strong></p>
            <p>Gramática: <code>S->A. A->a|b.</code></p>
            <p>Observe o ponto final após cada produção.</p>
          </>
        );
      case "empty_input":
        return (
          <>
            <p><strong>Exemplo correto:</strong></p>
            <p>Gramática: <code>S->a|b.</code></p>
            <p>Entrada: <code>a</code></p>
          </>
        );
      case "format_error":
        return (
          <>
            <p><strong>Exemplo correto:</strong></p>
            <p>Gramática incorreta: <code>S->A</code></p>
            <p>Gramática correta: <code>S->A.</code></p>
          </>
        );
      case "syntax_error":
        return (
          <>
            <p><strong>Exemplo correto:</strong></p>
            <p>Gramática incorreta: <code>F->[E].</code> ou <code>S->a(.</code></p>
            <p>Gramática correta: <code>F->(E).</code> ou <code>S->a.</code></p>
          </>
        );
      case "reserved_symbol":
        return (
          <>
            <p><strong>Exemplo correto:</strong></p>
            <p>Gramática incorreta: <code>S->$.</code></p>
            <p>Gramática correta: <code>S->a.</code> (use outro símbolo em vez de $)</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="card text-white bg-danger mb-3">
        <div className="card-header">
          <h4>Erro na Análise Sintática</h4>
        </div>
        <div className="card-body">
          <h5 className="card-title">Problema Encontrado:</h5>
          <p className="card-text">{message}</p>
          
          {errorType && (
            <div className="alert alert-warning mt-3">
              <h5>Sugestão para Correção:</h5>
              <p>{getSuggestion(errorType)}</p>
              
              {getExample(errorType) && (
                <div className="bg-light text-dark p-3 rounded mt-2">
                  {getExample(errorType)}
                </div>
              )}
            </div>
          )}
          
          <div className="d-flex justify-content-between mt-4">
            <Link to="/" className="btn btn-light">
              <i className="bi bi-arrow-left"></i> Voltar ao início
            </Link>
            <a 
              href="https://github.com/RogerioCrestani/tcc-simulador-analise-sintatica/issues" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-outline-light"
            >
              Reportar Problema
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardError;
