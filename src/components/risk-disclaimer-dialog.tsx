
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ShieldAlert } from "lucide-react";

type RiskDisclaimerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function RiskDisclaimerDialog({
  open,
  onOpenChange,
  onConfirm,
}: RiskDisclaimerDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-destructive" />
            Important Security Warning
          </AlertDialogTitle>
          <AlertDialogDescription className="text-left pt-4 space-y-4">
            <p>
              You should NEVER enter your recovery (seed) phrase into any
              website or application unless you are 100% certain of its
              legitimacy and security.
            </p>
            <p>
              This application is for demonstration purposes only and handles
              your seed phrase client-side. However,{" "}
              <span className="font-bold text-destructive">
                exposing your seed phrase online is extremely risky.
              </span>{" "}
              A malicious website could steal your funds.
            </p>
            <p>
              By continuing, you acknowledge that you understand these risks and
              are proceeding at your own peril.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
          >
            I Understand and Accept the Risk
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
