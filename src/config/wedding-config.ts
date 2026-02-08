const uniqueIdentifier = "JWK-WEDDING-TEMPLATE-V1";

export const weddingConfig = {
  meta: {
    title: "❤️우리 결혼 합니다❤️",
    description: "2026년 5월 23일 토요일 12시 30분",
    ogImage: "https://jgyuchan.github.io/wedding/images/main.jpg", 
    noIndex: true,
    // 빨간 에러의 원인이었습니다. 이 줄이 meta 안에 정확히 있어야 합니다!
    _jwk_watermark_id: uniqueIdentifier, 
  },

  main: {
    title: "Wedding Invitation",
    image: "https://jgyuchan.github.io/wedding/images/main.jpg", 
    date: "2026년 5월 23일 토요일 12시 30분",
    venue: "원미동교회 본당"
  },

  intro: {
    title: "OUR WEDDING",
    text: "서로를 바라보며 걸어온\n소중한 발걸음이\n이제 하나의 길로 이어집니다.\n\n사랑과 믿음으로\n새 가정을 이루는 저희 두 사람의\n작은 시작을 알려드립니다."
  },

  date: {
    year: 2026, month: 5, day: 23, hour: 12, minute: 30,
    displayDate: "2026.05.23 SAT PM 12:30",
  },

  venue: {
    name: "원미동장로교회", // 지도 검색용 (가장 정확한 명칭)
    displayName: "원미동교회 본당", // 화면 표시용
    address: "경기도 부천시 원미구 원미로164번길 19-19",
    tel: "032-657-2323",
    naverMapId: "원미동장로교회", 
    coordinates: { latitude: 37.497858, longitude: 126.792912 },
    placeId: "12143003", 
    mapZoom: "17",
    transportation: {
      subway: "1호선 부천역 3번 출구 -> 소신여객터미널 일반버스 3번 탑승",
      bus: "○ 부천역에서 오실 때\n· 1호선 전철역 3번 출구 나오셔서 소신여객터미널에서\n· 일반버스 3 탑승 ⇒ 조마루삼거리 교회 앞 하차\n\n○ 부천종합운동장에서 오실 때\n· 7호선 전철역 4번 출구 종합운동장역 앞 버스정류장\n· 마을버스 013-1, 013-2\n· 일반버스 3, 56-1 탑승 ⇒ 조마루삼거리 교회 앞 하차",
    },
    parking: "교회 주차장 이용 가능",
    groomShuttle: { location: "", departureTime: "", contact: { name: "", tel: "" } },
    brideShuttle: { location: "", departureTime: "", contact: { name: "", tel: "" } }
  },

  gallery: {
    layout: "grid",
    position: "bottom",
    images: [
      "https://jgyuchan.github.io/wedding/images/1.jpg",
      "https://jgyuchan.github.io/wedding/images/2.jpg",
      "https://jgyuchan.github.io/wedding/images/3.jpg",
      "https://jgyuchan.github.io/wedding/images/4.jpg",
      "https://jgyuchan.github.io/wedding/images/5.jpg",
      "https://jgyuchan.github.io/wedding/images/6.jpg",
    ],
  },

  invitation: {
    message: "저희 두 사람이 사랑과 믿음으로\n한 가정을 이루게 되었습니다.\n바쁘시더라도 부디 오셔서\n저희의 앞날을 축복해 주시고\n격려해 주시면 더없는 기쁨이 되겠습니다.\n\n※쾌적한 예식 진행을 위해 화환은 정중히 사양하오니 축하해 주시는 따뜻한 마음만 감사히 받겠습니다.",
    groom: { 
      name: "정규찬", label: "차남", tel: "010-8910-5167",
      father: "정경수", fatherTel: "010-2367-5167", 
      mother: "박윤례", motherTel: "010-3017-5167" 
    },
    bride: { 
      name: "김하영", label: "장녀", tel: "010-4230-6495",
      father: "김의경", fatherTel: "010-3774-7888", 
      mother: "김은희", motherTel: "010-6495-7888" 
    },
  },

  account: {
    groom: { bank: "신한은행", number: "110-229-196887", holder: "정규찬" },
    bride: { bank: "농협", number: "171052-51-025452", holder: "김하영" },
    groomFather: { bank: "농협", number: "302-1411-2518-01", holder: "정경수" },
    groomMother: { bank: "하나은행", number: "406-910829-53407", holder: "박윤례" },
    brideFather: { bank: "농협", number: "171052-51-073700", holder: "김의경" },
    brideMother: { bank: "농협", number: "171052-52-014958", holder: "김은희" }
  },

  rsvp: { enabled: false, showMealOption: false },
  slack: { webhookUrl: "", channel: "", compactMessage: true },
};
