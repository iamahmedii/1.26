import json, sys
from collections import Counter
from wordfreq import zipf_frequency as zf

levels = json.load(open("/tmp/lv.json"))
vocab = [w.upper() for w in json.load(open("/tmp/vocab.json"))
         if w.isalpha() and 3 <= len(w) <= 7]
vocab = sorted(set(vocab))

# precompute letter counters + commonness
VC = {w: Counter(w) for w in vocab}
VZ = {w: zf(w.lower(), "en") for w in vocab}

def subwords(letters):
    lc = Counter(letters)
    ls = set(letters)
    out = []
    for w in vocab:
        if len(w) > len(letters): continue
        if not set(w) <= ls: continue
        wc = VC[w]
        if all(lc[ch] >= n for ch, n in wc.items()):
            out.append(w)
    return out

use = Counter()          # global usage per word
seen_sets = set()        # dedupe answer sets
out = []
no_head = 0
stat_pool = []

for lv in levels:
    letters = lv["letters"].upper()
    head = lv["name"].upper()
    cands = subwords(letters)
    pool = [w for w in cands if w != head]
    if head not in cands:
        no_head += 1
    # score: prefer common words, strongly penalize global reuse
    def score(w):
        return VZ.get(w, 0) - 1.25 * use[w] - (0.35 if len(w) == 3 else 0)
    pool.sort(key=score, reverse=True)
    target = min(3 + (1 if len(letters) >= 5 else 0) + (1 if len(letters) >= 6 else 0), len(pool))
    # pick answers, retrying to keep the set unique
    answers = None
    for skip in range(0, max(1, len(pool) - target + 1)):
        pick = pool[skip:skip + target]
        cand = tuple(sorted([head] + pick))
        if cand not in seen_sets:
            answers = [head] + pick
            seen_sets.add(cand)
            break
    if answers is None:
        answers = [head] + pool[:target]
        seen_sets.add(tuple(sorted(answers)))
    for w in answers:
        use[w] += 1
    bonus = [w for w in pool if w not in answers][:8]
    stat_pool.append(len(answers))
    out.append({"id": lv["id"], "name": lv["name"], "letters": lv["letters"],
                "answers": answers, "bonus": bonus})

json.dump(out, open("/tmp/lv_new.json", "w"))

# report
sets2 = Counter(tuple(sorted(l["answers"])) for l in out)
dup = sum(v - 1 for v in sets2.values() if v > 1)
wc = Counter(w for l in out for w in l["answers"])
top = wc.most_common(12)
print("levels:", len(out), "| headline missing from defs:", no_head)
print("identical answer-sets now:", dup)
print("max reuse now:", top)
print("distinct words used:", len(wc))
print("avg answers/level:", round(sum(stat_pool)/len(stat_pool), 2))
