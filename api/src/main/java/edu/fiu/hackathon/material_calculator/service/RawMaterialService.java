package edu.fiu.hackathon.material_calculator.service;

import java.util.List;

import edu.fiu.hackathon.material_calculator.model.RawMaterial;

public interface RawMaterialService {

    List<RawMaterial> getAllRawMaterials();

    RawMaterial getRawMaterialById(Long id);

    RawMaterial saveRawMaterial(RawMaterial rawMaterial);

    void deleteRawMaterial(Long id);

    void updateRawMaterial(Long id, RawMaterial toUpdate);
}
