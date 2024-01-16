require('dotenv').config()
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


const express = require('express');

const app = express();

app.use(express.json());


// Fonction pour obtenir toutes les recettes
const getAllRecipes = async () => {
  return await prisma.recipes.findMany();
};

app.get('/', async (req, res) => {
  // const users = await prisma.user.findMany();
  res.json({});
});



// Route pour liste et note de recettes
app.get('/recipes', async (req,res) => {
  const recipes = await prisma.recipes.findMany({
    select: {
      titre : true, 
      image : true,
      description : true, 
    }
  });
    res.json(recipes);
}); 

//Route pour filtrer les recettes par tag
app.get('/recipes/tag/:tag', async (req,res) => {
  const tag = req.query.tag;
  const recipes = await prisma.recipes.findMany({
    where: {
     tag : tag, 
    }, 
    select: {
      titre : true, 
      image : true,
      description : true, 
    }
  });
    res.json(recipes);
}); 


// Route pour filtrer par note
app.get('/recipes/rating', async (req,res) => {
  const mark = await prisma.comment.findMany({
    select: {
      mark : true, 
      comment : true, 
    }
  }); 
  res.json(mark)
})

// Route pour filtrer par temps de préparation
app.get('/recipes/cookingTime/:cookingTime', async (req, res) => {
  const cookingTime = req.query.cookingTime;
  const recipes = await prisma.recipes.findMany({
    where: {
      cookingTime: cookingTime,
    },
    select: {
      titre: true,
      image: true,
      description: true,
    },
  });
  res.json(recipes);
});



// Route pour la recherche par mot-clé
app.get('/search', async (req, res) => {
  const { titre, igd } = req.query;
  const recipes = await prisma.recipes.findMany({
    where: {
      OR: [
        { titre: { contains: titre } },
        { ingredients: { contains: igd  } },
      ],
    },
    select: {
      titre: true,
      image: true,
      description: true,
    },
  });
res.json(recipes) 
});


// Route pour chercher 5 dernières recettes
app.get('/recipes/latest', async( req,res) => {
  const recipes = await prisma.recipes.findMany({
    take: 5,
    orderBy: { date: 'desc' },
    select: {
      titre: true,
      image: true,
      description: true,
    }
  })
  res.json(recipes)
}); 

// Détails recettes aussi récupérer commentaires notes
// Route pour supprimer une recette par ID
app.delete('/recipes/delete/:id', async (req, res) => {
  const recipeID = parseInt(req.params.id, 12);

  try {
    const deletedRecipe = await prisma.recipes.delete({
      where: {
        id: recipeID,
      },
    });

    res.json({ message: 'Recette supprimée avec succès', deletedRecipe });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la recette', error });
  }
});


//Route pour mettre à jour une recette avec ID
app.put('/recipes/:id', async (req, res) => {
  try {
    const recipeId = parseInt(req.params.id, 10);
    const updatedRecipeData = req.body;

    console.log('Recipe ID:', recipeId);
    console.log('Updated Recipe Data:', updatedRecipeData);

    const updatedRecipe = await prisma.recipes.update({
      where: {
        id: recipeId,
      },
      data: updatedRecipeData,
    });

    res.json({ message: 'Recette mise à jour avec succès', updatedRecipe });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la recette:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la recette', error });
  }
});


//Route pour creer une recette 
app.post('/recipes/creer/', async (req, res) => {
  try {
    const {titre,ingredients,steps, servings, description, cookingTime, date, image} = req.body;

    const newRecipe = await prisma.recipes.create({
      data: {
        titre: titre,
        ingredients: ingredients,
        steps : steps,
        servings: servings,
        description: description,
        cookingTime: cookingTime, 
        date: date,
        image: image},
    });

    res.status(201).json({ message: 'Recette créée avec succès', newRecipe });
  } catch (error) {
    console.error('Erreur lors de la création de la recette:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la recette', error });
  }
});


app.listen(process.env.PORT, () => {
  console.log('Server is running on port ' + process.env.PORT);
});


