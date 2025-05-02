import { Component } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import { ChartService } from '../../services/chart.service';

@Component({
  standalone: true,
  selector: 'app-summary',
  template: `
    <canvas baseChart [data]="chartData" [options]="chartOptions" [type]="chartType"></canvas>
    <p class="caption">
        The chart shows the steady rise in <em>U.S. electric and multi-utility capital expenditures</em> from
        <strong>2013</strong> to <strong>2024</strong>, with forecasts for <strong>2025</strong> and <strong>2026</strong>.
        Investments grew from <strong>$77 billion</strong> in 2013 to a record high of <strong>$179 billion</strong> in 2024.
        This growth is driven by the need to upgrade aging infrastructure, expand generation capacity, and integrate <em>clean
        energy technologies</em>. Between <strong>2019</strong> and <strong>2024</strong>, capital expenditures saw a
        compound annual growth rate of over <strong>8.5%</strong>. Projections indicate spending will reach <strong>$194
        billion</strong> in 2025 and <strong>$197 billion</strong> in 2026. Deloitte estimates that total investments
        from <strong>2025</strong> to <strong>2030</strong> could amount to <strong>$1.4 trillion</strong>, which is
        double the spending from <strong>2013</strong> to <strong>2024</strong>. Much of this funding is focused on
        <em>renewable energy development</em>, <em>smart grid systems</em>, and <em>battery storage</em> to support a
        more modern and resilient power grid.
      </p>
  `,
  imports: [NgChartsModule]
})
export class SummaryComponent {
  chartType: ChartType = 'bar';
  chartData: ChartConfiguration['data'] = { labels: [], datasets: [] };

  // Add chart options with axis configuration
  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Years',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          font: {
            weight: 'bold'
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'USD Billions',
          font: {
            size: 14,
            weight: 'bold'
          }
        },
        ticks: {
          callback: function(value) {
            return '$' + value + 'B';
          }
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return 'USD $' + context.parsed.y + ' billion';
          }
        }
      }
    }
  };

  constructor(cs: ChartService) {
    cs.getSummary().subscribe({
      next: (d) => {
        this.chartData = {
          labels: d.labels,
          datasets: [{
            data: d.values,
            label: 'Capital expenditures in USD billions',
            backgroundColor: '#D6CADD',   // bar fill
            borderColor:     '#B6B5D8',   // bar outline
            borderWidth: 1
          }]
        };
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
