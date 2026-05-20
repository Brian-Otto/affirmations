import { Save, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { cn } from "../lib/utils";
import AffirmationIcon from "./AffirmationIcon";
import AffirmationText from "./AffirmationText";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const OUTPUT_SIZE = 1080;

type CanvasTheme = "light" | "dark";

function getInitialTheme(): CanvasTheme {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") return "dark";
  if (saved === "light") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function AffirmationImageDialog() {
  const captureRef = useRef<HTMLDivElement | null>(null);
  const [theme, setTheme] = useState<CanvasTheme>(getInitialTheme);

  const downloadImage = async () => {
    const el = captureRef.current;
    if (!el) return;
    await document.fonts.ready;
    const pixelRatio = OUTPUT_SIZE / el.getBoundingClientRect().width;
    const dataUrl = await toPng(el, { pixelRatio });
    const link = document.createElement("a");
    const date = new Date();
    const year = String(date.getFullYear()).padStart(4, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    link.download = `affira_${year}-${month}-${day}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon-lg"}
          variant={"secondary"}
          aria-label="Affirmation als Bild speichern"
        >
          <Save className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Affirmation speichern</DialogTitle>
          <DialogDescription>
            Lade die heutige Affirmation als Bild herunter.
          </DialogDescription>
        </DialogHeader>
        <div className="w-full aspect-square rounded-lg border overflow-hidden">
          <div
            ref={captureRef}
            className={cn(
              "w-full aspect-square",
              "flex flex-col gap-4 justify-center items-center text-center p-6",
              "bg-background text-foreground",
              theme === "dark" ? "dark" : "light",
            )}
          >
            <AffirmationIcon className="w-20 h-20" />
            <AffirmationText className="text-2xl font-IndieFlower" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <ToggleGroup
              type="single"
              variant="outline"
              value={theme}
              onValueChange={(value) => { if (value) setTheme(value as "light" | "dark") }}
            >
              <ToggleGroupItem value="light" aria-label="Helles Design">
                <Sun className="size-4" />
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" aria-label="Dunkles Design">
                <Moon className="size-4" />
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
          <Button onClick={downloadImage}>
            <Save className="size-4 mr-2" />
            Speichern
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AffirmationImageDialog;
