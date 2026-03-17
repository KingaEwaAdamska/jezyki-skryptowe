import sys

def main():
    char_count = 0
    c = sys.stdin.read(1)

    while c:
        if not c.isspace():
            char_count += 1
        c = sys.stdin.read(1)

    return char_count


if __name__ == "__main__":
    result = main()
    sys.stdout.write(str(result) + "\n")
