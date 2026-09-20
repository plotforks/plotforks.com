"""One-off generator for the search-result / home-screen icons. Run it only when the logo changes:

    node tools/build.js --no-images     (writes dist/favicon.svg, the square logo)
    python tools/make-icons.py

It renders dist/favicon.svg at 512 px in headless Edge with a transparent background, then shrinks it with Pillow into
assets/icons/: favicon.ico (16, 32, 48 inside), icon-48.png, icon-96.png, icon-192.png, apple-touch-icon.png (180).
build.js copies them to the site root. They are committed, so a normal build needs neither Python nor Pillow.

Google's rule for the icon shown next to a result: square, a multiple of 48 px, crawlable, and it still requests
/favicon.ico. See https://developers.google.com/search/docs/appearance/favicon-in-search
"""
import os
import subprocess
import sys
import tempfile
import time

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SVG = os.path.join(ROOT, 'dist', 'favicon.svg')
OUT = os.path.join(ROOT, 'assets', 'icons')
EDGE = next((p for p in (r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
                         r'C:\Program Files\Microsoft\Edge\Application\msedge.exe') if os.path.exists(p)), None)
if not EDGE:
    sys.exit('Edge not found')
if not os.path.exists(SVG):
    sys.exit('dist/favicon.svg missing: run node tools/build.js first')

os.makedirs(OUT, exist_ok=True)
work = tempfile.mkdtemp(prefix='pf-icons-')
page = os.path.join(work, 'i.html')
big = os.path.join(work, 'big.png')
with open(page, 'w', encoding='utf-8') as f:
    f.write('<!doctype html><meta charset="utf-8"><body style="margin:0;background:transparent">'
            '<img src="file:///%s" width="512" height="512" style="display:block"></body>' % SVG.replace(os.sep, '/'))

profile = os.path.join(work, 'profile')
subprocess.run([EDGE, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
                '--user-data-dir=' + profile, '--default-background-color=00000000',
                '--screenshot=' + big, '--window-size=512,512', '--virtual-time-budget=3000',
                'file:///' + page.replace(os.sep, '/')],
               stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=90)
subprocess.run(['taskkill', '/F', '/IM', 'msedge.exe'], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
time.sleep(1)

im = Image.open(big).convert('RGBA')
if im.size != (512, 512):
    sys.exit('unexpected render size %s' % (im.size,))
corner = im.getpixel((2, 2))
print('render ok, corner pixel (should be transparent):', corner)


def save(size, name):
    im.resize((size, size), Image.LANCZOS).save(os.path.join(OUT, name), optimize=True)
    print('wrote', name, size)


save(48, 'icon-48.png')
save(96, 'icon-96.png')
save(192, 'icon-192.png')
save(180, 'apple-touch-icon.png')
im.save(os.path.join(OUT, 'favicon.ico'), sizes=[(16, 16), (32, 32), (48, 48)])
print('wrote favicon.ico (16, 32, 48)')
