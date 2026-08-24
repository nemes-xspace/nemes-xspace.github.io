# BEYİN ANAYASASI
**Sürüm 1.0 — 2026-08-24 · Yürürlük: derhal · Yetkili: d3str0y1ng**

Beyin sistemi (parse → embed → int8 → SQLite → faiss PQ → RAG) bu anayasaya tabidir.
İhlal edilen aşama durdurulur, ihlal `sira.log`'a işlenir; karar yetkisi yalnızca kullanıcıdadır.

## MADDE 1 — TEK KOMUTA
Tüm aşama geçişleri yalnızca `beyin_komutan.py` üzerinden yapılır. Serbest elle aşama
başlatma/durdurma yasaktır. Komutan dışı hiçbir script `sira_*.done` damgası yazamaz.

## MADDE 2 — SIRA DEĞİŞMEZLİĞİ
Aşamalar sabit KOMUTA TABLOSU'nda tanımlıdır. Sistem kendi başına sıra değiştirmez,
aşama atlamaz, yeni iş uydurmaz. Tablo yalnızca kullanıcının açık onayıyla değişir.

## MADDE 3 — DONE DAMGASI
Bir aşama yalnızca doğrulanmış çıktıyla `sira_<ad>.done` alır. Damgasız aşama,
yeniden başlangıçta kaldığı yerden devam eder (resume).

## MADDE 4 — DOĞRULAMA ZORUNLULUĞU
Merge sonrası sayım eşleşmesi, faiss sonrası örnek sorgu yapılmadan sonraki aşama
başlamaz. Doğrulama komutanın zorunlu adımıdır.

## MADDE 5 — SİLME YASAĞI / ARŞİV POLİTİKASI
**Hiçbir dosya silinmez.** Geçici ara dosyalar (shard, emb parça DB), ilgili faiss
indeksi doğrulanıktan sonra `/beyin_arsiv/` altına (diğer disk, NVMe) taşınır;
gerektiğinde sıkıştırılır ve eski yerine geri konabilir. Ham kaynaklar (cc_en.txt vb.)
asla taşınmaz/silinmeden kalır.

## MADDE 6 — KAYNAK DISİPLİNİ
Eşzamanlı embed isteği güvenli sınırı (≤12) aşamaz. MemoryMax unit dışından değiştirilemez.
Boş disk <40GB iken yeni embed aşaması BAŞLAMAZ; komutan rapor verir ve bekler.

## MADDE 7 — İZ BIRAKMA
Her işlem append-only loglara yazılır (`sira.log`, `bekci.log`, `faiss.log`,
`komutan.log`). Log'suz işlem geçersiz sayılır.

## MADDE 8 — KENDİNİ DURDURMA YASAĞI
Sistem sağlıksız işi durdurmaz; RAPOR eder. Bekçi (`embed_bekci.sh`) yalnızca
*kurtarma* (server restart) yetkilidir; iptal/kaldırma yetkisi yoktur.

## MADDE 9 — TEK NEFES KURALI
Embed her an yalnızca TEK korpus üzerinde çalışır. Paralel korpus embed'i yasaktır.

## MADDE 10 — REBOOT DAYANIKLILIĞI
Tüm uzun işler kalıcı systemd unit'lerinde koşar; kesintiden sonra resume ile kaldığı
yerden devam eder. setsid/nohup ile unit dışı uzun süreç başlatılmaz.

## MADDE 11 — DURUM ŞEFFAFLIĞI
`beyin_komutan.py durum` her an tam durumu verir: aktif aşama, hız, tahmini bitiş,
disk, ısı, sunucu sağlık.

## MADDE 12 — DEĞİŞİKLİK USULÜ
Bu anayasa yalnızca kullanıcının açık onayıyla değişir; her değişiklik sürüm numarası
ile kaydedilir. Sistemin kendisi anayasayı değiştiremez.
