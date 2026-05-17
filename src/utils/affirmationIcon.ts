// [CatComponent, CatCurledComponent, ...]
const icons = Object.values(
    import.meta.glob("../assets/images/doodles/*.svg", {
        eager: true,
        query: "?react",
        import: "default",
    }),
) as React.FunctionComponent<React.SVGProps<SVGSVGElement>>[];

export const svgRaws = Object.values(
    import.meta.glob("../assets/images/doodles/*.svg", {
        eager: true,
        query: "?raw",
        import: "default",
    }),
) as string[];

export default icons