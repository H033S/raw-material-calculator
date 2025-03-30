package edu.fiu.hackathon.material_calculator;

import edu.fiu.hackathon.material_calculator.model.Product;
import edu.fiu.hackathon.material_calculator.model.ProductItem;
import edu.fiu.hackathon.material_calculator.model.RawMaterial;
import edu.fiu.hackathon.material_calculator.service.*;
import jakarta.transaction.Transactional;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.List;
import java.util.Set;

@SpringBootApplication
public class Application implements CommandLineRunner {

    private final RawMaterialService rawMaterialService;
    private final ProductItemService productItemService;
    private final ProductService productService;

    public Application(RawMaterialService rawMaterialService, ProductItemService productItemService, ProductService productService) {
        this.rawMaterialService = rawMaterialService;
        this.productItemService = productItemService;
        this.productService = productService;
    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Transactional
    @Override
    public void run(String... args) throws Exception {
        // Creating and saving raw materials in a batch
        List<RawMaterial> ingredients = rawMaterialService.saveAllRawMaterials(List.of(
                new RawMaterial("Flour"),
                new RawMaterial("Sugar"),
                new RawMaterial("Salt"),
                new RawMaterial("Butter"),
                new RawMaterial("Eggs"),
                new RawMaterial("Milk"),
                new RawMaterial("Yeast"),
                new RawMaterial("Olive Oil"),
                new RawMaterial("Garlic"),
                new RawMaterial("Tomatoes"),
                new RawMaterial("Cheese"),
                new RawMaterial("Basil"),
                new RawMaterial("Chicken"),
                new RawMaterial("Pepper"),
                new RawMaterial("Mushrooms")
        ));

        // Create Product Items with actual units of measure and quantities
        List<ProductItem> productItems = productItemService.saveAllProductItems(List.of(
                new ProductItem("g", 500.0, findRawMaterial(ingredients, "Flour")),
                new ProductItem("g", 200.0, findRawMaterial(ingredients, "Sugar")),
                new ProductItem("g", 10.0, findRawMaterial(ingredients, "Salt")),
                new ProductItem("g", 100.0, findRawMaterial(ingredients, "Butter")),
                new ProductItem("pieces", 2.0, findRawMaterial(ingredients, "Eggs")),
                new ProductItem("ml", 250.0, findRawMaterial(ingredients, "Milk")),
                new ProductItem("g", 5.0, findRawMaterial(ingredients, "Yeast")),
                new ProductItem("tbsp", 2.0, findRawMaterial(ingredients, "Olive Oil")),
                new ProductItem("cloves", 3.0, findRawMaterial(ingredients, "Garlic")),
                new ProductItem("ml", 300.0, findRawMaterial(ingredients, "Tomatoes")),
                new ProductItem("g", 150.0, findRawMaterial(ingredients, "Cheese")),
                new ProductItem("leaves", 5.0, findRawMaterial(ingredients, "Basil")),
                new ProductItem("g", 200.0, findRawMaterial(ingredients, "Chicken")),
                new ProductItem("g", 5.0, findRawMaterial(ingredients, "Pepper")),
                new ProductItem("g", 100.0, findRawMaterial(ingredients, "Mushrooms"))
        ));

        // Map product items to products
        List<Product> products = productService.saveAllProducts(List.of(
                new Product("Cake", Set.of(
                        findProductItem(productItems, "Flour"),
                        findProductItem(productItems, "Sugar"),
                        findProductItem(productItems, "Salt"),
                        findProductItem(productItems, "Butter"),
                        findProductItem(productItems, "Eggs"),
                        findProductItem(productItems, "Milk"),
                        findProductItem(productItems, "Yeast")
                )),
                new Product("Pizza", Set.of(
                        findProductItem(productItems, "Flour"),
                        findProductItem(productItems, "Cheese"),
                        findProductItem(productItems, "Olive Oil"),
                        findProductItem(productItems, "Salt"),
                        findProductItem(productItems, "Basil")
                )),
                new Product("Pasta", Set.of(
                        findProductItem(productItems, "Flour"),
                        findProductItem(productItems, "Chicken"),
                        findProductItem(productItems, "Garlic"),
                        findProductItem(productItems, "Pepper"),
                        findProductItem(productItems, "Mushrooms")
                ))
        ));

        System.out.println("Products and their ingredients (with units and quantities) have been successfully saved in the database!");
    }

    // Helper method to find RawMaterial by name
    private RawMaterial findRawMaterial(List<RawMaterial> materials, String name) {
        return materials.stream()
                .filter(rm -> rm.getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Raw Material not found: " + name));
    }

    // Helper method to find ProductItem by name
    private ProductItem findProductItem(List<ProductItem> items, String name) {
        return items.stream()
                .filter(pi -> pi.getRawMaterial().getName().equals(name))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product Item not found: " + name));
    }

}
