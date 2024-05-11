import React from 'react'
import Chart from "react-apexcharts";

const DonutChart = ({series=[1],labels=['no label']}) => {
  return (
    <div>
          <Chart
              type="donut"
              width={300}
              height={300}
              series={series}
              options={{
                labels,
                legend: {
                  position: "bottom",
                },
                title: {
                  text: "City & Orders",
                },
                plotOptions: {
                  pie: {
                    donut: {
                      labels: {
                        show: true,
                        total: {
                          show: true,
                          fontSize: 17,
                        },
                      },
                    },
                  },
                },
                dataLabels: {
                  enabled: false,
                },
              }}
            />
    </div>
  )
}

export default DonutChart