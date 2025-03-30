package edu.fiu.hackathon.material_calculator.service;

import edu.fiu.hackathon.material_calculator.model.Product;

import java.util.List;

public interface ProductService {

    List<Product> getAllProducts();
    List<Product> saveAllProducts(List<Product> products);
    Product getProductById(Long id);
    void deleteProduct(Long id);
}
