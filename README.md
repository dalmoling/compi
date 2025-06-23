# Documentação das Novas Implementações no SASC

## Introdução

Este documento descreve as melhorias implementadas no **SASC (Simulador de Análise Sintática em Compiladores)**, originalmente desenvolvido por Rogério Crestani. As modificações focaram em aprimorar o tratamento de erros, a validação de entradas e a experiência do usuário.

## Sumário

* [Visão Geral das Modificações](#visão-geral-das-modificações)
* [Validação de Entradas](#validação-de-entradas)
* [Tratamento de Erros Específicos](#tratamento-de-erros-específicos)
* [Prevenção de Erros de Execução](#prevenção-de-erros-de-execução)
* [Melhorias na Interface do Usuário](#melhorias-na-interface-do-usuário)
* [Testes e Validação](#testes-e-validação)
* [Guia de Implementação](#guia-de-implementação)

---

## Visão Geral das Modificações

As modificações implementadas visam tornar o **SASC** mais robusto, informativo e amigável ao usuário, especialmente para estudantes que estão aprendendo sobre compiladores. As principais áreas de melhoria incluem:

* **Validação rigorosa de entradas:** Verificação prévia de gramáticas e entradas para prevenir erros.
* **Tratamento estruturado de exceções:** Captura e tratamento adequado de diferentes tipos de erros.
* **Mensagens de erro informativas:** Feedback claro e orientações para correção.
* **Prevenção de falhas de execução:** Verificações adicionais para evitar erros como "pop from empty list".
* **Interface de usuário aprimorada:** Melhor apresentação de erros e sugestões de correção.

---

## Validação de Entradas

### Verificação de Campos Vazios

```python
if not input or input.isspace() or not grammar or grammar.isspace():
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A entrada ou gramática não pode estar vazia",
        "errorType": "empty_input",
        "errorDetails": "Os campos não podem conter apenas espaços em branco. Preencha com uma gramática válida e uma entrada para análise."
    }
```

### Verificação de Formato da Gramática

* **Verificar se a gramática termina com ponto:**

```python
if not grammar.endswith('.'):
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática está mal formatada - falta o ponto final",
        "errorType": "format_error",
        "errorDetails": "Cada produção na gramática deve terminar com um ponto. Exemplo: 'S->A.'"
    }
```

* **Verificar se a gramática contém o símbolo `->`:**

```python
if "->" not in grammar:
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática está mal formatada - formato de produção incorreto",
        "errorType": "syntax_error",
        "errorDetails": "Cada produção deve usar o formato 'NT->T'. Exemplo: 'S->A.'"
    }
```

---

## Tratamento de Erros Específicos

### Verificação de Símbolos e Estruturas Não Suportadas

* **Verificar uso de colchetes em vez de parênteses:**

```python
if '[' in grammar or ']' in grammar:
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática contém colchetes [ ] que não são suportados",
        "errorType": "syntax_error",
        "errorDetails": "Use parênteses ( ) em vez de colchetes [ ] na sua gramática. Exemplo: 'F->(E).' em vez de 'F->[E].'"
    }
```

* **Verificar parênteses desbalanceados:**

```python
if grammar.count('(') != grammar.count(')'):
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática contém parênteses desbalanceados",
        "errorType": "syntax_error",
        "errorDetails": "Verifique se cada parêntese aberto '(' tem um parêntese fechado ')' correspondente."
    }
```

### Verificação de Sequências Inválidas e Símbolos Reservados

* **Verificar símbolos não permitidos ou sequências inválidas:**

```python
invalid_patterns = [';', '()', '$(', '$)', 'a(', ')a', '($']
for pattern in invalid_patterns:
    if pattern in grammar:
        return {
            "ERROR_CODE": 1,
            "errorMessage": f"A gramática contém a sequência inválida '{pattern}'",
            "errorType": "syntax_error",
            "errorDetails": f"A sequência '{pattern}' não é permitida na gramática. Verifique a sintaxe e remova ou corrija esta sequência."
        }
```

* **Verificar se há símbolos reservados `$`:**

```python
if '$' in grammar:
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A gramática contém o símbolo reservado '$'",
        "errorType": "reserved_symbol",
        "errorDetails": "O símbolo '$' é reservado para o fim da entrada e não pode ser usado na gramática."
    }
```

---

## Prevenção de Erros de Execução

* **Prevenção de "pop from empty list":**

```python
if len(stack) < qt_unstack:
    step_by_step.append(f"Erro: Tentativa de desempilhar {qt_unstack} elementos de uma pilha com apenas {len(stack)} elementos")
    step_by_step_detailed.append([
        "Ocorreu um erro durante a análise sintática.",
        f"O algoritmo tentou desempilhar {qt_unstack} elementos, mas a pilha só tem {len(stack)} elementos.",
        "Isso geralmente acontece quando a gramática ou a entrada contém erros que não foram detectados previamente."
    ])
    # retorno detalhado omitido para brevidade
```

### Validação Inicial de Tabelas

```python
if not action_table or not goto_table:
    return [{
        "stepByStep": ["Erro na análise"],
        "stepByStepDetailed": [["As tabelas de ação e/ou transição estão vazias ou inválidas."]],
        "stack": [],
        "input": input.split(" ") if input else [""],
        "pointer": 0,
        "stepMarker": ["", ""],
    }]
```

---

## Testes e Validação

Testes recomendados para validação:

* **Teste de Entrada Vazia:** Gramática com espaços, entrada válida
* **Teste de Formato da Gramática:** Sem ponto final
* **Teste de Colchetes:** Colchetes em vez de parênteses
* **Teste de Parênteses Desbalanceados:** Gramática incompleta
* **Teste de Símbolo Reservado:** Uso indevido do símbolo `$`
* **Teste de Sequências Inválidas:** Sequências incorretas
* **Teste de Gramática Válida:** Gramática correta para sucesso


