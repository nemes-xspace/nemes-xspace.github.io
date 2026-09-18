#!/usr/bin/env python3
"""i18n anahtar denkligi (CI): 8 dilde anahtar kumeleri birebir esit olmali.
Eksik anahtar = ilgili dilde sessizce Ingilizce'ye dusme = kullaniciya
yanlis/eksik metin. Cikis: 0 temiz, 1 bozuk.
Kullanim: python3 scripts/check-i18n.py [assets/i18n]
"""
import glob
import json
import os
import sys


def duzlestir(d, oneK=""):
    cikti = {}
    for k, v in d.items():
        yol = "%s.%s" % (oneK, k) if oneK else k
        if isinstance(v, dict):
            cikti.update(duzlestir(v, yol))
        else:
            cikti[yol] = 1
    return cikti


def ana():
    dizin = sys.argv[1] if len(sys.argv) > 1 else os.path.join(
        os.path.dirname(os.path.abspath(__file__)), "..", "assets", "i18n")
    dosyalar = sorted(glob.glob(os.path.join(dizin, "*.json")))
    if not dosyalar:
        print("hata: JSON bulunamadi: %s" % dizin)
        return 1
    kumeler = {}
    for f in dosyalar:
        dil = os.path.basename(f)[:2]
        try:
            kumeler[dil] = set(duzlestir(json.load(open(f, encoding="utf-8"))))
        except Exception as e:
            print("BOZUK JSON %s: %s" % (dil, e))
            return 1
    baz_dil = "en" if "en" in kumeler else sorted(kumeler)[0]
    baz = kumeler[baz_dil]
    print("%s: %d anahtar (baz)" % (baz_dil, len(baz)))
    bozuk = False
    for dil in sorted(kumeler):
        if dil == baz_dil:
            continue
        eksik = sorted(baz - kumeler[dil])
        fazla = sorted(kumeler[dil] - baz)
        print("%s: eksik=%d fazla=%d" % (dil, len(eksik), len(fazla)))
        for k in eksik[:10]:
            print("  EKSIK %s: %s" % (dil, k))
        for k in fazla[:10]:
            print("  FAZLA %s: %s" % (dil, k))
        if eksik or fazla:
            bozuk = True
    print("SONUC: %s" % ("BOZUK" if bozuk else "TEMIZ"))
    return 1 if bozuk else 0


if __name__ == "__main__":
    sys.exit(ana())
