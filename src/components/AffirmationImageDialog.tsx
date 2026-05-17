import { Save, Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { useCallback, useEffect, useRef, useState } from "react"
import affirmations from "../content/affirmations"
import { getAffirmationTodayId } from "./AffirmationText"
import { getIconTodayIndex } from "./AffirmationIcon"
import { svgRaws } from "../utils/affirmationIcon"

const SIZE = 1080
// Proportions derived from the website layout:
//   icon: w-20 h-20 (80px), gap-4 (16px), text: text-2xl (24px)
const ICON_SIZE = Math.round(SIZE * 0.2)         // ~216px  — matches w-20 scale
const GAP = Math.round(SIZE * 0.04)              // ~43px   — matches gap-4 scale
const FONT_SIZE = Math.round(SIZE * 0.065)       // ~70px   — matches text-2xl scale
const LINE_HEIGHT = Math.round(FONT_SIZE * 1.45) // ~102px
const PADDING_H = Math.round(SIZE * 0.1)         // 108px   — horizontal text margin
const PADDING_V = Math.round(SIZE * 0.1)         // 108px   — minimum vertical margin

type CanvasTheme = "light" | "dark"

const THEME_COLORS: Record<CanvasTheme, { bg1: string; bg2: string; fg: string }> = {
    light: { bg1: "#eff1f5", bg2: "#e6e9f0", fg: "#4c4f69" },
    dark:  { bg1: "#1e1e2e", bg2: "#181825", fg: "#cdd6f4" },
}

function getInitialTheme(): CanvasTheme {
    const saved = localStorage.getItem("theme")
    if (saved === "dark") return "dark"
    if (saved === "light") return "light"
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

async function drawCanvas(canvas: HTMLCanvasElement, theme: CanvasTheme) {
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const colors = THEME_COLORS[theme]

    // Background
    const gradient = ctx.createLinearGradient(0, 0, SIZE, SIZE)
    gradient.addColorStop(0, colors.bg1)
    gradient.addColorStop(1, colors.bg2)
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, SIZE, SIZE)

    // Measure text first so we can calculate the centered layout
    const id = getAffirmationTodayId()
    const text = affirmations.find(a => a.id === id)?.text ?? ""
    const maxWidth = SIZE - PADDING_H * 2

    ctx.font = `normal ${FONT_SIZE}px "IndieFlower", serif`
    const words = text.split(" ")
    const lines: string[] = []
    let current = ""
    for (const word of words) {
        const test = current ? `${current} ${word}` : word
        if (ctx.measureText(test).width > maxWidth && current) {
            lines.push(current)
            current = word
        } else {
            current = test
        }
    }
    if (current) lines.push(current)

    const textBlockHeight = lines.length * LINE_HEIGHT
    const totalHeight = ICON_SIZE + GAP + textBlockHeight
    // Center the whole block vertically, respecting minimum padding
    const blockStartY = Math.max(PADDING_V, (SIZE - totalHeight) / 2)
    const iconY = blockStartY
    const firstLineY = blockStartY + ICON_SIZE + GAP + LINE_HEIGHT / 2

    // Icon
    const iconIndex = getIconTodayIndex(svgRaws.length)
    const coloredSvg = svgRaws[iconIndex].replace(/currentColor/g, colors.fg)
    await new Promise<void>((resolve) => {
        const img = new Image()
        img.onload = () => {
            ctx.drawImage(img, SIZE / 2 - ICON_SIZE / 2, iconY, ICON_SIZE, ICON_SIZE)
            resolve()
        }
        img.onerror = () => resolve()
        img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(coloredSvg)}`
    })

    // Text
    ctx.font = `normal ${FONT_SIZE}px "IndieFlower", serif`
    ctx.fillStyle = colors.fg
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], SIZE / 2, firstLineY + i * LINE_HEIGHT)
    }
}

function AffirmationImageDialog() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    const [theme, setTheme] = useState<CanvasTheme>(getInitialTheme)
    const themeRef = useRef(theme)
    themeRef.current = theme

    const setCanvasRef = useCallback((canvas: HTMLCanvasElement | null) => {
        canvasRef.current = canvas
        if (!canvas) return
        document.fonts.load(`normal ${FONT_SIZE}px "IndieFlower"`).then(() => {
            drawCanvas(canvas, themeRef.current)
        })
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return
        drawCanvas(canvas, theme)
    }, [theme])

    const downloadImage = () => {
        const canvas = canvasRef.current
        if (!canvas) return
        const link = document.createElement("a")
        link.download = `affirmation-${Date.now()}.png`
        link.href = canvas.toDataURL("image/png")
        link.click()
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"icon-lg"} variant={"secondary"} aria-label="Affirmation als Bild speichern">
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
                <canvas
                    ref={setCanvasRef}
                    width={SIZE}
                    height={SIZE}
                    className="w-full aspect-square rounded-lg border"
                />
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <Button
                            variant={theme === "light" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setTheme("light")}
                            aria-label="Helles Design"
                        >
                            <Sun className="size-4" />
                        </Button>
                        <Button
                            variant={theme === "dark" ? "default" : "outline"}
                            size="icon"
                            onClick={() => setTheme("dark")}
                            aria-label="Dunkles Design"
                        >
                            <Moon className="size-4" />
                        </Button>
                    </div>
                    <Button onClick={downloadImage}>
                        <Save className="size-4 mr-2" />
                        Speichern
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default AffirmationImageDialog
