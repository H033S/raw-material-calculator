package edu.fiu.hackathon.material_calculator.service;

import edu.fiu.hackathon.material_calculator.exception.RawMaterialNotFoundException;
import edu.fiu.hackathon.material_calculator.model.RawMaterial;
import edu.fiu.hackathon.material_calculator.repository.RawMaterialRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * RawMaterialServiceImpl
 */
@Service
public class RawMaterialServiceImpl implements RawMaterialService {

    private RawMaterialRepository rawMaterialRepository;

    public RawMaterialServiceImpl(RawMaterialRepository rawMaterialRepository) {
        this.rawMaterialRepository = rawMaterialRepository;
    }

    @Override
    public List<RawMaterial> getAllRawMaterials() {
        return rawMaterialRepository.findAll();
    }

    @Override
    public RawMaterial getRawMaterialById(Long id) {

        return rawMaterialRepository
                .findById(id)
                .orElseThrow(
                        () -> new RawMaterialNotFoundException(
                                "Raw material with id " + id + " was not found")
                );
    }

    @Override
    public RawMaterial saveRawMaterial(RawMaterial rawMaterial) {
        return rawMaterialRepository.save(rawMaterial);
    }

    @Override
    public void deleteRawMaterial(Long id) {

        RawMaterial materialToDelete = getRawMaterialById(id);
        rawMaterialRepository.delete(materialToDelete);
    }

    @Override
    public void updateRawMaterial(Long id, RawMaterial toUpdate) {

        RawMaterial materialToUpdate = getRawMaterialById(id);
        materialToUpdate.setName(toUpdate.getName());
        rawMaterialRepository.save(materialToUpdate);
    }

    @Override
    public List<RawMaterial> saveAllRawMaterials(List<RawMaterial> rawMaterials) {
        return rawMaterialRepository.saveAll(rawMaterials);
    }

}
