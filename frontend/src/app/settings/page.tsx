// frontend/src/app/settings/page.tsx

"use client";

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

export default function SettingsPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Settings</h1>

      <Tabs defaultValue="api" className="w-full max-w-3xl">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        {/* API KEYS TAB */}
        <TabsContent value="api">
          <div className="space-y-4 bg-muted/10 p-4 rounded-lg border">
            <Input placeholder="API Key" />
            <Input placeholder="Secret Key" type="password" />
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">Save</Button>
            </div>
          </div>
        </TabsContent>

        {/* PREFERENCES TAB */}
        <TabsContent value="preferences">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-muted/10 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <Label>Dark Notifications</Label>
                <Switch />
              </div>
              <div>
                <Label>Refresh Interval</Label>
                <Select defaultValue="1m">
                  <SelectTrigger className="mt-1" />
                  <SelectContent>
                    <SelectItem value="30s">30s</SelectItem>
                    <SelectItem value="1m">1m</SelectItem>
                    <SelectItem value="5m">5m</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Default Symbol</Label>
                <Select defaultValue="BTCUSD">
                  <SelectTrigger className="mt-1" />
                  <SelectContent>
                    <SelectItem value="BTCUSD">BTCUSD</SelectItem>
                    <SelectItem value="ETHUSD">ETHUSD</SelectItem>
                    <SelectItem value="DOGEUSD">DOGEUSD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* NOTIFICATIONS TAB */}
        <TabsContent value="notifications">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-muted/10 p-4 rounded-lg border">
              <div className="flex items-center justify-between">
                <Label>Enable Notifications</Label>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <Label>Desktop Alerts</Label>
                <Switch />
              </div>
              <div>
                <Label>Telegram Webhook URL</Label>
                <Input placeholder="Telegram Webhook URL" />
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
