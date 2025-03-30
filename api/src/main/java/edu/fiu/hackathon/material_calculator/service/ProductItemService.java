package edu.fiu.hackathon.material_calculator.service;

import edu.fiu.hackathon.material_calculator.model.ProductItem;

import java.util.List;

public interface ProductItemService {

    List<ProductItem> saveAllProductItems(List<ProductItem> productItems);
}
