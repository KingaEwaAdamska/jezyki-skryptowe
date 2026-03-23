import sys, utils


def check_condition(sentence):
    in_word = False
    previous = ""

    for c in sentence:
        if c.isalpha():
            if not in_word:
                if previous == c.lower():
                    return False
                previous = c.lower()
                in_word = True
        else:
            in_word = False
    return True

def handle_sentence(sentence):
    if not check_condition(sentence):
        return
    words = 0
    in_word = False

    for c in sentence:
        if c.isalpha():
            if not in_word:
                words += 1
                in_word = True
        else:
            in_word = False

    if words > 5:
        print(sentence)


def main():
    utils.process_text(on_sentence=handle_sentence)


if __name__ == "__main__":
    main()
