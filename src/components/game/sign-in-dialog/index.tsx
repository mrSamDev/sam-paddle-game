import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Github } from "lucide-react";

interface SignInDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignIn: () => void;
  onSkip: () => void;
}

export const SignInDialog = ({ open, onOpenChange, onSignIn, onSkip }: SignInDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Your Score!</DialogTitle>
          <DialogDescription>Sign in with GitHub to save your high scores and compete with others!</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Button onClick={onSignIn} className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            Sign in with GitHub
          </Button>
          <Button variant="outline" onClick={onSkip}>
            Continue Without Signing In
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
