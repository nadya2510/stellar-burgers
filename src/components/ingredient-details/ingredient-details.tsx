import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams, Navigate } from 'react-router-dom';
import { selectIngredients } from '@selectors';
import { useSelector } from '@store';

export const IngredientDetails: FC = () => {
  const ingredientId = useParams<{ id: string }>();
  const ingredients = useSelector(selectIngredients);

  if (!ingredientId.id) {
    return <Navigate to='/' />;
  }

  const ingredientData = ingredients.find(
    (ingredient) => ingredient._id === ingredientId.id
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return (
    <>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </>
  );
};
