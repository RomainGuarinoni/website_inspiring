let eleve = {
  _id: 25124824,
  nom: "Guarinoni",
  prenom: "Romain",
  autre_info: "...",
  progression: [
    {
      chapter: {
        note: {
          entrainement: [true, true, true, true, true, false],
          quiz: false,
        },
        rythme: {
          entrainement: [true, false, false],
          quiz: false,
        },
        partition: {
          nuance: {
            entrainement: [true],
            quiz: false,
          },
          structure: {
            entrainement: [false],
            quiz: false,
          },
          quiz: false,
        },
        instruments: {
          entrainement: [true, true, true, false, false, false],
        },
      },
    },
    // annee 2 et 3 pas encore rempli
    {},
    {},
  ],
};

export default eleve = new Promise((resolve) =>
  setTimeout(resolve, 100, eleve)
);
