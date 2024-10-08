const TextFonts = [
    { name: "STANDARD", id: 0 },
    { name: "CURSIVE", id: 1 },
    { name: "ROCKSTAR_TAG", id: 2 },
    { name: "LEADERBOAR0D", id: 3 },
    { name: "CONDENSED", id: 4 },
    { name: "STYLE_FIXED_WIDTH_NUMBERS", id: 5 },
    { name: "CONDENSED_NOT_GAMERNAME", id: 6 },
    { name: "STYLE_PRICEDOWN", id: 7 },
    { name: "STYLE_TAXI", id: 8 }
];

export function getTextFontName(id) {
    const font = TextFonts.find(font => font.id === id);

    return font ? font.name : false;
}