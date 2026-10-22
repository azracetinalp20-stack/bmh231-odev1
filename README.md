# BMH231 Ödev 1

Node.js `http` modülü ve `dayjs` paketiyle yazılmış küçük bir web sunucusu.
Yozgat Bozok Üniversitesi, BMH231 Web Programlama dersi Ödev 1 için hazırlanmıştır.

## Kurulum ve Çalıştırma

Node.js (LTS) ve Git kurulu olmalıdır.

```bash
git clone https://github.com/azracetinalp20-stack/bmh231-odev1.git
cd bmh231-odev1
npm install
npm start
```

Sunucu `http://localhost:3000` adresinde çalışır. Durdurmak için `Ctrl+C`.

## Desteklenen Yollar

| Yol | Durum | Yanıt |
|-----|-------|-------|
| `/` | 200 | Ana sayfa (HTML) |
| `/hakkimda` | 200 | Tanıtım sayfası (HTML) |
| `/api/ders` | 200 | Ders kodu, adı ve günü (JSON) |
| `/api/agep` | 200 | AGEP son teslim tarihi ve kalan gün sayısı (JSON) |
| diğer tüm yollar | 404 | "Sayfa bulunamadı" (düz metin) |
| GET dışındaki yöntemler | 405 | `Allow: GET` başlığıyla düz metin |

## Örnek

```bash
curl -i http://localhost:3000/api/agep
```