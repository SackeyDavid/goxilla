import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
    selector: 'app-line-chart',
    templateUrl: './line-chart.component.html',
    styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
    @ViewChild('lineCanvas', { static: true }) canvas: ElementRef;

    public lineChartData: ChartConfiguration<'line'>['data'];
    public lineChartOptions: ChartOptions<'line'>;
    public lineChartLegend = false;

    constructor() {}

    ngOnInit() {
        const gradient = this.canvas.nativeElement.getContext('2d').createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, 'rgba(0, 137, 208, 1)');
        gradient.addColorStop(1, 'rgba(0, 137, 208,0)');

        this.lineChartData = {
            labels: ['JAN', 'MAR', 'MAY', 'JUL', 'SEP', 'NOV'],
            datasets: [
                {
                    backgroundColor: gradient,
                    borderColor: 'rgb(0, 137, 208)',
                    borderWidth: 1,
                    label: '',
                    tension: 0.3,
                    fill: true,
                    data: [51, 53, 82, 35, 50, 20],
                },
            ],
        };

        // start of options
        this.lineChartOptions = {
            responsive: false,
            elements: {
                point: {
                    radius: 0,
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        stepSize: 50,
                        font: {
                            size: 14,
                            family: 'Montserrat, Helvetica, Arial, sans-serif',
                        },
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                    },
                    ticks: {
                        font: {
                            size: 12,
                            family: 'Montserrat, Helvetica, Arial, sans-serif',
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        font: {
                            size: 14,
                            family: 'Montserrat, Helvetica, Arial, sans-serif',
                        },
                    },
                },
                title: {
                    display: false,
                    text: '',
                    padding: {
                        top: 10,
                        bottom: 40,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                                    context.parsed.y
                                );
                            }
                            return label;
                        },
                    },
                },
            },
        };

        // end of options
    }
}
