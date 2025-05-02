import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import {
  ChartConfiguration,
  ChartType,
  ChartDataset
} from 'chart.js';
import { ChartService } from '../../services/chart.service';

@Component({
  standalone: true,
  selector: 'app-reports',
  template: `
    <canvas baseChart
            [data]="chartData"
            [options]="chartOpts"
            [type]="chartType"></canvas>

    <p class="caption">
      This chart illustrates the relationship between <em>inflation</em>, <em>interest rates</em>, and <em>utility debt
      levels</em> in the U.S. power sector from <strong>2014</strong> to <strong>2024</strong>. Utility debt, shown in purple,
      has risen steadily to surpass <strong>$600 billion</strong> by 2024. This increase reflects the economic impact of events
      such as the <em>COVID-19 pandemic</em> and the <em>Russia-Ukraine war</em>, which contributed to higher costs for
      materials, labor, and fuel. Inflation, represented by the teal line, spiked around <strong>2022</strong>, while the
      federal interest rate, shown in blue, also increased significantly. These conditions have made it more expensive for
      utilities to borrow, especially for <em>capital-intensive renewable energy projects</em> that depend on debt financing.
      The chart underscores the growing financial pressure on utilities as they work to modernize infrastructure and meet rising
      clean energy demands.
    </p>
  `,
  imports: [NgChartsModule]
})
export class ReportsComponent {

  chartType: ChartType = 'line';

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],        // years
    datasets: []       // three lines added in constructor
  };

  /* separate right‑side axis for debt */
  chartOpts: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Years' } },
      y:   { position: 'left',  title: { display:true, text:'Percent'} },
      y1:  { position: 'right', title: { display:true, text:'USD billions' },
             grid: { drawOnChartArea:false } }
    }
  };

  constructor(cs: ChartService) {
    cs.getReports().subscribe({
      next: (d) => {
        /* build three line datasets */
        const ds: ChartDataset<'line'>[] = [
          /* Inflation % */
          {
            data: d.inflation,
            label: 'Annual inflation (in percentage)',
            yAxisID: 'y',
            borderColor: '#0072B5',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#00507F'
          },
          /* Fed rate % */
          {
            data: d.fedRate,
            label: 'Federal interest rate (in percentage)',
            yAxisID: 'y',
            borderColor: '#D982B5',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#c34b8c'
          },
          /* Utility debt */
          {
            data: d.debt,
            label: 'Utility debt (in US dollars)',
            yAxisID: 'y1',
            borderColor: '#B284BE',
            backgroundColor: 'transparent',
            pointBackgroundColor: '#7B679A'
          }
        ];

        this.chartData = { labels: d.labels, datasets: ds };
      },
      error: (err) => {
        console.error('Error fetching chart data:', err);

        // Display appropriate error message based on the error status
        if (err.status === 404) {
          alert('Chart data not found in the database. Please run the seed script to populate the database.');
        } else if (err.status === 403) {
          alert('Authentication error. Please log in again.');
        } else {
          alert('Failed to load chart data from the database. Please check your database connection.');
        }
      }
    });
  }
}
/* Annual inflation (in percentage), Federal interest rate (in percentage), Utility debt (in US dollars) */
