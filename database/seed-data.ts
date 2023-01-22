interface SeedData {
    entries: SeedEntry[];
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}

export const seedData: SeedData = {
    entries: [
        {
            description: 'Pendent: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tellus ac diam consectetur iaculis.',
            status: 'pendent',
            createdAt: Date.now(),
        
        },
        {  
            description: 'En-Progres: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ex metus, luctus vel.',
            status: 'en-progres',
            createdAt: Date.now() - 1000000,
    
        },
        { 
            description: 'Finalitzat: Sint tempor occaecat tempor amet est voluptate.',
            status: 'finalitzat',
            createdAt: Date.now() - 100000,
        },
        {
            description: 'Pendent: La inserció de la data de creació a la bbdd de mongo, amb schema de mongoose, inserta an format Date, tot i estar definida com a number',
            status: 'pendent',
            createdAt: Date.now() - 1000,
        }
    ]
}

