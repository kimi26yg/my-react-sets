Todolist 앱 디자인 명세서 (Design Spec)
React와 Tailwind CSS를 사용한다고 가정했을 때의 명세서입니다.

[기본 테마 정보]
컨셉: "Sophisticated Dark & Mono" (고급스러운 다크 모드와 모노톤의 조화)

메인 컬러: #000000 (Pure Black) 또는 #0A0A0B (Rich Black)

포인트 컬러: #E2FF47 (Electric Lime) - 단 하나의 강조색만 사용하여 시선을 유도합니다.

보조 컬러: #27272A (Zinc-800) - 카드 배경이나 구분선용.

[컴포넌트 명세]
구분,디자인 가이드라인,비고
Layout,Max-width 768px 중앙 집중형 레이아웃,모바일-퍼스트 대응
Header,"현재 날짜와 사용자 이름 (Semi-bold, 32px)",상단 여백 64px 확보
Input Bar,테두리(Border) 대신 미세한 배경색 차이만 사용,Focus 시 포인트 컬러로 언더라인
Task Item,유리창 느낌의 Glassmorphism (투명도 5%) 적용,Hover 시 살짝 떠오르는 Shadow 효과
Status Tag,둥근 모서리가 아닌 'Angular Corner' (2px 정도만 라운딩),AI 특유의 둥글둥글함을 탈피

[기능적 요구사항]
Drag & Drop: dnd-kit을 활용한 부드러운 순서 변경.

Filter Tabs: All, Active, Completed를 텍스트가 아닌 미니멀한 아이콘이나 점(Dot)으로 표현.

Empty State: 할 일이 없을 때 뻔한 캐릭터 일러스트 대신, "No tasks. Enjoy your coffee." 같은 감각적인 문구와 타이포그래피만 배치.

디자인 영감을 위한 한 마디
"Less is more, but with better details."
장식을 더하기보다는, 각 요소 사이의 **간격(Gap)**과 **서체의 자간(Letter spacing)**을 조정하는 데 더 많은 시간을 투자해 보세요.
