NEMES-X Miner v0.2.0 — CLI Madenci (Linux, testnet)
====================================================

Paket: nemes-miner-v0.2.0-linux.zip
  - nemes-miner : komut satiri madenci (gercek istemci)
  - KURULUM.txt : hizli kurulum (4 adim)
Butunluk: SHA256SUMS dosyasindaki degerlerle karsilastir
(`sha256sum -c SHA256SUMS` hepsi OK demeli).
Imza: SHA256SUMS.sig, asagidaki anahtarla `nemes-release` adina imzali.
Dogrulama:
  allowed_signers dosyasina su satiri yaz:
    nemes-release namespaces="nemes-release" ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAII2ZSmAlX1jWRGU19ME4A8H+cI0LbfNye+tNUVT9tDVx
  ssh-keygen -Y verify -f allowed_signers -I nemes-release \
    -n nemes-release -s SHA256SUMS.sig < SHA256SUMS
  ("Good signature" demeli; demiyorsa KURMA, e-postayla bildir.)

Hizli baslangic (ayrinti KURULUM.txt'de):
  1. Kayit ol, token al.
  2. Gomme ucunu hazirla (yerel llama-server + nomic-embed-text-v1.5).
  3. ./nemes-miner mine --simple --komuta https://komuta.nemes-x.space \
       --token TOKEN --embed-api http://127.0.0.1:1251 --kira

Gereksinim (katmanli, 19 Eyl karari):
  Compute (gomme+denetim): 8GB RAM, GTX 1060 6GB+, 50GB bos SSD, 5 Mbps.
  Full (egitim+federasyon-haklari): 8GB+ VRAM, 16GB RAM, 100GB bos SSD.
  Katman, beyanla degil dogrulanmis-ciktiyla belirlenir.
Masaustu uygulamasi (tek-tik) ayrica duyurulacak.

Sorular? nemes-x.space@zohomail.eu
https://nemes-x.space — The Sovereign Brain
