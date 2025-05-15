
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Users, DollarSign } from "lucide-react";
import { formatCurrency, formatDate, mockGetArtistStats, mockGetCurrentUser } from "@/lib/utils";
import { Artist, ArtistStats } from "@/types";
import StatsOverview from "./StatsOverview";

export function ArtistDashboard() {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [stats, setStats] = useState<ArtistStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = mockGetCurrentUser();
    if (!currentUser || currentUser.role !== 'artist') {
      navigate('/');
      return;
    }

    setArtist(currentUser as Artist);
    const artistStats = mockGetArtistStats(currentUser.id);
    setStats(artistStats);
    setIsLoading(false);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-pulse-light text-music-purple">Loading...</div>
      </div>
    );
  }

  if (!artist || !stats) {
    return <div>Error loading dashboard</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gradient-purple">{artist.name}</h1>
          <p className="text-gray-400 mt-1">{artist.bio || "Artist"}</p>
        </div>
        
        <Button 
          className="bg-music-purple hover:bg-music-purple/90 mt-4 md:mt-0"
          onClick={() => navigate('/upload')}
        >
          <Upload className="h-4 w-4 mr-2" /> 
          Upload Track
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-music-card border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold">{formatCurrency(stats.totalSales)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-music-card border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Download className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold">{stats.totalDownloads}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-music-card border-gray-800">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-400">Total Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold">{artist.totalTracks}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <StatsOverview stats={stats} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Recent Transactions</h2>
        <div className="bg-music-card border border-gray-800 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Track</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-800 hover:bg-music-hover">
                  <td className="py-3 px-4 text-sm">{formatDate(transaction.date)}</td>
                  <td className="py-3 px-4 text-sm">
                    {stats.topTracks.find(t => t.trackId === transaction.trackId)?.title || "Unknown Track"}
                  </td>
                  <td className="py-3 px-4 text-sm">{formatCurrency(transaction.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ArtistDashboard;
