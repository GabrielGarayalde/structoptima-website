// CREATED 22/04/2023 - VALUES NEED TO BE CHECKED

const UC = [
  // ["0",     "1x",  "2x", "3x", "4x",   "5x",    "6x",   "7x",  "8x",  "9x",    "10x",     "11x",    "12x",    "13x",    "14x",   "15x",     "16x",    "17x",    "18x",    "19",  "20",  "21", "22",     "23", "24",      "25"]
  // ["Shape", "kg/m","d", "bf",  "tf",   "tw",    "r1",   "d1",  "Ag",      "Ix",     "Zx",     "Sx",     "rx",     "Iy",     "Zy",     "Sy",     "ry",      "J",     "Iw", "fyf", "fyw", "kf", "Comp_x", "Zex", "Comp_y", "Zey"]
  [
    "310UC158",
    158,
    327,
    311,
    25,
    15.7,
    16.5,
    277,
    20100,
    3.88e8,
    2.37e6,
    2.68e6,
    1.39e2,
    1.25e8,
    8.07e5,
    1.23e6,
    7.89e2,
    3.81e6,
    2.86e12,
    280,
    300,
    1,
    "C",
    2.68e6,
    "C",
    1.21e6,
  ],
  [
    "310UC137",
    137,
    321,
    309,
    21.7,
    13.8,
    16.5,
    277,
    17500,
    3.29e8,
    2.05e6,
    2.3e6,
    1.37e2,
    1.07e8,
    6.91e5,
    1.05e6,
    7.82e2,
    2.52e6,
    2.39e12,
    280,
    300,
    1,
    "C",
    2.3e6,
    "C",
    1.04e6,
  ],
  [
    "310UC118",
    118,
    315,
    307,
    18.7,
    11.9,
    16.5,
    277,
    15000,
    2.77e8,
    1.76e6,
    1.96e6,
    1.36e2,
    9.02e7,
    5.88e5,
    8.93e5,
    7.75e2,
    1.63e6,
    1.98e12,
    280,
    300,
    1,
    "C",
    1.96e6,
    "C",
    8.82e5,
  ],
  [
    "310UC96.8",
    96.8,
    308,
    305,
    15.4,
    9.9,
    16.5,
    277,
    12400,
    2.23e8,
    1.45e6,
    1.6e6,
    1.34e2,
    7.29e7,
    4.78e5,
    7.25e5,
    7.67e2,
    9.28e5,
    1.56e12,
    300,
    320,
    1,
    "N",
    1.56e6,
    "N",
    6.94e5,
  ],
  [
    "250UC89.5",
    89.5,
    260,
    256,
    17.3,
    10.5,
    14.0,
    225,
    11400,
    1.43e8,
    1.11e6,
    1.23e6,
    1.12e2,
    4.84e7,
    3.78e5,
    5.75e5,
    6.52e2,
    1.04e6,
    7.13e11,
    280,
    320,
    1,
    "C",
    1.23e6,
    "C",
    5.67e5,
  ],
  [
    "250UC72.9",
    72.9,
    254,
    254,
    14.2,
    8.6,
    14.0,
    225,
    9320,
    1.14e8,
    8.97e5,
    9.92e5,
    1.11e2,
    3.88e7,
    3.06e5,
    4.63e5,
    6.45e2,
    5.86e5,
    5.57e11,
    300,
    320,
    1,
    "N",
    9.86e5,
    "N",
    4.54e5,
  ],
  [
    "200UC59.5",
    59.5,
    210,
    205,
    14.2,
    9.3,
    11.4,
    181,
    7620,
    6.13e7,
    5.84e5,
    6.56e5,
    8.97e1,
    2.04e7,
    1.99e5,
    3.03e5,
    5.17e2,
    4.77e5,
    1.95e11,
    300,
    320,
    1,
    "C",
    6.56e5,
    "C",
    2.99e5,
  ],
  [
    "200UC52.2",
    52.2,
    206,
    204,
    12.5,
    8.0,
    11.4,
    181,
    6660,
    5.28e7,
    5.12e5,
    5.7e5,
    8.91e1,
    1.77e7,
    1.74e5,
    2.64e5,
    5.15e2,
    3.25e5,
    1.66e11,
    300,
    320,
    1,
    "C",
    5.7e5,
    "C",
    2.6e5,
  ],
  [
    "200UC46.2",
    46.2,
    203,
    203,
    11.0,
    7.3,
    11.4,
    181,
    5900,
    4.59e7,
    4.51e5,
    5.0e5,
    8.82e1,
    1.53e7,
    1.51e5,
    2.3e5,
    5.1e2,
    2.28e5,
    1.42e11,
    300,
    320,
    1,
    "N",
    4.94e5,
    "N",
    2.23e5,
  ],
  [
    "150UC37.2",
    37.2,
    162,
    154,
    11.5,
    8.1,
    8.9,
    139,
    4730,
    2.22e7,
    2.74e5,
    3.1e5,
    6.84e1,
    7.01e6,
    9.1e4,
    1.39e5,
    3.85e2,
    1.97e5,
    3.96e10,
    300,
    320,
    1,
    "C",
    3.1e5,
    "C",
    1.37e5,
  ],
  [
    "150UC30.0",
    30.0,
    158,
    153,
    9.4,
    6.6,
    8.9,
    139,
    3860,
    1.76e7,
    2.23e5,
    2.5e5,
    6.75e1,
    5.62e6,
    7.34e4,
    1.12e5,
    3.81e2,
    1.09e5,
    3.08e10,
    320,
    320,
    1,
    "C",
    2.5e5,
    "C",
    1.1e5,
  ],
  [
    "150UC23.4",
    23.4,
    152,
    152,
    6.8,
    6.1,
    8.9,
    139,
    2980,
    1.26e7,
    1.66e5,
    1.84e5,
    6.51e1,
    3.98e6,
    5.24e4,
    8.02e4,
    3.66e2,
    5.02e4,
    2.11e10,
    320,
    320,
    1,
    "N",
    1.76e5,
    "N",
    7.35e4,
  ],
  [
    "100UC14.8",
    14.8,
    97,
    99,
    7,
    5,
    10,
    83,
    1890,
    3.18e6,
    6.56e4,
    7.44e4,
    4.11e1,
    1.14e6,
    2.29e4,
    3.52e4,
    2.45e2,
    3.49e4,
    2.3e9,
    320,
    320,
    1,
    "C",
    7.44e4,
    "C",
    3.44e4,
  ],
];

export default UC;
