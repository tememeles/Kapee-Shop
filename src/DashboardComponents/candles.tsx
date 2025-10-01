
import {
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

type CandlePoint = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
};

const candleData: CandlePoint[] = [
  { date: "Mon", open: 120, high: 140, low: 110, close: 130 },
  { date: "Tue", open: 130, high: 150, low: 125, close: 145 },
  { date: "Wed", open: 145, high: 160, low: 140, close: 155 },
  { date: "Thu", open: 155, high: 165, low: 150, close: 160 },
  { date: "Fri", open: 160, high: 170, low: 155, close: 165 },
];

export default function CandlestickChart() {
  return (
    <div className="w-full h-80 flex items-center justify-center">
      <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl shadow-lg p-6 w-full max-w-2xl">
        <div className="mb-4 text-center">
          <h3 className="text-xl font-bold text-blue-700 mb-1">Candlestick Chart</h3>
          <p className="text-sm text-slate-500">Weekly price movement overview</p>
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <ComposedChart data={candleData}>
            <XAxis dataKey="date" tick={{ fill: '#64748b', fontSize: 13 }} axisLine={{ stroke: '#cbd5e1' }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 13 }} axisLine={{ stroke: '#cbd5e1' }} />
            <Tooltip wrapperStyle={{ borderRadius: 8, boxShadow: '0 2px 8px #94a3b8' }} contentStyle={{ background: '#f8fafc', color: '#334155' }} />

            {/* High-Low Line */}
            {candleData.map((point, index) => (
              <Line
                key={`wick-${index}`}
                type="monotone"
                dataKey="high"
                stroke="#94a3b8"
                strokeWidth={1}
                dot={false}
                data={[{ date: point.date, high: point.high }, { date: point.date, high: point.low }]}
              />
            ))}

            {/* Candle Body with hover effect */}
            {candleData.map((point, index) => {
              const isGain = point.close >= point.open;
              const fillColor = isGain ? "#10b981" : "#ef4444";
              const y = Math.min(point.open, point.close);
              const height = Math.abs(point.close - point.open);

              return (
                <rect
                  key={`candle-${index}`}
                  x={index * 100}
                  y={y}
                  width={12}
                  height={height}
                  fill={fillColor}
                  rx={3}
                  style={{ transition: 'fill 0.2s, filter 0.2s', filter: 'drop-shadow(0 1px 4px #94a3b8)' }}
                  onMouseOver={e => (e.currentTarget.style.filter = 'drop-shadow(0 2px 8px #0ea5e9)')}
                  onMouseOut={e => (e.currentTarget.style.filter = 'drop-shadow(0 1px 4px #94a3b8)')}
                />
              );
            })}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
