from RBM import __JS_AWAIT__

async def foo():
    return 1

async def main():
    assert await foo() is 1

__JS_AWAIT__( main() )