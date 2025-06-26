
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
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    );
  }

  if (!artist || !stats) {
    return <div className="bg-background text-foreground">Error loading dashboard</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-background">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{artist.name}</h1>
          <p className="text-muted-foreground mt-1">{artist.bio || "Artist"}</p>
        </div>
        
        <Button 
          className="bg-foreground text-background hover:bg-muted-foreground mt-4 md:mt-0 rounded-none"
          onClick={() => navigate('/upload')}
        >
          <Upload className="h-4 w-4 mr-2" /> 
          Upload Track
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-card border-border rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-2xl font-bold text-foreground">{formatCurrency(stats.totalSales)}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Downloads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Download className="h-5 w-5 text-blue-500 mr-2" />
              <span className="text-2xl font-bold text-foreground">{stats.totalDownloads}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border rounded-none">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Uploads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-purple-500 mr-2" />
              <span className="text-2xl font-bold text-foreground">{artist.totalTracks}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <StatsOverview stats={stats} />
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-foreground">Recent Transactions</h2>
        <div className="bg-card border border-border rounded-none overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Track</th>
                <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentTransactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-border hover:bg-accent text-foreground">
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
