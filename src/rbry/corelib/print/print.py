from JS import console

def print(*a):
    s = ""

    for i in range(len(a)):
        if i != 0:
            s += " "
        s += str(a[i])

    console.log(s)