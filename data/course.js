export const COURSE_DATA = {
    title: "Brew Master Academy",
    phases: [
        {
            id: "phase-1",
            title: "Fundamentos",
            icon: "🌾",
            color: "#d97706",
            topics: [
                { id: "historia", title: "Historia", icon: "📜", desc: "Origen y evolución de la cerveza", videoId: "cvFb9RT43n4", 
                  highlights: [
                    {time: "0:01:00", label: "Cerveza en el antiguo Egipto"},
                    {time: "0:03:00", label: "Producción medieval"},
                    {time: "0:05:00", label: "Revolución industrial"}
                  ]
                },
                { id: "ingredientes", title: "Ingredientes", icon: "🌿", desc: "Malta, lúpulo, levadura y agua", videoId: "z2Uj8mO_7I0", 
                  highlights: [
                    {time: "0:00:45", label: "La malta"},
                    {time: "0:04:15", label: "El lúpulo"},
                    {time: "0:08:30", label: "La levadura"}
                  ]
                },
                { id: "estilos", title: "Estilos (BJCP)", icon: "🍺", desc: "Guía técnica de cata", videoId: "1F_4-tS1-pU",
                  highlights: [
                    {time: "0:02:00", label: "Cata de Ales"},
                    {time: "0:06:15", label: "Parámetros BJCP"}
                  ]
                }
            ]
        },
        {
            id: "phase-2",
            title: "Elaboración",
            icon: "⚗️",
            color: "#65a30d",
            topics: [
                { id: "all-grain", title: "Todo Grano", icon: "🏠", desc: "Día de cocción completo", videoId: "Fj-P3uYp_vU", 
                  highlights: [
                    {time: "0:02:10", label: "Macerado"},
                    {time: "0:15:20", label: "Hervido"}
                  ]
                },
                { id: "fermentacion", title: "Fermentación", icon: "🦠", desc: "Control de levaduras", videoId: "L_NreF_s05s" }
            ]
        },
        {
            id: "phase-3",
            title: "Recetas",
            icon: "📋",
            color: "#92400e",
            topics: [
                { id: "ipa", title: "IPA Americana", icon: "🇺🇸", desc: "Receta cargada de lúpulo", videoId: "X6k0Ew-5_7Q" },
                { id: "stout", title: "Stout", icon: "🌑", desc: "Maltas tostadas", videoId: "U3ZInh29WLo" }
            ]
        },
        {
            id: "phase-4",
            title: "Avanzado",
            icon: "🔬",
            color: "#0284c7",
            topics: [
                { id: "agua", title: "Agua", icon: "💧", desc: "Sales y pH", videoId: "K6H4y1rL_zU" },
                { id: "madera", title: "Madera", icon: "🪵", desc: "Uso de barricas", videoId: "7vH6-w3i5M8" }
            ]
        },
        {
            id: "phase-5",
            title: "Negocio",
            icon: "🏭",
            color: "#4f46e5",
            topics: [
                { id: "negocio", title: "Cervecería", icon: "🍻", desc: "Planificación comercial", videoId: "O9vE5XvW8G8" }
            ]
        }
    ]
};
