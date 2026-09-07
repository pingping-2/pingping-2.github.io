import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { cp } from 'node:fs/promises'
import { build } from 'vite'

const appDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const repositoryDirectory = resolve(appDirectory, '..')
process.chdir(appDirectory)
process.env.VITE_SITE_URL = 'https://pingping-2.github.io/'
process.env.VITE_BASE_PATH = '/'
await build()
await import('./prerender.mjs')
await cp(resolve(appDirectory, 'dist'), repositoryDirectory, { recursive: true })
console.log('Updated the GitHub Pages files in the repository root.')
