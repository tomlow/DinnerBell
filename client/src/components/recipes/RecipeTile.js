import React from "react"

const RecipeTile = ({ recipe }) => {
  return <div className="card">
    <div className="card__body">
      <img src="https://images2.minutemediacdn.com/image/upload/c_fill,g_auto,h_1248,w_2220/f_auto,q_auto,w_1100/v1555433443/shape/mentalfloss/beef_stroganoff_0.jpg" alt="tasty beef stroganoff" className="card__image" />
      <h2 className="card__title">Tasty Name</h2>
      <p className="card__description">This is a fun and informative description of this recipe.</p>
      <button className="card__btn">Save Recipe</button>
    </div>

  </div>
}

export default RecipeTile;