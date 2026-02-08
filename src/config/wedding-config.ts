const uniqueIdentifier = "JWK-WEDDING-TEMPLATE-V1";

type GalleryLayout = "scroll" | "grid";
type GalleryPosition = "middle" | "bottom";

interface GalleryConfig {
  layout: GalleryLayout;
  position: GalleryPosition;
  images: string[];
}

export const weddingConfig = {
  meta: {
    title: "❤️우리 결혼 합니다❤️",
    description: "2026년 5월 23일 토요일 12시 30분",
    ogImage: "/wedding/images/main.jpg?v=final", 
    noIndex: true,
    _jwk_watermark_id: uniqueIdentifier,
  },

  main: {
    title: "Wedding Invitation",
    image: "/wedding/images/main.jpg?v=final", // images 폴더에 있는 main.jpg
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
    name: "원미동장로교회", // 지도 검색용 (가장 정확한 검색어)
    displayName: "원미동교회 본당", // 화면에 보일 장소 이름
    address: "경기도 부천시 원미구 원미로164번길 19-19",
    tel: "032-657-2323",
    naverMapId: "원미동장로교회", 
    coordinates: { latitude: 37.497858, longitude: 126.792912 },
    placeId: "12143003", 
    mapZoom: "17",
    mapNaverCoordinates: "126.792912,37.497858,15,0,0,0,dh",
    transportation: {
      subway: "1호선 부천역 3번 출구 -> 소신여객터미널 일반버스 3번 탑승",
      bus: "조마루삼거리 교회 앞 하차\n일반버스: 3, 56-1\n마을버스: 013-1, 013-2",
    },
    parking: "교회 주차장 이용 가능",
    groomShuttle: { location: "", departureTime: "", contact: { name: "", tel: "" } },
    brideShuttle: { location: "", departureTime: "", contact: { name: "", tel: "" } }
  },

  gallery: {
    layout: "grid" as GalleryLayout,
    position: "bottom" as GalleryPosition,
    // 현재 public/images 폴더에 있는 1.jpg ~ 6.jpg를 사용합니다.
    images: [
      "/wedding/images/1.jpg?v=final",
      "/wedding/images/2.jpg?v=final",
      "/wedding/images/3.jpg?v=final",
      "/wedding/images/4.jpg?v=final",
      "/wedding/images/5.jpg?v=final",
      "/wedding/images/6.jpg?v=final",
    ],
  } as GalleryConfig,

  invitation: {
    message: "바쁘시더라도 부디 오셔서\n저희의 앞날을 축복해 주시고\n격려해 주시면 더없는 기쁨이 되겠습니다.",
    groom: { name: "정규찬", label: "차남", father: "정경수", mother: "박윤례" },
    bride: { name: "김하영", label: "장녀", father: "김의경", mother: "김은희" },
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
