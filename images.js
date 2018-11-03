// Ensemble d'images de taille 16x16 pixels.  Chaque element du
// tableau images correspond a une image d'une tuile du jeu demineur.
// Une image est representee par un tableau des rangees de pixels.
// Chaque rangee est un tableau contenant l'index de la couleur dans
// le tableau colormap.

var images =
    [
     [ // 0
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // 1
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
      [8,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
      [8,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
      [8,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
      [8,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // 2
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,2,2,2,2,2,2,2,2,0,0,0,0],
      [8,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
      [8,0,0,2,2,2,0,0,0,0,2,2,2,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0],
      [8,0,0,0,0,0,0,0,2,2,2,2,0,0,0,0],
      [8,0,0,0,0,0,2,2,2,2,2,0,0,0,0,0],
      [8,0,0,0,2,2,2,2,2,0,0,0,0,0,0,0],
      [8,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0],
      [8,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
      [8,0,0,2,2,2,2,2,2,2,2,2,2,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // 3
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,3,3,3,3,3,3,3,3,3,0,0,0,0],
      [8,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0],
      [8,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0],
      [8,0,0,0,0,0,3,3,3,3,3,3,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,3,3,3,0,0,0],
      [8,0,0,3,3,3,3,3,3,3,3,3,3,0,0,0],
      [8,0,0,3,3,3,3,3,3,3,3,3,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // 4
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,4,4,4,0,4,4,4,0,0,0,0],
      [8,0,0,0,0,4,4,4,0,4,4,4,0,0,0,0],
      [8,0,0,0,4,4,4,0,0,4,4,4,0,0,0,0],
      [8,0,0,0,4,4,4,0,0,4,4,4,0,0,0,0],
      [8,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0],
      [8,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0],
      [8,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,4,4,4,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // 5
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0],
      [8,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0],
      [8,0,0,5,5,5,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,5,5,5,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,5,5,5,5,5,5,5,5,5,0,0,0,0],
      [8,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,5,5,5,0,0,0],
      [8,0,0,5,5,5,5,5,5,5,5,5,5,0,0,0],
      [8,0,0,5,5,5,5,5,5,5,5,5,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // 6
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,6,6,6,6,6,6,6,6,0,0,0,0],
      [8,0,0,6,6,6,6,6,6,6,6,6,0,0,0,0],
      [8,0,0,6,6,6,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,6,6,6,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,6,6,6,6,6,6,6,6,6,0,0,0,0],
      [8,0,0,6,6,6,6,6,6,6,6,6,6,0,0,0],
      [8,0,0,6,6,6,0,0,0,0,6,6,6,0,0,0],
      [8,0,0,6,6,6,0,0,0,0,6,6,6,0,0,0],
      [8,0,0,6,6,6,6,6,6,6,6,6,6,0,0,0],
      [8,0,0,0,6,6,6,6,6,6,6,6,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // 7
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,7,7,7,7,7,7,7,7,7,7,0,0,0],
      [8,0,0,7,7,7,7,7,7,7,7,7,7,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,7,7,7,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,7,7,7,0,0,0],
      [8,0,0,0,0,0,0,0,0,7,7,7,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,7,7,7,0,0,0,0],
      [8,0,0,0,0,0,0,0,7,7,7,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,7,7,7,0,0,0,0,0],
      [8,0,0,0,0,0,0,7,7,7,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,7,7,7,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // 8
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,8,8,8,8,8,8,8,8,0,0,0,0],
      [8,0,0,8,8,8,8,8,8,8,8,8,8,0,0,0],
      [8,0,0,8,8,8,0,0,0,0,8,8,8,0,0,0],
      [8,0,0,8,8,8,0,0,0,0,8,8,8,0,0,0],
      [8,0,0,0,8,8,8,8,8,8,8,8,0,0,0,0],
      [8,0,0,0,8,8,8,8,8,8,8,8,0,0,0,0],
      [8,0,0,8,8,8,0,0,0,0,8,8,8,0,0,0],
      [8,0,0,8,8,8,0,0,0,0,8,8,8,0,0,0],
      [8,0,0,8,8,8,8,8,8,8,8,8,8,0,0,0],
      [8,0,0,0,8,8,8,8,8,8,8,8,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // mine
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0],
      [8,0,0,0,7,0,7,7,7,7,7,0,7,0,0,0],
      [8,0,0,0,0,7,7,7,7,7,7,7,0,0,0,0],
      [8,0,0,0,7,7,9,9,7,7,7,7,7,0,0,0],
      [8,0,0,0,7,7,9,9,7,7,7,7,7,0,0,0],
      [8,0,7,7,7,7,7,7,7,7,7,7,7,7,7,0],
      [8,0,0,0,7,7,7,7,7,7,7,7,7,0,0,0],
      [8,0,0,0,7,7,7,7,7,7,7,7,7,0,0,0],
      [8,0,0,0,0,7,7,7,7,7,7,7,0,0,0,0],
      [8,0,0,0,7,0,7,7,7,7,7,0,7,0,0,0],
      [8,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0],
      [8,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
     ],
     [ // mine sur fond rouge
      [8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3],
      [8,3,3,3,3,3,3,3,7,3,3,3,3,3,3,3],
      [8,3,3,3,3,3,3,3,7,3,3,3,3,3,3,3],
      [8,3,3,3,7,3,7,7,7,7,7,3,7,3,3,3],
      [8,3,3,3,3,7,7,7,7,7,7,7,3,3,3,3],
      [8,3,3,3,7,7,9,9,7,7,7,7,7,3,3,3],
      [8,3,3,3,7,7,9,9,7,7,7,7,7,3,3,3],
      [8,3,7,7,7,7,7,7,7,7,7,7,7,7,7,3],
      [8,3,3,3,7,7,7,7,7,7,7,7,7,3,3,3],
      [8,3,3,3,7,7,7,7,7,7,7,7,7,3,3,3],
      [8,3,3,3,3,7,7,7,7,7,7,7,3,3,3,3],
      [8,3,3,3,7,3,7,7,7,7,7,3,7,3,3,3],
      [8,3,3,3,3,3,3,3,7,3,3,3,3,3,3,3],
      [8,3,3,3,3,3,3,3,7,3,3,3,3,3,3,3],
      [8,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3]
     ],
     [ // tuile non-devoilee
      [9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,0],
      [9,9,9,9,9,9,9,9,9,9,9,9,9,9,0,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,9,0,0,0,0,0,0,0,0,0,0,0,0,8,8],
      [9,0,8,8,8,8,8,8,8,8,8,8,8,8,8,8],
      [0,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8]
     ]
    ];

// Ensemble de couleurs utilisees dans la definition des images
// ci-dessus.  A tout endroit ou le nombre c apparait dans une image,
// la couleur RGB du pixel est colormap[c].

var colormap =
    [
     { r: 192, g: 192, b: 192 },
     { r:   0, g:   0, b: 255 },
     { r:   0, g: 128, b:   0 },
     { r: 255, g:   0, b:   0 },
     { r:   0, g:   0, b: 128 },
     { r: 128, g:   0, b:   0 },
     { r:   0, g: 128, b: 128 },
     { r:   0, g:   0, b:   0 },
     { r: 128, g: 128, b: 128 },
     { r: 255, g: 255, b: 255 }
    ];
