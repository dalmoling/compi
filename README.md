#Documentação das Novas Implementações no SASC
##Introdução
Este documento descreve as melhorias implementadas no SASC (Simulador de Análise Sintática em Compiladores), originalmente desenvolvido por Rogério Crestani. As modificações focaram em aprimorar o tratamento de erros, a validação de entradas e a experiência do usuário.

Sumário
Visão Geral das Modificações
Validação de Entradas
Tratamento de Erros Específicos
Prevenção de Erros de Execução
Melhorias na Interface do Usuário
Testes e Validação
Guia de Implementação
Visão Geral das Modificações
As modificações implementadas visam tornar o SASC mais robusto, informativo e amigável ao usuário, especialmente para estudantes que estão aprendendo sobre compiladores. As principais áreas de melhoria incluem:

Validação rigorosa de entradas: Verificação prévia de gramáticas e entradas para prevenir erros.
Tratamento estruturado de exceções: Captura e tratamento adequado de diferentes tipos de erros.
Mensagens de erro informativas: Feedback claro e orientações para correção.
Prevenção de falhas de execução: Verificações adicionais para evitar erros como "pop from empty list".
Interface de usuário aprimorada: Melhor apresentação de erros e sugestões de correção.
Validação de Entradas
Verificação de Campos Vazios

if not input or input.isspace() or not grammar or grammar.isspace():
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A entrada ou gramática não pode estar vazia",
        "errorType": "empty_input",
        "errorDetails": "Os campos não podem conter apenas espaços em branco. Preencha com uma gramática válida e uma entrada para análise."
    }
    
Verificação de Formato da Gramática
# Verificar se a gramática termina com ponto
if not grammar.endswith('.'):
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática está mal formatada - falta o ponto final",
        "errorType": "format_error",
        "errorDetails": "Cada produção na gramática deve terminar com um ponto. Exemplo: 'S->A.'"
    }

# Verificar se a gramática contém o símbolo "->"
if "->" not in grammar:
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática está mal formatada - formato de produção incorreto",
        "errorType": "syntax_error",
        "errorDetails": "Cada produção deve usar o formato 'NT->T'. Exemplo: 'S->A.'"
    }

## Tratamento de Erros Específicos
Verificação de Símbolos e Estruturas Não Suportadas

### Verificar uso de colchetes em vez de parênteses
if '[' in grammar or ']' in grammar:
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática contém colchetes [ ] que não são suportados",
        "errorType": "syntax_error",
        "errorDetails": "Use parênteses ( ) em vez de colchetes [ ] na sua gramática. Exemplo: 'F->(E).' em vez de 'F->[E].'"
    }

###Verificar parênteses desbalanceados
if grammar.count('(') != grammar.count(')'):
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática contém parênteses desbalanceados",
        "errorType": "syntax_error",
        "errorDetails": "Verifique se cada parêntese aberto '(' tem um parêntese fechado ')' correspondente."
    }

### Verificação de Sequências Inválidas e Símbolos Reservados
# Verificar símbolos não permitidos ou sequências inválidas
invalid_patterns = [';', '()', '$(', '$)', 'a(', ')a', '($']
for pattern in invalid_patterns:
    if pattern in grammar:
        return {
            "ERROR_CODE": 1,
            "errorMessage": f"A gramática contém a sequência inválida '{pattern}'",
            "errorType": "syntax_error",
            "errorDetails": f"A sequência '{pattern}' não é permitida na gramática. Verifique a sintaxe e remova ou corrija esta sequência."
        }

# Verificar se há símbolos $ na gramática (que são reservados)
if '$' in grammar:
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática contém o símbolo reservado '$'",
        "errorType": "reserved_symbol",
        "errorDetails": "O símbolo '$' é reservado para o fim da entrada e não pode ser usado na gramática."
    }

## Prevenção de Erros de Execução
### Prevenção de "pop from empty list"
# Verificar se há elementos suficientes na pilha
if len(stack) < qt_unstack:
    step_by_step.append(f"Erro: Tentativa de desempilhar {qt_unstack} elementos de uma pilha com apenas {len(stack)} elementos")
    step_by_step_detailed.append([
        "Ocorreu um erro durante a análise sintática.",
        f"O algoritmo tentou desempilhar {qt_unstack} elementos, mas a pilha só tem {len(stack)} elementos.",
        "Isso geralmente acontece quando a gramática ou a entrada contém erros que não foram detectados previamente."
    ])
    detailed_steps.append({
        "stepByStep": step_by_step.copy(),
        "stepByStepDetailed": step_by_step_detailed.copy(),
        "stack": stack[::-1].copy(),
        "input": input_tape.copy(),
        "pointer": pointer,
        "stepMarker": ["", ""],
    })
    return detailed_steps
### Validação Inicial de Tabelas
# Validação inicial
if not action_table or not goto_table:
    return [{
        "stepByStep": ["Erro na análise"],
        "stepByStepDetailed": [["As tabelas de ação e/ou transição estão vazias ou inválidas."]],
        "stack": [],
        "input": input.split(" ") if input else [""],
        "pointer": 0,
        "stepMarker": ["", ""],
    }]

## Testes e Validação
### Testes Recomendados
Para validar as novas implementações, os seguintes testes são recomendados:

Teste de Entrada Vazia
Gramática: " " (apenas espaço), Input: "a"
Resultado esperado: Erro de entrada vazia
Teste de Formato da Gramática
Gramática: "S->a" (sem ponto final), Input: "a"
Resultado esperado: Erro de formato
Teste de Colchetes em vez de Parênteses
Gramática: "F->[E].", Input: "id"
Resultado esperado: Erro de sintaxe
Teste de Parênteses Desbalanceados
Gramática: "F->(E.", Input: "id"
Resultado esperado: Erro de parênteses desbalanceados
Teste de Símbolo Reservado $
Gramática: "S->$.", Input: "id"
Resultado esperado: Erro de símbolo reservado
Teste de Sequências Inválidas
Gramática: "S->a(.", Input: "a"
Resultado esperado: Erro de sequência inválida
Teste de Gramática Válida
Gramática: "S->a.", Input: "a"
Resultado esperado: Análise bem-sucedida
