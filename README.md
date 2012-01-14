emit
====

SYNOPSIS
--------

It's another event emitter.
This one aims to support fewer features, and have a cleaner API.

Events take the form of arrays with string and numerical specifiers.
For a string, the element must be matched exactly.
For a number, that number of components must be present, unless the number is 0, in which case any number of components may be matched.
Multiple variable matches, e.g. `e.on [\a 0 \b 0 \c]` should be used with caution, as solving this match requires backtracking.

    {Emitting} = require \emitting

    e = new Emitting
    e.on \a !-> console.log "event: \\a"
    e.on 0 !-> console.log "event: any"
    e.on [\a 1] console.log "event: any direct descendent of \\a"
    e.on [\a 0] console.log "event: any descendent of \\a"

    e.emit \a
    e.emit [\a \b \c]
    e.emit [\a \b]

LICENSE
-------

Copyright (c) 2012 Karel Sedláček <k@ksdlck.com> (http://ksdlck.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
