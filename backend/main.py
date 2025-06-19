# Importacoes
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd  # Adicionar importação do pandas

# Importar funcoes
from app import parsing_table
from app import parsing_algorithm
from app import utils

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000",
    "http://localhost:5173",
    "localhost:5173",
    "https://sasc.netlify.app",
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Testar API
@app.get("/")
async def home() -> dict:
    return {"boas-vindas": "Bem-vindo a API do SASC."}


# Testar API
@app.get("/test/")
async def read_root() -> dict:
    return {"message": "Testando api"}


"""
@app.get("/analyze/{grammar}/{input}/{analysis_type}")
async def get_table(input: str, grammar: str, analysis_type: str):
    new_grammar = utils.grammar_formatter(grammar)
    treated_grammar = utils.symbol_treat(grammar)

    goto_action_tables = parsing_table.get_goto_action_tables(
        treated_grammar, analysis_type
    )

    steps_parsing = parsing_algorithm.bottom_up_algorithm(
        utils.dict_treat(goto_action_tables["action_table"]),
        utils.dict_treat(goto_action_tables["goto_table"]),
        input,
    )

    return {
        "ERROR_CODE": 0,
        "parsingTable": goto_action_tables,
        "stepsParsing": steps_parsing,
        "grammar": new_grammar,
    }
"""


@app.get("/analyze/{analysis_type}/{grammar}/{input}")
async def get_table(input: str = "", grammar: str = "", analysis_type: str = ""):
    # Verificação de parâmetros vazios ou apenas com espaços
    if not input or input.isspace() or not grammar or grammar.isspace():
        return {
            "ERROR_CODE": 1,
            "errorMessage": "A entrada ou gramática não pode estar vazia",
            "errorType": "empty_input",
            "errorDetails": "Os campos não podem conter apenas espaços em branco. Preencha com uma gramática válida e uma entrada para análise."
        }
    
    try:
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
        
        # Verificar uso de colchetes em vez de parênteses
        if '[' in grammar or ']' in grammar:
            return {
                "ERROR_CODE": 1,
                "errorMessage": "A gramática contém colchetes [ ] que não são suportados",
                "errorType": "syntax_error",
                "errorDetails": "Use parênteses ( ) em vez de colchetes [ ] na sua gramática. Exemplo: 'F->(E).' em vez de 'F->[E].'"
            }
        
        # Verificar parênteses desbalanceados
        if grammar.count('(') != grammar.count(')'):
            return {
                "ERROR_CODE": 1,
                "errorMessage": "A gramática contém parênteses desbalanceados",
                "errorType": "syntax_error",
                "errorDetails": "Verifique se cada parêntese aberto '(' tem um parêntese fechado ')' correspondente."
            }
        
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
            
        new_grammar = utils.grammar_formatter(grammar)
        goto_action_tables = parsing_table.get_goto_action_tables(
            grammar, analysis_type
        )
        steps_parsing = parsing_algorithm.bottom_up_algorithm(
            goto_action_tables["action_table"],
            goto_action_tables["goto_table"],
            input,
        )
        return {
            "ERROR_CODE": 0,
            "parsingTable": goto_action_tables,
            "stepsParsing": steps_parsing,
            "grammar": new_grammar,
        }

    except ValueError as e:
        error_msg = str(e)
        if "empty" in error_msg.lower():
            return {
                "ERROR_CODE": 1, 
                "errorMessage": "A entrada ou gramática não pode estar vazia", 
                "errorType": "empty_input",
                "errorDetails": str(e)
            }
        return {
            "ERROR_CODE": 1, 
            "errorMessage": "Os valores fornecidos estão em formato incorreto", 
            "errorType": "value_error",
            "errorDetails": str(e)
        }
    except pd.errors.ParserError as e:
        return {
            "ERROR_CODE": 1, 
            "errorMessage": "A gramática está mal formatada", 
            "errorType": "parser_error",
            "errorDetails": "Verifique se cada produção termina com um ponto e se a sintaxe está correta"
        }
    except Exception as e:
        error_type = type(e).__name__
        return {
            "ERROR_CODE": 1, 
            "errorMessage": f"Erro inesperado: {str(e)}", 
            "errorType": "unexpected_error",
            "errorDetails": f"Tipo de erro: {error_type}. Detalhes: {str(e)}"
        }

# Rota adicional para lidar com entradas vazias ou espaços
@app.get("/analyze/{analysis_type}/{grammar}/")
@app.get("/analyze/{analysis_type}/{grammar}/ ")
@app.get("/analyze/{analysis_type}/{grammar}/%20")
async def handle_empty_input(grammar: str, analysis_type: str):
    return {
        "ERROR_CODE": 1,
        "errorMessage": "A entrada não pode estar vazia",
        "errorType": "empty_input",
        "errorDetails": "O campo de entrada não pode estar vazio ou conter apenas espaços em branco."
    }
