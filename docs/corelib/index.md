corelib should be implemented in Python as much as possible and should not rely on the runlib.

For performances purposes, corelib could be pre-compiled using special emission rules. The function `__INCLUDE_JS__('...')` can be used to include raw JS code.