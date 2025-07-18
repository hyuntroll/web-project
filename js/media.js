const itemContainer = document.querySelector(".items");
const videos = [
    {
      "id": 1,
      "name": "공정무역이란 무엇인가요?",
      "video_id": "8x7N_L-9Ux8",
      "description": "세계시민교육용 공정무역 기본 소개 영상입니다."
    },
    {
      "id": 2,
      "name": "국제공정무역기구 Farmers 트레일러",
      "video_id": "EL0DABX6kRk",
      "description": "페루·케냐·인도네시아 생산자들의 일상과 도전을 담은 다큐 시리즈 예고편"
    },
    {
      "id": 3,
      "name": "공정무역 #가치소비 커피 다큐",
      "video_id": "eLENOv0PR_I",
      "description": "르완다 커피 농가의 현실과 공정무역의 필요성을 다룬 안동MBC 특집 다큐"
    },
    {
      "id": 4,
      "name": "공정무역 이야기",
      "video_id": "KULSZU8L1kw",
      "description": "Fairtrade Korea에서 공개한 공정무역 전반 이야기 영상입니다."
    },
    {
      "id": 5,
      "name": "카카오농장 아동노동 사례와 공정무역 스토리",
      "video_id": "FjCixtbd4M8",
      "description": "코트디부아르 어린이 노동과 공정무역 대안 이야기를 다루는 교육 키트 영상"
    },
    {
      "id": 6,
      "name": "사람을 위한 거래, 공정무역",
      "video_id": "2WdCZcYdPwo",
      "description": "‘아침이 좋다’ 방송에서 소개한 공정무역 메시지 중심 영상입니다."
    }
  ]
  ;


videos.forEach(pro => {
    const item = document.createElement("div");
    item.className = "item";
    
    const a = document.createElement("a");
    a.href = `https://www.youtube.com/watch?v=${pro.video_id}`;
    a.target = "_blank";
    const VideoContainer = document.createElement("div");
    VideoContainer.className = "video";
    const img = document.createElement("img");
    img.src = `https://img.youtube.com/vi/${pro.video_id}/0.jpg`;
    VideoContainer.append(img)
    a.appendChild(VideoContainer)
    
    const name = document.createElement("p");
    name.className = "name";
    name.textContent = pro.name;

    const desc = document.createElement("p");
    desc.className = "desc";
    desc.textContent = pro.description;

    item.append(a, name, desc);
    itemContainer.appendChild(item);
});