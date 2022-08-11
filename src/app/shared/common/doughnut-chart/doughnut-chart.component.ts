import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
    selector: 'app-doughnut-chart',
    templateUrl: './doughnut-chart.component.html',
    styleUrls: ['./doughnut-chart.component.css'],
})
export class DoughnutChartComponent implements OnInit {
    @ViewChild('doughnutCanvas', { static: true }) canvas: ElementRef;

    public doughnutChartLabels: string[] = ['Scheduled', 'Unassigned'];
    public doughnutChartData: ChartData<'doughnut'> = {
        labels: this.doughnutChartLabels,
        datasets: [
            {
                data: [34, 8],
                backgroundColor: ['#0089D0', '#B9B9B9'],
                hoverOffset: 0,
                hoverBackgroundColor: ['#0089D0', '#B9B9B9'],
                hoverBorderColor: ['#0089D0', '#B9B9B9'],
                weight: 1,
                offset: 1,
            },
        ],
    };
    public doughnutChartType: ChartType = 'doughnut';
    public doughnutChartPlugins;

    constructor() {}

    ngOnInit() {
        this.doughnutChartPlugins = [
            {
                id: 'doughnutChartPlugins',
                beforeDraw(chart) {
                    if (chart.config.type == 'doughnut') {
                        const ctx = chart.ctx;
                        var txt1 = '42';
                        var txt2 = 'ORDERS';
                        // console.log(chart);
                        // try {
                        //     var check = chart.active ? chart.tooltip._active[0]._datasetIndex : 'None';
                        //     if (check !== 'None') {
                        //         txt1 = chart.tooltip._data.labels[chart.tooltip._active[0]._index];
                        //         txt2 = chart.tooltip._data.datasets[0].data[chart.tooltip._active[0]._index];
                        //     } else {
                        //         txt1 = chart.tooltip._data.labels[0];
                        //         txt2 = chart.tooltip._data.datasets[0].data[0];
                        //     }
                        // } catch (err) {
                        //     txt1 = chart.tooltip._data.labels[0];
                        //     txt2 = chart.tooptip._data.datasets[0].data[0];
                        // }

                        //Get options from the center object in options
                        const sidePadding = 60;
                        const sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);

                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
                        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

                        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                        const stringWidth = ctx.measureText(txt1).width;
                        const elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

                        // Find out how much the font can grow in width.
                        const widthRatio = elementWidth / stringWidth;
                        const newFontSize = Math.floor(30 * widthRatio);
                        const elementHeight = chart.innerRadius * 2;

                        // Pick a new font size so it will not be larger than the height of label.
                        // const fontSizeToUse = Math.min(newFontSize, elementHeight);
                        const fontSizeToUse = 25;
                        ctx.font = fontSizeToUse + 'px Montserrat, Helvetica, Arial, sans-serif';
                        ctx.fillStyle = '#82828d';

                        // Draw text in center
                        ctx.fillText(txt1, centerX, centerY - 7);

                        // let fontSizeToUse1 = 10;
                        // ctx.font = fontSizeToUse1 + 'px Monsterrat';
                        // ctx.fillText('', centerX, centerY + 10);

                        let fontSizeToUse2 = 10;
                        ctx.font = fontSizeToUse2 + 'px Montserrat, Helvetica, Arial, sans-serif';
                        ctx.fillText(txt2, centerX, centerY + 10);
                    }
                },
                labels: {
                    usePointStyle: true,
                    pointStyle: 'rectRounded',
                },
            },
        ];
    }

    // events
    public chartClicked({ event, active }: { event: ChartEvent; active: {}[] }): void {
        console.log(event, active);
    }

    public chartHovered({ event, active }: { event: ChartEvent; active: {}[] }): void {
        console.log(event, active);
    }
}
