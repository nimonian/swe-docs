# Cryptography

Cryptography is the art of hiding information in such a way that it can only be retrieved by the intended audience. There are many, many different cryptography strategies. One of the oldest ones was used by Julius Caesar and is know as the *Caesar shift cypher*.

## Caesar shift

There is a convention in cryptography that the original text is lowercase, and the cyphertext is uppercase. Here is an example of a Caesar shifted message:

```js
const msg = 'hello this is a secret message'
const cyp = 'MJQQT YMNX NX F XJHWJY RJXXFLJ'
```

The cypher is produced by taking the alphabet and rotating it (shifting it) by 5 characters. In this case, the key is 5, but you can use any key. After rotating by 5, the alphabet looks like this:
```js
'abcdefghijklmnopqrstuvwxyz'
'FGHIJKLMNOPQRSTUVWXYZABCDE'
```
so `a` becomes `F` and `b` becomes `G` and so on. In order to decode the text, we need to figure out what the key is, and undo the rotation.

### Challenge

Fork the repo [here](https://github.com/si-mv/crypto-jamz).

Create two functions: `caesarEncode` and `caesarDecode`.

`caesarEncode` should accept two parameters: a string `msg` and a number `key`, and it should return the encrypted text.

`caesarDecode` should do the opposite: it should accept a string `cyp` and a number `key`, and it should return the decrypted text.

::: tip
Use your decode function to find out the secret message from this cypher:
```
y sekbt ru rekdt yd q dkjixubb qdt sekdj coiubv q aydw ev ydvydyju ifqsu
```
Bonus points if you can determine the author of the quote!
:::

## Frequency analysis

What if we want to crack a Caesar shift, and we don't know the key? Frequency analysis can help us.

The **relative frequency** of a letter is the proportion of times it occurs in a given text. For example, in
```
aaaabbbbbb
```
the frequency of `a` is `0.4` and the frequency of `b` is `0.6`.

### Cracking a Caesar

If we analyse a large sample of English, we can work out the relative frequency of letters in the English language. The most common letter in English is 'e'. The most common letter in the below Caesar cipher is the letter 'o'.

```
Yxmo ezyx k wsnxsqrd nbokbi, grsvo S zyxnobon, goku kxn gokbi, Yfob wkxi k aeksxd kxn mebsyec fyvewo yp pybqyddox vybo— Grsvo S xynnon, xokbvi xkzzsxq, cennoxvi drobo mkwo k dkzzsxq, Kc yp cywo yxo qoxdvi bkzzsxq, bkzzsxq kd wi mrkwlob nyyb. “’Dsc cywo fscsdyb,” S weddobon, “dkzzsxq kd wi mrkwlob nyyb— Yxvi drsc kxn xydrsxq wybo.” Kr, nscdsxmdvi S bowowlob sd gkc sx dro lvoku Nomowlob; Kxn okmr cozkbkdo nisxq owlob gbyeqrd sdc qrycd ezyx dro pvyyb. Okqobvi S gscron dro wybbyg;—fksxvi S rkn cyeqrd dy lybbyg Pbyw wi lyyuc cebmokco yp cybbyg—cybbyg pyb dro vycd Voxybo— Pyb dro bkbo kxn bknskxd wksnox gryw dro kxqovc xkwo Voxybo— Xkwovocc robo pyb ofobwybo. Kxn dro csvuox, ckn, exmobdksx becdvsxq yp okmr zebzvo mebdksx Drbsvvon wo—psvvon wo gsdr pkxdkcdsm dobbybc xofob povd lopybo; Cy drkd xyg, dy cdsvv dro lokdsxq yp wi rokbd, S cdyyn bozokdsxq “’Dsc cywo fscsdyb oxdbokdsxq oxdbkxmo kd wi mrkwlob nyyb— Cywo vkdo fscsdyb oxdbokdsxq oxdbkxmo kd wi mrkwlob nyyb;— Drsc sd sc kxn xydrsxq wybo.” Zbocoxdvi wi cyev qbog cdbyxqob; rocsdkdsxq drox xy vyxqob, “Csb,” cksn S, “yb Wknkw, dbevi iyeb pybqsfoxocc S swzvybo; Led dro pkmd sc S gkc xkzzsxq, kxn cy qoxdvi iye mkwo bkzzsxq, Kxn cy pksxdvi iye mkwo dkzzsxq, dkzzsxq kd wi mrkwlob nyyb, Drkd S cmkbmo gkc cebo S rokbn iye”—robo S yzoxon gsno dro nyyb;— Nkbuxocc drobo kxn xydrsxq wybo. Nooz sxdy drkd nkbuxocc zoobsxq, vyxq S cdyyn drobo gyxnobsxq, pokbsxq, Nyeldsxq, nbokwsxq nbokwc xy wybdkv ofob nkbon dy nbokw lopybo; Led dro csvoxmo gkc exlbyuox, kxn dro cdsvvxocc qkfo xy dyuox, Kxn dro yxvi gybn drobo czyuox gkc dro grsczobon gybn, “Voxybo?” Drsc S grsczobon, kxn kx omry webwebon lkmu dro gybn, “Voxybo!”— Wobovi drsc kxn xydrsxq wybo. Lkmu sxdy dro mrkwlob debxsxq, kvv wi cyev gsdrsx wo lebxsxq, Cyyx kqksx S rokbn k dkzzsxq cywogrkd vyenob drkx lopybo. “Cebovi,” cksn S, “cebovi drkd sc cywodrsxq kd wi gsxnyg vkddsmo; Vod wo coo, drox, grkd drobokd sc, kxn drsc wicdobi ohzvybo— Vod wi rokbd lo cdsvv k wywoxd kxn drsc wicdobi ohzvybo;— ’Dsc dro gsxn kxn xydrsxq wybo!” Yzox robo S pvexq dro creddob, grox, gsdr wkxi k pvsbd kxn pveddob, Sx drobo cdozzon k cdkdovi Bkfox yp dro cksxdvi nkic yp iybo; Xyd dro vokcd ylosckxmo wkno ro; xyd k wsxedo cdyzzon yb cdkion ro; Led, gsdr wsox yp vybn yb vkni, zobmron klyfo wi mrkwlob nyyb— Zobmron ezyx k lecd yp Zkvvkc tecd klyfo wi mrkwlob nyyb— Zobmron, kxn ckd, kxn xydrsxq wybo. Drox drsc olyxi lsbn loqesvsxq wi ckn pkxmi sxdy cwsvsxq, Li dro qbkfo kxn cdobx nomybew yp dro myexdoxkxmo sd gybo, “Dryeqr dri mbocd lo crybx kxn crkfox, drye,” S cksn, “kbd cebo xy mbkfox, Qrkcdvi qbsw kxn kxmsoxd Bkfox gkxnobsxq pbyw dro Xsqrdvi crybo— Dovv wo grkd dri vybnvi xkwo sc yx dro Xsqrd’c Zvedyxskx crybo!” Aeydr dro Bkfox “Xofobwybo.” Wemr S wkbfovvon drsc exqksxvi pygv dy rokb nscmyebco cy zvksxvi, Dryeqr sdc kxcgob vsddvo wokxsxq—vsddvo bovofkxmi lybo; Pyb go mkxxyd rovz kqboosxq drkd xy vsfsxq rewkx losxq Ofob iod gkc lvoccon gsdr coosxq lsbn klyfo rsc mrkwlob nyyb— Lsbn yb lokcd ezyx dro cmevzdebon lecd klyfo rsc mrkwlob nyyb, Gsdr cemr xkwo kc “Xofobwybo.” Led dro Bkfox, csddsxq vyxovi yx dro zvkmsn lecd, czyuo yxvi Drkd yxo gybn, kc sp rsc cyev sx drkd yxo gybn ro nsn yedzyeb. Xydrsxq pkbdrob drox ro eddobon—xyd k pokdrob drox ro pveddobon— Dsvv S cmkbmovi wybo drkx weddobon “Ydrob pbsoxnc rkfo pvygx lopybo— Yx dro wybbyg ro gsvv vokfo wo, kc wi Ryzoc rkfo pvygx lopybo.” Drox dro lsbn cksn “Xofobwybo.” Cdkbdvon kd dro cdsvvxocc lbyuox li bozvi cy kzdvi czyuox, “Nyeldvocc,” cksn S, “grkd sd eddobc sc sdc yxvi cdymu kxn cdybo Mkeqrd pbyw cywo exrkzzi wkcdob gryw exwobmspev Nsckcdob Pyvvygon pkcd kxn pyvvygon pkcdob dsvv rsc cyxqc yxo lebnox lybo— Dsvv dro nsbqoc yp rsc Ryzo drkd wovkxmryvi lebnox lybo Yp ‘Xofob—xofobwybo’.” Led dro Bkfox cdsvv loqesvsxq kvv wi pkxmi sxdy cwsvsxq, Cdbksqrd S groovon k mecrsyxon cokd sx pbyxd yp lsbn, kxn lecd kxn nyyb; Drox, ezyx dro fovfod csxusxq, S lodyyu wicovp dy vsxusxq Pkxmi exdy pkxmi, drsxusxq grkd drsc ywsxyec lsbn yp iybo— Grkd drsc qbsw, exqksxvi, qrkcdvi, qkexd, kxn ywsxyec lsbn yp iybo Wokxd sx mbykusxq “Xofobwybo.” Drsc S ckd oxqkqon sx qeoccsxq, led xy civvklvo ohzboccsxq Dy dro pygv gryco psobi oioc xyg lebxon sxdy wi lycyw’c mybo; Drsc kxn wybo S ckd nsfsxsxq, gsdr wi rokn kd okco bomvsxsxq Yx dro mecrsyx’c fovfod vsxsxq drkd dro vkwz-vsqrd qvykdon y’ob, Led gryco fovfod-fsyvod vsxsxq gsdr dro vkwz-vsqrd qvykdsxq y’ob, Cro crkvv zbocc, kr, xofobwybo! Drox, wodryeqrd, dro ksb qbog noxcob, zobpewon pbyw kx excoox moxcob Cgexq li Cobkzrsw gryco pyyd-pkvvc dsxuvon yx dro depdon pvyyb. “Gbodmr,” S mbson, “dri Qyn rkdr voxd droo—li droco kxqovc ro rkdr coxd droo Boczsdo—boczsdo kxn xozoxdro pbyw dri wowybsoc yp Voxybo; Aekpp, yr aekpp drsc usxn xozoxdro kxn pybqod drsc vycd Voxybo!” Aeydr dro Bkfox “Xofobwybo.” “Zbyzrod!” cksn S, “drsxq yp ofsv!—zbyzrod cdsvv, sp lsbn yb nofsv!— Grodrob Dowzdob coxd, yb grodrob dowzocd dyccon droo robo kcrybo, Nocyvkdo iod kvv exnkexdon, yx drsc nocobd vkxn oxmrkxdon— Yx drsc rywo li Rybbyb rkexdon—dovv wo dbevi, S swzvybo— Sc drobo—sc drobo lkvw sx Qsvokn?—dovv wo—dovv wo, S swzvybo!” Aeydr dro Bkfox “Xofobwybo.” “Zbyzrod!” cksn S, “drsxq yp ofsv!—zbyzrod cdsvv, sp lsbn yb nofsv! Li drkd Rokfox drkd loxnc klyfo ec—li drkd Qyn go lydr knybo— Dovv drsc cyev gsdr cybbyg vknox sp, gsdrsx dro nscdkxd Ksnoxx, Sd crkvv mvkcz k cksxdon wksnox gryw dro kxqovc xkwo Voxybo— Mvkcz k bkbo kxn bknskxd wksnox gryw dro kxqovc xkwo Voxybo.” Aeydr dro Bkfox “Xofobwybo.” “Lo drkd gybn yeb csqx yp zkbdsxq, lsbn yb psoxn!” S crbsouon, ezcdkbdsxq— “Qod droo lkmu sxdy dro dowzocd kxn dro Xsqrd’c Zvedyxskx crybo! Vokfo xy lvkmu zvewo kc k dyuox yp drkd vso dri cyev rkdr czyuox! Vokfo wi vyxovsxocc exlbyuox!—aesd dro lecd klyfo wi nyyb! Dkuo dri loku pbyw yed wi rokbd, kxn dkuo dri pybw pbyw ypp wi nyyb!” Aeydr dro Bkfox “Xofobwybo.” Kxn dro Bkfox, xofob pvsddsxq, cdsvv sc csddsxq, cdsvv sc csddsxq Yx dro zkvvsn lecd yp Zkvvkc tecd klyfo wi mrkwlob nyyb; Kxn rsc oioc rkfo kvv dro coowsxq yp k nowyx’c drkd sc nbokwsxq, Kxn dro vkwz-vsqrd y’ob rsw cdbokwsxq drbygc rsc crknyg yx dro pvyyb; Kxn wi cyev pbyw yed drkd crknyg drkd vsoc pvykdsxq yx dro pvyyb Crkvv lo vspdon—xofobwybo!
```

Thus, we could guess that the letter 'e' mapped to 'o' and, using this, we can work out the key!

### Challenge

Check out the [repo](https://github.com/si-mv/crypto-jamz) - in `challenges` you will find `frequencies.js`.

Your first challenge is to write a program which calculates the frequencies of each letter in the English language using a large sample of Enlgish text.

It will help if you know a bit about [objects in javascript](https://www.javascripttutorial.net/javascript-objects/).
