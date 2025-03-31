import React from "react";
const ResultsModal = ({ 
    show, 
    onClose, 
    recipe,
    getScaledQuantity,
    styles
  }) => {
    if (!show) return null;
    
    return (
      <div style={styles.modal}>
        <div style={styles.modalContent}>
          <div style={styles.flexBetween}>
            <h3 style={{fontSize: '1.25rem', fontWeight: 'bold'}}>{recipe.name || 'Untitled Product'} - Results</h3>
            <button 
              onClick={onClose}
              style={{fontSize: '1.5rem', fontWeight: 'bold', border: 'none', background: 'none'}}
            >
              ×
            </button>
          </div>
          
          <p style={{fontSize: '0.875rem', marginBottom: '0.75rem'}}>
            Scaling from {recipe.originalServings} to {recipe.desiredServings} units 
            (factor: {(recipe.desiredServings / recipe.originalServings).toFixed(2)})
          </p>
          
          <div style={{backgroundColor: '#F3F4F6', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem'}}>
            <h4 style={{fontWeight: '500', marginBottom: '0.5rem'}}>Ingredients Needed:</h4>
            <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
              {recipe.ingredients.map((ingredient) => (
                ingredient.name && ingredient.quantity ? (
                  <li key={ingredient.id} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
                    <span>{ingredient.name}:</span>
                    <span style={{fontWeight: '500'}}>
                      {getScaledQuantity(
                        ingredient.quantity, 
                        recipe.originalServings,
                        recipe.desiredServings
                      )} {ingredient.unit}
                    </span>
                  </li>
                ) : null
              ))}
            </ul>
          </div>
          
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button
              onClick={onClose}
              style={{...styles.button, ...styles.primaryButton}}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default ResultsModal