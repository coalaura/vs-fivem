// Generated from LuaParser.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from 'antlr4';
import LuaParserVisitor from './LuaParserVisitor.js';

const serializedATN = [4,1,69,472,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,19,2,
20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,2,25,7,25,1,0,1,0,1,0,1,
1,1,1,1,2,5,2,59,8,2,10,2,12,2,62,9,2,1,2,3,2,65,8,2,1,3,1,3,1,3,1,3,1,3,
1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,
1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,101,8,3,10,3,12,3,104,9,
3,1,3,1,3,3,3,108,8,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,120,8,
3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,
3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,146,8,3,3,3,148,8,3,1,4,1,4,1,4,1,4,1,4,5,
4,155,8,4,10,4,12,4,158,9,4,1,5,1,5,1,5,3,5,163,8,5,1,6,1,6,3,6,167,8,6,
1,6,1,6,3,6,171,8,6,1,6,3,6,174,8,6,1,7,1,7,1,7,1,7,1,8,1,8,1,8,5,8,183,
8,8,10,8,12,8,186,9,8,1,8,1,8,3,8,190,8,8,1,9,1,9,1,9,5,9,195,8,9,10,9,12,
9,198,9,9,1,10,1,10,1,10,5,10,203,8,10,10,10,12,10,206,9,10,1,11,1,11,1,
11,5,11,211,8,11,10,11,12,11,214,9,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
1,12,1,12,1,12,1,12,1,12,3,12,228,8,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,
1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,
12,1,12,1,12,5,12,254,8,12,10,12,12,12,257,9,12,1,13,1,13,1,13,1,13,1,13,
1,13,1,13,1,13,3,13,267,8,13,3,13,269,8,13,1,14,1,14,1,14,1,14,1,14,1,14,
1,14,5,14,278,8,14,10,14,12,14,281,9,14,1,14,1,14,1,14,1,14,1,14,1,14,1,
14,5,14,290,8,14,10,14,12,14,293,9,14,1,14,1,14,1,14,1,14,1,14,1,14,1,14,
1,14,1,14,5,14,304,8,14,10,14,12,14,307,9,14,3,14,309,8,14,1,15,1,15,1,15,
1,15,1,15,1,15,1,15,1,15,5,15,319,8,15,10,15,12,15,322,9,15,1,15,1,15,1,
15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,5,15,334,8,15,10,15,12,15,337,9,15,
1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,5,15,348,8,15,10,15,12,15,351,
9,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,1,15,5,15,365,
8,15,10,15,12,15,368,9,15,1,15,1,15,1,15,1,15,3,15,374,8,15,1,15,1,15,1,
15,1,15,1,15,1,15,1,15,5,15,383,8,15,10,15,12,15,386,9,15,1,15,1,15,1,15,
1,15,1,15,1,15,1,15,1,15,5,15,396,8,15,10,15,12,15,399,9,15,1,15,1,15,1,
15,5,15,404,8,15,10,15,12,15,407,9,15,1,16,1,16,3,16,411,8,16,1,16,1,16,
1,16,3,16,416,8,16,1,17,1,17,1,17,1,18,1,18,1,18,1,18,1,18,1,18,1,19,1,19,
1,19,3,19,430,8,19,1,19,1,19,3,19,434,8,19,1,20,1,20,3,20,438,8,20,1,20,
1,20,1,21,1,21,1,21,1,21,5,21,446,8,21,10,21,12,21,449,9,21,1,21,3,21,452,
8,21,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,1,22,3,22,464,8,22,1,23,
1,23,1,24,1,24,1,25,1,25,1,25,0,2,24,30,26,0,2,4,6,8,10,12,14,16,18,20,22,
24,26,28,30,32,34,36,38,40,42,44,46,48,50,0,8,2,0,28,30,33,33,3,0,37,38,
45,45,54,54,2,0,29,29,44,44,4,0,19,20,40,41,50,50,56,56,3,0,28,28,34,36,
52,52,2,0,1,1,15,15,1,0,61,64,1,0,58,60,531,0,52,1,0,0,0,2,55,1,0,0,0,4,
60,1,0,0,0,6,147,1,0,0,0,8,149,1,0,0,0,10,162,1,0,0,0,12,170,1,0,0,0,14,
175,1,0,0,0,16,179,1,0,0,0,18,191,1,0,0,0,20,199,1,0,0,0,22,207,1,0,0,0,
24,227,1,0,0,0,26,268,1,0,0,0,28,308,1,0,0,0,30,373,1,0,0,0,32,415,1,0,0,
0,34,417,1,0,0,0,36,420,1,0,0,0,38,433,1,0,0,0,40,435,1,0,0,0,42,441,1,0,
0,0,44,463,1,0,0,0,46,465,1,0,0,0,48,467,1,0,0,0,50,469,1,0,0,0,52,53,3,
2,1,0,53,54,5,0,0,1,54,1,1,0,0,0,55,56,3,4,2,0,56,3,1,0,0,0,57,59,3,6,3,
0,58,57,1,0,0,0,59,62,1,0,0,0,60,58,1,0,0,0,60,61,1,0,0,0,61,64,1,0,0,0,
62,60,1,0,0,0,63,65,3,12,6,0,64,63,1,0,0,0,64,65,1,0,0,0,65,5,1,0,0,0,66,
148,5,1,0,0,67,68,3,18,9,0,68,69,5,2,0,0,69,70,3,22,11,0,70,148,1,0,0,0,
71,148,3,30,15,0,72,148,3,14,7,0,73,148,5,3,0,0,74,75,5,4,0,0,75,148,5,57,
0,0,76,77,5,5,0,0,77,78,3,4,2,0,78,79,5,6,0,0,79,148,1,0,0,0,80,81,5,7,0,
0,81,82,3,24,12,0,82,83,5,5,0,0,83,84,3,4,2,0,84,85,5,6,0,0,85,148,1,0,0,
0,86,87,5,8,0,0,87,88,3,4,2,0,88,89,5,9,0,0,89,90,3,24,12,0,90,148,1,0,0,
0,91,92,5,10,0,0,92,93,3,24,12,0,93,94,5,11,0,0,94,102,3,4,2,0,95,96,5,12,
0,0,96,97,3,24,12,0,97,98,5,11,0,0,98,99,3,4,2,0,99,101,1,0,0,0,100,95,1,
0,0,0,101,104,1,0,0,0,102,100,1,0,0,0,102,103,1,0,0,0,103,107,1,0,0,0,104,
102,1,0,0,0,105,106,5,13,0,0,106,108,3,4,2,0,107,105,1,0,0,0,107,108,1,0,
0,0,108,109,1,0,0,0,109,110,5,6,0,0,110,148,1,0,0,0,111,112,5,14,0,0,112,
113,5,57,0,0,113,114,5,2,0,0,114,115,3,24,12,0,115,116,5,15,0,0,116,119,
3,24,12,0,117,118,5,15,0,0,118,120,3,24,12,0,119,117,1,0,0,0,119,120,1,0,
0,0,120,121,1,0,0,0,121,122,5,5,0,0,122,123,3,4,2,0,123,124,5,6,0,0,124,
148,1,0,0,0,125,126,5,14,0,0,126,127,3,20,10,0,127,128,5,16,0,0,128,129,
3,22,11,0,129,130,5,5,0,0,130,131,3,4,2,0,131,132,5,6,0,0,132,148,1,0,0,
0,133,134,5,17,0,0,134,135,3,16,8,0,135,136,3,36,18,0,136,148,1,0,0,0,137,
138,5,18,0,0,138,139,5,17,0,0,139,140,5,57,0,0,140,148,3,36,18,0,141,142,
5,18,0,0,142,145,3,8,4,0,143,144,5,2,0,0,144,146,3,22,11,0,145,143,1,0,0,
0,145,146,1,0,0,0,146,148,1,0,0,0,147,66,1,0,0,0,147,67,1,0,0,0,147,71,1,
0,0,0,147,72,1,0,0,0,147,73,1,0,0,0,147,74,1,0,0,0,147,76,1,0,0,0,147,80,
1,0,0,0,147,86,1,0,0,0,147,91,1,0,0,0,147,111,1,0,0,0,147,125,1,0,0,0,147,
133,1,0,0,0,147,137,1,0,0,0,147,141,1,0,0,0,148,7,1,0,0,0,149,150,5,57,0,
0,150,156,3,10,5,0,151,152,5,15,0,0,152,153,5,57,0,0,153,155,3,10,5,0,154,
151,1,0,0,0,155,158,1,0,0,0,156,154,1,0,0,0,156,157,1,0,0,0,157,9,1,0,0,
0,158,156,1,0,0,0,159,160,5,19,0,0,160,161,5,57,0,0,161,163,5,20,0,0,162,
159,1,0,0,0,162,163,1,0,0,0,163,11,1,0,0,0,164,166,5,21,0,0,165,167,3,22,
11,0,166,165,1,0,0,0,166,167,1,0,0,0,167,171,1,0,0,0,168,171,5,3,0,0,169,
171,5,22,0,0,170,164,1,0,0,0,170,168,1,0,0,0,170,169,1,0,0,0,171,173,1,0,
0,0,172,174,5,1,0,0,173,172,1,0,0,0,173,174,1,0,0,0,174,13,1,0,0,0,175,176,
5,23,0,0,176,177,5,57,0,0,177,178,5,23,0,0,178,15,1,0,0,0,179,184,5,57,0,
0,180,181,5,27,0,0,181,183,5,57,0,0,182,180,1,0,0,0,183,186,1,0,0,0,184,
182,1,0,0,0,184,185,1,0,0,0,185,189,1,0,0,0,186,184,1,0,0,0,187,188,5,39,
0,0,188,190,5,57,0,0,189,187,1,0,0,0,189,190,1,0,0,0,190,17,1,0,0,0,191,
196,3,26,13,0,192,193,5,15,0,0,193,195,3,26,13,0,194,192,1,0,0,0,195,198,
1,0,0,0,196,194,1,0,0,0,196,197,1,0,0,0,197,19,1,0,0,0,198,196,1,0,0,0,199,
204,5,57,0,0,200,201,5,15,0,0,201,203,5,57,0,0,202,200,1,0,0,0,203,206,1,
0,0,0,204,202,1,0,0,0,204,205,1,0,0,0,205,21,1,0,0,0,206,204,1,0,0,0,207,
212,3,24,12,0,208,209,5,15,0,0,209,211,3,24,12,0,210,208,1,0,0,0,211,214,
1,0,0,0,212,210,1,0,0,0,212,213,1,0,0,0,213,23,1,0,0,0,214,212,1,0,0,0,215,
216,6,12,-1,0,216,228,5,24,0,0,217,228,5,25,0,0,218,228,5,26,0,0,219,228,
3,48,24,0,220,228,3,50,25,0,221,228,5,55,0,0,222,228,3,34,17,0,223,228,3,
28,14,0,224,228,3,40,20,0,225,226,7,0,0,0,226,228,3,24,12,8,227,215,1,0,
0,0,227,217,1,0,0,0,227,218,1,0,0,0,227,219,1,0,0,0,227,220,1,0,0,0,227,
221,1,0,0,0,227,222,1,0,0,0,227,223,1,0,0,0,227,224,1,0,0,0,227,225,1,0,
0,0,228,255,1,0,0,0,229,230,10,9,0,0,230,231,5,53,0,0,231,254,3,24,12,9,
232,233,10,7,0,0,233,234,7,1,0,0,234,254,3,24,12,8,235,236,10,6,0,0,236,
237,7,2,0,0,237,254,3,24,12,7,238,239,10,5,0,0,239,240,5,51,0,0,240,254,
3,24,12,5,241,242,10,4,0,0,242,243,7,3,0,0,243,254,3,24,12,5,244,245,10,
3,0,0,245,246,5,42,0,0,246,254,3,24,12,4,247,248,10,2,0,0,248,249,5,43,0,
0,249,254,3,24,12,3,250,251,10,1,0,0,251,252,7,4,0,0,252,254,3,24,12,2,253,
229,1,0,0,0,253,232,1,0,0,0,253,235,1,0,0,0,253,238,1,0,0,0,253,241,1,0,
0,0,253,244,1,0,0,0,253,247,1,0,0,0,253,250,1,0,0,0,254,257,1,0,0,0,255,
253,1,0,0,0,255,256,1,0,0,0,256,25,1,0,0,0,257,255,1,0,0,0,258,269,5,57,
0,0,259,266,3,28,14,0,260,261,5,48,0,0,261,262,3,24,12,0,262,263,5,49,0,
0,263,267,1,0,0,0,264,265,5,27,0,0,265,267,5,57,0,0,266,260,1,0,0,0,266,
264,1,0,0,0,267,269,1,0,0,0,268,258,1,0,0,0,268,259,1,0,0,0,269,27,1,0,0,
0,270,279,5,57,0,0,271,272,5,48,0,0,272,273,3,24,12,0,273,274,5,49,0,0,274,
278,1,0,0,0,275,276,5,27,0,0,276,278,5,57,0,0,277,271,1,0,0,0,277,275,1,
0,0,0,278,281,1,0,0,0,279,277,1,0,0,0,279,280,1,0,0,0,280,309,1,0,0,0,281,
279,1,0,0,0,282,291,3,30,15,0,283,284,5,48,0,0,284,285,3,24,12,0,285,286,
5,49,0,0,286,290,1,0,0,0,287,288,5,27,0,0,288,290,5,57,0,0,289,283,1,0,0,
0,289,287,1,0,0,0,290,293,1,0,0,0,291,289,1,0,0,0,291,292,1,0,0,0,292,309,
1,0,0,0,293,291,1,0,0,0,294,295,5,31,0,0,295,296,3,24,12,0,296,305,5,32,
0,0,297,298,5,48,0,0,298,299,3,24,12,0,299,300,5,49,0,0,300,304,1,0,0,0,
301,302,5,27,0,0,302,304,5,57,0,0,303,297,1,0,0,0,303,301,1,0,0,0,304,307,
1,0,0,0,305,303,1,0,0,0,305,306,1,0,0,0,306,309,1,0,0,0,307,305,1,0,0,0,
308,270,1,0,0,0,308,282,1,0,0,0,308,294,1,0,0,0,309,29,1,0,0,0,310,311,6,
15,-1,0,311,320,5,57,0,0,312,313,5,48,0,0,313,314,3,24,12,0,314,315,5,49,
0,0,315,319,1,0,0,0,316,317,5,27,0,0,317,319,5,57,0,0,318,312,1,0,0,0,318,
316,1,0,0,0,319,322,1,0,0,0,320,318,1,0,0,0,320,321,1,0,0,0,321,323,1,0,
0,0,322,320,1,0,0,0,323,374,3,32,16,0,324,325,5,31,0,0,325,326,3,24,12,0,
326,335,5,32,0,0,327,328,5,48,0,0,328,329,3,24,12,0,329,330,5,49,0,0,330,
334,1,0,0,0,331,332,5,27,0,0,332,334,5,57,0,0,333,327,1,0,0,0,333,331,1,
0,0,0,334,337,1,0,0,0,335,333,1,0,0,0,335,336,1,0,0,0,336,338,1,0,0,0,337,
335,1,0,0,0,338,339,3,32,16,0,339,374,1,0,0,0,340,349,5,57,0,0,341,342,5,
48,0,0,342,343,3,24,12,0,343,344,5,49,0,0,344,348,1,0,0,0,345,346,5,27,0,
0,346,348,5,57,0,0,347,341,1,0,0,0,347,345,1,0,0,0,348,351,1,0,0,0,349,347,
1,0,0,0,349,350,1,0,0,0,350,352,1,0,0,0,351,349,1,0,0,0,352,353,5,39,0,0,
353,354,5,57,0,0,354,374,3,32,16,0,355,356,5,31,0,0,356,357,3,24,12,0,357,
366,5,32,0,0,358,359,5,48,0,0,359,360,3,24,12,0,360,361,5,49,0,0,361,365,
1,0,0,0,362,363,5,27,0,0,363,365,5,57,0,0,364,358,1,0,0,0,364,362,1,0,0,
0,365,368,1,0,0,0,366,364,1,0,0,0,366,367,1,0,0,0,367,369,1,0,0,0,368,366,
1,0,0,0,369,370,5,39,0,0,370,371,5,57,0,0,371,372,3,32,16,0,372,374,1,0,
0,0,373,310,1,0,0,0,373,324,1,0,0,0,373,340,1,0,0,0,373,355,1,0,0,0,374,
405,1,0,0,0,375,384,10,5,0,0,376,377,5,48,0,0,377,378,3,24,12,0,378,379,
5,49,0,0,379,383,1,0,0,0,380,381,5,27,0,0,381,383,5,57,0,0,382,376,1,0,0,
0,382,380,1,0,0,0,383,386,1,0,0,0,384,382,1,0,0,0,384,385,1,0,0,0,385,387,
1,0,0,0,386,384,1,0,0,0,387,404,3,32,16,0,388,397,10,2,0,0,389,390,5,48,
0,0,390,391,3,24,12,0,391,392,5,49,0,0,392,396,1,0,0,0,393,394,5,27,0,0,
394,396,5,57,0,0,395,389,1,0,0,0,395,393,1,0,0,0,396,399,1,0,0,0,397,395,
1,0,0,0,397,398,1,0,0,0,398,400,1,0,0,0,399,397,1,0,0,0,400,401,5,39,0,0,
401,402,5,57,0,0,402,404,3,32,16,0,403,375,1,0,0,0,403,388,1,0,0,0,404,407,
1,0,0,0,405,403,1,0,0,0,405,406,1,0,0,0,406,31,1,0,0,0,407,405,1,0,0,0,408,
410,5,31,0,0,409,411,3,22,11,0,410,409,1,0,0,0,410,411,1,0,0,0,411,412,1,
0,0,0,412,416,5,32,0,0,413,416,3,40,20,0,414,416,3,50,25,0,415,408,1,0,0,
0,415,413,1,0,0,0,415,414,1,0,0,0,416,33,1,0,0,0,417,418,5,17,0,0,418,419,
3,36,18,0,419,35,1,0,0,0,420,421,5,31,0,0,421,422,3,38,19,0,422,423,5,32,
0,0,423,424,3,4,2,0,424,425,5,6,0,0,425,37,1,0,0,0,426,429,3,20,10,0,427,
428,5,15,0,0,428,430,5,55,0,0,429,427,1,0,0,0,429,430,1,0,0,0,430,434,1,
0,0,0,431,434,5,55,0,0,432,434,1,0,0,0,433,426,1,0,0,0,433,431,1,0,0,0,433,
432,1,0,0,0,434,39,1,0,0,0,435,437,5,46,0,0,436,438,3,42,21,0,437,436,1,
0,0,0,437,438,1,0,0,0,438,439,1,0,0,0,439,440,5,47,0,0,440,41,1,0,0,0,441,
447,3,44,22,0,442,443,3,46,23,0,443,444,3,44,22,0,444,446,1,0,0,0,445,442,
1,0,0,0,446,449,1,0,0,0,447,445,1,0,0,0,447,448,1,0,0,0,448,451,1,0,0,0,
449,447,1,0,0,0,450,452,3,46,23,0,451,450,1,0,0,0,451,452,1,0,0,0,452,43,
1,0,0,0,453,454,5,48,0,0,454,455,3,24,12,0,455,456,5,49,0,0,456,457,5,2,
0,0,457,458,3,24,12,0,458,464,1,0,0,0,459,460,5,57,0,0,460,461,5,2,0,0,461,
464,3,24,12,0,462,464,3,24,12,0,463,453,1,0,0,0,463,459,1,0,0,0,463,462,
1,0,0,0,464,45,1,0,0,0,465,466,7,5,0,0,466,47,1,0,0,0,467,468,7,6,0,0,468,
49,1,0,0,0,469,470,7,7,0,0,470,51,1,0,0,0,52,60,64,102,107,119,145,147,156,
162,166,170,173,184,189,196,204,212,227,253,255,266,268,277,279,289,291,
303,305,308,318,320,333,335,347,349,364,366,373,382,384,395,397,403,405,
410,415,429,433,437,447,451,463];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class LuaParser extends antlr4.Parser {

    static grammarFileName = "LuaParser.g4";
    static literalNames = [ null, "';'", "'='", "'break'", "'goto'", "'do'", 
                            "'end'", "'while'", "'repeat'", "'until'", "'if'", 
                            "'then'", "'elseif'", "'else'", "'for'", "','", 
                            "'in'", "'function'", "'local'", "'<'", "'>'", 
                            "'return'", "'continue'", "'::'", "'nil'", "'false'", 
                            "'true'", "'.'", "'~'", "'-'", "'#'", "'('", 
                            "')'", "'not'", "'<<'", "'>>'", "'&'", "'//'", 
                            "'%'", "':'", "'<='", "'>='", "'and'", "'or'", 
                            "'+'", "'*'", "'{'", "'}'", "'['", "']'", "'=='", 
                            "'..'", "'|'", "'^'", "'/'", "'...'", "'~='", 
                            null, null, null, null, null, null, null, null, 
                            null, null, null, "'\\n'" ];
    static symbolicNames = [ null, "SEMI", "EQ", "BREAK", "GOTO", "DO", 
                             "END", "WHILE", "REPEAT", "UNTIL", "IF", "THEN", 
                             "ELSEIF", "ELSE", "FOR", "COMMA", "IN", "FUNCTION", 
                             "LOCAL", "LT", "GT", "RETURN", "CONTINUE", 
                             "CC", "NIL", "FALSE", "TRUE", "DOT", "SQUIG", 
                             "MINUS", "POUND", "OP", "CP", "NOT", "LL", 
                             "GG", "AMP", "SS", "PER", "COL", "LE", "GE", 
                             "AND", "OR", "PLUS", "STAR", "OCU", "CCU", 
                             "OB", "CB", "EE", "DD", "PIPE", "CARET", "SLASH", 
                             "DDD", "SQEQ", "NAME", "NORMALSTRING", "CHARSTRING", 
                             "LONGSTRING", "INT", "HEX", "FLOAT", "HEX_FLOAT", 
                             "LINE_COMMENT", "BLOCK_COMMENT", "WS", "NL", 
                             "SHEBANG" ];
    static ruleNames = [ "start_", "chunk", "block", "stat", "attnamelist", 
                         "attrib", "retstat", "label", "funcname", "varlist", 
                         "namelist", "explist", "exp", "var", "prefixexp", 
                         "functioncall", "args", "functiondef", "funcbody", 
                         "parlist", "tableconstructor", "fieldlist", "field", 
                         "fieldsep", "number", "string" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = LuaParser.ruleNames;
        this.literalNames = LuaParser.literalNames;
        this.symbolicNames = LuaParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 12:
    	    		return this.exp_sempred(localctx, predIndex);
    	case 15:
    	    		return this.functioncall_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    exp_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 9);
    		case 1:
    			return this.precpred(this._ctx, 7);
    		case 2:
    			return this.precpred(this._ctx, 6);
    		case 3:
    			return this.precpred(this._ctx, 5);
    		case 4:
    			return this.precpred(this._ctx, 4);
    		case 5:
    			return this.precpred(this._ctx, 3);
    		case 6:
    			return this.precpred(this._ctx, 2);
    		case 7:
    			return this.precpred(this._ctx, 1);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    functioncall_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 8:
    			return this.precpred(this._ctx, 5);
    		case 9:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	start_() {
	    let localctx = new Start_Context(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, LuaParser.RULE_start_);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 52;
	        this.chunk();
	        this.state = 53;
	        this.match(LuaParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	chunk() {
	    let localctx = new ChunkContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, LuaParser.RULE_chunk);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 55;
	        this.block();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	block() {
	    let localctx = new BlockContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, LuaParser.RULE_block);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 60;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,0,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 57;
	                this.stat(); 
	            }
	            this.state = 62;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,0,this._ctx);
	        }

	        this.state = 64;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 6291464) !== 0)) {
	            this.state = 63;
	            this.retstat();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stat() {
	    let localctx = new StatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, LuaParser.RULE_stat);
	    var _la = 0;
	    try {
	        this.state = 147;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,6,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 66;
	            this.match(LuaParser.SEMI);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 67;
	            this.varlist();
	            this.state = 68;
	            this.match(LuaParser.EQ);
	            this.state = 69;
	            this.explist();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 71;
	            this.functioncall(0);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 72;
	            this.label();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 73;
	            this.match(LuaParser.BREAK);
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 74;
	            this.match(LuaParser.GOTO);
	            this.state = 75;
	            this.match(LuaParser.NAME);
	            break;

	        case 7:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 76;
	            this.match(LuaParser.DO);
	            this.state = 77;
	            this.block();
	            this.state = 78;
	            this.match(LuaParser.END);
	            break;

	        case 8:
	            this.enterOuterAlt(localctx, 8);
	            this.state = 80;
	            this.match(LuaParser.WHILE);
	            this.state = 81;
	            this.exp(0);
	            this.state = 82;
	            this.match(LuaParser.DO);
	            this.state = 83;
	            this.block();
	            this.state = 84;
	            this.match(LuaParser.END);
	            break;

	        case 9:
	            this.enterOuterAlt(localctx, 9);
	            this.state = 86;
	            this.match(LuaParser.REPEAT);
	            this.state = 87;
	            this.block();
	            this.state = 88;
	            this.match(LuaParser.UNTIL);
	            this.state = 89;
	            this.exp(0);
	            break;

	        case 10:
	            this.enterOuterAlt(localctx, 10);
	            this.state = 91;
	            this.match(LuaParser.IF);
	            this.state = 92;
	            this.exp(0);
	            this.state = 93;
	            this.match(LuaParser.THEN);
	            this.state = 94;
	            this.block();
	            this.state = 102;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===12) {
	                this.state = 95;
	                this.match(LuaParser.ELSEIF);
	                this.state = 96;
	                this.exp(0);
	                this.state = 97;
	                this.match(LuaParser.THEN);
	                this.state = 98;
	                this.block();
	                this.state = 104;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 107;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===13) {
	                this.state = 105;
	                this.match(LuaParser.ELSE);
	                this.state = 106;
	                this.block();
	            }

	            this.state = 109;
	            this.match(LuaParser.END);
	            break;

	        case 11:
	            this.enterOuterAlt(localctx, 11);
	            this.state = 111;
	            this.match(LuaParser.FOR);
	            this.state = 112;
	            this.match(LuaParser.NAME);
	            this.state = 113;
	            this.match(LuaParser.EQ);
	            this.state = 114;
	            this.exp(0);
	            this.state = 115;
	            this.match(LuaParser.COMMA);
	            this.state = 116;
	            this.exp(0);
	            this.state = 119;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===15) {
	                this.state = 117;
	                this.match(LuaParser.COMMA);
	                this.state = 118;
	                this.exp(0);
	            }

	            this.state = 121;
	            this.match(LuaParser.DO);
	            this.state = 122;
	            this.block();
	            this.state = 123;
	            this.match(LuaParser.END);
	            break;

	        case 12:
	            this.enterOuterAlt(localctx, 12);
	            this.state = 125;
	            this.match(LuaParser.FOR);
	            this.state = 126;
	            this.namelist();
	            this.state = 127;
	            this.match(LuaParser.IN);
	            this.state = 128;
	            this.explist();
	            this.state = 129;
	            this.match(LuaParser.DO);
	            this.state = 130;
	            this.block();
	            this.state = 131;
	            this.match(LuaParser.END);
	            break;

	        case 13:
	            this.enterOuterAlt(localctx, 13);
	            this.state = 133;
	            this.match(LuaParser.FUNCTION);
	            this.state = 134;
	            this.funcname();
	            this.state = 135;
	            this.funcbody();
	            break;

	        case 14:
	            this.enterOuterAlt(localctx, 14);
	            this.state = 137;
	            this.match(LuaParser.LOCAL);
	            this.state = 138;
	            this.match(LuaParser.FUNCTION);
	            this.state = 139;
	            this.match(LuaParser.NAME);
	            this.state = 140;
	            this.funcbody();
	            break;

	        case 15:
	            this.enterOuterAlt(localctx, 15);
	            this.state = 141;
	            this.match(LuaParser.LOCAL);
	            this.state = 142;
	            this.attnamelist();
	            this.state = 145;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===2) {
	                this.state = 143;
	                this.match(LuaParser.EQ);
	                this.state = 144;
	                this.explist();
	            }

	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	attnamelist() {
	    let localctx = new AttnamelistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, LuaParser.RULE_attnamelist);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 149;
	        this.match(LuaParser.NAME);
	        this.state = 150;
	        this.attrib();
	        this.state = 156;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===15) {
	            this.state = 151;
	            this.match(LuaParser.COMMA);
	            this.state = 152;
	            this.match(LuaParser.NAME);
	            this.state = 153;
	            this.attrib();
	            this.state = 158;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	attrib() {
	    let localctx = new AttribContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, LuaParser.RULE_attrib);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 162;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===19) {
	            this.state = 159;
	            this.match(LuaParser.LT);
	            this.state = 160;
	            this.match(LuaParser.NAME);
	            this.state = 161;
	            this.match(LuaParser.GT);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	retstat() {
	    let localctx = new RetstatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, LuaParser.RULE_retstat);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 170;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 21:
	            this.state = 164;
	            this.match(LuaParser.RETURN);
	            this.state = 166;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) === 0 && ((1 << _la) & 4144103424) !== 0) || ((((_la - 33)) & ~0x1f) === 0 && ((1 << (_la - 33)) & 4282392577) !== 0)) {
	                this.state = 165;
	                this.explist();
	            }

	            break;
	        case 3:
	            this.state = 168;
	            this.match(LuaParser.BREAK);
	            break;
	        case 22:
	            this.state = 169;
	            this.match(LuaParser.CONTINUE);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 173;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===1) {
	            this.state = 172;
	            this.match(LuaParser.SEMI);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	label() {
	    let localctx = new LabelContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, LuaParser.RULE_label);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 175;
	        this.match(LuaParser.CC);
	        this.state = 176;
	        this.match(LuaParser.NAME);
	        this.state = 177;
	        this.match(LuaParser.CC);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	funcname() {
	    let localctx = new FuncnameContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, LuaParser.RULE_funcname);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 179;
	        this.match(LuaParser.NAME);
	        this.state = 184;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===27) {
	            this.state = 180;
	            this.match(LuaParser.DOT);
	            this.state = 181;
	            this.match(LuaParser.NAME);
	            this.state = 186;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 189;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===39) {
	            this.state = 187;
	            this.match(LuaParser.COL);
	            this.state = 188;
	            this.match(LuaParser.NAME);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	varlist() {
	    let localctx = new VarlistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, LuaParser.RULE_varlist);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 191;
	        this.var_();
	        this.state = 196;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===15) {
	            this.state = 192;
	            this.match(LuaParser.COMMA);
	            this.state = 193;
	            this.var_();
	            this.state = 198;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	namelist() {
	    let localctx = new NamelistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, LuaParser.RULE_namelist);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 199;
	        this.match(LuaParser.NAME);
	        this.state = 204;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,15,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 200;
	                this.match(LuaParser.COMMA);
	                this.state = 201;
	                this.match(LuaParser.NAME); 
	            }
	            this.state = 206;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,15,this._ctx);
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	explist() {
	    let localctx = new ExplistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, LuaParser.RULE_explist);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 207;
	        this.exp(0);
	        this.state = 212;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===15) {
	            this.state = 208;
	            this.match(LuaParser.COMMA);
	            this.state = 209;
	            this.exp(0);
	            this.state = 214;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	exp(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 24;
	    this.enterRecursionRule(localctx, 24, LuaParser.RULE_exp, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 227;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 24:
	            this.state = 216;
	            this.match(LuaParser.NIL);
	            break;
	        case 25:
	            this.state = 217;
	            this.match(LuaParser.FALSE);
	            break;
	        case 26:
	            this.state = 218;
	            this.match(LuaParser.TRUE);
	            break;
	        case 61:
	        case 62:
	        case 63:
	        case 64:
	            this.state = 219;
	            this.number();
	            break;
	        case 58:
	        case 59:
	        case 60:
	            this.state = 220;
	            this.string();
	            break;
	        case 55:
	            this.state = 221;
	            this.match(LuaParser.DDD);
	            break;
	        case 17:
	            this.state = 222;
	            this.functiondef();
	            break;
	        case 31:
	        case 57:
	            this.state = 223;
	            this.prefixexp();
	            break;
	        case 46:
	            this.state = 224;
	            this.tableconstructor();
	            break;
	        case 28:
	        case 29:
	        case 30:
	        case 33:
	            this.state = 225;
	            _la = this._input.LA(1);
	            if(!(((((_la - 28)) & ~0x1f) === 0 && ((1 << (_la - 28)) & 39) !== 0))) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 226;
	            this.exp(8);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 255;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,19,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 253;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,18,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExpContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 229;
	                    if (!( this.precpred(this._ctx, 9))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 9)");
	                    }

	                    this.state = 230;
	                    this.match(LuaParser.CARET);
	                    this.state = 231;
	                    this.exp(9);
	                    break;

	                case 2:
	                    localctx = new ExpContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 232;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 233;
	                    _la = this._input.LA(1);
	                    if(!(((((_la - 37)) & ~0x1f) === 0 && ((1 << (_la - 37)) & 131331) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 234;
	                    this.exp(8);
	                    break;

	                case 3:
	                    localctx = new ExpContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 235;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 236;
	                    _la = this._input.LA(1);
	                    if(!(_la===29 || _la===44)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 237;
	                    this.exp(7);
	                    break;

	                case 4:
	                    localctx = new ExpContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 238;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }

	                    this.state = 239;
	                    this.match(LuaParser.DD);
	                    this.state = 240;
	                    this.exp(5);
	                    break;

	                case 5:
	                    localctx = new ExpContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 241;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 242;
	                    _la = this._input.LA(1);
	                    if(!(_la===19 || _la===20 || ((((_la - 40)) & ~0x1f) === 0 && ((1 << (_la - 40)) & 66563) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 243;
	                    this.exp(5);
	                    break;

	                case 6:
	                    localctx = new ExpContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 244;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }

	                    this.state = 245;
	                    this.match(LuaParser.AND);
	                    this.state = 246;
	                    this.exp(4);
	                    break;

	                case 7:
	                    localctx = new ExpContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 247;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }

	                    this.state = 248;
	                    this.match(LuaParser.OR);
	                    this.state = 249;
	                    this.exp(3);
	                    break;

	                case 8:
	                    localctx = new ExpContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_exp);
	                    this.state = 250;
	                    if (!( this.precpred(this._ctx, 1))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
	                    }
	                    this.state = 251;
	                    _la = this._input.LA(1);
	                    if(!(((((_la - 28)) & ~0x1f) === 0 && ((1 << (_la - 28)) & 16777665) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 252;
	                    this.exp(2);
	                    break;

	                } 
	            }
	            this.state = 257;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,19,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	var_() {
	    let localctx = new VarContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, LuaParser.RULE_var);
	    try {
	        this.state = 268;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,21,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 258;
	            this.match(LuaParser.NAME);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 259;
	            this.prefixexp();
	            this.state = 266;
	            this._errHandler.sync(this);
	            switch(this._input.LA(1)) {
	            case 48:
	                this.state = 260;
	                this.match(LuaParser.OB);
	                this.state = 261;
	                this.exp(0);
	                this.state = 262;
	                this.match(LuaParser.CB);
	                break;
	            case 27:
	                this.state = 264;
	                this.match(LuaParser.DOT);
	                this.state = 265;
	                this.match(LuaParser.NAME);
	                break;
	            default:
	                throw new antlr4.error.NoViableAltException(this);
	            }
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	prefixexp() {
	    let localctx = new PrefixexpContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, LuaParser.RULE_prefixexp);
	    try {
	        this.state = 308;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,28,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 270;
	            this.match(LuaParser.NAME);
	            this.state = 279;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,23,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 277;
	                    this._errHandler.sync(this);
	                    switch(this._input.LA(1)) {
	                    case 48:
	                        this.state = 271;
	                        this.match(LuaParser.OB);
	                        this.state = 272;
	                        this.exp(0);
	                        this.state = 273;
	                        this.match(LuaParser.CB);
	                        break;
	                    case 27:
	                        this.state = 275;
	                        this.match(LuaParser.DOT);
	                        this.state = 276;
	                        this.match(LuaParser.NAME);
	                        break;
	                    default:
	                        throw new antlr4.error.NoViableAltException(this);
	                    } 
	                }
	                this.state = 281;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,23,this._ctx);
	            }

	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 282;
	            this.functioncall(0);
	            this.state = 291;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,25,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 289;
	                    this._errHandler.sync(this);
	                    switch(this._input.LA(1)) {
	                    case 48:
	                        this.state = 283;
	                        this.match(LuaParser.OB);
	                        this.state = 284;
	                        this.exp(0);
	                        this.state = 285;
	                        this.match(LuaParser.CB);
	                        break;
	                    case 27:
	                        this.state = 287;
	                        this.match(LuaParser.DOT);
	                        this.state = 288;
	                        this.match(LuaParser.NAME);
	                        break;
	                    default:
	                        throw new antlr4.error.NoViableAltException(this);
	                    } 
	                }
	                this.state = 293;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,25,this._ctx);
	            }

	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 294;
	            this.match(LuaParser.OP);
	            this.state = 295;
	            this.exp(0);
	            this.state = 296;
	            this.match(LuaParser.CP);
	            this.state = 305;
	            this._errHandler.sync(this);
	            var _alt = this._interp.adaptivePredict(this._input,27,this._ctx)
	            while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	                if(_alt===1) {
	                    this.state = 303;
	                    this._errHandler.sync(this);
	                    switch(this._input.LA(1)) {
	                    case 48:
	                        this.state = 297;
	                        this.match(LuaParser.OB);
	                        this.state = 298;
	                        this.exp(0);
	                        this.state = 299;
	                        this.match(LuaParser.CB);
	                        break;
	                    case 27:
	                        this.state = 301;
	                        this.match(LuaParser.DOT);
	                        this.state = 302;
	                        this.match(LuaParser.NAME);
	                        break;
	                    default:
	                        throw new antlr4.error.NoViableAltException(this);
	                    } 
	                }
	                this.state = 307;
	                this._errHandler.sync(this);
	                _alt = this._interp.adaptivePredict(this._input,27,this._ctx);
	            }

	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	functioncall(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new FunctioncallContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 30;
	    this.enterRecursionRule(localctx, 30, LuaParser.RULE_functioncall, _p);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 373;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,37,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 311;
	            this.match(LuaParser.NAME);
	            this.state = 320;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===27 || _la===48) {
	                this.state = 318;
	                this._errHandler.sync(this);
	                switch(this._input.LA(1)) {
	                case 48:
	                    this.state = 312;
	                    this.match(LuaParser.OB);
	                    this.state = 313;
	                    this.exp(0);
	                    this.state = 314;
	                    this.match(LuaParser.CB);
	                    break;
	                case 27:
	                    this.state = 316;
	                    this.match(LuaParser.DOT);
	                    this.state = 317;
	                    this.match(LuaParser.NAME);
	                    break;
	                default:
	                    throw new antlr4.error.NoViableAltException(this);
	                }
	                this.state = 322;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 323;
	            this.args();
	            break;

	        case 2:
	            this.state = 324;
	            this.match(LuaParser.OP);
	            this.state = 325;
	            this.exp(0);
	            this.state = 326;
	            this.match(LuaParser.CP);
	            this.state = 335;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===27 || _la===48) {
	                this.state = 333;
	                this._errHandler.sync(this);
	                switch(this._input.LA(1)) {
	                case 48:
	                    this.state = 327;
	                    this.match(LuaParser.OB);
	                    this.state = 328;
	                    this.exp(0);
	                    this.state = 329;
	                    this.match(LuaParser.CB);
	                    break;
	                case 27:
	                    this.state = 331;
	                    this.match(LuaParser.DOT);
	                    this.state = 332;
	                    this.match(LuaParser.NAME);
	                    break;
	                default:
	                    throw new antlr4.error.NoViableAltException(this);
	                }
	                this.state = 337;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 338;
	            this.args();
	            break;

	        case 3:
	            this.state = 340;
	            this.match(LuaParser.NAME);
	            this.state = 349;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===27 || _la===48) {
	                this.state = 347;
	                this._errHandler.sync(this);
	                switch(this._input.LA(1)) {
	                case 48:
	                    this.state = 341;
	                    this.match(LuaParser.OB);
	                    this.state = 342;
	                    this.exp(0);
	                    this.state = 343;
	                    this.match(LuaParser.CB);
	                    break;
	                case 27:
	                    this.state = 345;
	                    this.match(LuaParser.DOT);
	                    this.state = 346;
	                    this.match(LuaParser.NAME);
	                    break;
	                default:
	                    throw new antlr4.error.NoViableAltException(this);
	                }
	                this.state = 351;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 352;
	            this.match(LuaParser.COL);
	            this.state = 353;
	            this.match(LuaParser.NAME);
	            this.state = 354;
	            this.args();
	            break;

	        case 4:
	            this.state = 355;
	            this.match(LuaParser.OP);
	            this.state = 356;
	            this.exp(0);
	            this.state = 357;
	            this.match(LuaParser.CP);
	            this.state = 366;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===27 || _la===48) {
	                this.state = 364;
	                this._errHandler.sync(this);
	                switch(this._input.LA(1)) {
	                case 48:
	                    this.state = 358;
	                    this.match(LuaParser.OB);
	                    this.state = 359;
	                    this.exp(0);
	                    this.state = 360;
	                    this.match(LuaParser.CB);
	                    break;
	                case 27:
	                    this.state = 362;
	                    this.match(LuaParser.DOT);
	                    this.state = 363;
	                    this.match(LuaParser.NAME);
	                    break;
	                default:
	                    throw new antlr4.error.NoViableAltException(this);
	                }
	                this.state = 368;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            this.state = 369;
	            this.match(LuaParser.COL);
	            this.state = 370;
	            this.match(LuaParser.NAME);
	            this.state = 371;
	            this.args();
	            break;

	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 405;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,43,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 403;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,42,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new FunctioncallContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_functioncall);
	                    this.state = 375;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 384;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    while(_la===27 || _la===48) {
	                        this.state = 382;
	                        this._errHandler.sync(this);
	                        switch(this._input.LA(1)) {
	                        case 48:
	                            this.state = 376;
	                            this.match(LuaParser.OB);
	                            this.state = 377;
	                            this.exp(0);
	                            this.state = 378;
	                            this.match(LuaParser.CB);
	                            break;
	                        case 27:
	                            this.state = 380;
	                            this.match(LuaParser.DOT);
	                            this.state = 381;
	                            this.match(LuaParser.NAME);
	                            break;
	                        default:
	                            throw new antlr4.error.NoViableAltException(this);
	                        }
	                        this.state = 386;
	                        this._errHandler.sync(this);
	                        _la = this._input.LA(1);
	                    }
	                    this.state = 387;
	                    this.args();
	                    break;

	                case 2:
	                    localctx = new FunctioncallContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, LuaParser.RULE_functioncall);
	                    this.state = 388;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 397;
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    while(_la===27 || _la===48) {
	                        this.state = 395;
	                        this._errHandler.sync(this);
	                        switch(this._input.LA(1)) {
	                        case 48:
	                            this.state = 389;
	                            this.match(LuaParser.OB);
	                            this.state = 390;
	                            this.exp(0);
	                            this.state = 391;
	                            this.match(LuaParser.CB);
	                            break;
	                        case 27:
	                            this.state = 393;
	                            this.match(LuaParser.DOT);
	                            this.state = 394;
	                            this.match(LuaParser.NAME);
	                            break;
	                        default:
	                            throw new antlr4.error.NoViableAltException(this);
	                        }
	                        this.state = 399;
	                        this._errHandler.sync(this);
	                        _la = this._input.LA(1);
	                    }
	                    this.state = 400;
	                    this.match(LuaParser.COL);
	                    this.state = 401;
	                    this.match(LuaParser.NAME);
	                    this.state = 402;
	                    this.args();
	                    break;

	                } 
	            }
	            this.state = 407;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,43,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	args() {
	    let localctx = new ArgsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, LuaParser.RULE_args);
	    var _la = 0;
	    try {
	        this.state = 415;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 31:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 408;
	            this.match(LuaParser.OP);
	            this.state = 410;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if((((_la) & ~0x1f) === 0 && ((1 << _la) & 4144103424) !== 0) || ((((_la - 33)) & ~0x1f) === 0 && ((1 << (_la - 33)) & 4282392577) !== 0)) {
	                this.state = 409;
	                this.explist();
	            }

	            this.state = 412;
	            this.match(LuaParser.CP);
	            break;
	        case 46:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 413;
	            this.tableconstructor();
	            break;
	        case 58:
	        case 59:
	        case 60:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 414;
	            this.string();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	functiondef() {
	    let localctx = new FunctiondefContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, LuaParser.RULE_functiondef);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 417;
	        this.match(LuaParser.FUNCTION);
	        this.state = 418;
	        this.funcbody();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	funcbody() {
	    let localctx = new FuncbodyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, LuaParser.RULE_funcbody);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 420;
	        this.match(LuaParser.OP);
	        this.state = 421;
	        this.parlist();
	        this.state = 422;
	        this.match(LuaParser.CP);
	        this.state = 423;
	        this.block();
	        this.state = 424;
	        this.match(LuaParser.END);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	parlist() {
	    let localctx = new ParlistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, LuaParser.RULE_parlist);
	    var _la = 0;
	    try {
	        this.state = 433;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 57:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 426;
	            this.namelist();
	            this.state = 429;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            if(_la===15) {
	                this.state = 427;
	                this.match(LuaParser.COMMA);
	                this.state = 428;
	                this.match(LuaParser.DDD);
	            }

	            break;
	        case 55:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 431;
	            this.match(LuaParser.DDD);
	            break;
	        case 32:
	            this.enterOuterAlt(localctx, 3);

	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	tableconstructor() {
	    let localctx = new TableconstructorContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, LuaParser.RULE_tableconstructor);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 435;
	        this.match(LuaParser.OCU);
	        this.state = 437;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if((((_la) & ~0x1f) === 0 && ((1 << _la) & 4144103424) !== 0) || ((((_la - 33)) & ~0x1f) === 0 && ((1 << (_la - 33)) & 4282425345) !== 0)) {
	            this.state = 436;
	            this.fieldlist();
	        }

	        this.state = 439;
	        this.match(LuaParser.CCU);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	fieldlist() {
	    let localctx = new FieldlistContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, LuaParser.RULE_fieldlist);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 441;
	        this.field();
	        this.state = 447;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,49,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 442;
	                this.fieldsep();
	                this.state = 443;
	                this.field(); 
	            }
	            this.state = 449;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,49,this._ctx);
	        }

	        this.state = 451;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===1 || _la===15) {
	            this.state = 450;
	            this.fieldsep();
	        }

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	field() {
	    let localctx = new FieldContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, LuaParser.RULE_field);
	    try {
	        this.state = 463;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,51,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 453;
	            this.match(LuaParser.OB);
	            this.state = 454;
	            this.exp(0);
	            this.state = 455;
	            this.match(LuaParser.CB);
	            this.state = 456;
	            this.match(LuaParser.EQ);
	            this.state = 457;
	            this.exp(0);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 459;
	            this.match(LuaParser.NAME);
	            this.state = 460;
	            this.match(LuaParser.EQ);
	            this.state = 461;
	            this.exp(0);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 462;
	            this.exp(0);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	fieldsep() {
	    let localctx = new FieldsepContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 46, LuaParser.RULE_fieldsep);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 465;
	        _la = this._input.LA(1);
	        if(!(_la===1 || _la===15)) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	number() {
	    let localctx = new NumberContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 48, LuaParser.RULE_number);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 467;
	        _la = this._input.LA(1);
	        if(!(((((_la - 61)) & ~0x1f) === 0 && ((1 << (_la - 61)) & 15) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	string() {
	    let localctx = new StringContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 50, LuaParser.RULE_string);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 469;
	        _la = this._input.LA(1);
	        if(!(((((_la - 58)) & ~0x1f) === 0 && ((1 << (_la - 58)) & 7) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

LuaParser.EOF = antlr4.Token.EOF;
LuaParser.SEMI = 1;
LuaParser.EQ = 2;
LuaParser.BREAK = 3;
LuaParser.GOTO = 4;
LuaParser.DO = 5;
LuaParser.END = 6;
LuaParser.WHILE = 7;
LuaParser.REPEAT = 8;
LuaParser.UNTIL = 9;
LuaParser.IF = 10;
LuaParser.THEN = 11;
LuaParser.ELSEIF = 12;
LuaParser.ELSE = 13;
LuaParser.FOR = 14;
LuaParser.COMMA = 15;
LuaParser.IN = 16;
LuaParser.FUNCTION = 17;
LuaParser.LOCAL = 18;
LuaParser.LT = 19;
LuaParser.GT = 20;
LuaParser.RETURN = 21;
LuaParser.CONTINUE = 22;
LuaParser.CC = 23;
LuaParser.NIL = 24;
LuaParser.FALSE = 25;
LuaParser.TRUE = 26;
LuaParser.DOT = 27;
LuaParser.SQUIG = 28;
LuaParser.MINUS = 29;
LuaParser.POUND = 30;
LuaParser.OP = 31;
LuaParser.CP = 32;
LuaParser.NOT = 33;
LuaParser.LL = 34;
LuaParser.GG = 35;
LuaParser.AMP = 36;
LuaParser.SS = 37;
LuaParser.PER = 38;
LuaParser.COL = 39;
LuaParser.LE = 40;
LuaParser.GE = 41;
LuaParser.AND = 42;
LuaParser.OR = 43;
LuaParser.PLUS = 44;
LuaParser.STAR = 45;
LuaParser.OCU = 46;
LuaParser.CCU = 47;
LuaParser.OB = 48;
LuaParser.CB = 49;
LuaParser.EE = 50;
LuaParser.DD = 51;
LuaParser.PIPE = 52;
LuaParser.CARET = 53;
LuaParser.SLASH = 54;
LuaParser.DDD = 55;
LuaParser.SQEQ = 56;
LuaParser.NAME = 57;
LuaParser.NORMALSTRING = 58;
LuaParser.CHARSTRING = 59;
LuaParser.LONGSTRING = 60;
LuaParser.INT = 61;
LuaParser.HEX = 62;
LuaParser.FLOAT = 63;
LuaParser.HEX_FLOAT = 64;
LuaParser.LINE_COMMENT = 65;
LuaParser.BLOCK_COMMENT = 66;
LuaParser.WS = 67;
LuaParser.NL = 68;
LuaParser.SHEBANG = 69;

LuaParser.RULE_start_ = 0;
LuaParser.RULE_chunk = 1;
LuaParser.RULE_block = 2;
LuaParser.RULE_stat = 3;
LuaParser.RULE_attnamelist = 4;
LuaParser.RULE_attrib = 5;
LuaParser.RULE_retstat = 6;
LuaParser.RULE_label = 7;
LuaParser.RULE_funcname = 8;
LuaParser.RULE_varlist = 9;
LuaParser.RULE_namelist = 10;
LuaParser.RULE_explist = 11;
LuaParser.RULE_exp = 12;
LuaParser.RULE_var = 13;
LuaParser.RULE_prefixexp = 14;
LuaParser.RULE_functioncall = 15;
LuaParser.RULE_args = 16;
LuaParser.RULE_functiondef = 17;
LuaParser.RULE_funcbody = 18;
LuaParser.RULE_parlist = 19;
LuaParser.RULE_tableconstructor = 20;
LuaParser.RULE_fieldlist = 21;
LuaParser.RULE_field = 22;
LuaParser.RULE_fieldsep = 23;
LuaParser.RULE_number = 24;
LuaParser.RULE_string = 25;

class Start_Context extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_start_;
    }

	chunk() {
	    return this.getTypedRuleContext(ChunkContext,0);
	};

	EOF() {
	    return this.getToken(LuaParser.EOF, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitStart_(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ChunkContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_chunk;
    }

	block() {
	    return this.getTypedRuleContext(BlockContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitChunk(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class BlockContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_block;
    }

	stat = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatContext);
	    } else {
	        return this.getTypedRuleContext(StatContext,i);
	    }
	};

	retstat() {
	    return this.getTypedRuleContext(RetstatContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitBlock(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_stat;
    }

	SEMI() {
	    return this.getToken(LuaParser.SEMI, 0);
	};

	varlist() {
	    return this.getTypedRuleContext(VarlistContext,0);
	};

	EQ() {
	    return this.getToken(LuaParser.EQ, 0);
	};

	explist() {
	    return this.getTypedRuleContext(ExplistContext,0);
	};

	functioncall() {
	    return this.getTypedRuleContext(FunctioncallContext,0);
	};

	label() {
	    return this.getTypedRuleContext(LabelContext,0);
	};

	BREAK() {
	    return this.getToken(LuaParser.BREAK, 0);
	};

	GOTO() {
	    return this.getToken(LuaParser.GOTO, 0);
	};

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	DO() {
	    return this.getToken(LuaParser.DO, 0);
	};

	block = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(BlockContext);
	    } else {
	        return this.getTypedRuleContext(BlockContext,i);
	    }
	};

	END() {
	    return this.getToken(LuaParser.END, 0);
	};

	WHILE() {
	    return this.getToken(LuaParser.WHILE, 0);
	};

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	REPEAT() {
	    return this.getToken(LuaParser.REPEAT, 0);
	};

	UNTIL() {
	    return this.getToken(LuaParser.UNTIL, 0);
	};

	IF() {
	    return this.getToken(LuaParser.IF, 0);
	};

	THEN = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.THEN);
	    } else {
	        return this.getToken(LuaParser.THEN, i);
	    }
	};


	ELSEIF = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.ELSEIF);
	    } else {
	        return this.getToken(LuaParser.ELSEIF, i);
	    }
	};


	ELSE() {
	    return this.getToken(LuaParser.ELSE, 0);
	};

	FOR() {
	    return this.getToken(LuaParser.FOR, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.COMMA);
	    } else {
	        return this.getToken(LuaParser.COMMA, i);
	    }
	};


	namelist() {
	    return this.getTypedRuleContext(NamelistContext,0);
	};

	IN() {
	    return this.getToken(LuaParser.IN, 0);
	};

	FUNCTION() {
	    return this.getToken(LuaParser.FUNCTION, 0);
	};

	funcname() {
	    return this.getTypedRuleContext(FuncnameContext,0);
	};

	funcbody() {
	    return this.getTypedRuleContext(FuncbodyContext,0);
	};

	LOCAL() {
	    return this.getToken(LuaParser.LOCAL, 0);
	};

	attnamelist() {
	    return this.getTypedRuleContext(AttnamelistContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitStat(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AttnamelistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_attnamelist;
    }

	NAME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.NAME);
	    } else {
	        return this.getToken(LuaParser.NAME, i);
	    }
	};


	attrib = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(AttribContext);
	    } else {
	        return this.getTypedRuleContext(AttribContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.COMMA);
	    } else {
	        return this.getToken(LuaParser.COMMA, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitAttnamelist(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AttribContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_attrib;
    }

	LT() {
	    return this.getToken(LuaParser.LT, 0);
	};

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	GT() {
	    return this.getToken(LuaParser.GT, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitAttrib(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class RetstatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_retstat;
    }

	RETURN() {
	    return this.getToken(LuaParser.RETURN, 0);
	};

	BREAK() {
	    return this.getToken(LuaParser.BREAK, 0);
	};

	CONTINUE() {
	    return this.getToken(LuaParser.CONTINUE, 0);
	};

	SEMI() {
	    return this.getToken(LuaParser.SEMI, 0);
	};

	explist() {
	    return this.getTypedRuleContext(ExplistContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitRetstat(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class LabelContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_label;
    }

	CC = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.CC);
	    } else {
	        return this.getToken(LuaParser.CC, i);
	    }
	};


	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitLabel(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FuncnameContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_funcname;
    }

	NAME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.NAME);
	    } else {
	        return this.getToken(LuaParser.NAME, i);
	    }
	};


	DOT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.DOT);
	    } else {
	        return this.getToken(LuaParser.DOT, i);
	    }
	};


	COL() {
	    return this.getToken(LuaParser.COL, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitFuncname(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class VarlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_varlist;
    }

	var_ = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(VarContext);
	    } else {
	        return this.getTypedRuleContext(VarContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.COMMA);
	    } else {
	        return this.getToken(LuaParser.COMMA, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitVarlist(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class NamelistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_namelist;
    }

	NAME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.NAME);
	    } else {
	        return this.getToken(LuaParser.NAME, i);
	    }
	};


	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.COMMA);
	    } else {
	        return this.getToken(LuaParser.COMMA, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitNamelist(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ExplistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_explist;
    }

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.COMMA);
	    } else {
	        return this.getToken(LuaParser.COMMA, i);
	    }
	};


	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitExplist(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ExpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_exp;
    }

	NIL() {
	    return this.getToken(LuaParser.NIL, 0);
	};

	FALSE() {
	    return this.getToken(LuaParser.FALSE, 0);
	};

	TRUE() {
	    return this.getToken(LuaParser.TRUE, 0);
	};

	number() {
	    return this.getTypedRuleContext(NumberContext,0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	DDD() {
	    return this.getToken(LuaParser.DDD, 0);
	};

	functiondef() {
	    return this.getTypedRuleContext(FunctiondefContext,0);
	};

	prefixexp() {
	    return this.getTypedRuleContext(PrefixexpContext,0);
	};

	tableconstructor() {
	    return this.getTypedRuleContext(TableconstructorContext,0);
	};

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	NOT() {
	    return this.getToken(LuaParser.NOT, 0);
	};

	POUND() {
	    return this.getToken(LuaParser.POUND, 0);
	};

	MINUS() {
	    return this.getToken(LuaParser.MINUS, 0);
	};

	SQUIG() {
	    return this.getToken(LuaParser.SQUIG, 0);
	};

	CARET() {
	    return this.getToken(LuaParser.CARET, 0);
	};

	STAR() {
	    return this.getToken(LuaParser.STAR, 0);
	};

	SLASH() {
	    return this.getToken(LuaParser.SLASH, 0);
	};

	PER() {
	    return this.getToken(LuaParser.PER, 0);
	};

	SS() {
	    return this.getToken(LuaParser.SS, 0);
	};

	PLUS() {
	    return this.getToken(LuaParser.PLUS, 0);
	};

	DD() {
	    return this.getToken(LuaParser.DD, 0);
	};

	LT() {
	    return this.getToken(LuaParser.LT, 0);
	};

	GT() {
	    return this.getToken(LuaParser.GT, 0);
	};

	LE() {
	    return this.getToken(LuaParser.LE, 0);
	};

	GE() {
	    return this.getToken(LuaParser.GE, 0);
	};

	SQEQ() {
	    return this.getToken(LuaParser.SQEQ, 0);
	};

	EE() {
	    return this.getToken(LuaParser.EE, 0);
	};

	AND() {
	    return this.getToken(LuaParser.AND, 0);
	};

	OR() {
	    return this.getToken(LuaParser.OR, 0);
	};

	AMP() {
	    return this.getToken(LuaParser.AMP, 0);
	};

	PIPE() {
	    return this.getToken(LuaParser.PIPE, 0);
	};

	LL() {
	    return this.getToken(LuaParser.LL, 0);
	};

	GG() {
	    return this.getToken(LuaParser.GG, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitExp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class VarContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_var;
    }

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	prefixexp() {
	    return this.getTypedRuleContext(PrefixexpContext,0);
	};

	OB() {
	    return this.getToken(LuaParser.OB, 0);
	};

	exp() {
	    return this.getTypedRuleContext(ExpContext,0);
	};

	CB() {
	    return this.getToken(LuaParser.CB, 0);
	};

	DOT() {
	    return this.getToken(LuaParser.DOT, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitVar(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class PrefixexpContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_prefixexp;
    }

	NAME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.NAME);
	    } else {
	        return this.getToken(LuaParser.NAME, i);
	    }
	};


	OB = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.OB);
	    } else {
	        return this.getToken(LuaParser.OB, i);
	    }
	};


	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	CB = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.CB);
	    } else {
	        return this.getToken(LuaParser.CB, i);
	    }
	};


	DOT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.DOT);
	    } else {
	        return this.getToken(LuaParser.DOT, i);
	    }
	};


	functioncall() {
	    return this.getTypedRuleContext(FunctioncallContext,0);
	};

	OP() {
	    return this.getToken(LuaParser.OP, 0);
	};

	CP() {
	    return this.getToken(LuaParser.CP, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitPrefixexp(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FunctioncallContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_functioncall;
    }

	NAME = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.NAME);
	    } else {
	        return this.getToken(LuaParser.NAME, i);
	    }
	};


	args() {
	    return this.getTypedRuleContext(ArgsContext,0);
	};

	OB = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.OB);
	    } else {
	        return this.getToken(LuaParser.OB, i);
	    }
	};


	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	CB = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.CB);
	    } else {
	        return this.getToken(LuaParser.CB, i);
	    }
	};


	DOT = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(LuaParser.DOT);
	    } else {
	        return this.getToken(LuaParser.DOT, i);
	    }
	};


	OP() {
	    return this.getToken(LuaParser.OP, 0);
	};

	CP() {
	    return this.getToken(LuaParser.CP, 0);
	};

	COL() {
	    return this.getToken(LuaParser.COL, 0);
	};

	functioncall() {
	    return this.getTypedRuleContext(FunctioncallContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitFunctioncall(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ArgsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_args;
    }

	OP() {
	    return this.getToken(LuaParser.OP, 0);
	};

	CP() {
	    return this.getToken(LuaParser.CP, 0);
	};

	explist() {
	    return this.getTypedRuleContext(ExplistContext,0);
	};

	tableconstructor() {
	    return this.getTypedRuleContext(TableconstructorContext,0);
	};

	string() {
	    return this.getTypedRuleContext(StringContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitArgs(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FunctiondefContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_functiondef;
    }

	FUNCTION() {
	    return this.getToken(LuaParser.FUNCTION, 0);
	};

	funcbody() {
	    return this.getTypedRuleContext(FuncbodyContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitFunctiondef(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FuncbodyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_funcbody;
    }

	OP() {
	    return this.getToken(LuaParser.OP, 0);
	};

	parlist() {
	    return this.getTypedRuleContext(ParlistContext,0);
	};

	CP() {
	    return this.getToken(LuaParser.CP, 0);
	};

	block() {
	    return this.getTypedRuleContext(BlockContext,0);
	};

	END() {
	    return this.getToken(LuaParser.END, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitFuncbody(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ParlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_parlist;
    }

	namelist() {
	    return this.getTypedRuleContext(NamelistContext,0);
	};

	COMMA() {
	    return this.getToken(LuaParser.COMMA, 0);
	};

	DDD() {
	    return this.getToken(LuaParser.DDD, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitParlist(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class TableconstructorContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_tableconstructor;
    }

	OCU() {
	    return this.getToken(LuaParser.OCU, 0);
	};

	CCU() {
	    return this.getToken(LuaParser.CCU, 0);
	};

	fieldlist() {
	    return this.getTypedRuleContext(FieldlistContext,0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitTableconstructor(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FieldlistContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_fieldlist;
    }

	field = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FieldContext);
	    } else {
	        return this.getTypedRuleContext(FieldContext,i);
	    }
	};

	fieldsep = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(FieldsepContext);
	    } else {
	        return this.getTypedRuleContext(FieldsepContext,i);
	    }
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitFieldlist(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FieldContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_field;
    }

	OB() {
	    return this.getToken(LuaParser.OB, 0);
	};

	exp = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpContext);
	    } else {
	        return this.getTypedRuleContext(ExpContext,i);
	    }
	};

	CB() {
	    return this.getToken(LuaParser.CB, 0);
	};

	EQ() {
	    return this.getToken(LuaParser.EQ, 0);
	};

	NAME() {
	    return this.getToken(LuaParser.NAME, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitField(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class FieldsepContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_fieldsep;
    }

	COMMA() {
	    return this.getToken(LuaParser.COMMA, 0);
	};

	SEMI() {
	    return this.getToken(LuaParser.SEMI, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitFieldsep(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class NumberContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_number;
    }

	INT() {
	    return this.getToken(LuaParser.INT, 0);
	};

	HEX() {
	    return this.getToken(LuaParser.HEX, 0);
	};

	FLOAT() {
	    return this.getToken(LuaParser.FLOAT, 0);
	};

	HEX_FLOAT() {
	    return this.getToken(LuaParser.HEX_FLOAT, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitNumber(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StringContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = LuaParser.RULE_string;
    }

	NORMALSTRING() {
	    return this.getToken(LuaParser.NORMALSTRING, 0);
	};

	CHARSTRING() {
	    return this.getToken(LuaParser.CHARSTRING, 0);
	};

	LONGSTRING() {
	    return this.getToken(LuaParser.LONGSTRING, 0);
	};

	accept(visitor) {
	    if ( visitor instanceof LuaParserVisitor ) {
	        return visitor.visitString(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




LuaParser.Start_Context = Start_Context; 
LuaParser.ChunkContext = ChunkContext; 
LuaParser.BlockContext = BlockContext; 
LuaParser.StatContext = StatContext; 
LuaParser.AttnamelistContext = AttnamelistContext; 
LuaParser.AttribContext = AttribContext; 
LuaParser.RetstatContext = RetstatContext; 
LuaParser.LabelContext = LabelContext; 
LuaParser.FuncnameContext = FuncnameContext; 
LuaParser.VarlistContext = VarlistContext; 
LuaParser.NamelistContext = NamelistContext; 
LuaParser.ExplistContext = ExplistContext; 
LuaParser.ExpContext = ExpContext; 
LuaParser.VarContext = VarContext; 
LuaParser.PrefixexpContext = PrefixexpContext; 
LuaParser.FunctioncallContext = FunctioncallContext; 
LuaParser.ArgsContext = ArgsContext; 
LuaParser.FunctiondefContext = FunctiondefContext; 
LuaParser.FuncbodyContext = FuncbodyContext; 
LuaParser.ParlistContext = ParlistContext; 
LuaParser.TableconstructorContext = TableconstructorContext; 
LuaParser.FieldlistContext = FieldlistContext; 
LuaParser.FieldContext = FieldContext; 
LuaParser.FieldsepContext = FieldsepContext; 
LuaParser.NumberContext = NumberContext; 
LuaParser.StringContext = StringContext; 
