import { Component, Input } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color } from 'ng2-charts';

@Component({
  selector: 'app-poker-result',
  template: `
    <div style="display: block">
      <canvas baseChart
              [datasets]="chartData"
              [labels]="cards"
              [options]="chartOptions"
              [colors]="colors"
              [legend]="false"
              chartType="bar">
      </canvas>
    </div>
  `
})
export class PokerGraphComponent {

  colors: Color[] = [
    { backgroundColor: '#ffc107' }
  ];

  chartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}],
      yAxes: [{
        ticks: {
          min: 0,
          stepSize: 1
        }
      }]
    }
  };

  @Input()
  cards: string[] = [];

  @Input()
  set votes(newVotes: string[]) {
    const res = (newVotes || []).reduce((stats, card) => {
      const newStat = {...stats};
      newStat[card] = stats[card] ? stats[card] + 1 : 1;
      return newStat;
    }, {});

    const data = this.cards.map(card => res[card] || 0);

    this.chartData[0].data = data;
  }

  chartData: ChartDataSets[] = [{ data: [], label: 'Votes' }];

}
