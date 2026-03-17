import sys

def main():
    paragraph_count = 0
    consecutive_new_lines = 0
    has_content = 0

    c = sys.stdin.read(1)

    while c:
        if c == "\n":
            consecutive_new_lines += 1

            if consecutive_new_lines == 2 and has_content:
                paragraph_count += 1
                has_content = False
        elif not c.isspace():
            has_content = True
            consecutive_new_lines = 0

        c = sys.stdin.read(1)

    if has_content:
        paragraph_count += 1

         return paragraph_count


if __name__ == "__main__":
    result = main()
    sys.stdout.write(str(result) + "\n")
