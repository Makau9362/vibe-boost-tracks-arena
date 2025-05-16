
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArtistStats } from "@/types";
import { formatCurrency } from "@/lib/utils";

interface StatsOverviewProps {
  stats: ArtistStats;
}

const StatsOverview = ({ stats }: StatsOverviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart */}
      <Card className="bg-music-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg">Monthly Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.monthlyRevenue}>
                <XAxis dataKey="month" stroke="#9b87f5" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="#9b87f5"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip
                  formatter={(value: number) => [`${formatCurrency(value)}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: '#1A1A1A',
                    borderColor: '#333',
                    borderRadius: '6px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#9b87f5"
                  strokeWidth={2}
                  dot={{ r: 4, fill: "#9b87f5", strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top tracks */}
      <Card className="bg-music-card border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg">Top Tracks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.topTracks.map((track, index) => (
              <div
                key={track.trackId}
                className="flex items-center p-3 rounded-lg bg-music-hover"
              >
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-music-card rounded-md mr-4">
                  <span className="text-xl font-bold text-music-purple">{index + 1}</span>
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-semibold">{track.title}</h4>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{track.downloads} downloads</span>
                    <span>{formatCurrency(track.revenue)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsOverview;
