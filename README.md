# SSAFY 7기 자율 프로젝트 A101

---

# 카룸(Carum)

![image](https://user-images.githubusercontent.com/102236836/205561092-64b147ec-0ed8-4758-8f3e-f8d265762849.png)

### 소중한 나를 위한 방

**펫과 상호작용하고 방을 꾸미며 감정일기를 작성할 수 있는 힐링 서비스**

---

## 1. 서비스 개요

### 기획 배경 & 목적

현대인에게 자신의 감정을 잘 파악하고 조절하는 것이 중요하다고 생각했습니다.

그래서 감정을 다스리는데 효과적인 여러가지 요소들을 고민해보다 본인의 감정을 파악하는데 큰 도움을 주는 감정 일기를 중심으로 잡았고 이를 통해 유저들이 감정을 일기로 써내려가면서 파악하고 다스릴 수 있게 되는 것을 목적으로 하였습니다.

거기에 더해서 단순히 감정을 아는 것 많이 아니라 감정을 관리하는데 도움을 줄 요소들을 추가했습니다.

- 아지트의 개념으로 유저 한 사람만을 위한 방을 만들기로 하였는데 이 때 방을 꾸밀 수 있는 기능을 추가하여 개인만의 공간이라는 느낌을 주게 되어서 그 사람에게 편안함을 안식처의 느낌을 주게 하였습니다.

  또한 유저에게 방을 여러 개를 주어서 자신의 오늘 감정에 따라 방을 바꿔서 지낼 수 있는 기능도 추가하였습니다.

  마지막으로 각 방마다의 음악리스트가 존재하며 자신의 원하는 노래들로 추가할 수 있는데 이를 통해서 단순히 시각적으로만 감정에 접근하는 것이 아닌 좀 더 다양한 방법으로의 감정을 달래줄 수 있는 기능이 되게끔 하였습니다.

- 유저가 쓴 일기를 토대로 대화하는 펫을 추가하였는데 이는 펫과 소통하고 교감하면서 얻는 정서적 안정감을 기대해서 기능으로 추가하게 됐습니다.
  펫은 유저에 일기 내용에 따라 다양한 감정 대화를 시도하고 모습이 변화하여 유저로 하여금 실제 내 감정을 이해하는 펫이라는 느낌을 주게 하였습니다.
  또한 펫이 유저의 방을 돌아다니며 귀엽게 노는 모습 등을 통해서 정서적 안정감을 줄 수 있게 하였습니다.

### 대상

- 힐링과 공감이 필요한 사람
- 내 감정을 글로 기록하며 정리하고 싶은 사람
- 나만의 휴식 공간이 필요한 사람

## 2. 기능 소개

---

### 시작 화면

---

![login](image&gif/login.gif)

---

### WEB

---

### 다이어리

![write_diary](image&gif/write_diary.gif)

- editor를 사용하여 이미지 첨부 등 기능을 사용하여 일기를 적을 수 있습니다.
- 오늘의 감정을 체크할 수 있습니다.
- 일기를 쓰다보면 일기를 분석하여 펫이 다양한 말을 걸어옵니다.
- 하루 한 번 첫 일기를 쓰면 가구를 살 수 있는 포인트를 얻게 됩니다.

![edit_diary](image&gif\edit_diary.gif)

- 당일 날 적은 일기는 수정할 수 있습니다.

### 기록 조회

![calendar](https://user-images.githubusercontent.com/102236836/205564633-e5d9ed03-5dbe-420d-9a8a-1832d8bb9a3c.gif)

- 월, 주 별로 일기를 조회할 수 있으며 감정 상태를 이모티콘으로 직관적으로 확인할 수 있습니다.
- 날짜를 클릭하여 일기 상세보기 시 수정과 비우기 등이 가능합니다.

![pet](image&gif/pet.gif)

- 월마다의 감정을 종합한 최종 모습의 펫이 기록되며 클릭하면 달의 감정 수치들을 확인할 수 있습니다.
- 그래프를 통해 한눈에 파악 가능합니다.

### 상점

![purchase](image&gif/purchase.gif)

- 포인트를 사용하여 가구를 구매할 수 있습니다. 이미 구매한 가구는 구매한 표시가 되고 구매 불가합니다.

![search_furniture](image&gif/search_furniture.gif)

- 카테고리 별로 구분되고 카테고리 내에서는 검색이 가능합니다.

---

### UNITY

---

### 방 설정 & 이동

![move_room](image&gif/move_room.gif)

- WEB의 방 이동을 통해 여러 방을 변경할 수 있습니다.

![edit_room_info](image&gif/edit_room_info.gif)

- default 방 설정을 하여 자동으로 들어가는 방을 정할 수 있고 방 정보 버튼을 눌러 정보 수정이 가능합니다.

### 방 꾸미기

![interior](image&gif/interior.gif)

- 톱니바퀴 버튼을 통해 방의 기본 틀과 조명을 설정할 수 있습니다.
- 구매한 가구들로 방을 꾸밀 수 있습니다.
- UI를 통해 가구들을 상점과 동일한 카테고리로 접근할 수 있습니다. 물건을 클릭하면 배치 모드로 들어갑니다.
- 클릭을 통한 자동 배치, 축 이동 조작, 물체 회전 등의 다양하고 세밀한 동작들을 지원하여 방을 원하는 모습으로 마음껏 커스터마이징 할 수 있습니다.

![re_interior](image&gif/re_interior.gif)

- 이미 배치한 물건들도 인테리어 모드를 통해 위치를 수정하거나 제거할 수 있습니다.

### 음악

![music](image&gif/music.gif)

- 재생할 수 있는 음악 리스트가 왼쪽에 표시되며 제목 클릭 시 미리 들어볼 수 있으며 음악들은 버튼을 통해 플레이리스트에 추가 삭제 가능합니다.
- 오른쪽 밑 컨트롤러를 통해 간단한 음악 조정이 가능하며 플레이 리스트 음악을 클릭 시에도 재생 정지가 가능합니다.
- x버튼을 누르고 나가면 저장되며 방을 이동할 시 그 방에 플레이리스트가 불러와 지며 자동 재생됩니다.

### 펫

![pet](image&gif/pet.gif)

- 기본적으로 자동으로 움직이며 다양한 동작들을 취합니다.
- 펫 클릭시 펫이 다양한 말을 걸면서 표정을 짓습니다.
- 방 바닥을 클릭하면 펫이 그 방향으로 이동하게 됩니다.
- 카메라 모양 버튼을 클릭해서 방 전체 관찰 시점과 펫 관찰 시점을 원하는 대로 조절할 수 있습니다.

---

---

### 기능 명세서

![Untitled](https://lab.ssafy.com/s07-final/S07P31A101/uploads/bc1d4b4cd2b6da07e8b59bdf9335ac30/Untitled.png)
![Untitled_1](https://lab.ssafy.com/s07-final/S07P31A101/uploads/aa1b788f1e4abe3fac8e63eb7b8eb254/Untitled_1.png)

---

## 3. 개발 환경 및 구성

---

### 아키텍쳐

![architecture](https://lab.ssafy.com/s07-final/S07P31A101/uploads/2b18602c945c9c3b3caedaf2ed0d51eb/_EC_A0_9C_EB_AA_A9__EC_97_86_EB_8A_94__EB_8B_A4_EC_9D_B4_EC_96_B4_EA_B7_B8_EB_9E_A8.drawio__2_.png)

### 폴더 구조

![file](https://lab.ssafy.com/s07-final/S07P31A101/uploads/617c37e04a19a9f26f2b837f938f606f/file.png)

### 개발 환경

✔ **Unity**

- Unity 2021.3.11f1
- C# , WebGL

✔ **Back-End**

- spring boot 2.7.4
- mysql 5.7
- jdk 11
- redis

✔ **Front-End**

- HTML5, CSS, JavaScript(ES6)
- Node.js 16.17.0
- React 18.2.0
- React-Redux 8.0.4
- React-Router-Dom 6.3.0

### API

![Untitled_2](https://lab.ssafy.com/s07-final/S07P31A101/uploads/8f5797b18df12a12fe4888b8c7941d74/Untitled_2.png)

---

## 4. 협업툴

---

### Jira

- 매 주 월요일 할 일 파악 후 이슈를 등록하고 스프린트를 시작하여 프로젝트를 체계적으로 완성해나가도록 하였습니다.

### Notion

- 회의록, 프로젝트 명세, API 등을 정리하고 문서화했습니다.
- 매일 아침 데일리 스크럼을 통해 프로젝트 진행 상황을 공유했습니다.

### GitLab

- Branch
  - main, develop, fontend, backend, feature
  - feature 브랜치 이름: fe,be/기능, 화면
- Commit
  - 태그
  | feat     | 새로운 기능                                                                       |
  | -------- | --------------------------------------------------------------------------------- |
  | fix      | 오류 수정                                                                         |
  | docs     | 문서 관련                                                                         |
  | style    | 코드의 변화와 관련없는 포맷이나 세미콜론을 놓친 것과 같은 부분                    |
  | refactor | 코드 리팩토링                                                                     |
  | test     | 테스트 추가 및 수정                                                               |
  | chore    | build와 관련된 부분, 패키지 매니저 설정 등 여러가지 production code와 무관한 부분 |
  - [FEAT] add / modify / delete… 기능
- PR
  - [MR] 지라 이슈 번호(없으면 000) 기능

### PlasticSCM (UNITY 관리 툴)

- Branch
  - main, dev
  - feature 브랜치 이름: dev/기능

---

## 5. 팀원 소개

---

![_ED_8C_80_EC_9B_90_EC_86_8C_EA_B0_9C](https://lab.ssafy.com/s07-final/S07P31A101/uploads/c744cc65755bd1f89697e0d131309a3b/_ED_8C_80_EC_9B_90_EC_86_8C_EA_B0_9C.png)
