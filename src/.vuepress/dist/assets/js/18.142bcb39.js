(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{441:function(o,s,d){"use strict";d.r(s);var r=d(67),e=Object(r.a)({},(function(){var o=this,s=o.$createElement,d=o._self._c||s;return d("ContentSlotsDistributor",{attrs:{"slot-key":o.$parent.slotKey}},[d("h1",{attrs:{id:"cryptography"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#cryptography"}},[o._v("#")]),o._v(" Cryptography")]),o._v(" "),d("p",[o._v("Cryptography is the art of hiding information in such a way that it can only be retrieved by the intended audience. There are many, many different cryptography strategies. One of the oldest ones was used by Julius Caesar and is know as the "),d("em",[o._v("Caesar shift cypher")]),o._v(".")]),o._v(" "),d("h2",{attrs:{id:"caesar-shift"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#caesar-shift"}},[o._v("#")]),o._v(" Caesar shift")]),o._v(" "),d("p",[o._v("There is a convention in cryptography that the original text is lowercase, and the cyphertext is uppercase. Here is an example of a Caesar shifted message:")]),o._v(" "),d("div",{staticClass:"language-js extra-class"},[d("pre",{pre:!0,attrs:{class:"language-js"}},[d("code",[d("span",{pre:!0,attrs:{class:"token keyword"}},[o._v("const")]),o._v(" msg "),d("span",{pre:!0,attrs:{class:"token operator"}},[o._v("=")]),o._v(" "),d("span",{pre:!0,attrs:{class:"token string"}},[o._v("'hello this is a secret message'")]),o._v("\n"),d("span",{pre:!0,attrs:{class:"token keyword"}},[o._v("const")]),o._v(" cyp "),d("span",{pre:!0,attrs:{class:"token operator"}},[o._v("=")]),o._v(" "),d("span",{pre:!0,attrs:{class:"token string"}},[o._v("'MJQQT YMNX NX F XJHWJY RJXXFLJ'")]),o._v("\n")])])]),d("p",[o._v("The cypher is produced by taking the alphabet and rotating it (shifting it) by 5 characters. In this case, the key is 5, but you can use any key. After rotating by 5, the alphabet looks like this:")]),o._v(" "),d("div",{staticClass:"language-js extra-class"},[d("pre",{pre:!0,attrs:{class:"language-js"}},[d("code",[d("span",{pre:!0,attrs:{class:"token string"}},[o._v("'abcdefghijklmnopqrstuvwxyz'")]),o._v("\n"),d("span",{pre:!0,attrs:{class:"token string"}},[o._v("'FGHIJKLMNOPQRSTUVWXYZABCDE'")]),o._v("\n")])])]),d("p",[o._v("so "),d("code",[o._v("a")]),o._v(" becomes "),d("code",[o._v("F")]),o._v(" and "),d("code",[o._v("b")]),o._v(" becomes "),d("code",[o._v("G")]),o._v(" and so on. In order to decode the text, we need to figure out what the key is, and undo the rotation.")]),o._v(" "),d("h3",{attrs:{id:"challenge"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#challenge"}},[o._v("#")]),o._v(" Challenge")]),o._v(" "),d("p",[o._v("Fork the repo "),d("a",{attrs:{href:"https://github.com/si-mv/crypto-jamz",target:"_blank",rel:"noopener noreferrer"}},[o._v("here"),d("OutboundLink")],1),o._v(".")]),o._v(" "),d("p",[o._v("Create two functions: "),d("code",[o._v("caesarEncode")]),o._v(" and "),d("code",[o._v("caesarDecode")]),o._v(".")]),o._v(" "),d("p",[d("code",[o._v("caesarEncode")]),o._v(" should accept two parameters: a string "),d("code",[o._v("msg")]),o._v(" and a number "),d("code",[o._v("key")]),o._v(", and it should return the encrypted text.")]),o._v(" "),d("p",[d("code",[o._v("caesarDecode")]),o._v(" should do the opposite: it should accept a string "),d("code",[o._v("cyp")]),o._v(" and a number "),d("code",[o._v("key")]),o._v(", and it should return the decrypted text.")]),o._v(" "),d("div",{staticClass:"custom-block tip"},[d("p",{staticClass:"custom-block-title"},[o._v("TIP")]),o._v(" "),d("p",[o._v("Use your decode function to find out the secret message from this cypher:")]),o._v(" "),d("div",{staticClass:"language- extra-class"},[d("pre",{pre:!0,attrs:{class:"language-text"}},[d("code",[o._v("y sekbt ru rekdt yd q dkjixubb qdt sekdj coiubv q aydw ev ydvydyju ifqsu\n")])])]),d("p",[o._v("Bonus points if you can determine the author of the quote!")])]),o._v(" "),d("h2",{attrs:{id:"frequency-analysis"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#frequency-analysis"}},[o._v("#")]),o._v(" Frequency analysis")]),o._v(" "),d("p",[o._v("What if we want to crack a Caesar shift, and we don't know the key? Frequency analysis can help us.")]),o._v(" "),d("p",[o._v("The "),d("strong",[o._v("relative frequency")]),o._v(" of a letter is the proportion of times it occurs in a given text. For example, in")]),o._v(" "),d("div",{staticClass:"language- extra-class"},[d("pre",{pre:!0,attrs:{class:"language-text"}},[d("code",[o._v("aaaabbbbbb\n")])])]),d("p",[o._v("the frequency of "),d("code",[o._v("a")]),o._v(" is "),d("code",[o._v("0.4")]),o._v(" and the frequency of "),d("code",[o._v("b")]),o._v(" is "),d("code",[o._v("0.6")]),o._v(".")]),o._v(" "),d("h3",{attrs:{id:"cracking-a-caesar"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#cracking-a-caesar"}},[o._v("#")]),o._v(" Cracking a Caesar")]),o._v(" "),d("p",[o._v("If we analyse a large sample of English, we can work out the relative frequency of letters in the English language. The most common letter in English is 'e'. The most common letter in the below Caesar cipher is the letter 'o'.")]),o._v(" "),d("div",{staticClass:"language- extra-class"},[d("pre",{pre:!0,attrs:{class:"language-text"}},[d("code",[o._v("Yxmo ezyx k wsnxsqrd nbokbi, grsvo S zyxnobon, goku kxn gokbi, Yfob wkxi k aeksxd kxn mebsyec fyvewo yp pybqyddox vybo— Grsvo S xynnon, xokbvi xkzzsxq, cennoxvi drobo mkwo k dkzzsxq, Kc yp cywo yxo qoxdvi bkzzsxq, bkzzsxq kd wi mrkwlob nyyb. “’Dsc cywo fscsdyb,” S weddobon, “dkzzsxq kd wi mrkwlob nyyb— Yxvi drsc kxn xydrsxq wybo.” Kr, nscdsxmdvi S bowowlob sd gkc sx dro lvoku Nomowlob; Kxn okmr cozkbkdo nisxq owlob gbyeqrd sdc qrycd ezyx dro pvyyb. Okqobvi S gscron dro wybbyg;—fksxvi S rkn cyeqrd dy lybbyg Pbyw wi lyyuc cebmokco yp cybbyg—cybbyg pyb dro vycd Voxybo— Pyb dro bkbo kxn bknskxd wksnox gryw dro kxqovc xkwo Voxybo— Xkwovocc robo pyb ofobwybo. Kxn dro csvuox, ckn, exmobdksx becdvsxq yp okmr zebzvo mebdksx Drbsvvon wo—psvvon wo gsdr pkxdkcdsm dobbybc xofob povd lopybo; Cy drkd xyg, dy cdsvv dro lokdsxq yp wi rokbd, S cdyyn bozokdsxq “’Dsc cywo fscsdyb oxdbokdsxq oxdbkxmo kd wi mrkwlob nyyb— Cywo vkdo fscsdyb oxdbokdsxq oxdbkxmo kd wi mrkwlob nyyb;— Drsc sd sc kxn xydrsxq wybo.” Zbocoxdvi wi cyev qbog cdbyxqob; rocsdkdsxq drox xy vyxqob, “Csb,” cksn S, “yb Wknkw, dbevi iyeb pybqsfoxocc S swzvybo; Led dro pkmd sc S gkc xkzzsxq, kxn cy qoxdvi iye mkwo bkzzsxq, Kxn cy pksxdvi iye mkwo dkzzsxq, dkzzsxq kd wi mrkwlob nyyb, Drkd S cmkbmo gkc cebo S rokbn iye”—robo S yzoxon gsno dro nyyb;— Nkbuxocc drobo kxn xydrsxq wybo. Nooz sxdy drkd nkbuxocc zoobsxq, vyxq S cdyyn drobo gyxnobsxq, pokbsxq, Nyeldsxq, nbokwsxq nbokwc xy wybdkv ofob nkbon dy nbokw lopybo; Led dro csvoxmo gkc exlbyuox, kxn dro cdsvvxocc qkfo xy dyuox, Kxn dro yxvi gybn drobo czyuox gkc dro grsczobon gybn, “Voxybo?” Drsc S grsczobon, kxn kx omry webwebon lkmu dro gybn, “Voxybo!”— Wobovi drsc kxn xydrsxq wybo. Lkmu sxdy dro mrkwlob debxsxq, kvv wi cyev gsdrsx wo lebxsxq, Cyyx kqksx S rokbn k dkzzsxq cywogrkd vyenob drkx lopybo. “Cebovi,” cksn S, “cebovi drkd sc cywodrsxq kd wi gsxnyg vkddsmo; Vod wo coo, drox, grkd drobokd sc, kxn drsc wicdobi ohzvybo— Vod wi rokbd lo cdsvv k wywoxd kxn drsc wicdobi ohzvybo;— ’Dsc dro gsxn kxn xydrsxq wybo!” Yzox robo S pvexq dro creddob, grox, gsdr wkxi k pvsbd kxn pveddob, Sx drobo cdozzon k cdkdovi Bkfox yp dro cksxdvi nkic yp iybo; Xyd dro vokcd ylosckxmo wkno ro; xyd k wsxedo cdyzzon yb cdkion ro; Led, gsdr wsox yp vybn yb vkni, zobmron klyfo wi mrkwlob nyyb— Zobmron ezyx k lecd yp Zkvvkc tecd klyfo wi mrkwlob nyyb— Zobmron, kxn ckd, kxn xydrsxq wybo. Drox drsc olyxi lsbn loqesvsxq wi ckn pkxmi sxdy cwsvsxq, Li dro qbkfo kxn cdobx nomybew yp dro myexdoxkxmo sd gybo, “Dryeqr dri mbocd lo crybx kxn crkfox, drye,” S cksn, “kbd cebo xy mbkfox, Qrkcdvi qbsw kxn kxmsoxd Bkfox gkxnobsxq pbyw dro Xsqrdvi crybo— Dovv wo grkd dri vybnvi xkwo sc yx dro Xsqrd’c Zvedyxskx crybo!” Aeydr dro Bkfox “Xofobwybo.” Wemr S wkbfovvon drsc exqksxvi pygv dy rokb nscmyebco cy zvksxvi, Dryeqr sdc kxcgob vsddvo wokxsxq—vsddvo bovofkxmi lybo; Pyb go mkxxyd rovz kqboosxq drkd xy vsfsxq rewkx losxq Ofob iod gkc lvoccon gsdr coosxq lsbn klyfo rsc mrkwlob nyyb— Lsbn yb lokcd ezyx dro cmevzdebon lecd klyfo rsc mrkwlob nyyb, Gsdr cemr xkwo kc “Xofobwybo.” Led dro Bkfox, csddsxq vyxovi yx dro zvkmsn lecd, czyuo yxvi Drkd yxo gybn, kc sp rsc cyev sx drkd yxo gybn ro nsn yedzyeb. Xydrsxq pkbdrob drox ro eddobon—xyd k pokdrob drox ro pveddobon— Dsvv S cmkbmovi wybo drkx weddobon “Ydrob pbsoxnc rkfo pvygx lopybo— Yx dro wybbyg ro gsvv vokfo wo, kc wi Ryzoc rkfo pvygx lopybo.” Drox dro lsbn cksn “Xofobwybo.” Cdkbdvon kd dro cdsvvxocc lbyuox li bozvi cy kzdvi czyuox, “Nyeldvocc,” cksn S, “grkd sd eddobc sc sdc yxvi cdymu kxn cdybo Mkeqrd pbyw cywo exrkzzi wkcdob gryw exwobmspev Nsckcdob Pyvvygon pkcd kxn pyvvygon pkcdob dsvv rsc cyxqc yxo lebnox lybo— Dsvv dro nsbqoc yp rsc Ryzo drkd wovkxmryvi lebnox lybo Yp ‘Xofob—xofobwybo’.” Led dro Bkfox cdsvv loqesvsxq kvv wi pkxmi sxdy cwsvsxq, Cdbksqrd S groovon k mecrsyxon cokd sx pbyxd yp lsbn, kxn lecd kxn nyyb; Drox, ezyx dro fovfod csxusxq, S lodyyu wicovp dy vsxusxq Pkxmi exdy pkxmi, drsxusxq grkd drsc ywsxyec lsbn yp iybo— Grkd drsc qbsw, exqksxvi, qrkcdvi, qkexd, kxn ywsxyec lsbn yp iybo Wokxd sx mbykusxq “Xofobwybo.” Drsc S ckd oxqkqon sx qeoccsxq, led xy civvklvo ohzboccsxq Dy dro pygv gryco psobi oioc xyg lebxon sxdy wi lycyw’c mybo; Drsc kxn wybo S ckd nsfsxsxq, gsdr wi rokn kd okco bomvsxsxq Yx dro mecrsyx’c fovfod vsxsxq drkd dro vkwz-vsqrd qvykdon y’ob, Led gryco fovfod-fsyvod vsxsxq gsdr dro vkwz-vsqrd qvykdsxq y’ob, Cro crkvv zbocc, kr, xofobwybo! Drox, wodryeqrd, dro ksb qbog noxcob, zobpewon pbyw kx excoox moxcob Cgexq li Cobkzrsw gryco pyyd-pkvvc dsxuvon yx dro depdon pvyyb. “Gbodmr,” S mbson, “dri Qyn rkdr voxd droo—li droco kxqovc ro rkdr coxd droo Boczsdo—boczsdo kxn xozoxdro pbyw dri wowybsoc yp Voxybo; Aekpp, yr aekpp drsc usxn xozoxdro kxn pybqod drsc vycd Voxybo!” Aeydr dro Bkfox “Xofobwybo.” “Zbyzrod!” cksn S, “drsxq yp ofsv!—zbyzrod cdsvv, sp lsbn yb nofsv!— Grodrob Dowzdob coxd, yb grodrob dowzocd dyccon droo robo kcrybo, Nocyvkdo iod kvv exnkexdon, yx drsc nocobd vkxn oxmrkxdon— Yx drsc rywo li Rybbyb rkexdon—dovv wo dbevi, S swzvybo— Sc drobo—sc drobo lkvw sx Qsvokn?—dovv wo—dovv wo, S swzvybo!” Aeydr dro Bkfox “Xofobwybo.” “Zbyzrod!” cksn S, “drsxq yp ofsv!—zbyzrod cdsvv, sp lsbn yb nofsv! Li drkd Rokfox drkd loxnc klyfo ec—li drkd Qyn go lydr knybo— Dovv drsc cyev gsdr cybbyg vknox sp, gsdrsx dro nscdkxd Ksnoxx, Sd crkvv mvkcz k cksxdon wksnox gryw dro kxqovc xkwo Voxybo— Mvkcz k bkbo kxn bknskxd wksnox gryw dro kxqovc xkwo Voxybo.” Aeydr dro Bkfox “Xofobwybo.” “Lo drkd gybn yeb csqx yp zkbdsxq, lsbn yb psoxn!” S crbsouon, ezcdkbdsxq— “Qod droo lkmu sxdy dro dowzocd kxn dro Xsqrd’c Zvedyxskx crybo! Vokfo xy lvkmu zvewo kc k dyuox yp drkd vso dri cyev rkdr czyuox! Vokfo wi vyxovsxocc exlbyuox!—aesd dro lecd klyfo wi nyyb! Dkuo dri loku pbyw yed wi rokbd, kxn dkuo dri pybw pbyw ypp wi nyyb!” Aeydr dro Bkfox “Xofobwybo.” Kxn dro Bkfox, xofob pvsddsxq, cdsvv sc csddsxq, cdsvv sc csddsxq Yx dro zkvvsn lecd yp Zkvvkc tecd klyfo wi mrkwlob nyyb; Kxn rsc oioc rkfo kvv dro coowsxq yp k nowyx’c drkd sc nbokwsxq, Kxn dro vkwz-vsqrd y’ob rsw cdbokwsxq drbygc rsc crknyg yx dro pvyyb; Kxn wi cyev pbyw yed drkd crknyg drkd vsoc pvykdsxq yx dro pvyyb Crkvv lo vspdon—xofobwybo!\n")])])]),d("p",[o._v("Thus, we could guess that the letter 'e' mapped to 'o' and, using this, we can work out the key!")]),o._v(" "),d("h3",{attrs:{id:"challenge-2"}},[d("a",{staticClass:"header-anchor",attrs:{href:"#challenge-2"}},[o._v("#")]),o._v(" Challenge")]),o._v(" "),d("p",[o._v("Check out the "),d("a",{attrs:{href:"https://github.com/si-mv/crypto-jamz",target:"_blank",rel:"noopener noreferrer"}},[o._v("repo"),d("OutboundLink")],1),o._v(" - in "),d("code",[o._v("challenges")]),o._v(" you will find "),d("code",[o._v("frequencies.js")]),o._v(".")]),o._v(" "),d("p",[o._v("Your first challenge is to write a program which calculates the frequencies of each letter in the English language using a large sample of Enlgish text.")]),o._v(" "),d("p",[o._v("It will help if you know a bit about "),d("a",{attrs:{href:"https://www.javascripttutorial.net/javascript-objects/",target:"_blank",rel:"noopener noreferrer"}},[o._v("objects in javascript"),d("OutboundLink")],1),o._v(".")])])}),[],!1,null,null,null);s.default=e.exports}}]);