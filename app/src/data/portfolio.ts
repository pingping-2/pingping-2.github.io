export interface CaseStudyImage {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export interface ProjectCaseStudy {
  publicData?: {
    title: string
    description: string
    datasets: {
      category: string
      name: string
      description: string
      size: string
      updateCycle: string
      provider: string
      attributes: string[]
      href: string
    }[]
    note: string
    processing: {
      title: string
      description: string
      steps: { title: string; description: string }[]
      columns: { name: string; purpose: string }[]
      image?: CaseStudyImage
    }
    integrations: { name: string; source: string; description: string }[]
  }
  contributionScope?: 'team'
  overview: {
    headline: string
    audience: string
    problems: { title: string; description: string }[]
    objective: string
    flow: string[]
    goalsTitle: string
    goals: { title: string; description: string }[]
  }
  contributionIntro: string
  implementationChallengeTitle: string
  implementationChallenge: string
  contributionFlow: string[]
  architecture: {
    title: string
    summary: string
    layers: { name: string; technology: string; description: string }[]
    image?: CaseStudyImage
  }
  result: { title: string; flow: string[]; journeyStepId: string }
  journeyIntro: { title: string; description: string }
  journey: {
    id: string
    title: string
    description: string
    images: CaseStudyImage[]
  }[]
  technicalContributions: { title: string; description: string }[]
  reflection: string
  improvements: string[]
  technologyGroups: { title: string; items: { name: string; purpose: string }[] }[]
  evolution?: {
    title: string
    description: string
    stages: {
      id: string
      title: string
      problem: string
      change: string
      outcome: string
      images: CaseStudyImage[]
    }[]
    evaluation: {
      title: string
      description: string
      metrics: { name: string; before: number; after: number }[]
      note: string
      image?: CaseStudyImage
    }
  }
}

export interface Project {
  id: string
  number: string
  title: string
  subtitle: string
  category: string
  period?: string
  year?: string
  team: string
  role: string
  summary: string
  problem: string
  contributions: string[]
  features: string[]
  outcome: string
  highlight: string
  /** 프로젝트 전체의 기술 구성입니다. 개인 담당 범위는 contributions에 구분합니다. */
  stack: string[]
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  gallery?: { src: string; alt: string; caption: string; width?: number; height?: number }[]
  caseStudy?: ProjectCaseStudy
  github?: string
  demo?: string
  accent: 'blue' | 'navy'
  featured: boolean
}

export const profile = {
  name: '최호림',
  englishName: 'choihorim',
  role: 'Backend Developer',
  roleLabel: '백엔드 개발자',
  email: 'horim2480@gmail.com',
  github: 'https://github.com/pingping-2',
  photo: {
    src: '/images/choihorim-profile.webp',
    alt: '최호림 프로필 사진',
    width: 360,
    height: 480,
  },
  headline: ['화면 너머의 흐름까지', '생각합니다.'],
  intro:
    '화면의 입력이 실제 실행 결과로 이어지도록. AI와 웹 서비스를 연결하는 백엔드 개발자를 목표로, 데이터의 흐름을 이해하고 구현합니다.',
  about: [
    '금오공과대학교에서 컴퓨터소프트웨어를 전공하는 4학년 최호림입니다. AI를 실제로 사용할 수 있는 서비스로 만드는 일에 관심이 있습니다.',
    '자동화 플랫폼 Flowify에서는 화면의 설정값이 API와 실행 엔진까지 전달되는 흐름을 점검하고 구현을 보완했습니다. Experfolio에서는 AI의 추천 이유와 실제 포트폴리오 정보를 함께 확인할 수 있는 검색·상세 화면을 만들었습니다.',
    '프로젝트를 통해 기능 하나의 동작을 넘어, 서비스 전체의 연결을 살피는 관점을 배웠습니다. Java와 Spring을 바탕으로 백엔드 개발에 집중하며, RAG를 활용한 웹 서비스로 관심을 넓히고 있습니다.',
  ],
  education: {
    school: '금오공과대학교',
    major: '컴퓨터소프트웨어 전공',
    status: '4학년 재학',
  },
  interests: ['AI 접목 서비스', 'RAG 활용 기술', '웹 서비스 개발'],
}

export const projects: Project[] = [
  {
    id: 'flowify',
    number: '01',
    title: 'Flowify',
    subtitle: '아이디어를 실행 가능한 자동화로.',
    category: 'AI WORKFLOW AUTOMATION',
    period: '2026.03.01 — 2026.05.27',
    year: '2026',
    team: '4인 팀 프로젝트',
    role: '서비스 연동·기능 구현 참여 / 기획·요구 분석',
    summary:
      'AI 결과를 업무 도구에 다시 옮기는 반복 작업을 줄이기 위한 서비스입니다. 클릭·자연어·템플릿으로 코딩 없이 자동화 흐름을 설계하고 실행합니다.',
    problem:
      'AI가 만든 요약과 분석 결과를 업무 도구로 직접 옮기는 작업이 반복됐습니다. 자동화 도구의 노드·데이터 매핑·인증 설정은 비전문가에게 복잡했고, 선택지와 템플릿을 따라 업무 흐름을 설계할 수 있는 안내가 필요했습니다.',
    contributions: [
      'React 화면의 선택값이 API 요청, Spring Boot 저장 구조, FastAPI 실행 모델까지 일관되게 전달되도록 기능 구현과 검증에 참여했습니다.',
      '템플릿 기반 생성과 Spring Boot 템플릿 seed를 보완하고, 데이터 가져오기·필드 추출·반복 처리·결과 전송 설정이 연결되는지 확인했습니다.',
      '본문 추출, 반복 결과 전달, Gmail·Notion·Discord 출력 처리와 metadata 흐름을 점검하고, GitHub 필드 선택 및 AI 프롬프트를 개선했습니다.',
      '계획·분석 PL로 요구사항과 사용자 흐름을 정리하고, 템플릿·화면 검증과 최종 산출물 작성에 참여했습니다.',
    ],
    features: [
      'OAuth·직접 토큰 입력을 통한 외부 서비스 연결',
      '내 워크플로우·공유받은 워크플로우 목록과 실행 상태 확인',
      '데이터 소스·가공 방식·출력 위치를 선택하는 클릭 기반 편집',
      '자연어 요청을 해석하는 LLM 기반 워크플로우 생성',
      'Gmail 가져오기 → 반복 처리 → AI 요약 → Discord 전송',
      '공통 자동화를 바로 시작할 수 있는 서비스별 템플릿',
    ],
    outcome:
      'Gmail 메일을 반복 처리하고 AI로 요약한 내용이 Discord로 전송되는 실행 결과를 확인했습니다. 개인적으로는 템플릿과 계층 간 데이터 전달을 보완해, 화면에서 고른 설정이 실제 실행까지 이어지도록 기여했습니다.',
    highlight: '화면의 설정을 실제 실행 결과로 연결',
    stack: ['React', 'TypeScript', 'Vite', 'Spring Boot', 'Java', 'MongoDB', 'FastAPI', 'LangChain', 'Docker'],
    image: '/images/flowify.webp',
    imageAlt: 'Flowify의 노드 기반 워크플로우 편집 화면',
    imageWidth: 1024,
    imageHeight: 528,
    caseStudy: {
      overview: {
        headline: 'AI의 답변을 실제 업무의 자동화로 연결합니다.',
        audience: '반복 업무를 줄이고 싶은 일반 사용자와 실무자를 위한 자동화 플랫폼입니다.',
        problems: [
          {
            title: '반복되는 수동 전달',
            description:
              'AI가 만든 요약과 분석 결과를 Gmail·Notion·Sheets로 직접 옮기면서 업무 흐름이 끊겼습니다.',
          },
          {
            title: '복잡한 자동화 설정',
            description:
              '노드, 데이터 매핑, OAuth 인증, JSON 구조를 이해해야 하는 설정은 비전문가의 진입 장벽이었습니다.',
          },
          {
            title: '부족한 설계 안내',
            description:
              '코드나 복잡한 설정 대신, 선택지와 템플릿을 따라 자동화를 구성할 수 있는 환경이 필요했습니다.',
          },
        ],
        objective: '코딩 없이 AI 자동화 파이프라인을 설계하고 실행하는 플랫폼 구축',
        flow: ['데이터 가져오기', 'AI 처리', '결과 전달'],
        goalsTitle: '팀이 세운 다섯 가지 설계 목표',
        goals: [
          {
            title: '기능',
            description:
              '외부 서비스의 데이터 가져오기, AI 처리, 결과 전송을 하나의 자동화 흐름으로 연결하기',
          },
          {
            title: '사용성',
            description:
              '클릭 기반 설정·템플릿·자연어 생성으로 진입 장벽을 낮추고, 부족한 정보는 추가 질문으로 보완하기',
          },
          {
            title: '안정성',
            description:
              '실행 전 검증, 반복 횟수 제한, 실행 중지와 스냅샷·롤백 가능 상태 관리로 실행을 제어하기',
          },
          {
            title: '보안',
            description:
              'Google SSO·JWT 인증과 AES/GCM 토큰 암호화로 인증 정보와 외부 서비스 자격 증명을 보호하기',
          },
          {
            title: '확장성',
            description:
              'NodeFactory·NodeStrategy 구조를 적용해 새로운 노드를 추가할 때 기존 실행기 수정을 최소화하기',
          },
        ],
      },
      implementationChallenge:
        '화면에서 선택한 설정이 API 요청과 Spring 저장 구조를 거쳐 FastAPI 실행 모델까지 일관되게 전달되어야 했습니다. 필드명 차이, 배열 값 보존 문제, 반복 결과 전달 방식과 서비스별 출력 설정의 불일치를 맞추는 일이 제가 집중한 구현 과제였습니다.',
      contributionIntro: '사용자 흐름을 정리하고, 프론트엔드·Spring Boot·FastAPI 사이의 기능 구현과 검증에 함께 참여했습니다.',
      implementationChallengeTitle: '설정한 값이 실행까지 이어져야 합니다.',
      contributionFlow: ['화면 선택값', 'API 요청', 'Spring 저장', 'FastAPI 실행'],
      result: { title: '실행으로 확인한 결과', flow: ['Gmail', 'AI 요약', 'Discord'], journeyStepId: 'execution' },
      journeyIntro: { title: '연결부터 결과 확인까지.', description: '서비스 연동 후 워크플로우를 만들고 실행하는 과정을 실제 화면으로 소개합니다.' },
      architecture: {
        title: '세 계층을 하나의 실행 흐름으로.',
        summary:
          '팀은 사용자 화면, API 서버, 실행 엔진의 역할을 나누어 구성했습니다. React에서 설정한 워크플로우를 Spring Boot가 저장·요청하고, FastAPI가 노드 실행과 AI 생성을 처리합니다.',
        layers: [
          {
            name: '사용자 화면',
            technology: 'React · TypeScript · Vite',
            description: '로그인, 외부 서비스 연결, 워크플로우 편집·실행을 제공하고 Spring Boot API와 통신합니다.',
          },
          {
            name: 'API 서버',
            technology: 'Spring Boot · Java',
            description: '사용자 인증, 워크플로우 저장, OAuth 토큰 관리, 템플릿 API와 실행 요청을 담당합니다.',
          },
          {
            name: '실행 엔진',
            technology: 'FastAPI · LangChain',
            description: '워크플로우의 노드를 실행하고, LLM으로 워크플로우를 생성하거나 내용을 요약·분류합니다.',
          },
          {
            name: '데이터·실행 환경',
            technology: 'MongoDB · Docker',
            description: '워크플로우·토큰·템플릿·실행 로그를 저장합니다. Docker Compose로 Spring, FastAPI, MongoDB를 분리 실행합니다.',
          },
        ],
        image: {
          src: '/images/flowify-architecture.webp',
          caption: 'Flowify 배치 다이어그램 · 프론트엔드, API 서버, 실행 엔진과 외부 서비스의 연결',
          alt: 'React 프론트엔드, Spring Boot API 서버, FastAPI 실행 엔진, MongoDB와 외부 서비스를 연결한 Flowify 배치 다이어그램',
          width: 1024,
          height: 360,
        },
      },
      journey: [
        {
          id: 'connect',
          title: '외부 서비스 연결',
          description:
            '자동화에 사용할 계정을 먼저 연결합니다. Gmail·Google Drive는 OAuth로, Canvas LMS·GitHub·Notion은 직접 입력한 토큰으로 연결 상태를 관리합니다.',
          images: [
            {
              src: '/images/flowify-services.webp',
              alt: 'Gmail, Google Drive, Canvas LMS, GitHub, Notion의 연결 상태를 보여주는 외부 서비스 연동 화면',
              caption: 'OAuth 연결과 직접 토큰 입력을 나누어 관리하는 외부 서비스 연동 화면',
              width: 1024,
              height: 1105,
            },
          ],
        },
        {
          id: 'workflow-list',
          title: '내 자동화와 공유받은 워크플로우 확인',
          description:
            '직접 만든 워크플로우와 공유받은 워크플로우를 목록에서 확인합니다. 각 흐름의 실행 중·중지 상태를 살펴보고, 편집하거나 실행할 자동화를 선택합니다.',
          images: [
            {
              src: '/images/flowify-workflow-list.webp',
              alt: '자동화 이름, 연결된 서비스, 실행 상태와 실행 주기를 보여주는 Flowify 워크플로우 목록',
              caption: '여러 자동화의 구성과 실행 상태를 한곳에서 확인하는 목록',
              width: 1024,
              height: 833,
            },
          ],
        },
        {
          id: 'manual-creation',
          title: '클릭으로 데이터 소스와 처리 방식 선택',
          description:
            '직접 생성하기를 선택하면 데이터를 가져올 서비스부터 정합니다. 가져온 데이터를 반복 처리하거나 요약하는 방식을 고르고, 결과를 보낼 곳까지 노드로 연결합니다.',
          images: [
            {
              src: '/images/flowify-creation-mode.webp',
              alt: '직접 생성하기와 AI로 생성하기 중 선택하는 Flowify 화면',
              caption: '클릭으로 직접 구성하거나 AI로 생성하는 두 가지 시작 방식',
              width: 805,
              height: 503,
            },
            {
              src: '/images/flowify-source-picker.webp',
              alt: 'Google Drive, Gmail, Google Sheets, Canvas LMS, 네이버 뉴스, 인터넷, GitHub 중 데이터 소스를 선택하는 화면',
              caption: '어디에서 데이터를 가져올지 선택하는 소스 설정',
              width: 973,
              height: 543,
            },
            {
              src: '/images/flowify-processing.webp',
              alt: 'Gmail 데이터와 추출 필드를 확인하고 내용 요약, 번역 등 처리 방식을 선택하는 화면',
              caption: '본문·필드 추출과 데이터 가공 방식을 연결하는 설정 패널',
              width: 1024,
              height: 496,
            },
          ],
        },
        {
          id: 'ai-creation',
          title: '자연어로 워크플로우 생성',
          description:
            'AI 입력창에 원하는 작업을 설명하면 LLM이 요청을 해석해 워크플로우를 만듭니다. 생성된 노드를 캔버스에서 확인하고, 서비스 연결과 전송 위치 등 필요한 값을 설정합니다.',
          images: [
            {
              src: '/images/flowify-ai-chat.webp',
              alt: '원하는 자동화 작업을 자연어로 입력할 수 있는 Flowify AI 패널',
              caption: '원하는 자동화를 설명하는 자연어 입력창',
              width: 1024,
              height: 647,
            },
            {
              src: '/images/flowify-ai-generated.webp',
              alt: 'AI가 생성한 Gmail 가져오기, 반복 처리, 내용 요약, Discord 전송 워크플로우와 대화 패널',
              caption: '자연어 요청을 Gmail → 반복 처리 → 내용 요약 → Discord 노드로 구성한 결과',
              width: 1024,
              height: 528,
            },
          ],
        },
        {
          id: 'execution',
          title: 'Gmail 요약을 Discord에서 확인',
          description:
            'Gmail에서 가져온 메일을 한 항목씩 처리하고, AI로 요약해 Discord로 전달합니다. 서비스 연결과 Webhook URL을 설정한 뒤 실행했으며, Discord에 메일 요약이 도착하는 결과를 확인했습니다.',
          images: [
            {
              src: '/images/flowify-execution-flow.webp',
              alt: 'Gmail, 한 메일씩 반복 처리, 내용 요약, Discord로 연결한 노드와 필수 설정 안내가 표시된 화면',
              caption: '실행할 자동화의 노드 구성. 이 화면은 서비스 연결·Webhook URL 입력 전 설정 단계입니다.',
              width: 1024,
              height: 429,
            },
          ],
        },
        {
          id: 'templates',
          title: '자주 쓰는 자동화는 템플릿으로 재사용',
          description:
            'GitHub PR 요약 알림, Drive 문서 요약과 전송처럼 반복해서 쓰는 흐름을 템플릿으로 제공합니다. 사용자는 서비스별 템플릿을 선택하고 필요한 연결·설정값을 채워 자동화를 시작합니다.',
          images: [
            {
              src: '/images/flowify-templates.webp',
              alt: '뉴스, Google Drive, GitHub, Canvas, Google Sheets, Gmail 카테고리와 공통 자동화 템플릿 목록',
              caption: '서비스별로 찾을 수 있는 공통 자동화 템플릿',
              width: 1024,
              height: 1109,
            },
          ],
        },
      ],
      technicalContributions: [
        {
          title: '화면에서 실행 엔진까지, 설정값의 형태 맞추기',
          description:
            'source·processor·sink 선택값은 프론트엔드 상태, API payload, Spring 저장 구조, FastAPI runtime model을 차례로 거칩니다. 계층마다 필드명과 배열 값이 유지되는지 확인하고, GitHub field selection과 선택지 처리를 보완했습니다.',
        },
        {
          title: '선택하면 실행할 수 있는 템플릿 만들기',
          description:
            '템플릿 기반 워크플로우 생성과 Spring Boot의 seed 구성에 참여했습니다. 데이터 소스, 필드 추출, loop step, sink delivery 설정을 함께 점검해 템플릿의 설정이 실행 요청까지 전달되도록 보완했습니다.',
        },
        {
          title: '반복 처리 결과를 목적지까지 전달하기',
          description:
            '본문 추출과 loop 결과 전달 방식을 점검하고, Gmail·Notion·Discord의 서로 다른 출력 설정과 metadata 흐름을 보완했습니다. 화면의 설정과 실제 출력이 일치하는지 실행 결과를 기준으로 확인했습니다.',
        },
        {
          title: 'AI 생성과 사용자 흐름 함께 다듬기',
          description:
            'AI 프롬프트 개선과 선택지 정리에 참여하고, 로그인부터 서비스 연동·생성·실행·결과 확인까지 흐름을 검증했습니다. 요구사항, 화면·템플릿 테스트, 최종 문서도 실제 구현을 기준으로 정리했습니다.',
        },
      ],
      reflection:
        '기능을 만드는 것과 사용자가 실제로 실행할 수 있게 만드는 것 사이에는 데이터 연결이라는 과제가 있었습니다. 화면이 정상이어도 API 요청과 실행 payload가 맞지 않으면 실패했습니다. 이 경험을 통해 프론트엔드, 백엔드, 실행 엔진을 하나의 흐름으로 이해하고 결과까지 검증하는 관점을 배웠습니다.',
      improvements: [
        '실제 사용자 테스트를 바탕으로 템플릿 선택과 노드 설정 단계를 더 단순하게 만들기',
        '실패 원인과 다음 행동을 알 수 있도록 오류 메시지와 안내 문구 개선하기',
        'AI 생성 실패 사례를 모아 추가 질문이 필요한 상황을 구분하고, 생성된 워크플로우의 실행 가능성을 사전에 검증하기',
      ],
      technologyGroups: [
        {
          title: 'Frontend',
          items: [
            { name: 'React + TypeScript', purpose: 'React 19와 TypeScript로 사용자 화면·워크플로우 에디터를 구현하고 타입 안정성을 확보' },
            { name: 'Vite', purpose: '개발 서버, HMR, TypeScript 검사와 프로덕션 빌드' },
            { name: 'Chakra UI', purpose: '패널·버튼·레이아웃·토스트 메시지를 구성하는 공통 UI' },
            { name: 'React Flow', purpose: '커스텀 노드·엣지·미니맵·컨트롤·자동 레이아웃을 사용하는 시각적 캔버스' },
            { name: 'Zustand + Immer', purpose: '노드·엣지, 수정 여부, 패널 상태와 AI 생성 상태 관리' },
            { name: 'TanStack Query', purpose: '워크플로우 조회·수정·실행 결과의 서버 상태 및 API 캐싱' },
            { name: 'Axios', purpose: 'REST API 호출, Access Token 부착, 토큰 갱신 대기열과 401 재시도 처리' },
          ],
        },
        {
          title: 'Backend',
          items: [
            { name: 'Spring Boot + Java', purpose: 'Spring Boot 3.4.3·Java 21 기반 인증·워크플로우·OAuth·실행·템플릿 API' },
            { name: 'Spring Security + JWT', purpose: 'Stateless 사용자 인증과 Bearer Token 검증을 통한 API 보호' },
            { name: 'Spring Data MongoDB', purpose: '워크플로우·OAuth 토큰·템플릿·실행 이력의 Repository와 문서 저장' },
            { name: 'Spring WebFlux WebClient', purpose: 'FastAPI 및 Google OAuth와 통신하는 비동기 HTTP 클라이언트' },
          ],
        },
        {
          title: 'AI & Execution',
          items: [
            { name: 'FastAPI', purpose: '비동기 엔드포인트, BackgroundTasks와 내부 미들웨어를 사용하는 AI 생성·워크플로우 실행 엔진' },
            { name: 'LangChain + ChatOpenAI', purpose: 'LLM 기반 내용 처리·요약·분류와 워크플로우 생성·수정' },
            { name: 'Motor', purpose: 'FastAPI에서 MongoDB에 비동기로 접근해 실행 로그와 상태 저장' },
            { name: 'APScheduler', purpose: '시간 기반 트리거를 위한 스케줄 실행 관리' },
          ],
        },
        {
          title: 'Data & Deployment',
          items: [
            { name: 'MongoDB', purpose: '워크플로우의 노드·엣지 구조와 토큰·템플릿·실행 결과 및 로그 저장' },
            { name: 'Docker + Docker Compose', purpose: '각 저장소의 Dockerfile과 Spring·FastAPI·MongoDB 분리 실행 환경 구성' },
          ],
        },
      ],
    },
    github: 'https://github.com/Shelter-of-the-old-people/flowify-BE-spring',
    accent: 'blue',
    featured: true,
  },
  {
    id: 'experfolio',
    number: '02',
    title: 'Experfolio',
    subtitle: '경험을 기록하고, 근거로 연결하다.',
    category: 'AI PORTFOLIO & TALENT SEARCH',
    period: '2025.09.01 — 2025.12.12',
    year: '2025',
    team: '4인 팀 프로젝트',
    role: '프론트엔드 개발 / 기획·요구 분석',
    summary:
      '흩어진 학생의 경험을 하나의 포트폴리오로 쌓고, 기업이 자연어로 필요한 인재를 찾는 서비스입니다. RAG 기반 맥락 검색과 매칭 근거를 실제 프로젝트·실적·링크에 연결합니다.',
    problem:
      '학점·자격증·프로젝트·활동 기록이 흩어져 있어 학생은 취업 시점마다 경험을 다시 정리해야 했습니다. 기업도 지원서를 기다리거나 개별 이력을 검토하는 데 시간을 쓰며, 원하는 경험과 직무 적합성을 함께 확인하기 어려웠습니다.',
    contributions: [
      'LLM 검색과 인재 상세 조회 화면에서 AI의 매칭 이유·키워드와 성적·수상이력 등 정형 데이터를 함께 확인하는 구조를 구현했습니다.',
      '분석 결과와 정형 데이터를 병렬로 요청하고, useLazyApi를 활용해 먼저 준비된 정보를 화면에 표시했습니다.',
      'AI 검색이 지연될 때 진행 상황을 설명하는 안내 문구를 제공해 대기 상태를 알 수 있도록 했습니다.',
      '자유로운 경험 서술과 편리한 정보 관리를 함께 지원하는 섹션 기반 포트폴리오 구조를 제안했고, 팀 설계에 반영했습니다.',
    ],
    features: [
      '프로필·수상·자격증·활동 기록을 누적하는 학생 정보 관리',
      '자유 서술과 첨부자료를 함께 관리하는 섹션 기반 포트폴리오',
      '원하는 인재상을 자연어로 입력하는 RAG 기반 맥락 검색',
      '매칭 점수에 따른 결과 정렬과 추천 이유·키워드 표시',
      '매칭 근거와 프로젝트·실적·관련 링크를 함께 확인하는 상세 조회',
      '관심 인재 즐겨찾기와 포트폴리오 첨부자료 열람',
    ],
    outcome:
      '추천 이유와 포트폴리오의 실제 정보를 한 화면에서 비교할 수 있는 상세 조회를 구현했습니다. AI 분석 중에도 준비된 정보를 먼저 보여주고, 섹션 기반 작성 구조를 팀 설계에 반영했습니다.',
    highlight: '정형 데이터 선표시와 AI 분석 대기 안내 구현',
    stack: ['Figma', 'React', 'Vue.js', 'Java', 'Spring Boot', 'JPA', 'Docker', 'PostgreSQL', 'MongoDB', 'Redis', 'LangChain'],
    image: '/images/experfolio-matching-reason.webp',
    imageAlt: 'Experfolio 검색 결과에서 후보자의 매칭 근거를 확인하고 상세 프로필로 연결하는 화면',
    imageWidth: 1233,
    imageHeight: 620,
    caseStudy: {
      overview: {
        headline: '학생의 경험을 쌓고, 기업의 탐색에 근거를 더합니다.',
        audience: '경험을 꾸준히 기록하려는 학생과 직무에 맞는 인재를 찾는 기업을 연결합니다.',
        problems: [
          {
            title: '여러 곳에 흩어진 성장 기록',
            description: '학점, 자격증, 프로젝트와 활동 이력이 분산돼 취업을 준비할 때 경험을 다시 모으고 정리해야 했습니다.',
          },
          {
            title: '학생의 지원에 의존하는 채용 흐름',
            description: '학생이 공고를 찾아 지원하는 방식만으로는 기업이 필요한 경험을 가진 인재를 먼저 발견하기 어려웠습니다.',
          },
          {
            title: '탐색과 검증에 드는 반복 작업',
            description: '이력서의 스펙만으로 직무 적합성을 판단하기 어려워, 기업은 프로젝트와 실제 활동을 따로 확인해야 했습니다.',
          },
        ],
        objective: '학생의 누적 경험을 포트폴리오로 관리하고,\n기업이 자연어와 실제 근거로 인재를 탐색하는 플랫폼 구축',
        flow: ['학생의 경험 기록', '자연어 맥락 검색', '매칭 점수·근거', '프로필·실적 확인'],
        goalsTitle: '학생과 기업을 위한 여섯 가지 설계 목표',
        goals: [
          { title: '학생 · 통합 기록', description: '학점·자격증·수상·활동을 하나의 포트폴리오에 누적하고 관리하기' },
          { title: '학생 · 새로운 기회', description: '기업이 포트폴리오를 먼저 확인하고 제안할 수 있는 채용 흐름 만들기' },
          { title: '학생 · 경험의 증거', description: '파일 첨부와 OCR을 활용해 경험을 뒷받침하는 자료를 함께 정리하기' },
          { title: '기업 · 자연어 탐색', description: 'LLM 기반 자연어 검색과 조건 검색으로 원하는 인재를 찾기' },
          { title: '기업 · 근거 기반 평가', description: '단순 스펙을 넘어 프로젝트와 성과를 살펴 직무 적합성을 판단하기' },
          { title: '기업 · 능동적 채용', description: '지원자를 기다리는 방식에서 필요한 인재를 직접 탐색하는 방식으로 넓히기' },
        ],
      },
      contributionIntro:
        '저는 LLM 검색·인재 상세 조회 화면과 API 연계를 맡았습니다. AI의 추천 이유를 실제 이력과 함께 확인하게 하고, 분석을 기다리는 동안에도 사용자가 상황을 이해할 수 있도록 화면을 구성했습니다.',
      implementationChallengeTitle: 'AI의 추천을 실제 정보로 확인할 수 있게 만들기',
      implementationChallenge:
        '추천 문구만으로는 AI의 판단을 확인하기 어렵고, 정형 데이터만으로는 경험의 맥락이 드러나지 않았습니다. 검색이 60초 가까이 걸리는 상황에서도 매칭 근거와 준비된 이력을 함께 보여주고, 대기 이유를 설명하는 것이 제가 집중한 과제였습니다.',
      contributionFlow: ['AI 분석·정형 정보 병렬 요청', '준비된 정보 먼저 표시', '매칭 근거와 실적 연결', '대기 상태 안내'],
      architecture: {
        title: '기록과 검색을 연결하는 서비스 구조',
        summary:
          'React 화면에서 학생은 포트폴리오를 관리하고 기업은 인재를 검색합니다. Spring Boot가 사용자·포트폴리오·검색 API를 연결하고, FastAPI AI 서비스가 텍스트 처리와 검색·매칭 분석을 담당합니다.',
        layers: [
          {
            name: '사용자 화면',
            technology: 'React · Vite',
            description: '학생의 기록·편집과 기업의 자연어 검색·결과·상세 조회를 제공하고 API 응답을 화면에 연결합니다.',
          },
          {
            name: '서비스 API',
            technology: 'Java · Spring Boot · JPA',
            description: '사용자 인증, 프로필·포트폴리오 관리, 검색 요청과 즐겨찾기를 처리합니다.',
          },
          {
            name: 'AI 검색 서비스',
            technology: 'FastAPI · LangChain · KURE-v1',
            description: '포트폴리오 텍스트 임베딩, 쿼리 재작성, 벡터 검색, LLM 재순위화와 매칭 근거 생성을 연결합니다.',
          },
          {
            name: '데이터·실행 환경',
            technology: 'PostgreSQL · MongoDB · Docker',
            description: '관계형 사용자 데이터와 문서형 포트폴리오·검색 데이터를 나누어 관리하고, 컨테이너 환경에서 서비스를 실행합니다.',
          },
        ],
        image: {
          src: '/images/experfolio-architecture.webp',
          alt: 'React 화면과 Spring Boot, FastAPI AI 서비스, PostgreSQL·MongoDB를 연결한 Experfolio 팀 시스템 구성도',
          caption: '팀 전체 시스템 구성. 개인 담당 범위는 검색·상세 화면과 API 연계입니다.',
          width: 921,
          height: 565,
        },
      },
      result: {
        title: '기록에서 검색, 근거 확인까지',
        flow: ['경험 누적', '자연어 검색', '매칭 점수 정렬', '추천 근거', '실적·링크 확인'],
        journeyStepId: 'profile-detail',
      },
      journeyIntro: {
        title: '학생의 기록이 기업의 탐색으로 이어지는 과정',
        description: '프로필과 경험을 쌓는 학생 화면에서 시작해, 기업이 검색 결과의 근거와 실제 포트폴리오를 확인하는 화면까지 연결했습니다.',
      },
      journey: [
        {
          id: 'profile-edit',
          title: '학생의 기본 프로필 기록',
          description: '학생은 이름, 학교, 전공, 성적과 희망 직무를 입력합니다. 외부 링크를 더해 자신의 작업과 경험을 확인할 수 있는 출발점을 만듭니다.',
          images: [{
            src: '/images/experfolio-profile-edit.webp',
            alt: '이름, 학교, 전공, 성적, 희망 직무와 첨부 링크를 입력하는 Experfolio 학생 프로필 수정 화면',
            caption: '학생의 기본 정보와 작업을 보여주는 외부 링크를 관리하는 프로필',
            width: 623,
            height: 450,
          }],
        },
        {
          id: 'awards',
          title: '수상·활동 이력 등록',
          description: '대회명, 수상 결과, 설명과 날짜를 등록해 활동의 맥락을 남깁니다. 프로필과 함께 관리되는 이력은 기업이 경험을 확인하는 자료가 됩니다.',
          images: [{
            src: '/images/experfolio-awards.webp',
            alt: '대회명, 수상 결과, 설명과 연월을 입력하고 수상 이력을 추가하는 화면',
            caption: '한 번의 활동을 이름·결과·설명·시점과 함께 누적하는 수상 이력 관리',
            width: 724,
            height: 457,
          }],
        },
        {
          id: 'portfolio-write',
          title: '섹션으로 프로젝트와 자료 정리',
          description: '프로젝트의 문제 해결 과정과 배운 점을 자유롭게 작성하고, 이미지·문서 등 첨부자료를 함께 배치합니다. 섹션별로 내용을 수정하거나 레이아웃을 조정할 수 있습니다.',
          images: [{
            src: '/images/experfolio-portfolio-write.webp',
            alt: '프로젝트별 자유 서술, 문서 미리보기와 레이아웃 변경 기능을 제공하는 포트폴리오 편집 화면',
            caption: '자유로운 경험 서술을 섹션 단위로 관리하는 포트폴리오 편집',
            width: 708,
            height: 1445,
          }],
        },
        {
          id: 'student-overview',
          title: '누적한 경험을 하나의 포트폴리오로 확인',
          description: '학생은 프로필, 수상, 자격증, 어학과 프로젝트 내용을 한 화면에서 확인합니다. 흩어진 기록을 모아 현재의 역량과 성장 과정을 보여주는 포트폴리오로 관리합니다.',
          images: [{
            src: '/images/experfolio-student-overview.webp',
            alt: '학생 프로필, 수상경력, 자격증, 어학과 프로젝트 상세를 함께 보여주는 포트폴리오 조회 화면',
            caption: '정형 이력과 프로젝트의 서술 내용을 함께 보여주는 학생 포트폴리오',
            width: 751,
            height: 491,
          }],
        },
        {
          id: 'company-search',
          title: '기업이 원하는 인재상을 자연어로 검색',
          description: '기업은 찾고 싶은 기술과 경험을 문장으로 입력합니다. RAG 기반 검색은 입력한 조건과 포트폴리오의 맥락을 연결해 검토할 후보를 찾습니다.',
          images: [{
            src: '/images/experfolio-search-home.webp',
            alt: '원하는 인재상을 자연어로 입력하는 검색창과 관심 인재 메뉴가 있는 기업 검색 화면',
            caption: '정해진 항목의 선택을 넘어 원하는 경험을 문장으로 입력하는 인재 검색',
            width: 1600,
            height: 668,
          }],
        },
        {
          id: 'matching-results',
          title: '매칭 점수로 정렬하고 추천 이유 확인',
          description: '검색 결과는 매칭 점수와 함께 제공됩니다. 후보를 선택하면 추천 이유와 핵심 키워드를 확인하고, 프로필 조회로 이어서 검토할 수 있습니다.',
          images: [
            {
              src: '/images/experfolio-search-results.webp',
              alt: '인재의 학교, 전공, 성적, 수상이력과 매칭 점수를 표시하고 프로필 조회로 연결하는 검색 결과',
              caption: '매칭 점수와 기본 이력을 비교하는 검색 결과. 화면의 점수는 개별 후보의 매칭 값입니다.',
              width: 1600,
              height: 699,
            },
            {
              src: '/images/experfolio-matching-reason.webp',
              alt: '검색 후보를 선택해 AI 분석 근거와 매칭 키워드를 펼쳐 보는 Experfolio 화면',
              caption: '후보를 추천한 이유와 관련 기술을 확인하고 상세 프로필로 이동하는 흐름',
              width: 1233,
              height: 620,
            },
          ],
        },
        {
          id: 'profile-detail',
          title: '추천 근거를 실제 프로필·실적·링크로 확인',
          description: 'AI의 매칭 이유 옆에서 학생의 프로필, 수상·자격증·어학, 프로젝트와 첨부자료를 함께 확인합니다. 추천 문구를 실제 기록과 대조하고 관련 링크를 살펴 판단할 수 있게 했습니다.',
          images: [{
            src: '/images/experfolio-student-detail.webp',
            alt: 'AI 추천 근거와 후보 목록 옆에 학생의 프로필, 이력, 프로젝트, 첨부문서 미리보기를 함께 보여주는 상세 조회',
            caption: 'AI의 설명을 읽고 실제 프로젝트와 자료를 같은 화면에서 교차 확인하는 상세 조회',
            width: 1175,
            height: 1384,
          }],
        },
      ],
      technologyGroups: [
        {
          title: 'Design & Frontend',
          items: [
            { name: 'Figma', purpose: '사용자 화면과 포트폴리오 정보 배치 설계' },
            { name: 'React', purpose: '학생 포트폴리오와 기업 검색·상세 조회 화면 구현' },
            { name: 'Vue.js', purpose: '컴포넌트 기반 프론트엔드 개발 기술' },
            { name: 'Vite', purpose: 'React 프론트엔드 개발 서버와 빌드 환경' },
          ],
        },
        {
          title: 'Backend',
          items: [
            { name: 'Java', purpose: '사용자·포트폴리오·검색 서비스의 백엔드 언어' },
            { name: 'Spring Boot', purpose: '인증, 포트폴리오 관리, 검색과 즐겨찾기 API' },
            { name: 'JPA', purpose: 'PostgreSQL의 사용자·관계형 데이터 영속성 관리' },
          ],
        },
        {
          title: 'Data',
          items: [
            { name: 'PostgreSQL', purpose: '사용자, 즐겨찾기와 관계형 메타데이터 저장' },
            { name: 'MongoDB', purpose: '포트폴리오 문서 저장과 임베딩 벡터 검색' },
            { name: 'Redis', purpose: '반복 조회를 위한 캐시 저장소' },
          ],
        },
        {
          title: 'AI & Search',
          items: [
            { name: 'LangChain', purpose: 'LLM 기반 자연어 처리와 RAG 검색 흐름 구성' },
            { name: 'FastAPI', purpose: '쿼리 처리, 검색·매칭 분석과 포트폴리오 텍스트 처리 API' },
            { name: 'KURE-v1', purpose: '한국어 쿼리와 포트폴리오 텍스트의 임베딩 생성' },
            { name: 'Tesseract OCR', purpose: 'PDF·이미지 첨부자료에서 분석할 텍스트 추출' },
          ],
        },
        {
          title: 'Deployment & Storage',
          items: [
            { name: 'Docker', purpose: '서비스별 컨테이너 실행 환경 구성' },
            { name: 'Cloudflare R2', purpose: '포트폴리오 첨부파일 저장과 다운로드' },
          ],
        },
      ],
      evolution: {
        title: '팀의 검색 품질 개선 과정',
        description: '팀은 데이터 확장 후 드러난 검색 품질 문제를 분석하고, 쿼리 재작성과 LLM 재순위화를 적용했습니다. 아래 내용과 평가지표는 최종 발표자료에 정리된 팀의 검색 실험입니다.',
        stages: [
          {
            id: 'query-rewriting',
            title: '검색 의도를 보존하는 쿼리 재작성',
            problem: '모호한 자연어와 OR 조건이 검색 의도대로 반영되지 않았고, 키워드만 나열하면 프로젝트 경험의 맥락이 사라졌습니다.',
            change: '자연스러운 문장을 유지하면서 관련 기술을 확장하고, AND·OR 및 필수·우대 조건을 구분하도록 재작성 프롬프트를 다듬었습니다.',
            outcome: '여러 쿼리 스타일을 비교한 뒤, 자연스러운 문맥과 적절한 확장을 함께 사용하는 방식으로 검색 입력을 정리했습니다.',
            images: [
              {
                src: '/images/experfolio-rag-problem.webp',
                alt: '데이터 확장 후 OR 조건, 도메인 맥락과 모호한 자연어 처리에서 드러난 RAG 검색 품질 문제',
                caption: '쿼리 재작성이 필요했던 검색 품질 문제 · 최종 발표자료 8쪽',
                width: 1600,
                height: 900,
              },
              {
                src: '/images/experfolio-query-rewrite-test.webp',
                alt: '자연어 쿼리의 여러 표현을 비교하고 문맥과 확장을 결합하는 전략을 정리한 팀 쿼리 재작성 실험 자료',
                caption: '쿼리 재작성 전략을 비교한 팀 실험 설계 · 최종 발표자료 9쪽',
                width: 1600,
                height: 900,
              },
              {
                src: '/images/experfolio-query-rewrite-prompt.webp',
                alt: '키워드와 의미 보존, 도메인 확장, AND·OR 조건 구분을 설명하는 쿼리 재작성 프롬프트 자료',
                caption: '검색 의도와 복합 조건을 보존하는 프롬프트 구성 · 최종 발표자료 10쪽',
                width: 1600,
                height: 900,
              },
            ],
          },
          {
            id: 'llm-reranking',
            title: '기술과 경험의 맥락을 읽는 LLM 재순위화',
            problem: '벡터 검색에서 관련성이 높은 후보가 일반 Reranker 단계에서 낮은 점수를 받아 순위가 왜곡되는 문제가 있었습니다.',
            change: 'LLM이 검색 조건과 후보자의 포트폴리오를 함께 읽고 적합성을 평가하도록 재순위화 단계를 변경했습니다.',
            outcome: '기술 간 관계와 복합 조건을 고려한 점수로 후보를 다시 정렬했습니다. 이 선택으로 늘어난 분석 대기는 프론트엔드의 별도 UX 과제가 되었습니다.',
            images: [
              {
                src: '/images/experfolio-reranker-problem.webp',
                alt: '벡터 검색과 일반 Reranker의 점수 차이로 검색 순위가 달라지는 문제를 설명한 자료',
                caption: '관련 후보가 재순위화 단계에서 낮게 평가된 개별 사례 · 최종 발표자료 11쪽',
                width: 1600,
                height: 900,
              },
              {
                src: '/images/experfolio-llm-reranker.webp',
                alt: 'LLM이 검색 조건과 후보자 문서의 적합성을 평가하는 재순위화 방식을 설명한 자료',
                caption: '검색 조건과 포트폴리오를 함께 읽는 LLM Reranker 도입 · 최종 발표자료 12쪽',
                width: 1600,
                height: 900,
              },
            ],
          },
          {
            id: 'search-pipeline',
            title: '검색부터 근거 생성까지 하나의 흐름으로',
            problem: '입력의 표현 차이와 후보 재정렬이 함께 작용해, 어느 단계에서 검색 결과가 달라지는지 나누어 살펴볼 필요가 있었습니다.',
            change: '쿼리 재작성 → 벡터 검색 → 초기 랭킹 → LLM 재순위화 → 최종 결과 흐름을 정리하고, 레이블링한 데이터와 결과를 비교했습니다.',
            outcome: '최종 발표자료에서는 IT 직군 500개 레이블링 데이터를 대상으로 이전 버전과 새 버전의 검색 지표를 비교했습니다.',
            images: [
              {
                src: '/images/experfolio-search-pipeline.webp',
                alt: '쿼리 재작성, 벡터 검색, 초기 랭킹, LLM 재순위화와 최종 결과의 순서를 보여주는 검색 처리 구조',
                caption: '최종 발표자료 13쪽의 처리 구조. 0.001 → 0.95는 개별 매칭 점수 예시입니다.',
                width: 1600,
                height: 900,
              },
              {
                src: '/images/experfolio-evaluation-method.webp',
                alt: 'IT 직군 500개 포트폴리오 레이블링 데이터와 정답표 비교를 사용하는 검색 평가 방법',
                caption: 'IT 직군 500개 레이블링 데이터로 결과를 평가한 방법 · 최종 발표자료 14쪽',
                width: 1600,
                height: 900,
              },
            ],
          },
        ],
        evaluation: {
          title: 'IT 직군 500개 데이터로 비교한 검색 성능',
          description: '쿼리 재작성·LLM Reranker·프롬프트 개선을 적용한 버전의 결과를 정답 레이블과 비교한 팀 실험입니다.',
          metrics: [
            { name: 'MAP', before: 0.113, after: 0.210 },
            { name: 'Recall@10', before: 0.145, after: 0.215 },
            { name: 'Precision@10', before: 0.217, after: 0.596 },
            { name: 'NDCG@10', before: 0.273, after: 0.631 },
            { name: 'MRR', before: 0.374, after: 0.789 },
          ],
          note: '출처: 팀 최종 발표자료 14–15쪽. 이전·새 버전은 발표자료의 구분을 따르며, 수치는 IT 직군 500개 레이블링 데이터에서 측정한 팀 검색 성능입니다.',
          image: {
            src: '/images/experfolio-performance-comparison.webp',
            alt: 'IT 직군 500개 레이블링 데이터에서 측정한 MAP, Recall@10, Precision@10, NDCG@10, MRR의 이전·새 버전 비교',
            caption: '팀 검색 실험의 성능 비교 원본 · 최종 발표자료 15쪽',
            width: 1600,
            height: 900,
          },
        },
      },
      technicalContributions: [
        {
          title: 'AI 추천 이유와 실제 이력을 한 화면에 연결',
          description: 'SearchPage.jsx와 인재 상세 조회에서 AI가 반환한 매칭 이유·키워드와 성적·수상 등 정형 데이터를 함께 보여주도록 구성했습니다. 사용자가 추천 문구를 읽은 뒤 실제 프로젝트와 첨부자료까지 살펴볼 수 있게 했습니다.',
        },
        {
          title: '병렬 요청과 준비된 정보의 선표시',
          description: '분석 결과와 정형 정보를 병렬로 요청하고, useLazyApi를 활용해 준비된 데이터를 먼저 렌더링했습니다. AI 분석이 끝날 때까지 상세 화면 전체가 비어 있지 않도록 정보의 표시 순서를 나누었습니다.',
        },
        {
          title: '긴 분석 대기 시간을 설명하는 화면',
          description: 'LLM Reranker 도입으로 검색이 60초 가까이 걸리는 상황에서, 단순한 스피너 대신 “현재 조건에 가장 알맞은 인재를 정밀 분석 중입니다…”라는 진행 문구를 제공했습니다. 즉시 분석 시간을 줄이기 어려운 제약 속에서 사용자가 대기 이유를 이해하도록 대응했습니다.',
        },
        {
          title: '자유 서술과 관리 편의성을 함께 담은 섹션',
          description: '정형 입력의 편의성과 비정형 경험 서술의 맥락을 함께 살리기 위해 섹션 시스템을 제안했고 팀 설계에 채택됐습니다. 사용자는 섹션 안에서 자유롭게 작성하면서 섹션 단위로 내용을 수정하고 관리할 수 있습니다.',
        },
      ],
      reflection: 'AI가 좋은 추천 문구를 만드는 것만으로 사용자가 판단할 수 있는 화면이 완성되지는 않았습니다. 추천 이유를 실제 이력과 연결하고, 늦게 도착하는 분석을 기다리는 동안 무엇을 먼저 보여줄지 설계해야 했습니다. 이 경험을 통해 데이터의 정확성과 표시 순서, 안내 문구를 함께 고려하는 관점을 배웠습니다.',
      improvements: [
        '쿼리 처리·검색·재순위화의 진행 상태를 단계별로 보여주는 대기 화면 개선',
        '추천 근거를 포트폴리오의 해당 문장과 첨부자료 위치에 더 직접적으로 연결하기',
        '팀 차원에서 검색 모델 경량화와 캐싱을 검토하고, 응답 시간과 검색 품질을 함께 평가하기',
        '포트폴리오 작성·수정 흐름을 사용자 테스트로 확인해 섹션 편집과 자료 관리 개선',
      ],
    },
    github: 'https://github.com/Shelter-of-the-old-people/Experfolio_frontend',
    accent: 'navy',
    featured: true,
  },
  {
    id: 'carvery',
    number: '03',
    title: 'Carvery',
    subtitle: '내 주변 정보로 시작하는 차량 관리.',
    category: 'PUBLIC DATA & LOCATION SERVICE',
    team: '5인 팀 프로젝트',
    role: '프론트엔드 개발 참여',
    summary:
      '세차할 날과 장소를 따로 찾는 번거로움을 줄이기 위한 차량 관리 서비스입니다. 공공데이터 기반 세차장·정비소에 날씨 추천, 주변 음식점·카페, 용품 탐색과 길찾기를 연결합니다.',
    problem:
      '세차 직후 비가 오는 경험을 줄이려면 장소뿐 아니라 날씨도 함께 살펴야 했습니다. 현재 위치의 세차장·정비소와 세차 후 들를 곳을 한 번에 찾을 수 있는 흐름이 필요했습니다.',
    contributions: [
      '5인 팀의 프론트엔드 개발에 참여했습니다.',
      '팀은 가공한 공공데이터와 날씨·쇼핑·지도 정보를 연결해 차량 관리 서비스를 구현했습니다.',
    ],
    features: [
      '주간 날씨와 온도를 바탕으로 한 세차 추천',
      '현재·지정 위치 인근의 세차장·정비소 목록과 상세 정보',
      '선택한 시설 주변 음식점·카페와 거리 정보 제공',
      '네이버 쇼핑 API 기반 세차 용품 탐색과 외부 쇼핑몰 연결',
      '시설을 목적지로 설정한 카카오맵 길찾기 연결',
      '지도 중심을 이동하며 주변 업체 목록 탐색',
    ],
    outcome:
      '팀은 공공데이터의 세차장·정비소 정보를 위치 기반 목록과 상세 화면으로 제공하고, 날씨 확인에서 주변 장소·용품 탐색·길찾기까지 연결했습니다. 저는 이 서비스의 공동 프론트엔드 개발에 참여했습니다.',
    highlight: '공공데이터를 위치 기반 차량 관리 화면으로 연결',
    stack: ['MariaDB', 'pandas', 'Kakao Map API', 'Naver Shopping API'],
    image: '/images/carvery-weather.webp',
    imageAlt: 'Carvery의 주간 날씨 기반 세차 추천과 주변 세차장 카드가 함께 표시된 메인 화면',
    imageWidth: 1600,
    imageHeight: 900,
    accent: 'blue',
    featured: false,
    caseStudy: {
      contributionScope: 'team',
      overview: {
        headline: '공공데이터를 내 주변 차량 관리 정보로 연결합니다.',
        audience: '날씨를 보고 세차 시기를 정하고, 주변 차량 관리 시설을 편하게 찾고 싶은 사용자를 위한 서비스입니다.',
        problems: [
          {
            title: '세차할 시점을 판단하기 어려움',
            description: '세차 직후 비가 오는 경험을 줄이려면 주간 날씨와 세차 여부를 함께 살펴볼 필요가 있었습니다.',
          },
          {
            title: '따로 찾아야 하는 주변 정보',
            description: '원하는 위치의 세차장·정비소와 주변 음식점·카페를 하나의 흐름에서 확인할 수 있는 환경이 필요했습니다.',
          },
          {
            title: '번거롭게 느껴지는 차량 관리',
            description: '장소를 찾는 일에서 세차 후 방문지까지 연결해, 세차를 단순히 끝내야 하는 일 이상의 경험으로 만들고자 했습니다.',
          },
        ],
        objective: '날씨와 위치 기반 정보를 연결해 세차 시기·시설·주변 방문지를 함께 결정할 수 있는 차량 관리 서비스 구축',
        flow: ['공공데이터 가공', '날씨와 위치 확인', '업체·주변 장소 탐색', '용품·길찾기 연결'],
        goalsTitle: '차량 관리의 흐름을 잇는 네 가지 설계 목표',
        goals: [
          { title: '날씨 기반 판단', description: '주간 날씨를 바탕으로 세차에 적합한 시기를 판단할 수 있게 하기' },
          { title: '위치 기반 시설 탐색', description: '공공데이터의 세차장·정비소를 현재 위치와 지정 위치에서 찾을 수 있게 하기' },
          { title: '세차 후 경험 연결', description: '선택한 시설 주변 음식점·카페를 함께 제공해 이후 동선을 계획하게 하기' },
          { title: '다음 행동으로 연결', description: '용품 구매처와 시설 길찾기를 연결해 탐색 이후의 행동을 돕기' },
        ],
      },
      publicData: {
        title: '업체 공공데이터를 서비스에서 조회할 수 있도록',
        description: '세차장과 정비소 원천 자료에서 서비스에 필요한 항목을 선택하고, 정제한 데이터를 MariaDB의 업체 테이블로 연결했습니다.',
        datasets: [
          {
            category: '세차장',
            name: '생활밀착데이터 중 세차장정보',
            description: '지방자치단체에 등록된 세차 서비스 업체 정보',
            size: '약 14,700개',
            updateCycle: '매월 초',
            provider: '행정안전부',
            attributes: ['사업장명', '세차유형', '전화번호', '위도·경도', '휴무일', '운영시간'],
            href: 'https://www.localdata.go.kr/lif/lifeCtacDataView.do',
          },
          {
            category: '정비소',
            name: '전국자동차정비업체표준데이터',
            description: '자동차관리사업등록증을 발급한 자동차정비업체 정보',
            size: '약 35,000개',
            updateCycle: '반기',
            provider: '지방자치단체 · 소관 국토교통부',
            attributes: ['업체명', '정비업체종류', '주소', '위도·경도', '사업등록일자', '면적'],
            href: 'https://www.data.go.kr/data/15028204/standard.do',
          },
        ],
        note: '원천 데이터 규모와 제공기관의 갱신 주기는 프로젝트 자료 기준입니다.',
        processing: {
          title: '필요한 열 선택부터 MariaDB 연결까지',
          description: '파일마다 다른 구조를 서비스의 업체 정보로 맞추기 위해 필요한 열, 필수값과 좌표 형식을 정리했습니다.',
          steps: [
            { title: '원천 파일 읽기', description: 'pandas의 read_csv·read_excel로 CSV·엑셀 자료를 불러옵니다. 정비소 CSV에는 cp949 인코딩을 지정했습니다.' },
            { title: '필요한 열 선택', description: 'usecols와 컬럼 선택으로 업체명·업종·주소·좌표·전화번호 등 화면과 조회에 필요한 항목을 남깁니다.' },
            { title: '결측값·자료형 정리', description: 'dropna로 사업장명·업종명이 없는 행을 제외하고, 정비소의 위·경도는 숫자형으로 변환합니다.' },
            { title: 'DB 연결과 적재', description: 'SQLAlchemy create_engine과 PyMySQL로 MariaDB에 연결하고, to_sql을 사용해 업체 데이터를 저장하는 구조입니다.' },
          ],
          columns: [
            { name: '사업장명·업체명', purpose: '목록과 상세 화면에서 시설을 식별하는 이름' },
            { name: '업종·세차유형·정비유형', purpose: '시설의 종류와 제공 서비스를 구분하는 정보' },
            { name: '도로명주소', purpose: '업체 위치를 사용자에게 설명하는 주소' },
            { name: '위도·경도', purpose: '지도 표시와 주변 시설 탐색에 사용하는 위치 값' },
            { name: '전화번호', purpose: '선택한 업체의 연락처를 보여주는 정보' },
            { name: '휴무일·운영시간', purpose: '방문을 계획할 때 참고하는 영업 정보' },
          ],
          image: {
            src: '/images/carvery-wash-import.webp',
            alt: 'pandas로 업체 자료의 필요한 열을 선택하고 결측값을 정리해 SQLAlchemy·PyMySQL로 MariaDB에 연결하는 보고서 코드 예시',
            caption: '보고서에 수록한 필요한 열 선택 및 DB 연동 예시',
            width: 1029,
            height: 538,
          },
        },
        integrations: [
          { name: '날씨와 세차 추천', source: '중기예보 API', description: '주간 날씨와 온도를 제공하고 세차 여부를 판단할 수 있는 안내로 연결합니다.' },
          { name: '주변 음식점·카페', source: '공공데이터 기반 위치 정보', description: '선택한 시설 인근의 음식점·카페를 거리 정보와 함께 보여줍니다.' },
          { name: '세차 용품 탐색', source: '네이버 쇼핑 API', description: '차량 관리 용품 정보를 제공하고 선택한 상품의 외부 쇼핑몰로 연결합니다.' },
          { name: '지도와 길찾기', source: '카카오맵 API', description: '업체의 위치를 표시하고, 시설을 목적지로 설정한 지도 서비스로 연결합니다.' },
        ],
      },
      architecture: {
        title: '공공데이터와 외부 정보를 화면으로 연결하는 구조',
        summary: '파일로 가공한 업체 데이터는 MariaDB에서 조회하고, 날씨·쇼핑·지도 정보를 서비스 화면에 연결했습니다. 사용자는 위치를 기준으로 시설을 살펴보고 다음 방문지와 이동 경로를 정할 수 있습니다.',
        layers: [
          { name: '원천 데이터 가공', technology: 'Python · pandas', description: '공공데이터 파일에서 필요한 열을 선택하고 필수값과 좌표 자료형을 정리합니다.' },
          { name: '업체 데이터 저장', technology: 'SQLAlchemy · PyMySQL · MariaDB', description: '세차장과 정비소의 이름·유형·주소·좌표 등을 업체 테이블로 관리합니다.' },
          { name: '외부 정보 연결', technology: '중기예보 · 네이버 쇼핑 · 카카오맵 API', description: '주간 날씨, 용품, 업체 위치와 목적지 연결 기능을 제공합니다.' },
          { name: '위치 기반 웹 화면', technology: '목록 · 상세 · 지도', description: '현재·지정 위치 주변 시설과 음식점·카페를 보여주고 상세 정보, 쇼핑몰과 길찾기로 이어줍니다.' },
        ],
        image: {
          src: '/images/carvery-data-schema.webp',
          alt: '업체명, 유형, 주소, 좌표, 전화번호와 휴무일을 저장하는 세차장·정비소 MariaDB 테이블 구조',
          caption: '세차장과 정비소 정보를 나누어 관리하는 팀의 데이터베이스 구조',
          width: 806,
          height: 240,
        },
      },
      result: {
        title: '날씨 확인에서 목적지 연결까지',
        flow: ['주간 날씨', '주변 시설', '상세·근처 장소', '지도 길찾기'],
        journeyStepId: 'directions',
      },
      journeyIntro: {
        title: '날씨와 위치를 기준으로 이어지는 차량 관리',
        description: '세차 여부를 판단하고 시설을 찾은 뒤, 주변 장소와 용품을 살펴보거나 지도 서비스로 이동하는 흐름입니다.',
      },
      journey: [
        {
          id: 'weather',
          title: '주간 날씨와 세차 추천 확인',
          description: '메인 화면에서 주간 날씨, 온도와 현재 위치를 확인합니다. 날씨 정보와 함께 세차에 적합한 날인지 안내받을 수 있습니다.',
          images: [{ src: '/images/carvery-weather.webp', alt: '주간 날씨, 기온, 위치와 세차 추천 안내를 보여주는 Carvery 메인 화면', caption: '날씨를 먼저 살펴보고 주변 시설 탐색으로 이어지는 첫 화면', width: 1600, height: 900 }],
        },
        {
          id: 'car-wash',
          title: '주변 세차장과 시설 정보 탐색',
          description: '현재 위치나 지정한 위치를 기준으로 세차장을 찾습니다. 업체 카드에서 거리와 시설 정보를 비교하고, 상세 화면에서 방문에 필요한 내용을 확인합니다.',
          images: [
            { src: '/images/carvery-car-wash-list.webp', alt: '주변 세차장의 거리, 시설 유형과 영업 정보를 카드로 보여주는 목록', caption: '공공데이터를 주변 세차장 목록으로 연결한 화면', width: 1600, height: 900 },
            { src: '/images/carvery-car-wash-detail.webp', alt: '선택한 세차장의 상세 정보와 지도 위치를 보여주는 화면', caption: '선택한 세차장의 위치와 시설 정보를 확인하는 상세 조회', width: 1600, height: 900 },
          ],
        },
        {
          id: 'repair',
          title: '정비소 목록에서 상세 정보까지',
          description: '같은 위치를 기준으로 주변 정비소도 함께 탐색합니다. 카드에서 업체를 선택하면 주소와 연락처 등 정비소의 상세 정보를 확인할 수 있습니다.',
          images: [
            { src: '/images/carvery-repair-list.webp', alt: '주변 자동차 정비소의 위치와 시설 정보를 카드로 정리한 목록', caption: '정비업체 공공데이터를 위치 기반 목록으로 제공한 화면', width: 1600, height: 900 },
            { src: '/images/carvery-repair-detail.webp', alt: '선택한 정비소의 주소와 시설 상세 정보 및 지도', caption: '업체를 선택해 방문할 장소의 정보를 확인하는 정비소 상세', width: 1600, height: 900 },
          ],
        },
        {
          id: 'nearby-places',
          title: '시설 근처 음식점과 카페 연결',
          description: '선택한 세차장·정비소를 기준으로 주변 음식점과 카페를 거리 정보와 함께 보여줍니다. 차량 관리 전후로 들를 장소를 이어서 살펴볼 수 있습니다.',
          images: [
            { src: '/images/carvery-restaurants.webp', alt: '선택한 시설 근처 음식점의 거리, 주소와 영업 정보를 보여주는 카드 목록', caption: '시설 위치에서 가까운 음식점을 함께 확인하는 화면', width: 1600, height: 900 },
            { src: '/images/carvery-cafes.webp', alt: '주변 카페의 이미지, 거리와 방문 정보를 카드로 제공하는 화면', caption: '세차 후 방문할 수 있는 카페를 연결하는 화면', width: 1600, height: 900 },
          ],
        },
        {
          id: 'car-products',
          title: '용품을 살펴보고 구매처로 이동',
          description: '네이버 쇼핑 API에서 받은 세차 용품 정보를 확인합니다. 상품을 선택하면 해당 외부 쇼핑몰로 이동해 상세 정보와 구매 조건을 살펴볼 수 있습니다.',
          images: [
            { src: '/images/carvery-products.webp', alt: '상품 이미지와 정보를 보여주는 Carvery 세차 용품 목록', caption: '네이버 쇼핑 API로 제공하는 차량 관리 용품 정보', width: 1600, height: 900 },
            { src: '/images/carvery-shopping-link.webp', alt: 'Carvery에서 선택한 세차 용품의 외부 쇼핑몰 상품 페이지', caption: '상품 선택 후 연결된 외부 쇼핑몰 화면', width: 1600, height: 776 },
          ],
        },
        {
          id: 'directions',
          title: '선택한 시설을 목적지로 길찾기 연결',
          description: '시설 상세의 길찾기 버튼을 누르면 해당 업체가 목적지로 설정된 카카오맵으로 이동합니다. 사용자는 지도 서비스에서 출발지를 정하고 이동 경로를 확인할 수 있습니다.',
          images: [{ src: '/images/carvery-directions.webp', alt: '선택한 시설이 목적지로 입력된 카카오맵 길찾기 페이지', caption: '시설을 목적지로 전달하는 카카오맵 연결. 출발지는 지도 서비스에서 설정합니다.', width: 1600, height: 900 }],
        },
        {
          id: 'map-search',
          title: '지도를 움직이며 다른 지역 탐색',
          description: '지도로 찾기 화면에서는 지도 중앙을 기준으로 세차장과 정비소를 확인합니다. 지도를 이동하면 해당 위치 주변 업체 목록이 함께 바뀝니다.',
          images: [{ src: '/images/carvery-map-search.webp', alt: '지도 중심 위치와 주변 세차장·정비소 목록을 함께 보여주는 Carvery 지도 탐색 화면', caption: '지도에서 선택한 위치를 기준으로 주변 업체를 확인하는 탐색', width: 1600, height: 900 }],
        },
      ],
      technologyGroups: [
        {
          title: 'Data Processing',
          items: [
            { name: 'Python', purpose: '업체 공공데이터 파일을 읽고 정리하는 처리 언어' },
            { name: 'pandas', purpose: '필요 열 선택, 결측값 정리와 좌표 자료형 변환' },
          ],
        },
        {
          title: 'Database',
          items: [
            { name: 'MariaDB', purpose: '세차장·정비소의 위치와 시설 정보 저장' },
            { name: 'SQLAlchemy', purpose: '데이터베이스 연결 엔진과 DataFrame 적재 연결' },
            { name: 'PyMySQL', purpose: 'Python 처리 코드와 MariaDB를 연결하는 드라이버' },
          ],
        },
        {
          title: 'Service Integrations',
          items: [
            { name: '중기예보 API', purpose: '주간 날씨·기온과 세차 추천 화면에 사용할 예보 정보' },
            { name: 'Kakao Map API', purpose: '업체 지도 표시, 지도 중심 탐색과 목적지 길찾기 연결' },
            { name: 'Naver Shopping API', purpose: '차량 관리 용품 정보와 외부 쇼핑몰 링크 제공' },
          ],
        },
      ],
      contributionIntro: '저는 Carvery의 공동 프론트엔드 개발에 참여했습니다. 아래는 데이터 가공부터 서비스 화면까지 이어지는 팀의 구현 내용을 정리한 것입니다.',
      implementationChallengeTitle: '서로 다른 정보를 하나의 탐색 흐름으로 구성',
      implementationChallenge: '업체 공공데이터의 이름·주소·좌표를 서비스에서 사용할 형태로 맞추고, 날씨와 주변 장소, 상품과 지도 정보를 함께 보여주는 구성이 필요했습니다. 팀은 목록·상세·지도 화면을 통해 이 정보를 사용자의 다음 행동으로 연결했습니다.',
      contributionFlow: ['공공데이터 정리', '업체 정보 저장', '목록·상세 화면', '주변 장소·지도 연결'],
      technicalContributions: [
        { title: '프론트엔드 개발 참여', description: '공동 프론트엔드 개발에 참여했습니다. 팀 결과물은 날씨 안내, 업체 목록·상세, 용품과 지도 탐색을 제공하는 차량 관리 웹 화면입니다.' },
        { title: '업체 공공데이터의 서비스 연결', description: '팀은 세차장·정비소 자료의 필요한 열을 선택하고 결측값과 자료형을 정리해 MariaDB로 연결했습니다. 업체의 이름·유형·주소·좌표는 목록과 상세 조회의 기반이 됩니다.' },
        { title: '날씨와 위치를 함께 보여주는 화면', description: '주간 날씨와 세차 추천을 제공하고, 현재·지정 위치의 시설을 카드로 확인할 수 있게 구성했습니다. 상세 정보에서 주변 음식점·카페로 탐색을 이어갑니다.' },
        { title: '외부 서비스로 이어지는 다음 행동', description: '상품은 외부 쇼핑몰로, 시설은 목적지가 설정된 카카오맵으로 연결합니다. 지도 중심을 옮겨 다른 지역의 업체를 확인하는 탐색도 제공합니다.' },
      ],
      reflection: 'Carvery의 팀 결과물은 파일로 가공한 업체 공공데이터와 날씨·쇼핑·지도를 연결하는 웹 서비스입니다. 프론트엔드는 이 정보를 날씨 확인, 시설 선택, 주변 장소 탐색과 목적지 연결의 순서로 보여줍니다.',
      improvements: [],
    },
  },
]

export const featuredTechnologies: string[] = [
  'React', 'TypeScript', 'Vite', 'Spring Boot', 'Java', 'MongoDB', 'FastAPI', 'LangChain', 'Docker',
]

export interface TechnicalSkill {
  id: string
  category: string
  items: string[]
  tasks: string[]
  projectIds: string[]
}

export const skills: TechnicalSkill[] = [
  {
    id: 'backend',
    category: '서버 개발',
    items: ['Java', 'Spring Boot'],
    tasks: [
      '워크플로우 템플릿의 초기 데이터와 생성 기능을 보완했습니다.',
      '화면의 설정값이 API 요청·저장 데이터·실행 모델에 동일하게 전달되도록 필드를 점검했습니다.',
    ],
    projectIds: ['flowify'],
  },
  {
    id: 'frontend',
    category: '웹 화면 개발',
    items: ['React', 'TypeScript', 'Vite', 'JavaScript', 'HTML'],
    tasks: [
      '인재 검색·상세 화면에서 AI 매칭 근거와 프로필 정보를 함께 표시했습니다.',
      'useLazyApi로 정형 데이터를 먼저 표시하고 AI 응답 대기 상태를 따로 처리했습니다.',
    ],
    projectIds: ['experfolio', 'flowify'],
  },
  {
    id: 'ai-services',
    category: 'AI 서비스 연동',
    items: ['FastAPI', 'LangChain'],
    tasks: [
      'AI 프롬프트에 전달하는 입력 필드와 결과 형식을 보완했습니다.',
      '반복 처리 결과가 AI 입력과 Gmail·Notion·Discord 출력으로 전달되는 과정을 점검했습니다.',
    ],
    projectIds: ['flowify'],
  },
  {
    id: 'data-deployment',
    category: '데이터·개발 환경',
    items: ['MongoDB', 'Docker', 'Git', 'GitHub'],
    tasks: [
      '워크플로우 설정과 실행 데이터의 저장 구조를 다뤘습니다.',
      'Docker로 분리된 서비스 실행 환경을 사용하고 GitHub로 코드 변경을 관리했습니다.',
    ],
    projectIds: ['flowify'],
  },
]

export const experience: {
  period: string
  title: string
  organization: string
  description: string
  type: 'education' | 'project'
}[] = [
  {
    period: '현재 · 4학년',
    title: '컴퓨터소프트웨어 전공',
    organization: '금오공과대학교',
    description:
      '백엔드 개발을 중심으로 공부하며, AI를 접목한 웹 서비스와 RAG 활용 기술에 관심을 두고 있습니다.',
    type: 'education',
  },
  {
    period: '2026.03 — 2026.05',
    title: 'Flowify',
    organization: '창의융합종합설계 · 4인 팀',
    description:
      '계획·분석 PL로 요구사항을 정리하고, 템플릿과 API·실행 엔진을 연결하는 기능 구현 및 검증에 참여했습니다.',
    type: 'project',
  },
  {
    period: '2025.09 — 2025.12',
    title: 'Experfolio',
    organization: '종합설계 · 4인 팀',
    description:
      'AI 검색·인재 상세 조회 화면을 구현하고, 자유 서술과 구조화된 관리를 결합한 포트폴리오 섹션 방식을 제안했습니다.',
    type: 'project',
  },
]
