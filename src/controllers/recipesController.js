const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAllRecipes = async (req, res) => {
    const recipes = await prisma.recipes.findMany({
        select: {
            titre: true,
            image: true,
            description: true,
        }
    });
    res.json(recipes);
}

const getByTag = async (req, res) => {
    const tag = req.query.tag;
    const recipes = await prisma.recipes.findMany({
        where: {
            tag: tag,
        },
        select: {
            titre: true,
            image: true,
            description: true,
        }
    });
    res.json(recipes);
}

const getByRating = async (req, res) => {
    const mark = await prisma.comment.findMany({
        select: {
            mark: true,
            comment: true,
        }
    });
    res.json(mark)
}

const getByCookingTime = async (req, res) => {
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
}

const getByKeyword = async (req, res) => {
    const { titre, igd } = req.query;
    const recipes = await prisma.recipes.findMany({
        where: {
            OR: [
                { titre: { contains: titre } },
                { ingredients: { contains: igd } },
            ],
        },
        select: {
            titre: true,
            image: true,
            description: true,
        },
    });
    res.json(recipes)
}

const getLatest = async (req, res) => {
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
}

const createRecipe = async (req, res) => {
    try {
        const { titre, ingredients, steps, servings, description, cookingTime, date, image } = req.body;

        const newRecipe = await prisma.recipes.create({
            data: {
                titre: titre,
                ingredients: ingredients,
                steps: steps,
                servings: servings,
                description: description,
                cookingTime: cookingTime,
                date: date,
                image: image
            },
        });

        res.status(201).json({ message: 'Recette créée avec succès', newRecipe });
    } catch (error) {
        console.error('Erreur lors de la création de la recette:', error);
        res.status(500).json({ message: 'Erreur lors de la création de la recette', error });
    }
}

const deleteRecipe = async (req, res) => {
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
}

const updateRecipe = async (req, res) => {
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
}

module.exports = {
    getAllRecipes,
    getByTag,
    getByRating,
    getByCookingTime,
    getByKeyword,
    getLatest,
    createRecipe,
    deleteRecipe,
    updateRecipe,
};



