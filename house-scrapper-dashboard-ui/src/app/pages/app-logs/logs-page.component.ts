import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';

interface LogEntry {
  timestamp: Date;
  level: 'Info' | 'Warning' | 'Error';
  message: string;
  component: string;
}

@Component({
  selector: 'app-logs-page',
  standalone: true,
  imports: [CommonModule, TableModule, ChartModule, CardModule, DatePipe],
  templateUrl: './logs-page.component.html',
  styleUrl: './logs-page.component.scss'
})
export class LogsPageComponent implements OnInit, OnDestroy {
  logs: LogEntry[] = [];
  chartData: any;
  chartOptions: any;
  private intervalId: any;

  ngOnInit() {
    this.generateMockLogs();
    this.setupChart();
    // Simulate dynamic updates
    this.intervalId = setInterval(() => {
      this.addRandomLog();
      this.updateChart();
    }, 10000); // every 10 seconds
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private generateMockLogs() {
    const components = ['Scraper', 'Notifier', 'API', 'Database'];
    const messages = {
      Info: ['Scraping started', 'Email sent', 'Data saved'],
      Warning: ['Rate limit reached', 'Connection slow'],
      Error: ['Scraping failed', 'Database error', 'API timeout']
    };
    for (let i = 0; i < 50; i++) {
      const level = ['Info', 'Warning', 'Error'][Math.floor(Math.random() * 3)] as 'Info' | 'Warning' | 'Error';
      this.logs.push({
        timestamp: new Date(Date.now() - Math.random() * 3600000), // last hour
        level,
        message: messages[level][Math.floor(Math.random() * messages[level].length)],
        component: components[Math.floor(Math.random() * components.length)]
      });
    }
    this.logs.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  private addRandomLog() {
    const components = ['Scraper', 'Notifier', 'API', 'Database'];
    const messages = {
      Info: ['Scraping started', 'Email sent', 'Data saved'],
      Warning: ['Rate limit reached', 'Connection slow'],
      Error: ['Scraping failed', 'Database error', 'API timeout']
    };
    const level = ['Info', 'Warning', 'Error'][Math.floor(Math.random() * 3)] as 'Info' | 'Warning' | 'Error';
    this.logs.unshift({
      timestamp: new Date(),
      level,
      message: messages[level][Math.floor(Math.random() * messages[level].length)],
      component: components[Math.floor(Math.random() * components.length)]
    });
    if (this.logs.length > 100) {
      this.logs = this.logs.slice(0, 100);
    }
  }

  private setupChart() {
    const now = new Date();
    const labels = [];
    for (let i = 59; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000);
      labels.push(time.toLocaleTimeString());
    }
    const errors = Array.from({ length: 60 }, () => Math.floor(Math.random() * 5));
    const warnings = Array.from({ length: 60 }, () => Math.floor(Math.random() * 10));

    this.chartData = {
      labels,
      datasets: [
        {
          label: 'Errors',
          data: errors,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.2)',
          fill: true
        },
        {
          label: 'Warnings',
          data: warnings,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.2)',
          fill: true
        }
      ]
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top'
        }
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: 'Time'
          }
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Count'
          },
          beginAtZero: true
        }
      }
    };
  }

  private updateChart() {
    // Shift data and add new point
    this.chartData.datasets[0].data.shift();
    this.chartData.datasets[0].data.push(Math.floor(Math.random() * 5));
    this.chartData.datasets[1].data.shift();
    this.chartData.datasets[1].data.push(Math.floor(Math.random() * 10));
    this.chartData.labels.shift();
    this.chartData.labels.push(new Date().toLocaleTimeString());
    // Trigger update
    this.chartData = { ...this.chartData };
  }
}
