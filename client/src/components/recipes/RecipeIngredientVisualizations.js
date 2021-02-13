import React from "react"

const RecipeIngredientVisualization = (props) => {
  return <div>
    <div class="spoonacular-ingredients-menu">
      <div id="spoonacularView" class="spoonacular-switch spoonacular-metro" style="float:left;width:130px">
        <input id="spoonacular-grid" name="view" type="radio" checked onchange="spoonacularToggleView();" />
        <label for="spoonacular-grid" onclick="">grid</label>
        <input id="spoonacular-list" name="view" type="radio" onchange="spoonacularToggleView();" />
        <label for="spoonacular-list" onclick="">list</label>
        <span class="slide-button"></span>
      </div>
      <div style="float:left;width:140px;margin-left:20px;line-height:24px">
        <span style="float:left">Servings:</span> <input style="float:left" type="number" size="2" id="spoonacular-serving-stepper" value="2" />
        <span itemprop="recipeYield" id="spoonacular-serving-stepper-initial" style="display:none">2</span>
      </div>
      <div id="spoonacularMeasure" class="spoonacular-switch spoonacular-metro"
        style="float:right;width:130px;margin-right:10px">
        <input id="spoonacular-metric" name="measure" type="radio" onchange="spoonacularToggleMeasure();" />
        <label for="spoonacular-metric" onclick="">metric</label>
        <input id="spoonacular-us" name="measure" type="radio" checked onchange="spoonacularToggleMeasure();" />
        <label for="spoonacular-us" onclick="">US</label>
        <span class="slide-button"></span>
      </div>
    </div>
    <div style="clear:both"></div>
    <div id="spoonacular-ingredient-vis-grid">
      <div style="float:left">
        <div class="spoonacular-ingredient">
          <div class="spoonacular-amount t12 spoonacular-metric" style="display:none;" amount="28.25">28.25 g</div>
          <div class="spoonacular-amount t12 spoonacular-us" style="display:block;" amount="0.25">0.25 cup</div>
          <div class="spoonacular-image-wrapper">
            <img src="https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png" title="0.25 cup cheddar cheese" alt="0.25 cup cheddar cheese" /></div>
          <div class="spoonacular-name t10">cheddar cheese</div>
        </div>
      </div>
      <div style="float:left">
        <div class="spoonacular-ingredient">
          <div class="spoonacular-amount t12 spoonacular-metric" style="display:none;" amount="2.0">2 Tbsps</div>
          <div class="spoonacular-amount t12 spoonacular-us" style="display:block;" amount="2.0">2 Tbsps</div>
          <div class="spoonacular-image-wrapper">
            <img src="https://spoonacular.com/cdn/ingredients_100x100/cilantro.png" title="2 Tbsps cilantro" alt="2 Tbsps cilantro" /></div>
          <div class="spoonacular-name t12">cilantro</div>
        </div>
      </div>
      <div style="float:left">
        <div class="spoonacular-ingredient">
          <div class="spoonacular-amount t12 spoonacular-metric" style="display:none;" amount="86.0">86 g
					</div>
          <div class="spoonacular-amount t12 spoonacular-us" style="display:block;" amount="0.5">0.5 cup</div>
          <div class="spoonacular-image-wrapper">
            <img src="https://spoonacular.com/cdn/ingredients_100x100/black-beans.jpg" title="0.5 cup cooked black beans" alt="0.5 cup cooked black beans" /></div>
          <div class="spoonacular-name t9">cooked black beans</div>
        </div>
      </div>
      <div style="float:left">
        <div class="spoonacular-ingredient">
          <div class="spoonacular-amount t12 spoonacular-metric" style="display:none;" amount="2.0">2
							8-inch</div>
          <div class="spoonacular-amount t12 spoonacular-us" style="display:block;" amount="2.0">2 8-inch
						</div>
          <div class="spoonacular-image-wrapper">
            <img src="https://spoonacular.com/cdn/ingredients_100x100/flour-tortilla.jpg" title="2 8-inch flour tortillas" alt="2 8-inch flour tortillas" /></div>
          <div class="spoonacular-name t10">flour tortillas</div>
        </div>
      </div>
      <div style="clear:both"></div>
    </div>
    <div id="spoonacular-ingredient-vis-list">
      <div class="spoonacular-ingredient-list">
        <div style="float:left" itemprop="recipeIngredient"
          content="1/4 cup grated Monterey Jack or cheddar cheese">
          <div class="spoonacular-image-wrapper" style="height:80px">
            <img src="https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png" title="0.25 cup cheddar cheese" alt="0.25 cup cheddar cheese" /></div>
        </div>
        <div class="spoonacular-amount spoonacular-metric" style="display:none;width:112px"
          amount="28.25">28.25 g</div>
        <div class="spoonacular-amount spoonacular-us" style="display:block;width:112px"
          amount="0.25">0.25 cup</div>
        <div class="spoonacular-name">cheddar cheese</div>
        <div style="clear:both"></div>
      </div>
      <div class="spoonacular-ingredient-list">
        <div style="float:left" itemprop="recipeIngredient"
          content="2 Tbsps coarsely chopped cilantro">
          <div class="spoonacular-image-wrapper" style="height:80px">
            <img src="https://spoonacular.com/cdn/ingredients_100x100/cilantro.png" title="2 Tbsps cilantro" alt="2 Tbsps cilantro" /></div>
        </div>
        <div class="spoonacular-amount spoonacular-metric" style="display:none;width:112px"
          amount="2.0">2 Tbsps</div>
        <div class="spoonacular-amount spoonacular-us" style="display:block;width:112px"
          amount="2.0">2 Tbsps</div>
        <div class="spoonacular-name">cilantro</div>
        <div style="clear:both"></div>
      </div>
      <div class="spoonacular-ingredient-list">
        <div style="float:left" itemprop="recipeIngredient"
          content="1/2 cup cooked and drained black beans">
          <div class="spoonacular-image-wrapper" style="height:80px">
            <img src="https://spoonacular.com/cdn/ingredients_100x100/black-beans.jpg" title="0.5 cup cooked black beans" alt="0.5 cup cooked black beans" /></div>
        </div>
        <div class="spoonacular-amount spoonacular-metric" style="display:none;width:112px"
          amount="86.0">86 g</div>
        <div class="spoonacular-amount spoonacular-us" style="display:block;width:112px"
          amount="0.5">0.5 cup</div>
        <div class="spoonacular-name">cooked black beans</div>
        <div style="clear:both"></div>
      </div>
      <div class="spoonacular-ingredient-list">
        <div style="float:left" itemprop="recipeIngredient"
          content="2 (8-inch) flour tortillas">
          <div class="spoonacular-image-wrapper" style="height:80px">
            <img src="https://spoonacular.com/cdn/ingredients_100x100/flour-tortilla.jpg" title="2 8-inch flour tortillas" alt="2 8-inch flour tortillas" /></div>
        </div>
        <div class="spoonacular-amount spoonacular-metric"
          style="display:none;width:112px" amount="2.0">2 8-inch</div>
        <div class="spoonacular-amount spoonacular-us" style="display:block;width:112px"
          amount="2.0">2 8-inch</div>
        <div class="spoonacular-name">flour tortillas</div>
        <div style="clear:both"></div>
      </div>
    </div>
    <div style="margin-top:3px;margin-right:10px;text-align:right;">Widget by <a
      href="https://spoonacular.com">spoonacular.com</a></div>
  </div >
}

export default RecipeIngredientVisualization