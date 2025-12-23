def len(o, /) -> float|int:
    return type(o).__len__(o) # pyright: ignore[reportArgumentType]