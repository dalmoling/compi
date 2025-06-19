def grammar_formatter(grammar):
    new_grammar = grammar.split(".")[:-1]

    return new_grammar


def symbol_treat(input):
    symbols = {
        "&": "and_symbol",
        "(": "parentheses_left_symbol",
        ")": "parentheses_right_symbol",
    }

    for symbol in symbols:
        input = input.replace(symbol, symbols[symbol])

    return input


def dict_treat(dictionary):
    symbols = {
        "&": "and_symbol",
        "(": "parentheses_left_symbol",
        ")": "parentheses_right_symbol",
    }

    new_dict = {}

    for i in dictionary:
        element = dictionary[i]
        for symbol in symbols:
            if symbols[symbol] in element:
                element = element.replace(symbols[symbol], symbol)
        new_dict[i] = element

    return new_dict


symbol_treat("teste & ( )")
dict_treat(
    {"teste": "parentheses_left_symbol E parentheses_right_symbol", "e": "and_symbol"}
)
