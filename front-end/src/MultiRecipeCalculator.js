import React, { useState } from 'react';

// Predefined product templates with ingredients
const PRODUCT_TEMPLATES = [
  {
    name: "Chocolate Cake",
    originalServings: 8,
    ingredients: [
      { name: "All-purpose flour", quantity: "2", unit: "cups" },
      { name: "Granulated sugar", quantity: "2", unit: "cups" },
      { name: "Cocoa powder", quantity: "3/4", unit: "cup" },
      { name: "Baking powder", quantity: "2", unit: "tsp" },
      { name: "Baking soda", quantity: "1.5", unit: "tsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Eggs", quantity: "2", unit: "large" },
      { name: "Milk", quantity: "1", unit: "cup" },
      { name: "Vegetable oil", quantity: "1/2", unit: "cup" },
      { name: "Vanilla extract", quantity: "2", unit: "tsp" },
      { name: "Hot water", quantity: "1", unit: "cup" }
    ]
  },
  {
    name: "Vanilla Cupcakes",
    originalServings: 12,
    ingredients: [
      { name: "All-purpose flour", quantity: "1.5", unit: "cups" },
      { name: "Granulated sugar", quantity: "1", unit: "cup" },
      { name: "Baking powder", quantity: "1.5", unit: "tsp" },
      { name: "Salt", quantity: "1/2", unit: "tsp" },
      { name: "Unsalted butter", quantity: "1/2", unit: "cup" },
      { name: "Eggs", quantity: "2", unit: "large" },
      { name: "Vanilla extract", quantity: "2", unit: "tsp" },
      { name: "Milk", quantity: "1/2", unit: "cup" }
    ]
  },
  {
    name: "Chicken Stir Fry",
    originalServings: 4,
    ingredients: [
      { name: "Chicken breast", quantity: "1", unit: "lb" },
      { name: "Bell peppers", quantity: "2", unit: "medium" },
      { name: "Broccoli", quantity: "2", unit: "cups" },
      { name: "Carrots", quantity: "2", unit: "medium" },
      { name: "Soy sauce", quantity: "3", unit: "tbsp" },
      { name: "Garlic", quantity: "3", unit: "cloves" },
      { name: "Ginger", quantity: "1", unit: "tbsp" },
      { name: "Vegetable oil", quantity: "2", unit: "tbsp" },
      { name: "Cornstarch", quantity: "1", unit: "tbsp" }
    ]
  },
  {
    name: "Beef Lasagna",
    originalServings: 8,
    ingredients: [
      { name: "Ground beef", quantity: "1", unit: "lb" },
      { name: "Lasagna noodles", quantity: "12", unit: "sheets" },
      { name: "Ricotta cheese", quantity: "15", unit: "oz" },
      { name: "Mozzarella cheese", quantity: "2", unit: "cups" },
      { name: "Parmesan cheese", quantity: "1/2", unit: "cup" },
      { name: "Tomato sauce", quantity: "24", unit: "oz" },
      { name: "Onion", quantity: "1", unit: "medium" },
      { name: "Garlic", quantity: "2", unit: "cloves" },
      { name: "Eggs", quantity: "1", unit: "large" },
      { name: "Italian seasoning", quantity: "1", unit: "tbsp" },
      { name: "Salt", quantity: "1", unit: "tsp" },
      { name: "Black pepper", quantity: "1/2", unit: "tsp" }
    ]
  },
  {
    name: "Fruit Salad",
    originalServings: 6,
    ingredients: [
      { name: "Strawberries", quantity: "1", unit: "lb" },
      { name: "Blueberries", quantity: "1", unit: "pint" },
      { name: "Grapes", quantity: "1", unit: "cup" },
      { name: "Pineapple", quantity: "2", unit: "cups" },
      { name: "Apples", quantity: "2", unit: "medium" },
      { name: "Honey", quantity: "2", unit: "tbsp" },
      { name: "Lime juice", quantity: "2", unit: "tbsp" },
      { name: "Mint leaves", quantity: "1/4", unit: "cup" }
    ]
  },
  {
    name: "Basic Bread Loaf",
    originalServings: 1,
    ingredients: [
      { name: "Bread flour", quantity: "3", unit: "cups" },
      { name: "Active dry yeast", quantity: "2.25", unit: "tsp" },
      { name: "Salt", quantity: "1.5", unit: "tsp" },
      { name: "Sugar", quantity: "1", unit: "tbsp" },
      { name: "Warm water", quantity: "1.25", unit: "cups" },
      { name: "Vegetable oil", quantity: "2", unit: "tbsp" }
    ]
  }
];

// Styles object to replace Tailwind classes
const styles = {
  container: {
    width: '100%',
    maxWidth: '1024px',
    margin: '0 auto', 
    padding: '1.5rem',
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  header: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center'
  },
  section: {
    marginBottom: '1.5rem'
  },
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: '0.375rem',
    padding: '1rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
  },
  flex: {
    display: 'flex'
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '1rem'
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '0.375rem',
    fontWeight: '500',
    cursor: 'pointer'
  },
  primaryButton: {
    backgroundColor: '#3B82F6',
    color: 'white',
    border: 'none'
  },
  dangerButton: {
    backgroundColor: '#EF4444',
    color: 'white',
    border: 'none'
  },
  successButton: {
    backgroundColor: '#10B981',
    color: 'white',
    border: 'none'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #D1D5DB',
    borderRadius: '0.375rem'
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '500',
    marginBottom: '0.25rem'
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '0.5rem',
    padding: '1.5rem',
    width: '100%',
    maxWidth: '32rem',
    maxHeight: '90vh',
    overflowY: 'auto'
  }
};

// Modal component for ingredients
const IngredientsModal = ({ 
  show, 
  onClose, 
  recipe, 
  updateIngredient, 
  addIngredient, 
  removeIngredient 
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

// Results Modal component
const ResultsModal = ({ 
  show, 
  onClose, 
  recipe,
  getScaledQuantity 
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

const MultiRecipeCalculator = () => {
  // State for recipes
  const [recipes, setRecipes] = useState([]);
  
  // State for showing results
  const [showResults, setShowResults] = useState(false);
  // State for showing consolidated view
  const [showConsolidated, setShowConsolidated] = useState(false);
  // State for selected template
  const [selectedTemplate, setSelectedTemplate] = useState("");
  
  // State for modals
  const [activeIngredientModal, setActiveIngredientModal] = useState(null);
  const [activeResultModal, setActiveResultModal] = useState(null);
  
  // Generate next ID for a new recipe
  const getNextRecipeId = () => {
    return recipes.length ? Math.max(...recipes.map(r => r.id)) + 1 : 1;
  };
  
  // Generate next ID for a new ingredient in a recipe
  const getNextIngredientId = (ingredients) => {
    return ingredients.length ? Math.max(...ingredients.map(i => i.id)) + 1 : 1;
  };
  
  // Add a new custom recipe
  const addCustomRecipe = () => {
    const newId = getNextRecipeId();
    setRecipes([...recipes, {
      id: newId,
      name: '',
      originalServings: 4,
      desiredServings: 20,
      ingredients: [
        { id: 1, name: '', quantity: '', unit: '' }
      ]
    }]);
  };
  
  // Add a recipe from template
  const addTemplateRecipe = () => {
    if (!selectedTemplate) return;
    
    const template = PRODUCT_TEMPLATES.find(t => t.name === selectedTemplate);
    if (!template) return;
    
    const newId = getNextRecipeId();
    const newRecipe = {
      id: newId,
      name: template.name,
      originalServings: template.originalServings,
      desiredServings: template.originalServings * 5, // Default to 5x
      ingredients: template.ingredients.map((ingredient, index) => ({
        id: index + 1,
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit
      }))
    };
    
    setRecipes([...recipes, newRecipe]);
    setSelectedTemplate("");
  };
  
  // Remove a recipe
  const removeRecipe = (recipeId) => {
    setRecipes(recipes.filter(recipe => recipe.id !== recipeId));
  };
  
  // Update recipe information
  const updateRecipe = (recipeId, field, value) => {
    setRecipes(
      recipes.map(recipe => 
        recipe.id === recipeId ? { ...recipe, [field]: value } : recipe
      )
    );
  };
  
  // Add a new ingredient to a recipe
  const addIngredient = (recipeId) => {
    setRecipes(
      recipes.map(recipe => {
        if (recipe.id === recipeId) {
          const newId = getNextIngredientId(recipe.ingredients);
          return {
            ...recipe,
            ingredients: [...recipe.ingredients, { id: newId, name: '', quantity: '', unit: '' }]
          };
        }
        return recipe;
      })
    );
  };
  
  // Remove an ingredient from a recipe
  const removeIngredient = (recipeId, ingredientId) => {
    setRecipes(
      recipes.map(recipe => {
        if (recipe.id === recipeId && recipe.ingredients.length > 1) {
          return {
            ...recipe,
            ingredients: recipe.ingredients.filter(ingredient => ingredient.id !== ingredientId)
          };
        }
        return recipe;
      })
    );
  };
  
  // Update ingredient information
  const updateIngredient = (recipeId, ingredientId, field, value) => {
    setRecipes(
      recipes.map(recipe => {
        if (recipe.id === recipeId) {
          return {
            ...recipe,
            ingredients: recipe.ingredients.map(ingredient => 
              ingredient.id === ingredientId 
                ? { ...ingredient, [field]: value } 
                : ingredient
            )
          };
        }
        return recipe;
      })
    );
  };
  
  // Calculate scaled quantities for all recipes
  const calculateAllRecipes = () => {
    if (recipes.length === 0) {
      alert("Please add at least one product before calculating.");
      return;
    }
    
    for (const recipe of recipes) {
      if (!recipe.originalServings || recipe.originalServings <= 0) {
        alert(`Please enter valid original servings for ${recipe.name || 'untitled product'}`);
        return;
      }
    }
    
    setShowResults(true);
  };
  
  // Get scaled quantity for an ingredient
  const getScaledQuantity = (quantity, originalServings, desiredServings) => {
    const numQuantity = parseFloat(quantity);
    if (isNaN(numQuantity)) return quantity;
    
    const scalingFactor = desiredServings / originalServings;
    const scaled = numQuantity * scalingFactor;
    
    // Format to 2 decimal places if needed
    return Number.isInteger(scaled) ? scaled : scaled.toFixed(2);
  };
  
  // Consolidate ingredients across all recipes
  const getConsolidatedIngredients = () => {
    const consolidatedMap = new Map();
    
    recipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (!ingredient.name || !ingredient.quantity) return;
        
        const key = `${ingredient.name}-${ingredient.unit}`.toLowerCase();
        const scaledQuantity = getScaledQuantity(
          ingredient.quantity, 
          recipe.originalServings, 
          recipe.desiredServings
        );
        
        if (consolidatedMap.has(key)) {
          const existing = consolidatedMap.get(key);
          const newTotal = parseFloat(existing.quantity) + parseFloat(scaledQuantity);
          consolidatedMap.set(key, {
            name: ingredient.name,
            quantity: Number.isInteger(newTotal) ? newTotal : newTotal.toFixed(2),
            unit: ingredient.unit
          });
        } else {
          consolidatedMap.set(key, {
            name: ingredient.name,
            quantity: scaledQuantity,
            unit: ingredient.unit
          });
        }
      });
    });
    
    return Array.from(consolidatedMap.values());
  };
  
  // Get active recipe for modal
  const getActiveRecipe = (recipeId) => {
    return recipes.find(recipe => recipe.id === recipeId) || null;
  };
  
  // Count ingredients in a recipe
  const countIngredients = (recipe) => {
    return recipe.ingredients.filter(i => i.name && i.quantity).length;
  };
  
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Multi-Product Scaling Calculator</h1>
      
      {!showResults && (
        <>
          {/* Product Selection */}
          <div style={{...styles.section, ...styles.card, backgroundColor: '#F9FAFB'}}>
            <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>Add Products</h2>
            
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
              <div>
                <label style={styles.label}>Select from product library:</label>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <select 
                    style={{...styles.input, flexGrow: 1}}
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                    <option value="">-- Select a product --</option>
                    {PRODUCT_TEMPLATES.map(template => (
                      <option key={template.name} value={template.name}>
                        {template.name} (Serves {template.originalServings})
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addTemplateRecipe}
                    disabled={!selectedTemplate}
                    style={{
                      ...styles.button, 
                      ...styles.primaryButton,
                      opacity: !selectedTemplate ? 0.5 : 1,
                      cursor: !selectedTemplate ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div style={{display: 'flex', alignItems: 'flex-end'}}>
                <button
                  onClick={addCustomRecipe}
                  style={{...styles.button, ...styles.successButton, width: '100%'}}
                >
                  Add Custom Product
                </button>
              </div>
            </div>
            
            {/* Product info */}
            <div style={{fontSize: '0.875rem', color: '#6B7280', marginTop: '0.5rem'}}>
              <p>Total products: {recipes.length}</p>
            </div>
          </div>
          
          {/* Recipes Container */}
          <div style={styles.section}>
            {recipes.length > 0 ? (
              <div>
                <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem'}}>Your Products</h2>
                
                <div style={styles.gridContainer}>
                  {recipes.map((recipe) => (
                    <div key={recipe.id} style={{...styles.card, boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
                      <div style={{...styles.flexBetween, marginBottom: '1rem'}}>
                        <h3 style={{fontSize: '1.125rem', fontWeight: '500'}}>
                          {recipe.name || 'Untitled Product'}
                        </h3>
                        <button
                          onClick={() => removeRecipe(recipe.id)}
                          style={{...styles.button, ...styles.dangerButton, padding: '0.25rem 0.5rem', fontSize: '0.75rem'}}
                        >
                          Remove
                        </button>
                      </div>
                      
                      {/* Recipe Basic Information */}
                      <div style={{marginBottom: '1rem'}}>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.5rem'}}>
                          <div>
                            <label style={{...styles.label, fontSize: '0.75rem'}}>Product Name</label>
                            <input
                              type="text"
                              style={{...styles.input, padding: '0.25rem 0.5rem', fontSize: '0.875rem'}}
                              value={recipe.name}
                              onChange={(e) => updateRecipe(recipe.id, 'name', e.target.value)}
                              placeholder="Product name"
                            />
                          </div>
                          <div>
                            <label style={{...styles.label, fontSize: '0.75rem'}}>Original Servings</label>
                            <input
                              type="number"
                              style={{...styles.input, padding: '0.25rem 0.5rem', fontSize: '0.875rem'}}
                              value={recipe.originalServings}
                              onChange={(e) => updateRecipe(recipe.id, 'originalServings', parseInt(e.target.value) || '')}
                              min="1"
                              placeholder="Original quantity"
                            />
                          </div>
                        </div>
                        <div>
                          <label style={{...styles.label, fontSize: '0.75rem'}}>Desired Servings</label>
                          <input
                            type="number"
                            style={{...styles.input, padding: '0.25rem 0.5rem', fontSize: '0.875rem'}}
                            value={recipe.desiredServings}
                            onChange={(e) => updateRecipe(recipe.id, 'desiredServings', parseInt(e.target.value) || '')}
                            min="1"
                            placeholder="Desired quantity"
                          />
                        </div>
                      </div>
                      
                      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                        <div style={{fontSize: '0.875rem', color: '#6B7280'}}>
                          {countIngredients(recipe)} ingredients
                        </div>
                        <button
                          onClick={() => setActiveIngredientModal(recipe.id)}
                          style={{...styles.button, ...styles.primaryButton, fontSize: '0.875rem'}}
                        >
                          View/Edit Ingredients
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{textAlign: 'center', padding: '2rem', backgroundColor: '#F3F4F6', borderRadius: '0.375rem'}}>
                <p style={{color: '#6B7280'}}>No products added yet. Use the options above to add products.</p>
              </div>
            )}
          </div>
          
          {/* Calculate Button */}
          {recipes.length > 0 && (
            <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
              <button
                onClick={calculateAllRecipes}
                style={{...styles.button, ...styles.successButton, padding: '0.75rem 1.5rem'}}
              >
                Calculate All Ingredients
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Results */}
      {showResults && (
        <div style={{marginTop: '1rem'}}>
          <div style={styles.flexBetween}>
            <h2 style={{fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem'}}>Results</h2>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <button
                onClick={() => setShowConsolidated(!showConsolidated)}
                style={{...styles.button, ...styles.primaryButton}}
              >
                {showConsolidated ? 'Show By Product' : 'Show Consolidated'}
              </button>
              <button
                onClick={() => setShowResults(false)}
                style={{...styles.button, backgroundColor: '#6B7280', color: 'white', border: 'none'}}
              >
                Edit Products
              </button>
            </div>
          </div>
          
          {!showConsolidated ? (
            // Individual recipe results
            <div style={styles.gridContainer}>
              {recipes.map((recipe) => (
                <div key={recipe.id} style={styles.card}>
                  <h3 style={{fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem'}}>
                    {recipe.name || 'Untitled Product'}
                  </h3>
                  <p style={{fontSize: '0.875rem', marginBottom: '0.75rem'}}>
                    Scaling from {recipe.originalServings} to {recipe.desiredServings} units 
                    (factor: {(recipe.desiredServings / recipe.originalServings).toFixed(2)})
                  </p>
                  
                  <div style={{backgroundColor: '#F3F4F6', padding: '0.75rem', borderRadius: '0.375rem'}}>
                    <p style={{marginBottom: '0.5rem'}}>{countIngredients(recipe)} ingredients needed</p>
                    <button
                      onClick={() => setActiveResultModal(recipe.id)}
                      style={{...styles.button, ...styles.primaryButton, fontSize: '0.875rem'}}
                    >
                      View Ingredients List
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Consolidated ingredients view
            <div style={styles.card}>
              <h3 style={{fontSize: '1.125rem', fontWeight: '500', marginBottom: '0.5rem'}}>Consolidated Ingredients</h3>
              <p style={{fontSize: '0.875rem', marginBottom: '0.75rem'}}>
                Total ingredients needed across all products
              </p>
              
              <div style={{backgroundColor: '#F3F4F6', padding: '0.75rem', borderRadius: '0.375rem'}}>
                <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
                  {getConsolidatedIngredients().map((ingredient, index) => (
                    <li key={index} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem'}}>
                      <span>{ingredient.name}:</span>
                      <span style={{fontWeight: '500'}}>
                        {ingredient.quantity} {ingredient.unit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Ingredients Modal */}
      {activeIngredientModal && (
        <IngredientsModal
          show={Boolean(activeIngredientModal)}
          onClose={() => setActiveIngredientModal(null)}
          recipe={getActiveRecipe(activeIngredientModal)}
          updateIngredient={updateIngredient}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />
      )}
      
      {/* Results Modal */}
      {activeResultModal && (
        <ResultsModal
          show={Boolean(activeResultModal)}
          onClose={() => setActiveResultModal(null)}
          recipe={getActiveRecipe(activeResultModal)}
          getScaledQuantity={getScaledQuantity}
        />
      )}
    </div>
  );
};

export default MultiRecipeCalculator;