import { Settings } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { applyTheme, type Theme } from "@/utils/theme";
import { Field, FieldLabel } from "./ui/field";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

function SettingsDialog() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon-lg"} variant={"secondary"} aria-label="QR-Code anzeigen">
                    <Settings />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Einstellungen
                    </DialogTitle>
                    <DialogDescription>
                        Passe deine Erfahrung hier an.
                    </DialogDescription>
                </DialogHeader>
                <Field orientation={"horizontal"}>
                    <FieldLabel htmlFor="theme">
                        Theme
                    </FieldLabel>
                    <ToggleGroup id="theme" type="single" variant={"outline"} defaultValue={localStorage.getItem("theme") || "system"} onValueChange={(value) => applyTheme(value as Theme)}>
                        <ToggleGroupItem value="system">
                            System
                        </ToggleGroupItem>
                        <ToggleGroupItem value="light">
                            Hell
                        </ToggleGroupItem>
                        <ToggleGroupItem value="dark">
                            Dunkel
                        </ToggleGroupItem>
                    </ToggleGroup>
                </Field>
            </DialogContent>
        </Dialog >
    )
}

export default SettingsDialog;