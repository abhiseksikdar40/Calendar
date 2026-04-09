export const seasonThemes = {
  winter: {
    months: [0, 1, 10, 11],
    colors: ["#F5FAFF", "#DCEEFF", "#B9D9F7", "#6FA9E8", "#234C84"],
  },
  spring: {
    months: [2, 3],
    colors: ["#F6FBF8", "#DDEEE6", "#BFD8CC", "#8FB5A1", "#5D7F6C"],
  },
  summer: {
    months: [4, 5],
    colors: ["#FFF6E5", "#FFE3A3", "#FFC857", "#FF9F1C", "#F77F00"],
  },
  rainy: {
    months: [6, 7],
    colors: ["#E8EDF2", "#C9D3DD", "#97A6B5", "#5F6F81", "#344150"],
  },
  autumn: {
    months: [8, 9],
    colors: ["#F7E4C3", "#D89B3D", "#B85C38", "#8C3B2E", "#6F4A2D"],
  },
};

export function getTheme(month) {
  for (let key in seasonThemes) {
    if (seasonThemes[key].months.includes(month)) {
      return seasonThemes[key];
    }
  }
}