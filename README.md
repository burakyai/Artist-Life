# Artist Life

BitLife tarzı, Türkçe bir müzisyen hayat simülasyonu. Mahalleden stadyuma bir ömür.
Tek dosyalık HTML oyun: `index.html`.

**Oyna:** https://burakyai.github.io/Artist-Life/

Telefonda Safari'de aç ve "Ana Ekrana Ekle" de. Kayıtlar cihazın kendi hafızasında (localStorage) tutulur.
Oyunu bir kez internet varken açman yeterli; `sw.js` oyunu telefona kaydeder, sonra internetsiz de açılır.

Özellikler: 3 aylık ilerleme ve her 3 ayda 10 hak, rap/pop/arabesk/rock/türkü kariyerleri, şarkı yazma-kayıt-yayın hazırlığı, kapak ve kredi bilgileri, albümler, konser hazırlığı, dijital gelir paneli (Spotiplay, TubeX, Fizzy, Pear Music), haftalık listeler, altın/platin/elmas sertifikalar, ödül törenleri, plak şirketi pazarlığı ve avans mahsubu, master hakları satın alma, kendi plak şirketini kurma, arkadaşlar, sevgili ve aile, banka ve borsa, ev/araba/saat, sosyal medya hesapları, süperstar modu.

## Geliştirme

`index.html` derlenmiş oyundur. Kaynak kodlar `src/` klasöründe; değişiklikten sonra `cd src && python3 build.py && cp index.html ../index.html` ile yeniden derlenir. Karakter çizim motoru Mafia Life Simulator'dan gelir (`src/avatar-mafia.js`).
