"use client";

import React, { useState, useMemo } from "react";
import { Pie, PieChart, Sector, ResponsiveContainer, Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Reusable Pie Chart Component
const PieChartComponent2 = ({
  id,
  title,
  description,
  chartConfig,
  chartData,
  dataKey,
  nameKey,
  labelText,
}) => {
  const [activeItem, setActiveItem] = useState(chartData[0][nameKey]);

  const activeIndex = useMemo(
    () => chartData.findIndex((item) => item[nameKey] === activeItem),
    [activeItem, nameKey, chartData]
  );
  const items = useMemo(
    () => chartData.map((item) => item[nameKey]),
    [nameKey, chartData]
  );

  return (
    <Card data-chart={id} className="flex flex-col">
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Select value={activeItem} onValueChange={setActiveItem}>
          <SelectTrigger
            className="ml-auto h-7 w-[130px] rounded-lg pl-2.5"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Select Item" />
          </SelectTrigger>
          <SelectContent align="end" className="rounded-xl">
            {items.map((key) => {
              const config = chartConfig[key];
              if (!config) return null;
              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-sm"
                      style={{ backgroundColor: config.color }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData.map((item) => ({
                ...item,
                fill: chartConfig[item[nameKey]]?.color || "gray", // Default color if not found
              }))}
              dataKey={dataKey}
              nameKey={nameKey}
              innerRadius={60}
              strokeWidth={5}
              activeIndex={activeIndex}
              activeShape={({ outerRadius = 0, ...props }) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              <Label
                content={({ viewBox }) => {
                  if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox))
                    return null;
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {chartData[activeIndex][dataKey].toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 24}
                        className="fill-muted-foreground"
                      >
                        {labelText}
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartComponent2;
