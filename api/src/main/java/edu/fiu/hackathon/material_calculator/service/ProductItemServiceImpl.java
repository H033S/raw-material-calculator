package edu.fiu.hackathon.material_calculator.service;

import edu.fiu.hackathon.material_calculator.model.ProductItem;
import edu.fiu.hackathon.material_calculator.repository.ProductItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductItemServiceImpl implements ProductItemService {

    private final ProductItemRepository productItemRepository;

    public ProductItemServiceImpl(ProductItemRepository productItemRepository) {
        this.productItemRepository = productItemRepository;
    }

    @Override
    public List<ProductItem> saveAllProductItems(List<ProductItem> productItems) {
        return productItemRepository.saveAll(productItems);
    }
}
