# 최호림 포트폴리오

## [웹사이트 열기 → https://pingping-2.github.io](https://pingping-2.github.io/)

최호림의 자기소개, 사용 기술과 프로젝트를 소개하는 웹사이트입니다.

- Flowify — AI 워크플로우 자동화
- Experfolio — 포트폴리오 기반 인재 검색
- Carvery — 공공데이터 기반 차량 관리

React · TypeScript · Vite로 제작했으며 GitHub Pages로 제공합니다.

### 파일 구성

- 저장소 루트의 `index.html`, `assets/`, `images/`, `icons/`, `fonts/`: 배포 파일
- `app/src/`: 수정 가능한 소스
- `app/src/data/portfolio.ts`: 프로필·기술·프로젝트 내용
- `app/public/`: 원본 웹 이미지·폰트·아이콘과 라이선스

### 내용 수정 및 다시 게시

Node.js 22.12.0 이상에서 실행합니다.

```bash
cd app
npm ci
npm run build:pages
```

빌드한 파일은 저장소 루트에 반영됩니다. 변경 파일을 `main` 브랜치에 커밋하고 푸시하면 GitHub Pages가 게시합니다. Pages의 게시 소스는 `main` 브랜치의 루트(`/`)입니다.

개발 화면은 `app` 폴더에서 `npm run dev`로 실행합니다. 경험·학력과 연락처 영역은 코드를 유지한 채 숨겨져 있습니다.
