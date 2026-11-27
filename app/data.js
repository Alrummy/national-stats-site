export const data = {
  population: {
    total: 283.5, provinces: 38, islands: '17,508', capital: 'Jakarta', gdp: 1.4, life: 73, literacy: 96,
    islands: [
      { name: 'Java', people: 151, share: 53.3, area: 138794, capital: 'Jakarta' },
      { name: 'Sumatra', people: 61, share: 21.5, area: 473481, capital: 'Medan' },
      { name: 'Sulawesi', people: 20, share: 7.1, area: 180681, capital: 'Makassar' },
      { name: 'Kalimantan', people: 17, share: 6.0, area: 743330, capital: 'Pontianak' },
      { name: 'Bali & Nusa Tenggara', people: 15, share: 5.3, area: 88200, capital: 'Denpasar' },
      { name: 'Papua', people: 6, share: 2.1, area: 421981, capital: 'Jayapura' },
      { name: 'Maluku', people: 3, share: 1.1, area: 74400, capital: 'Ambon' }
    ],
    age: [
      { label: '0–4', female: 10.9, male: 11.4 }, { label: '5–9', female: 11.4, male: 12.0 },
      { label: '10–14', female: 11.2, male: 11.8 }, { label: '15–19', female: 10.8, male: 11.2 },
      { label: '20–24', female: 10.7, male: 11.0 }, { label: '25–29', female: 11.0, male: 11.2 },
      { label: '30–34', female: 10.5, male: 10.7 }, { label: '35–39', female: 9.7, male: 9.9 },
      { label: '40–44', female: 8.6, male: 8.8 }, { label: '45–49', female: 7.5, male: 7.5 },
      { label: '50–54', female: 6.2, male: 6.0 }, { label: '55–59', female: 4.8, male: 4.5 },
      { label: '60–64', female: 3.5, male: 3.2 }, { label: '65–69', female: 2.4, male: 2.1 },
      { label: '70–74', female: 1.5, male: 1.2 }, { label: '75+', female: 1.6, male: 1.2 }
    ]
  },
  economy: {
    2022: { gdp: 1.32, growth: 5.31, inflation: 5.51, unemployment: 5.86, sectors: [{ name: 'Agriculture', value: 12.4 }, { name: 'Industry', value: 41.0 }, { name: 'Services', value: 46.6 }], exports: 291.9 },
    2023: { gdp: 1.37, growth: 5.05, inflation: 2.61, unemployment: 5.32, sectors: [{ name: 'Agriculture', value: 12.5 }, { name: 'Industry', value: 39.7 }, { name: 'Services', value: 47.8 }], exports: 258.8 },
    2024: { gdp: 1.40, growth: 5.03, inflation: 2.80, unemployment: 4.91, sectors: [{ name: 'Agriculture', value: 12.6 }, { name: 'Industry', value: 39.5 }, { name: 'Services', value: 47.9 }], exports: 264.7 }
  },
  geography: [
    { name: 'Kalimantan', area: 743330, note: 'Indonesian part' }, { name: 'Sumatra', area: 473481, note: 'Main island' },
    { name: 'Papua', area: 421981, note: 'Indonesian part' }, { name: 'Sulawesi', area: 180681, note: 'Main island' },
    { name: 'Java', area: 138794, note: 'Main island' }
  ],
  people: {
    literacy: 96.0, enrollment: 94.2, doctors: 0.76, hospitals: 1.18,
    life: [{ year: 2015, value: 70.8 }, { year: 2016, value: 71.0 }, { year: 2017, value: 71.1 }, { year: 2018, value: 71.2 }, { year: 2019, value: 71.3 }, { year: 2020, value: 71.5 }, { year: 2021, value: 71.6 }, { year: 2022, value: 72.1 }, { year: 2023, value: 72.4 }, { year: 2024, value: 72.9 }]
  },
  exports: ['Palm oil', 'Coal', 'Nickel', 'Garments']
};
