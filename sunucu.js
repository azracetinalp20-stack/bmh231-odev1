
const http = require('http');
const dayjs = require('dayjs');

const PORT = 3000;

function gonder(res, durum, tur, icerik, ekBasliklar = {}) {
    res.writeHead(durum, {
        'Content-Type': `${tur}; charset=utf-8`,
        ...ekBasliklar,
    });
    res.end(icerik);
}

const sunucu = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    const yol = new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname;

    // GET dışındaki yöntemler -> 405
    if (req.method !== 'GET') {
        return gonder(res, 405, 'text/plain', 'Bu yöntem desteklenmiyor', { Allow: 'GET' });
    }

    if (yol === '/') {
        const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>BMH231 Ödev 1</title>
</head>
<body>
<h1>Hoş Geldiniz: BMH231</h1>
<p><a href="/hakkimda">Hakkımda</a></p>
</body>
</html>`;
        return gonder(res, 200, 'text/html', html);
    }

    if (yol === '/hakkimda') {
        const html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<title>Hakkımda</title>
</head>
<body>
<h1>Hakkımda</h1>
<p>Ben Azra Çetinalp, Yozgat Bozok Üniversitesi Bilgisayar Mühendisliği öğrencisiyim.</p>
<p>Web programlama dersinde Node.js ile HTTP sunucusu yazmayı öğreniyorum.</p>
<p><a href="/">Ana sayfa</a></p>
</body>
</html>`;
        return gonder(res, 200, 'text/html', html);
    }


    if (yol === '/api/ders') {
        const veri = {
            kod: 'BMH231',
            ad: 'Web Programlama',
            gun: 'Perşembe',
        };
        return gonder(res, 200, 'application/json', JSON.stringify(veri));
    }

    if (yol === '/api/agep') {
        const sonTeslim = dayjs('2026-11-01');
        const bugun = dayjs().startOf('day');
        const veri = {
            etkinlik: 'AGEP son teslim',
            sonTeslim: sonTeslim.format('DD.MM.YYYY'),
            bugun: bugun.format('DD.MM.YYYY'),
            kalanGun: sonTeslim.diff(bugun, 'day'),
        };
        return gonder(res, 200, 'application/json', JSON.stringify(veri));
    }

    // Diğer tüm yollar -> 404
    gonder(res, 404, 'text/plain', 'Sayfa bulunamadı');
});

sunucu.listen(PORT, () => {
    console.log(`Sunucu çalışıyor: http://localhost:${PORT}`);
});