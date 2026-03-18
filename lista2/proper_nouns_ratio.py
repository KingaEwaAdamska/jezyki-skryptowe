import sys, utils

total_sentences = 0
sentences_with_pn = 0

def handle_sentence(sentence):
    global total_sentences, sentences_with_pn

    total_sentences += 1

    in_word = False
    is_first_word = True
    has_proper_noun = False

    for c in sentence:
        if c.isalpha():
            in_word = True

            if not is_first_word and c.isupper():
                has_proper_noun = True

            is_first_word = False
        else:
            in_word = False

    if has_proper_noun:
        sentences_with_pn += 1

def main():
    utils.process_sentences(on_sentence=handle_sentence)
    result = sentences_with_pn / total_sentences
    sys.stdout.write(str(result) + "\n")

if __name__ == '__main__':
    main()
