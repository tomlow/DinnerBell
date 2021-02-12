import React from "react"

const RecipeTile = ({ recipe }) => {
  return <div className="card">
    <div className="card__body">
      <img src={recipe.image} alt="tasty beef stroganoff" className="card__image" />
      <div className="card__content-container">
        <h3 className="card__title">{recipe.title}</h3>
        <p className="card__description">This is a fun and informative description of this recipe.</p>
        <div className="card__button-container">
          <button className="card__btn">Save Recipe</button>
        </div>
      </div>
    </div>
  </div>
}

export default RecipeTile;