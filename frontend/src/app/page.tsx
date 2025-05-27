// frontend/src/app/page.tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">Slime Bot Dashboard</h1>
        <div className="flex items-center space-x-2">
          <StatusIndicator status="running" />
          <Button variant="outline">Start Bot</Button>
          <Button variant="outline">Pause/Resume</Button>
          <Button variant="destructive">Stop Bot</Button>
        </div>
      </header>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Price Chart</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {/* TODO: Candlestick chart component */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Equity Curve</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            {/* TODO: Equity curve chart component */}
          </CardContent>
        </Card>
      </div>

      {/* Trade History */}
      <Card>
        <CardHeader>
          <CardTitle>Trade History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Side</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Strategy</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {/* TODO: Map over real trade data */}
                <TableRow>
                  <TableCell>2025-05-26 20:45</TableCell>
                  <TableCell>SOL/USDT</TableCell>
                  <TableCell className="text-green-500">Buy</TableCell>
                  <TableCell>23.45</TableCell>
                  <TableCell>0.5</TableCell>
                  <TableCell>SMA Crossover</TableCell>
                  <TableCell>Signal</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </main>
  );
}

function StatusIndicator({
  status,
}: {
  status: "running" | "paper" | "stopped";
}) {
  const color =
    status === "running"
      ? "bg-green-500"
      : status === "paper"
      ? "bg-yellow-500"
      : "bg-red-500";
  const label =
    status === "running" ? "Running" : status === "paper" ? "Paper" : "Stopped";

  return (
    <div className="flex items-center space-x-1">
      <span className={`w-3 h-3 rounded-full ${color}`}></span>
      <span className="font-medium">{label}</span>
    </div>
  );
}
