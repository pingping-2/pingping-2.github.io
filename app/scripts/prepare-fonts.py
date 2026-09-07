"""Optional font preparation: pip install fonttools brotli; python scripts/prepare-fonts.py.

The readable Korean font is subsetted to the current UI; the original variable font
remains a fallback so new content displays correctly before regeneration.
"""
from pathlib import Path
from urllib.request import urlopen
from fontTools import subset

root = Path(__file__).resolve().parent.parent
font_dir = root / 'public' / 'fonts'
font_dir.mkdir(parents=True, exist_ok=True)
original = font_dir / 'Pretendard-full.woff2'
if not original.exists():
    original.write_bytes(urlopen('https://raw.githubusercontent.com/orioncactus/pretendard/v1.3.9/packages/pretendard/dist/web/variable/woff2/PretendardVariable.woff2').read())
characters = ''.join(chr(i) for i in range(32, 127)) + '→←↑↓↗©·—–…“”‘’×＋'
for source in (root / 'src').rglob('*'):
    if source.suffix in ('.tsx', '.ts', '.css'):
        characters += source.read_text(encoding='utf-8')
characters += (root / 'index.html').read_text(encoding='utf-8')
options = subset.Options()
options.flavor = 'woff2'
font = subset.load_font(str(original), options)
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=characters)
subsetter.subset(font)
subset.save_font(font, str(font_dir / 'Pretendard-subset.woff2'), options)
print(f'Font subset: {(font_dir / "Pretendard-subset.woff2").stat().st_size:,} bytes')
