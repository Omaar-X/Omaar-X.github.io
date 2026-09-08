"""Regenerate every CV PDF in the right order.

    python tools/build_all.py

build_cv.py must run first: the other two import their shared content from it.
"""

import build_cv
import build_ats_cv
import build_full_cv

if __name__ == "__main__":
    build_cv.build(academic=False)
    build_cv.build(academic=True)
    build_ats_cv.build()
    build_full_cv.build()
