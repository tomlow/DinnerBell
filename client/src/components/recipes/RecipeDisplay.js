import React from "react"

// import Snackbar from '@material-ui/core/Snackbar';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
import RecipeTile from "./RecipeTile.js"

const RecipeDisplay = ({ queryByIngredients, recipes }) => {
  // const [open, setOpen] = React.useState(false);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }
  //   setOpen(false);
  // };

  let recipeDisplay;

  if (!_.isEmpty(recipes)) {
    recipeDisplay = <div className="tile-container">{recipes.map((recipe, index) => {
      return <RecipeTile key={index} recipe={recipe} />
    })}</div>
  }

  return <div className="recipe-display-container text-center">
    <div>
      <button className="button" onClick={queryByIngredients}>What's for Dinner?</button>
    </div>
    {recipeDisplay}
    {/* <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
      message="Recipe Saved!"
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    /> */}
  </div>
}

export default RecipeDisplay