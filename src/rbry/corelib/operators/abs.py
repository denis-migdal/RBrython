def abs(o: float|int, /) -> float|int:
    return type(o).__abs__(o) # pyright: ignore[reportArgumentType]