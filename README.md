# ☕ Cafe Landing Page Template

카페/음식점 소상공인을 위한 React 랜딩 페이지 템플릿입니다.

## 🚀 Live Demo

> Vercel 배포 후 링크 추가 예정

## ✨ 주요 기능

- **반응형 네비게이션** — 스크롤 시 투명 → 불투명 전환, 모바일 햄버거 메뉴
- **히어로 섹션** — 배경 이미지 + 다크 오버레이 + 스크롤 트리거 애니메이션
- **메뉴 섹션** — 카드 그리드, 호버 이미지 줌 효과
- **위치 안내** — 영업시간, 연락처, 지도 플레이스홀더
- **문의 폼** — 유효성 검사, 전화번호 필드
- **푸터** — SNS 링크, 링크 그룹

## 🛠 기술 스택

- React 18 + Vite
- Tailwind CSS (커피 커스텀 팔레트)
- Lucide React (아이콘)

## 📦 설치 및 실행

```bash
npm install
npm run dev
```

## 🎨 커스터마이징

- **카페명**: `src/App.jsx`에서 `Cozy Café` 변경
- **메뉴 데이터**: `menuItems` 배열 수정
- **이미지**: `public/images/` 폴더 교체
- **색상**: `tailwind.config.js`의 `coffee` 팔레트 수정
- **연락처**: App.jsx Location 섹션 수정
