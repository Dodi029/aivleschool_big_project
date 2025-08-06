import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SimpleBarChartProps {
  data: Array<{ name: string; value: number; }>;
  color?: string;
  height?: number;
}

export function SimpleBarChart({ data, color = '#FFA726', height = 200 }: SimpleBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" fontSize={12} stroke="#757575" />
        <YAxis fontSize={12} stroke="#757575" />
        <Bar dataKey="value" fill={color} radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

interface SimpleLineChartProps {
  data: Array<{ name: string; value: number; }>;
  color?: string;
  height?: number;
}

export function SimpleLineChart({ data, color = '#4FC3F7', height = 200 }: SimpleLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="name" fontSize={12} stroke="#757575" />
        <YAxis fontSize={12} stroke="#757575" />
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={3} dot={{ fill: color, strokeWidth: 2, r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

interface SimplePieChartProps {
  data: Array<{ name: string; value: number; color: string; }>;
  height?: number;
}

export function SimplePieChart({ data, height = 200 }: SimplePieChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}