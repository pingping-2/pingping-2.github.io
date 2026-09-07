import { chromium } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'chrome' })
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 1,
  })
  const font = (await readFile('public/fonts/Pretendard-subset.woff2')).toString('base64')
  await page.setContent(`<!doctype html><html lang="ko"><head><meta charset="utf-8"><style>
    @font-face{font-family:Pretendard;src:url(data:font/woff2;base64,${font});font-weight:100 900}
    *{box-sizing:border-box}body{margin:0;background:#f1f4f8;color:#183149;font-family:Pretendard,sans-serif}
    .card{width:1200px;height:630px;padding:60px 75px;position:relative;overflow:hidden;border-top:8px solid #3264d7}
    .logo{font-size:31px;font-weight:750;letter-spacing:-1px}.logo span{color:#3264d7}.label{font-size:12px;letter-spacing:3px;margin-top:60px;color:#3264d7}
    h1{font-size:61px;line-height:1.35;font-weight:750;letter-spacing:-2px;margin:24px 0}h1 span{color:#3264d7}
    .name{font-size:22px;margin-top:24px}.name span{font-size:19px;color:#667b90;margin-left:13px}.bottom{position:absolute;bottom:47px;left:75px;right:75px;border-top:1px solid #cad6e3;padding-top:20px;display:flex;justify-content:space-between;font-size:12px;color:#6d8297;letter-spacing:.5px}
    .art{position:absolute;top:186px;right:102px;width:226px;height:205px;transform:rotate(-31deg) skewX(26deg)}.layer{position:absolute;inset:0;border:1px solid #b9cbe3;border-radius:14px;box-shadow:-9px 11px 0 #b7c9e2;background:#dbe6f5}.two{transform:translate(32px,-38px);background:#a0bff0;box-shadow:-9px 11px 0 #789fda;border-color:#91b2e3}.three{transform:translate(64px,-76px);background:#4679cf;box-shadow:-9px 11px 0 #285baa;border-color:#6391dd}.layer:after{content:'';position:absolute;inset:18px;border:1px solid #ffffff55;border-radius:9px}
    .plus{position:absolute;right:73px;top:60px;color:#8da6c1;font-size:24px}
  </style></head><body><div class="card"><div class="logo">choihorim<span>.</span></div><div class="plus">+</div><div class="label">BACKEND DEVELOPER PORTFOLIO</div><h1>아이디어가 작동하는<br><span>구조를 만듭니다.</span></h1><div class="name">최호림<span>Java · Spring · AI Services</span></div><div class="art"><div class="layer"></div><div class="layer two"></div><div class="layer three"></div></div><div class="bottom"><span>FLOWIFY / EXPERFOLIO</span><span>github.com/pingping-2</span></div></div></body></html>`)
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: 'public/og-image.png' })
  const favicon = await readFile('public/favicon.svg', 'utf8')
  await page.setViewportSize({ width: 180, height: 180 })
  await page.setContent(
    `<html><body style="margin:0;background:#16334e">${favicon.replace('<svg ', '<svg width="180" height="180" ')}</body></html>`,
  )
  await page.screenshot({ path: 'public/apple-touch-icon.png' })
  console.log('Generated 1200×630 social image and 180×180 touch icon.')
} finally {
  await browser.close()
}
