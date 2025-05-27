'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";

export default function ManualOverridePage() {
  const [killSwitch, setKillSwitch] = useState(true);

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-3xl font-semibold">Manual Override</h1>
      <Separator />

      {/* Emergency Sell All Button with Confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" className="w-full text-lg py-6">
            EMERGENCY SELL ALL
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to proceed with the emergency sell?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Kill Switch Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-md font-medium">Kill-Switch</span>
        <Switch checked={killSwitch} onCheckedChange={setKillSwitch} />
      </div>

      {/* Volatility Status */}
      <div className="flex items-center justify-between">
        <span className="text-md font-medium">Volatility Status</span>
        <span className="text-muted-foreground">Normal</span>
      </div>
    </main>
  );
}
