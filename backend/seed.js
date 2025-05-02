require('./db');
const Chart = require('./models/chart');

(async () => {
  await Chart.deleteMany({});
  await Chart.create([
    {
      name: 'summary',
      labels: ['2013','2014','2015','2016','2017','2018','2019',
               '2020','2021','2022','2023','2024','2025F','2026F'],
      datasets: { values: [77,81,90,100,102,110,119,124,125,138,159,179,194,197] }
    },
    {
      name: 'reports',
      labels: ['2014','2015','2016','2017','2018','2019',
               '2020','2021','2022','2023','2024'],
      datasets: {
        inflation: [1.6,0.1,1.3,2.1,2.4,1.8,1.2,4.7,8.0,4.1,3.0],
        fedRate:   [0.1,0.1,0.4,1.1,2.3,2.1,0.5,0.1,2.3,5.0,5.1],
        debt:      [345,360,380,400,420,445,460,495,535,550,600]
      }
    }
  ]);
  console.log('✔ Seeded charts collection');
  process.exit(0);
})();