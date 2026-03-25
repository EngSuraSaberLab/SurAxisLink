from pathlib import Path

s = Path("project/locale/ar/LC_MESSAGES/django.po").read_text(encoding="utf-8")
count = sum(1 for ch in s if "\u0600" <= ch <= "\u06FF")
print("arabic_chars", count)
for line in s.splitlines():
    if line.startswith("msgstr ") and any("\u0600" <= c <= "\u06FF" for c in line):
        print(line)
        break
