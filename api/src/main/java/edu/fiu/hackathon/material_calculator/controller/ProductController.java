package edu.fiu.hackathon.material_calculator.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import edu.fiu.hackathon.material_calculator.dto.ProductReponseDTO;
import edu.fiu.hackathon.material_calculator.model.Product;
import edu.fiu.hackathon.material_calculator.service.ProductService;

@RestController
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    ResponseEntity<List<ProductReponseDTO>> getAllProduct() {

        final List<ProductReponseDTO> response = productService.getAllProducts()
                .stream()
                .map(x -> ProductReponseDTO.fromEntity(x))
                .toList();

        return ResponseEntity.ok(response);
    }

    @GetMapping("/product/{id}")
    ResponseEntity<ProductReponseDTO> getProduct(@PathVariable Long id) {

        final ProductReponseDTO response = ProductReponseDTO .fromEntity(productService.getProductById(id));
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/product/{id}")
    ResponseEntity<Product> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
