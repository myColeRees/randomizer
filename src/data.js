let data_style_2 = [
  { id: 1, class: "NPC", properties: [2], subclasses: [] },
  {
    id: 2,
    class: "Gear",
    properties: [],
    subclasses: [
      { id: 3, class: "Sword", properties: [], subclasses: [] },
      { id: 4, class: "Staff", properties: [], subclasses: [] },
      { id: 5, class: "Axe", properties: [], subclasses: [] },
    ],
  },
  { id: 6, class: "Damage", properties: [], subclasses: [], type: "numerical" },
];

let data = [
  {
    id: 1,
    class: "NPC",
    properties: [2],
    sublasses: [],
    superclass: null,
  },
  {
    id: 2,
    class: "Gear",
    properties: [],
    sublasses: [3, 4, 5],
    superclass: null,
  },
  {
    id: 3,
    class: "Sword",
    properties: [],
    sublasses: [],
    superclass: 2,
  },
  {
    id: 4,
    class: "Staff",
    properties: [],
    sublasses: [],
    superclass: 2,
  },
  {
    id: 5,
    class: "Axe",
    properties: [],
    sublasses: [],
    superclass: 2,
  },
];
export default data;
