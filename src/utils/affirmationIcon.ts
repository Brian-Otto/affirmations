// [CatComponent, CatCurledComponent, ...]
const icons = Object.values(
    import.meta.glob("../assets/images/doodles/*.svg", {
        eager: true,
        query: "?react",
        import: "default",
    }),
) as React.FunctionComponent<React.SVGProps<SVGSVGElement>>[];

export default icons