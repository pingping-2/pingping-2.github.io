import { Icon } from './Icon'

const iconFiles: Record<string, string> = {
  react: 'react',
  typescript: 'typescript',
  vite: 'vite',
  vitejs: 'vite',
  spring: 'spring',
  java: 'java',
  mongodb: 'mongodb',
  fastapi: 'fastapi',
  fastap: 'fastapi',
  langchain: 'langchain',
  docker: 'docker',
  javascript: 'javascript',
  html: 'html',
  html5: 'html',
  python: 'python',
  postgresql: 'postgresql',
  figma: 'figma',
  vue: 'vuejs',
  vuejs: 'vuejs',
  'vue.js': 'vuejs',
  redis: 'redis',
  mariadb: 'mariadb',
  pandas: 'pandas',
  sqlalchemy: 'sqlalchemy',
  // A custom text monogram, not an official JPA brand mark.
  jpa: 'jpa',
}

/** Local brand assets; the adjacent technology label supplies accessible text. */
export function TechnologyIcon({
  name,
  size = 22,
  className,
}: {
  name: string
  size?: number
  className?: string
}) {
  const normalizedName = name.toLowerCase().trim()
  const brandName = normalizedName.split(/[\s+/(@]/)[0]
  const filename = iconFiles[normalizedName] ?? iconFiles[brandName]

  if (!filename) {
    return <Icon name="code" size={size} className={className} />
  }

  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}icons/${filename}.svg`}
      width={size}
      height={size}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      style={{ objectFit: 'contain', flexShrink: 0 }}
    />
  )
}
