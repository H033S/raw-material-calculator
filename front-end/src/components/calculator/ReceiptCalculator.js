import React, { useState, useEffect } from "react";
import { styles } from "./styles";
import ProductService from "./db";

export const ReceiptCalculator = () => {
  // State for product templates
  const [productsTemplates, setProductTemplates] = useState([]);
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

  useEffect(() => {
    const fetchProducts = async () => {
      const productService = new ProductService();
      const products = await productService.getAllProducts();
      setProductTemplates(products);
    };

    fetchProducts();
  }, []);

  // Generate next ID for a new recipe
  const getNextRecipeId = () => {
    return recipes.length ? Math.max(...recipes.map((r) => r.id)) + 1 : 1;
  };

  // Generate next ID for a new ingredient in a recipe
  const getNextIngredientId = (ingredients) => {};

  // Add a new custom recipe
  const addCustomRecipe = () => {};

  // Add a recipe from template
  const addTemplateRecipe = () => {
    if (!selectedTemplate) return;

    const template = productsTemplates.find((t) => t.name === selectedTemplate);
    if (!template) return;

    const newId = getNextRecipeId();
    const newRecipe = {
      id: newId,
      name: template.name,
      productItems: template.productItems.map((ingredient, index) => ({
        id: index + 1,
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })),
    };

    setRecipes([...recipes, newRecipe]);
    setSelectedTemplate("");
  };

  // Remove a recipe
  const removeRecipe = (recipeId) => {};

  // Update recipe information
  const updateRecipe = (recipeId, field, value) => {};

  // Add a new ingredient to a recipe
  const addIngredient = (recipeId) => {};

  // Remove an ingredient from a recipe
  const removeIngredient = (recipeId, ingredientId) => {};

  // Update ingredient information
  const updateIngredient = (recipeId, ingredientId, field, value) => {};

  // Calculate scaled quantities for all recipes
  const calculateAllRecipes = () => {};

  // Get scaled quantity for an ingredient
  const getScaledQuantity = (quantity, originalServings, desiredServings) => {};

  // Consolidate ingredients across all recipes
  const getConsolidatedIngredients = () => {};

  // Get active recipe for modal
  const getActiveRecipe = (recipeId) => {};

  // Count ingredients in a recipe
  const countIngredients = (recipe) => {};

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Multi-Product Scaling Calculator</h1>

      {!showResults && (
        <>
          {/* Product Selection */}
          <div
            style={{
              ...styles.section,
              ...styles.card,
              backgroundColor: "#F9FAFB",
            }}
          >
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Add Products
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <div>
                <label style={styles.label}>Select from product library:</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <select
                    style={{ ...styles.input, flexGrow: 1 }}
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                    <option value="">-- Select a product --</option>

                    {productsTemplates.map((template) => (
                      <option key={template.name} value={template.name}>
                        {template.name}
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
                      cursor: !selectedTemplate ? "not-allowed" : "pointer",
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end" }}>
                <button
                  onClick={addCustomRecipe}
                  style={{
                    ...styles.button,
                    ...styles.successButton,
                    width: "100%",
                  }}
                >
                  Add Custom Product
                </button>
              </div>
            </div>

            {/* Product info */}
            <div
              style={{
                fontSize: "0.875rem",
                color: "#6B7280",
                marginTop: "0.5rem",
              }}
            >
              <p>Total products: {recipes.length}</p>
            </div>
          </div>

          {/* Recipes Container */}
          <div style={styles.section}>
            {recipes.length > 0 ? (
              <div>
                <h2
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: "600",
                    marginBottom: "0.75rem",
                  }}
                >
                  Your Products
                </h2>

                <div style={styles.gridContainer}>
                  {recipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      style={{
                        ...styles.card,
                        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <div
                        style={{ ...styles.flexBetween, marginBottom: "1rem" }}
                      >
                        <h3 style={{ fontSize: "1.125rem", fontWeight: "500" }}>
                          {recipe.name || "Untitled Product"}
                        </h3>
                        <button
                          onClick={() => removeRecipe(recipe.id)}
                          style={{
                            ...styles.button,
                            ...styles.dangerButton,
                            padding: "0.25rem 0.5rem",
                            fontSize: "0.75rem",
                          }}
                        >
                          Remove
                        </button>
                      </div>

                      {/* Recipe Basic Information */}
                      <div style={{ marginBottom: "1rem" }}>
                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                            gap: "0.5rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          <div>
                            <label
                              style={{ ...styles.label, fontSize: "0.75rem" }}
                            >
                              Product Name
                            </label>
                            <input
                              type="text"
                              style={{
                                ...styles.input,
                                padding: "0.25rem 0.5rem",
                                fontSize: "0.875rem",
                              }}
                              value={recipe.name}
                              onChange={(e) =>
                                updateRecipe(recipe.id, "name", e.target.value)
                              }
                              placeholder="Product name"
                            />
                          </div>
                          <div>
                            <label
                              style={{ ...styles.label, fontSize: "0.75rem" }}
                            >
                              Original Servings
                            </label>
                            <input
                              type="number"
                              style={{
                                ...styles.input,
                                padding: "0.25rem 0.5rem",
                                fontSize: "0.875rem",
                              }}
                              value={recipe.originalServings}
                              onChange={(e) =>
                                updateRecipe(
                                  recipe.id,
                                  "originalServings",
                                  parseInt(e.target.value) || "",
                                )
                              }
                              min="1"
                              placeholder="Original quantity"
                            />
                          </div>
                        </div>
                        <div>
                          <label
                            style={{ ...styles.label, fontSize: "0.75rem" }}
                          >
                            Desired Servings
                          </label>
                          <input
                            type="number"
                            style={{
                              ...styles.input,
                              padding: "0.25rem 0.5rem",
                              fontSize: "0.875rem",
                            }}
                            value={recipe.desiredServings}
                            onChange={(e) =>
                              updateRecipe(
                                recipe.id,
                                "desiredServings",
                                parseInt(e.target.value) || "",
                              )
                            }
                            min="1"
                            placeholder="Desired quantity"
                          />
                        </div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.5rem",
                        }}
                      >
                        <div style={{ fontSize: "0.875rem", color: "#6B7280" }}>
                          {countIngredients(recipe)} ingredients
                        </div>
                        <button
                          onClick={() => setActiveIngredientModal(recipe.id)}
                          style={{
                            ...styles.button,
                            ...styles.primaryButton,
                            fontSize: "0.875rem",
                          }}
                        >
                          View/Edit Ingredients
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "0.375rem",
                }}
              >
                <p style={{ color: "#6B7280" }}>
                  No products added yet. Use the options above to add products.
                </p>
              </div>
            )}
          </div>

          {/* Calculate Button */}
          {recipes.length > 0 && (
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <button
                onClick={calculateAllRecipes}
                style={{
                  ...styles.button,
                  ...styles.successButton,
                  padding: "0.75rem 1.5rem",
                }}
              >
                Calculate All Ingredients
              </button>
            </div>
          )}
        </>
      )}

      {/* Results */}
      {showResults && (
        <div style={{ marginTop: "1rem" }}>
          <div style={styles.flexBetween}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "1rem",
              }}
            >
              Results
            </h2>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setShowConsolidated(!showConsolidated)}
                style={{ ...styles.button, ...styles.primaryButton }}
              >
                {showConsolidated ? "Show By Product" : "Show Consolidated"}
              </button>
              <button
                onClick={() => setShowResults(false)}
                style={{
                  ...styles.button,
                  backgroundColor: "#6B7280",
                  color: "white",
                  border: "none",
                }}
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
                  <h3
                    style={{
                      fontSize: "1.125rem",
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {recipe.name || "Untitled Product"}
                  </h3>
                  <p style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                    Scaling from {recipe.originalServings} to{" "}
                    {recipe.desiredServings} units (factor:{" "}
                    {(recipe.desiredServings / recipe.originalServings).toFixed(
                      2,
                    )}
                    )
                  </p>

                  <div
                    style={{
                      backgroundColor: "#F3F4F6",
                      padding: "0.75rem",
                      borderRadius: "0.375rem",
                    }}
                  >
                    <p style={{ marginBottom: "0.5rem" }}>
                      {countIngredients(recipe)} ingredients needed
                    </p>
                    <button
                      onClick={() => setActiveResultModal(recipe.id)}
                      style={{
                        ...styles.button,
                        ...styles.primaryButton,
                        fontSize: "0.875rem",
                      }}
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
              <h3
                style={{
                  fontSize: "1.125rem",
                  fontWeight: "500",
                  marginBottom: "0.5rem",
                }}
              >
                Consolidated Ingredients
              </h3>
              <p style={{ fontSize: "0.875rem", marginBottom: "0.75rem" }}>
                Total ingredients needed across all products
              </p>

              <div
                style={{
                  backgroundColor: "#F3F4F6",
                  padding: "0.75rem",
                  borderRadius: "0.375rem",
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {getConsolidatedIngredients().map((ingredient, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.25rem",
                      }}
                    >
                      <span>{ingredient.name}:</span>
                      <span style={{ fontWeight: "500" }}>
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
    </div>
  );
};
