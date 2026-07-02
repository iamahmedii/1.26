import json, sys
from wordfreq import zipf_frequency as zf

lang = sys.argv[1]          # 'en' or 'ar'
src  = sys.argv[2]          # input json
dst  = sys.argv[3]          # output json

levels = json.load(open(src, encoding="utf-8"))

# cache zipf lookups
_cache = {}
def z(w):
    w = w.lower()
    if w not in _cache:
        _cache[w] = zf(w, lang)   # 0 (unknown/rare) .. ~7.x (very common)
    return _cache[w]

def score(lv):
    letters = lv["letters"]
    rack = len(letters)
    anchor = z(letters)                     # the full headline word
    ans = lv.get("answers", []) or [letters]
    zs = [z(a) for a in ans]
    avg = sum(zs) / len(zs)
    mn  = min(zs)                            # rarest REQUIRED word
    easier = 0.5 * anchor + 0.3 * avg + 0.2 * mn   # higher = easier
    # rack length stays the dominant ramp (coeff 0.12 * max~8 < 1),
    # commonness orders levels within / across the length tiers smoothly
    return rack - 0.12 * easier

ordered = sorted(levels, key=score)
for i, lv in enumerate(ordered):
    lv["id"] = i + 1

json.dump(ordered, open(dst, "w", encoding="utf-8"), ensure_ascii=False, separators=(",", ":"))

# report the curve
def blk(a, b):
    seg = ordered[a:b]
    arl = sum(len(l["letters"]) for l in seg) / len(seg)
    azf = sum(z(l["letters"]) for l in seg) / len(seg)
    return f"{a+1}-{a+len(seg)}: avg rack {arl:.2f}, avg commonness {azf:.2f}"

n = len(ordered)
step = max(1, n // 10)
for i in range(0, n, step):
    print(blk(i, i + step))
print("first 12:", [l["letters"] for l in ordered[:12]])
print("last 12 :", [l["letters"] for l in ordered[-12:]])
