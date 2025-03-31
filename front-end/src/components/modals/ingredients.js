import React from "react";
const IngredientsModal = ({ 
    show, 
    onClose, 
    recipe, 
    updateIngredient, 
    addIngredient, 
    removeIngredient,
    styles
  }) => {
    if (!show) return null;
    
    return (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={styles.flexBetween}>
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold'}}>{recipe.name || 'Untitled Product'} - Ingredients</h3>
            <button 
              onClick={onClose}
              style={{fontSize: '1.5rem', fontWeight: 'bold', border: 'none', background: 'none'}}
            >
              ×
            </button>
          </div>
          
          <div style={{marginBottom: '1rem'}}>
            <div style={styles.flexBetween}>
              <h4 style={{fontWeight: '500'}}>Ingredients</h4>
              <button 
                onClick={() => addIngredient(recipe.id)}
                style={{...styles.button, ...styles.primaryButton, fontSize: '0.875rem'}}
              >
                Add Ingredient
              </button>
            </div>
            
            {recipe.ingredients.map((ingredient) => (
              <div key={ingredient.id} style={{display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem'}}>
                <div>
                  <input
                    type="text"
                    style={styles.input}
                    value={ingredient.name}
                    onChange={(e) => updateIngredient(recipe.id, ingredient.id, 'name', e.target.value)}
                    placeholder="Ingredient name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    style={styles.input}
                    value={ingredient.quantity}
                    onChange={(e) => updateIngredient(recipe.id, ingredient.id, 'quantity', e.target.value)}
                    placeholder="Amount"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    style={styles.input}
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(recipe.id, ingredient.id, 'unit', e.target.value)}
                    placeholder="Unit"
                  />
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                  <button
                    onClick={() => removeIngredient(recipe.id, ingredient.id)}
                    style={{...styles.button, ...styles.dangerButton, fontSize: '0.875rem'}}
                    disabled={recipe.ingredients.length === 1}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button
              onClick={onClose}
              style={{...styles.button, ...styles.primaryButton}}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default IngredientsModal