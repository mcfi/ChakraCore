//-------------------------------------------------------------------------------------------------------
// Copyright (C) Microsoft Corporation and contributors. All rights reserved.
// Licensed under the MIT license. See LICENSE.txt file in the project root for full license information.
//-------------------------------------------------------------------------------------------------------
this.WScript.LoadScriptFile("..\\UnitTestFramework\\SimdJsHelpers.js");
function asmModule(stdlib, imports) {
    "use asm";
    var ui4 = stdlib.SIMD.Uint32x4;
    var ui4check = ui4.check;
    var ui4lessThan = ui4.lessThan;
    var ui4equal = ui4.equal;
    var ui4greaterThan = ui4.greaterThan;
    var ui4lessThanOrEqual = ui4.lessThanOrEqual;
    var ui4greaterThanOrEqual = ui4.greaterThanOrEqual;
    var ui4notEqual = ui4.notEqual;
    var ui4select = ui4.select;

    var b4 = stdlib.SIMD.Bool32x4;

    var globImportui4 = ui4check(imports.g1);       // global var import
  
    var ui4g1 = ui4(1065353216, 1073741824, 1077936128, 1082130432);          // global var initialized
    var ui4g2 = ui4(6531634, 74182444, 779364128, 821730432);

    var loopCOUNT = 5;

    function testLessThan()
    {
        var b = ui4(8488484, 4848848, 29975939, 9493872);
        var c = ui4(99371, 18848392, 888288822, 100012);
        var d = ui4(0, 0, 0, 0);
        var mask = b4(0, 0, 0, 0);
        var loopIndex = 0;

        while ((loopIndex | 0) < (loopCOUNT | 0))
        {
            mask = ui4lessThan(b, c);
            d = ui4select(mask, b, c);
           
            loopIndex = (loopIndex + 1) | 0;
        }

        return ui4check(d);
    }

    function testLessThanOrEqual()
    {
        var b = ui4(8488484, 4848848, 29975939, 9493872);
        var c = ui4(99372621, 18848392, 888288822, 1000010012);
        var d = ui4(0, 0, 0, 0);
        var mask = b4(0, 0, 0, 0);
        var loopIndex = 0;

        while ((loopIndex | 0) < (loopCOUNT | 0)) {

            mask = ui4lessThanOrEqual(b, c);
            d = ui4select(mask, b, c);

            loopIndex = (loopIndex + 1) | 0;
        }

        return ui4check(d);
    }

    function testGreaterThan()
    {
        var b = ui4(8488484, 4848848, 29975939, 9493872);
        var c = ui4(99372621, 18848392, 888288822, 1000010012);
        var d = ui4(0, 0, 0, 0);
        var mask = b4(0, 0, 0, 0);
        var loopIndex = 0;

        while ((loopIndex | 0) < (loopCOUNT | 0)) {

            mask = ui4greaterThan(b, c);
            d = ui4select(mask, b, c);

            loopIndex = (loopIndex + 1) | 0;
        }

        return ui4check(d);
    }

    function testGreaterThanOrEqual()
    {
        var b = ui4(8488484, 4848848, 29975939, 9493872);
        var c = ui4(99372621, 18848392, 888288822, 1000010012);
        var d = ui4(0, 0, 0, 0);
        var mask = b4(0, 0, 0, 0);
        var loopIndex = 0;

        while ((loopIndex | 0) < (loopCOUNT | 0)) {

            mask = ui4greaterThanOrEqual(b, c);
            d = ui4select(mask, b, c);

            loopIndex = (loopIndex + 1) | 0;
        }

        return ui4check(d);
    }

    function testEqual()
    {
        var b = ui4(8488484, 18848392, 29975939, 1000010012);
        var c = ui4(99372621, 18848392, 888288822, 1000010012);
        var d = ui4(0, 0, 0, 0);
        var mask = b4(0, 0, 0, 0);
        var loopIndex = 0;

        while ((loopIndex | 0) < (loopCOUNT | 0)) {

            mask = ui4equal(b, c);
            d = ui4select(mask, b, c);

            loopIndex = (loopIndex + 1) | 0;
        }

        return ui4check(d);
    }

    function testNotEqual()
    {
        var b = ui4(8488484, 4848848, 29975939, 9493872);
        var c = ui4(99372621, 18848392, 888288822, 1000010012);
        var d = ui4(0, 0, 0, 0);
        var mask = b4(0, 0, 0, 0);

        var loopIndex = 0;
        while ((loopIndex | 0) < (loopCOUNT | 0)) {

            mask = ui4notEqual(b, c);
            d = ui4select(mask, b, c);

            loopIndex = (loopIndex + 1) | 0;
        }

        return ui4check(d);
    }

    return { testLessThan: testLessThan, testLessThanOrEqual: testLessThanOrEqual, testGreaterThan: testGreaterThan, testGreaterThanOrEqual: testGreaterThanOrEqual, testEqual: testEqual, testNotEqual: testNotEqual };
}

var m = asmModule(this, { g1: SIMD.Uint32x4(100, 1073741824, 1028, 102) });

equalSimd([99371, 4848848, 29975939, 100012], m.testLessThan(), SIMD.Uint32x4, "Func1");
equalSimd([8488484, 4848848, 29975939, 9493872], m.testLessThanOrEqual(), SIMD.Uint32x4, "Func2");
equalSimd([99372621, 18848392, 888288822, 1000010012], m.testGreaterThan(), SIMD.Uint32x4, "Func3");
equalSimd([99372621, 18848392, 888288822, 1000010012], m.testGreaterThanOrEqual(), SIMD.Uint32x4, "Func4");
equalSimd([99372621, 18848392, 888288822, 1000010012], m.testEqual(), SIMD.Uint32x4, "Func5");
equalSimd([8488484, 4848848, 29975939, 9493872], m.testNotEqual(), SIMD.Uint32x4, "Func6");

print("PASS");



