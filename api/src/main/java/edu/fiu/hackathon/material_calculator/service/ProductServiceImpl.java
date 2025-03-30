package edu.fiu.hackathon.material_calculator.service;

import edu.fiu.hackathon.material_calculator.exception.ProductNotFoundException;
import edu.fiu.hackathon.material_calculator.model.Product;
import edu.fiu.hackathon.material_calculator.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getAllProducts() {

        return productRepository.findAll();
    }

    @Override
    public List<Product> saveAllProducts(List<Product> products) {

        return productRepository.saveAll(products);
    }

    @Override
    public Product getProductById(Long id) {

        return productRepository
                .findById(id)
                .orElseThrow(() -> new ProductNotFoundException("Product with Id " + id + " was not found"));
    }

    @Override
    public void deleteProduct(Long id) {
        final Product product = getProductById(id);
        productRepository.delete(product);
    }
}
