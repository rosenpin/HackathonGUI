from random import randrange

with open("demo.txt", "w+") as f:
    f.write(str(randrange(9) + 1) + "-1")
